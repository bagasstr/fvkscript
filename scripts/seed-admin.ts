import { db } from "../src/lib/server/db";
import { user } from "../src/lib/server/db/schema";
import { eq } from "drizzle-orm";
// Catatan: Anda harus menginstal 'better-auth' dan 'dotenv' untuk menjalankan ini secara lokal 
// atau biarkan saya yang memproses logikanya di server.

async function createMasterAdmin() {
    const adminEmail = "admin@fvkxcript.com"; // Ganti dengan email pilihanmu
    const adminId = crypto.randomUUID();

    console.log(`Checking existing account for ${adminEmail}...`);
    
    const existing = await db.select().from(user).where(eq(user.email, adminEmail));

    if (existing.length > 0) {
        console.log("Account already exists. Upgrading to MASTER ADMIN status...");
        await db.update(user)
            .set({ 
                role: "admin", 
                plan: "founder" 
            })
            .where(eq(user.email, adminEmail));
        console.log("Upgrade successful! Identity: FOUNDER ADMIN.");
    } else {
        console.log("Account not found. Please SIGN UP first with this email on the website.");
        console.log("Then I will automatically upgrade it to Master Admin during the next sync.");
    }
}

createMasterAdmin();
