import { db } from "$lib/server/db";
import { scripts, activityLogs } from "$lib/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { error, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";

export const load = async (event) => {
    const session = await auth.api.getSession({ headers: event.request.headers });
    
    // Keamanan: Cek jika bukan admin, tendang ke dashboard biasa
    if (!session || session.user.role !== 'admin') {
        throw redirect(302, "/dashboard");
    }

    const allScripts = await db.select().from(scripts).orderBy(desc(scripts.updatedAt));
    return { scripts: allScripts };
};

export const actions = {
    upsert: async ({ request, locals }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session || session.user.role !== 'admin') throw error(401, "Unauthorized");

        const formData = await request.formData();
        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        let category = formData.get('category') as string;
        const customCategory = formData.get('custom_category') as string;
        const version = formData.get('version') as string;
        const code = formData.get('code') as string;
        const description = formData.get('description') as string;

        if (category === 'Other' && customCategory) {
            category = customCategory;
        }

        const scriptData = {
            title,
            category,
            version,
            code,
            description,
            updatedAt: new Date()
        };

        if (id) {
            // Update existing script
            await db.update(scripts).set(scriptData).where(eq(scripts.id, id));
        } else {
            // Create new script
            const newId = crypto.randomUUID();
            await db.insert(scripts).values({
                id: newId,
                ...scriptData
            });

            // Log activity
            await db.insert(activityLogs).values({
                id: crypto.randomUUID(),
                userId: session.user.id,
                action: "UPLOAD_SCRIPT",
                details: `New script uploaded: ${title}`
            });
        }

        return { success: true };
    },

    delete: async ({ request }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session || session.user.role !== 'admin') throw error(401, "Unauthorized");

        const formData = await request.formData();
        const id = formData.get('id') as string;

        if (id) {
            await db.delete(scripts).where(eq(scripts.id, id));
        }

        return { success: true };
    }
};
