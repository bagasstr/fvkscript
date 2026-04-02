import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { keys, scripts, activityLogs } from "$lib/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
    const session = await auth.api.getSession({
        headers: event.request.headers
    });

    if (!session) {
        throw redirect(303, "/login");
    }

    // Ambil data user, keys, dan script terbaru untuk Dashboard
    const [userKeysData, allScripts, recentLogs] = await Promise.all([
        db.select().from(keys).where(eq(keys.userId, session.user.id)),
        db.select().from(scripts).limit(5).orderBy(desc(scripts.updatedAt)),
        db.select().from(activityLogs)
            .where(eq(activityLogs.userId, session.user.id))
            .limit(3)
            .orderBy(desc(activityLogs.timestamp))
    ]);

    return {
        userKeys: userKeysData,
        scripts: allScripts,
        recentActivity: recentLogs,
        justUpgraded: event.parent().then(d => d.justUpgraded)
    };
};
