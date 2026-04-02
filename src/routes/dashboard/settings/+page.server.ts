import { db } from "$lib/server/db";
import { user, activityLogs } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";

export const load = async (event) => {
    const session = await auth.api.getSession({
        headers: event.request.headers
    });
    
    if (!session?.user) return { currentUser: null };

    // Ambil data user terbaru dari DB (plan & hwid)
    const currentUser = await db.query.user.findFirst({
        where: eq(user.id, session.user.id)
    });

    return { currentUser };
};

export const actions = {
    upgrade: async (event) => {
        const session = await auth.api.getSession({
            headers: event.request.headers
        });
        
        if (!session?.user) return fail(401, { message: "Unauthorized" });

        const formData = await event.request.formData();
        const tier = formData.get('tier')?.toString() || 'premium';

        await db.update(user)
            .set({ plan: tier })
            .where(eq(user.id, session.user.id));

        await db.insert(activityLogs).values({
            id: crypto.randomUUID(),
            userId: session.user.id,
            action: "UPGRADE_PLAN",
            details: `User upgraded to ${tier.toUpperCase()} access level.`
        });

        return { success: true, action: 'upgrade' };
    },
    
    resetHwid: async (event) => {
        const session = await auth.api.getSession({
            headers: event.request.headers
        });
        
        if (!session?.user) return fail(401, { message: "Unauthorized" });

        await db.update(user)
            .set({ hwid: null })
            .where(eq(user.id, session.user.id));

        await db.insert(activityLogs).values({
            id: crypto.randomUUID(),
            userId: session.user.id,
            action: "RESET_HWID",
            details: "Hardware binding has been successfully cleared."
        });

        return { success: true, action: 'reset' };
    },

    setRole: async (event) => {
        const session = await auth.api.getSession({
            headers: event.request.headers
        });
        
        if (!session?.user) return fail(401, { message: "Unauthorized" });

        const formData = await event.request.formData();
        const role = formData.get('role')?.toString() || 'user';

        await db.update(user)
            .set({ role })
            .where(eq(user.id, session.user.id));

        return { success: true, action: 'setRole' };
    }
};
