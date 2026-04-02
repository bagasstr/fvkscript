import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";

export const GET = async (event) => {
    const session = await auth.api.getSession({
        headers: event.request.headers
    });
    
    if (!session?.user) {
        throw redirect(302, "/login");
    }

    // --- LOOTLABS INTEGRATION ---
    const lootLabsId = "1251248"; 
    const callbackUrl = `${event.url.origin}/api/v1/ads/callback`;
    const lootLabsUrl = `https://loot-link.com/s?id=${lootLabsId}&url=${encodeURIComponent(callbackUrl)}`;
    
    throw redirect(302, lootLabsUrl);
};
