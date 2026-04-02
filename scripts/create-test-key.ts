import { db } from "../src/lib/server/db";
import { keys, user } from "../src/lib/server/db/schema";
import { eq } from "drizzle-orm";

async function createTestKey() {
    // 1. Get the first user in the database (usually you)
    const [firstUser] = await db.select().from(user).limit(1);

    if (!firstUser) {
        console.log("No users found. Please sign up on the website first.");
        return;
    }

    const testKey = "FVK-PREM-8AVVSPQZ";
    
    // 2. Check if key already exists
    const existing = await db.select().from(keys).where(eq(keys.code, testKey));
    
    if (existing.length > 0) {
        console.log(`Key ${testKey} already exists. Ready to use!`);
        return;
    }

    // 3. Insert the key
    await db.insert(keys).values({
        id: crypto.randomUUID(),
        userId: firstUser.id,
        code: testKey,
        type: "premium",
        status: "active"
    });

    console.log(`Successfully created test key: ${testKey}`);
    console.log("You can now use this key in your Lua loader.");
}

createTestKey();
