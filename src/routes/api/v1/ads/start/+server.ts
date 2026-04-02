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
    const callbackUrl = `${event.url.origin}/api/v1/ads/callback`;

    // --- LOOTLABS API INTEGRATION (ANTI-BYPASS) ---
    if (lootLabsToken) {
        try {
            const response = await fetch("https://creators.lootlabs.gg/api/public/content_locker", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${lootLabsToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "FVKScript Key Verification",
                    url: callbackUrl,
                    tier_id: 1, // Trending & Recommended
                    number_of_tasks: 2, // Anda bisa ubah jumlah iklannya di sini
                })
            });

            const data = await response.json();
            if (data.type === "created" && data.message.loot_url) {
                throw redirect(302, data.message.loot_url);
            }
        } catch (err) {
            if (err instanceof Response) throw err; // Re-throw redirect
            console.error("LootLabs API Error:", err);
        }
    }

    // FALLBACK: Manual redirect jika token tidak ada atau API gagal
    const lootLabsUrl = `https://loot-link.com/s?id=${lootLabsId}&url=${encodeURIComponent(callbackUrl)}`;
    throw redirect(302, lootLabsUrl);
};
