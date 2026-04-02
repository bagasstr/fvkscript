import { db } from "$lib/server/db";
import { user, activityLogs } from "$lib/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { error, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";

export const load = async (event) => {
    const session = await auth.api.getSession({ headers: event.request.headers });
    
    // Auth Check: Admin only
    if (!session || session.user.role !== 'admin') {
        throw redirect(302, "/dashboard");
    }

    const allUsers = await db.select().from(user).orderBy(desc(user.createdAt));
    return { users: allUsers };
};

export const actions = {
    updateUser: async ({ request, locals }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session || session.user.role !== 'admin') throw error(401, "Unauthorized");

        const formData = await request.formData();
        const id = formData.get('id') as string;
        const role = formData.get('role') as string;
        const plan = formData.get('plan') as string;

        if (!id) throw error(400, "Missing User ID");

        await db.update(user).set({
            role: role as any,
            plan: plan as any,
            updatedAt: new Date()
        }).where(eq(user.id, id));

        // Log the administrative action
        await db.insert(activityLogs).values({
            id: crypto.randomUUID(),
            userId: session.user.id,
            action: "ADMIN_UPDATE_USER",
            details: `Updated user ID ${id} to role: ${role}, plan: ${plan}`
        });

        return { success: true };
    },

    deleteUser: async ({ request }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session || session.user.role !== 'admin') throw error(401, "Unauthorized");

        const formData = await request.formData();
        const id = formData.get('id') as string;

        // Don't let admin delete themselves
        if (id === session.user.id) throw error(400, "You cannot delete your own administrative identity node.");

        if (id) {
            await db.delete(user).where(eq(user.id, id));
        }

        return { success: true };
    }
};
