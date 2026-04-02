import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import { env } from "$env/dynamic/private";

export const GET = async (event) => {
    const session = await auth.api.getSession({
        headers: event.request.headers
    });
    
    if (!session?.user) {
        throw redirect(302, "/login");
    }

    const lootLabsToken = env.LOOTLABS_API_TOKEN;
    const lootLabsId = "1251248"; // Fallback ID
    const callbackUrl = `${event.url.origin}/api/ads/callback`;

    // --- LOOTLABS API INTEGRATION (ANTI-BYPASS) ---
    if (lootLabsToken) {
        let lootUrl: string | null = null;

        try {
            const response = await fetch("https://creators.lootlabs.gg/api/public/content_locker", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${lootLabsToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "FVKScript Key Verify",
                    url: callbackUrl,
                    tier_id: 1,
                    number_of_tasks: 2
                })
            });

            const data = await response.json();
            console.log("[LootLabs] API Response:", JSON.stringify(data));

            if (data.type === "created" && data.message) {
                // API returns `message` as an ARRAY of link objects
                const linkData = Array.isArray(data.message) ? data.message[0] : data.message;
                if (linkData?.loot_url) {
                    lootUrl = linkData.loot_url;
                }
            }

            if (!lootUrl) {
                console.error("[LootLabs] Could not extract loot_url from response:", JSON.stringify(data));
            }
        } catch (err) {
            console.error("[LootLabs] API Error:", err);
        }

        // Redirect OUTSIDE try/catch so it won't be accidentally caught
        if (lootUrl) {
            throw redirect(302, lootUrl);
        }
    }

    // FALLBACK: Manual redirect if token is missing or API failed
    const lootLabsUrl = `https://loot-link.com/s?id=${lootLabsId}&url=${encodeURIComponent(callbackUrl)}`;
    console.log("[LootLabs] Using fallback URL:", lootLabsUrl);
    throw redirect(302, lootLabsUrl);
};
