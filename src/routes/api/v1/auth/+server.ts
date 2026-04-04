import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { keys, activityLogs, scripts, user } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';

export const POST = async ({ request }) => {
	const body = await request.json();
	const key = body.key?.trim();
	const hwid = body.hwid?.trim();
	const scriptId = body.scriptId;

	if (!key || !hwid) {
		return json(
			{
				success: false,
				message: 'Missing mandatory identification nodes (Key/HWID).'
			},
			{ status: 400 }
		);
	}

	try {
		// 1. Find the key in the database
		const [targetKey] = await db.select().from(keys).where(eq(keys.code, key));

		if (!targetKey) {
			return json({ success: false, message: 'Invalid license key protocol.' }, { status: 404 });
		}

		// 2. Check Key Status
		if (targetKey.status === 'revoked') {
			return json(
				{ success: false, message: 'License has been revoked by high-level admin.' },
				{ status: 403 }
			);
		}

		if (targetKey.expiryDate && new Date(targetKey.expiryDate) < new Date()) {
			return json({ success: false, message: 'License protocol has expired.' }, { status: 403 });
		}

		// 3. HWID Lock Logic
		if (!targetKey.hwid) {
			// Bind HWID to the key on first use
			await db.update(keys).set({ hwid }).where(eq(keys.id, targetKey.id));
		} else if (targetKey.hwid !== hwid) {
			// HWID Mismatch
			return json(
				{
					success: false,
					message:
						'HWID mismatch detected. License is locked to a different terminal. Reset required via Dashboard.'
				},
				{ status: 403 }
			);
		}

		// Sync HWID to the user profile if not already set (ensures dashboard reflects it)
		const [userData] = await db.select().from(user).where(eq(user.id, targetKey.userId));
		if (userData && !userData.hwid) {
			await db.update(user).set({ hwid }).where(eq(user.id, targetKey.userId));
		}

		// 4. (Optional) Log the execution
		await db.insert(activityLogs).values({
			id: randomUUID(),
			userId: targetKey.userId,
			action: 'SCRIPT_EXECUTION',
			details: `Script executed via loader. [Key: ${key}] [HWID: ${hwid}]`
		});

		// 5. Get script source if ID provided, or return generic success
		let scriptSource = '';
		if (scriptId) {
			const [src] = await db.select().from(scripts).where(eq(scripts.id, scriptId));
			if (src) scriptSource = src.code;
		}

		return json({
			success: true,
			tier: targetKey.type,
			ownerId: targetKey.userId,
			sourceCode: scriptSource,
			message: 'Authentication sequence successful // Node link established.'
		});
	} catch (error: any) {
		return json(
			{ success: false, message: 'Internal server error: ' + error.message },
			{ status: 500 }
		);
	}
};
