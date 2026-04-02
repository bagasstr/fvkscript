import { db } from "$lib/server/db";
import { keys, user } from "$lib/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import { randomUUID } from "node:crypto";

export const load = async (event) => {
    const session = await auth.api.getSession({
        headers: event.request.headers
    });
    
    if (!session?.user) return { userKeys: [], user: null };

    // Get fresh user data to check plan and verification
    const userData = await db.query.user.findFirst({
        where: eq(user.id, session.user.id)
    });

    const userKeys = await db.query.keys.findMany({
        where: eq(keys.userId, session.user.id),
        orderBy: [desc(keys.createdAt)],
    });

    const isAdVerified = (userData?.plan === "premium" || userData?.plan === "founder" || userData?.role === "admin") ? true : (userData?.adVerifiedAt ? ((Date.now() - new Date(userData.adVerifiedAt).getTime()) / (1000 * 60 * 60) < 24) : false);

    return { 
        userKeys, 
        user: userData,
        isAdVerified
    };
};

export const actions = {
    generateKey: async (event) => {
        const session = await auth.api.getSession({
            headers: event.request.headers
        });
        
        if (!session?.user) return fail(401, { message: "Unauthorized" });

        const userData = await db.query.user.findFirst({
            where: eq(user.id, session.user.id)
        });

        if (!userData) return fail(404, { message: "User not found" });

        const isPremium = userData.plan === "premium" || userData.plan === "founder" || userData.role === "admin";
        
        // Validation for free users
        if (!isPremium) {
            if (!userData.adVerifiedAt) {
                return fail(403, { message: "Mandatory Ad-Link verification required" });
            }
            const hoursSinceVerified = (Date.now() - new Date(userData.adVerifiedAt).getTime()) / (1000 * 60 * 60);
            if (hoursSinceVerified >= 24) {
                return fail(403, { message: "Ad-Link verification expired (24h limit)" });
            }
        }

        const prefix = isPremium ? "FVK-PREM-" : "FVK-FREE-";
        const newKeyCode = prefix + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Expiry date for free keys
        const expiryDate = isPremium ? null : new Date(Date.now() + 24 * 60 * 60 * 1000);

        await db.insert(keys).values({
            id: randomUUID(),
            userId: session.user.id,
            code: newKeyCode,
            type: userData.plan || "free",
            status: "active",
            expiryDate: expiryDate
        });

        return { success: true };
    }
};
