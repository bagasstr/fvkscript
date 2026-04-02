import { db } from "$lib/server/db";
import { user, scripts, keys, activityLogs } from "$lib/server/db/schema";
import { sql, eq, gte, desc, count } from "drizzle-orm";
import { error, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";

export const load = async (event) => {
    const session = await auth.api.getSession({ headers: event.request.headers });
    
    // Auth Check: Admin only
    if (!session || session.user.role !== 'admin') {
        throw redirect(302, "/dashboard");
    }

    // 1. Basic Counts
    const [userCount] = await db.select({ value: count() }).from(user);
    const [scriptCount] = await db.select({ value: count() }).from(scripts);
    const [keyCount] = await db.select({ value: count() }).from(keys);
    
    // 2. Plan Distribution
    const planDist = await db.select({
        plan: user.plan,
        count: count()
    }).from(user).groupBy(user.plan);

    // 3. Key Status Distribution
    const keyStatusDist = await db.select({
        status: keys.status,
        count: count()
    }).from(keys).groupBy(keys.status);

    // 4. Growth Trend (Simulated with real data if available)
    // Keys generated in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const [recentKeys] = await db.select({ value: count() })
        .from(keys)
        .where(gte(keys.createdAt, sevenDaysAgo));

    // 5. Recent Admin Activity
    const recentLogs = await db.select({
        action: activityLogs.action,
        details: activityLogs.details,
        timestamp: activityLogs.timestamp,
        userName: user.name
    })
    .from(activityLogs)
    .innerJoin(user, eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);

    // 6. Top Script Categories
    const categoryDist = await db.select({
        category: scripts.category,
        count: count()
    }).from(scripts).groupBy(scripts.category);

    return {
        stats: {
            users: userCount.value,
            scripts: scriptCount.value,
            keys: keyCount.value,
            recentNewKeys: recentKeys.value
        },
        distributions: {
            plans: planDist,
            keyStatus: keyStatusDist,
            categories: categoryDist
        },
        logs: recentLogs
    };
};
