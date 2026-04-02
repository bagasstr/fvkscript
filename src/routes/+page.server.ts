import { db } from "$lib/server/db";
import { scripts, keys } from "$lib/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "$lib/server/auth";

export const load = async (event) => {
    // Fetch all scripts from the database, most recent first
    const allScripts = await db.select().from(scripts).orderBy(desc(scripts.updatedAt));

    // Enrich with dynamic styling for the landing page showcase
    const showcaseScripts = allScripts.map(script => ({
        ...script,
        // Map categories to beautiful color gradients
        color: script.category?.toLowerCase().includes('farm') ? "from-emerald-500/20 to-teal-500/20 text-emerald-500" :
               script.category?.toLowerCase().includes('pvp') ? "from-red-500/20 to-orange-500/20 text-red-500" :
               "from-cyan-500/20 to-blue-500/20 text-cyan-500",
        icon: script.icon || "Zap" // Default icon if none specified
    }));

    const session = await auth.api.getSession({ headers: event.request.headers });
    let userKeys: any[] = [];
    
    if (session?.user) {
        userKeys = await db.select().from(keys).where(eq(keys.userId, session.user.id)).orderBy(desc(keys.createdAt));
    }

    return { 
        showcaseScripts,
        session,
        userKeys
    };
};
