import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../db/schema";
import { join } from 'path';

const sqlite = new Database(join(process.cwd(), 'db.sqlite'));
// const sqlite = new Database(process.env.DATABASE_URL || 'sqlite.db');
// 2. Initialize Drizzle with the connection and your schema
export const db = drizzle(sqlite, { schema });
export function useDrizzle() {
    return db
}
// 3. Export your tables for easy access
export const tables = schema;
export type Login = typeof schema.loginTable.$inferSelect