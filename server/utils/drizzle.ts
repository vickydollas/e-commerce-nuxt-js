import { drizzle } from "drizzle-orm/libsql";
// import Database from "better-sqlite3";
import {createClient} from "@libsql/client"
import * as schema from "../db/schema";
// import { join } from 'path';

// const sqlite = new Database(join(process.cwd(), 'db.sqlite'));
// const sqlite = new Database(process.env.DATABASE_URL || 'sqlite.db');
// 2. Initialize Drizzle with the connection and your schema
// export const db = drizzle(sqlite, { schema });
export const tables = schema;
export function useDrizzle() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  })

  return drizzle(client, { schema })
}

// export type Login = typeof schema.loginTable.$inferSelect