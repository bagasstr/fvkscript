import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load = async (event) => {
    const session = await auth.api.getSession({
        headers: event.request.headers
    });

    if (!session && !event.url.pathname.startsWith('/login')) {
        throw redirect(303, "/login");
    }

    // Ambil data user TERBARU langsung dari database, bukan cuma dari session
    const currentDbUser = session?.user?.id 
        ? await db.query.user.findFirst({ where: eq(user.id, session.user.id) })
        : null;

    // Cek jika user datang dengan niat upgrade (init_plan dari Landing Page atau Login)
    const initPlan = event.url.searchParams.get('init_plan');
    let justUpgraded = false;

    if (session?.user?.id && initPlan && currentDbUser) {
        // Hanya update jika plan di DB belum sesuai instruksi init_plan
        if (currentDbUser.plan !== initPlan) {
            await db.update(user)
                .set({ plan: initPlan })
                .where(eq(user.id, session.user.id));
            
            justUpgraded = true;
            // Redirect untuk membersihkan URL namun membawa status sukses
            throw redirect(303, "/dashboard?status=authorized");
        }
    }

    return {
        session,
        // Pastikan kita mengirim data user terbaru (currentDbUser) agar UI Sidebar selaras
        user: currentDbUser,
        justUpgraded: event.url.searchParams.get('status') === 'authorized'
    };
};
