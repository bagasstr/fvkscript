import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { DATABASE_URL } from "$env/static/private";
import * as schema from "./schema";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const sql = neon(DATABASE_URL);
export const db = drizzle(sql, { schema });
