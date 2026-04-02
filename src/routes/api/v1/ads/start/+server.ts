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
    // 1. Dapatkan Creator ID Anda dari LootLabs
    // 2. Uncomment baris di bawah ini dan ganti YOUR_LOOTLABS_ID
    
    /*
    const lootLabsId = "YOUR_LOOTLABS_ID"; // Ganti dengan ID asli Anda
    const callbackUrl = `${event.url.origin}/api/v1/ads/callback`;
    const lootLabsUrl = `https://loot-link.com/s?id=${lootLabsId}&url=${encodeURIComponent(callbackUrl)}`;
    
    throw redirect(302, lootLabsUrl);
    */

    // MOCK: Sementara biarkan ke callback langsung untuk testing di localhost
    // Jika sudah siap pakai LootLabs, hapus baris di bawah ini dan gunakan kode di atas.
    throw redirect(302, "/api/v1/ads/callback");
};
