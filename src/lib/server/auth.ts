import { betterAuth } from "better-auth";
import { db } from "./db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "./db/schema";
import { BETTER_AUTH_SECRET } from "$env/static/private";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // PostgreSQL
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification
        }
    }),
    secret: BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
        autoSignIn: true
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                required: false
            },
            plan: {
                type: "string",
                defaultValue: "free",
                required: false
            },
            hwid: {
                type: "string",
                required: false
            }
        }
    }
});
