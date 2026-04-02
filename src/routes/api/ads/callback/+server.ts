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

    // Update user verification timestamp
    await db.update(user)
        .set({ adVerifiedAt: new Date() })
        .where(eq(user.id, session.user.id));

    // Redirect back to dashboard with success message
    throw redirect(302, "/dashboard/keys?verified=true");
};
