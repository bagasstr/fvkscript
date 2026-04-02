import { auth } from "$lib/server/auth";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
            auth: typeof auth;
            session: {
                user: typeof auth.$Infer.Session.user;
                session: typeof auth.$Infer.Session.session;
            } | null;
        }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
