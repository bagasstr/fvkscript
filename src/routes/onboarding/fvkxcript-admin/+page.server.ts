import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { user, activityLogs } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";

export const actions = {
    signup: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const name = formData.get("name")?.toString();

        if (!email || !password || !name) {
            return fail(400, { message: "Information incomplete." });
        }

        try {
            // 1. Buat akun lewat Better Auth API
            const result = await auth.api.signUpEmail({
                body: {
                    email,
                    password,
                    name,
                },
                headers: request.headers
            });

            if (result && result.user) {
                // 2. Jika sukses, UPGRADE role & plan secara instan di database Neon
                await db.update(user)
                    .set({ 
                        role: 'admin', 
                        plan: 'admin' 
                    })
                    .where(eq(user.id, result.user.id));

                // 3. Log aktivitas admin pertama
                await db.insert(activityLogs).values({
                    id: crypto.randomUUID(),
                    userId: result.user.id,
                    action: "ADMIN_ONBOARDING",
                    details: `Master Admin identity established via executive portal.`
                });

                console.log(`[ONBOARDING] Master Admin registered: ${email}`);
                return { success: true };
            }

            return fail(400, { message: "Unexpected response from auth provider." });
        } catch (e: any) {
            console.error("[ONBOARDING_ERROR]", e);
            // Tangkap error spesifik seperti "Email already exists"
            const errorMessage = e.message || "Registration failed. Please check your credentials.";
            return fail(400, { message: errorMessage });
        }
    }
};
