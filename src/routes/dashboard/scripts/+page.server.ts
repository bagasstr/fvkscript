import { db } from "$lib/server/db";
import { scripts } from "$lib/server/db/schema";
import { desc } from "drizzle-orm";

export const load = async (event) => {
    // Ambil semua scripts yang tersedia di database
    const allScripts = await db.query.scripts.findMany({
        orderBy: [desc(scripts.updatedAt)]
    });

    return {
        allScripts
    };
};
