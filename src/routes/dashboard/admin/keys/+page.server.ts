import { db } from "$lib/server/db";
import { user, keys, activityLogs } from "$lib/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { error, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";

export const load = async (event) => {
    const session = await auth.api.getSession({ headers: event.request.headers });
    
    // Auth Check: Admin only
    if (!session || session.user.role !== 'admin') {
        throw redirect(302, "/dashboard");
    }

    // Load all keys with user information
    const allKeys = await db.select({
        id: keys.id,
        code: keys.code,
        type: keys.type,
        status: keys.status,
        hwid: keys.hwid,
        expiryDate: keys.expiryDate,
        createdAt: keys.createdAt,
        owner: {
            name: user.name,
            email: user.email,
            image: user.image
        }
    })
    .from(keys)
    .innerJoin(user, eq(keys.userId, user.id))
    .orderBy(desc(keys.createdAt));

    return { allKeys };
};

export const actions = {
    revokeKey: async ({ request }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session || session.user.role !== 'admin') throw error(401, "Unauthorized");

        const formData = await request.formData();
        const id = formData.get('id') as string;

        if (id) {
            await db.update(keys).set({ status: 'revoked' }).where(eq(keys.id, id));
            
            // Log it
            await db.insert(activityLogs).values({
                id: crypto.randomUUID(),
                userId: session.user.id,
                action: "ADMIN_REVOKE_KEY",
                details: `Revoked key ID: ${id}`
            });
        }

        return { success: true };
    },

    activateKey: async ({ request }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session || session.user.role !== 'admin') throw error(401, "Unauthorized");

        const formData = await request.formData();
        const id = formData.get('id') as string;

        if (id) {
            await db.update(keys).set({ status: 'active' }).where(eq(keys.id, id));
            
            // Log it
            await db.insert(activityLogs).values({
                id: crypto.randomUUID(),
                userId: session.user.id,
                action: "ADMIN_ACTIVATE_KEY",
                details: `Activated/Restored key ID: ${id}`
            });
        }

        return { success: true };
    },

    deleteKey: async ({ request }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session || session.user.role !== 'admin') throw error(401, "Unauthorized");

        const formData = await request.formData();
        const id = formData.get('id') as string;

        if (id) {
            await db.delete(keys).where(eq(keys.id, id));
        }

        return { success: true };
    }
};
