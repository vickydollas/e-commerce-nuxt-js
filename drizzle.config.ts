// import 'dotenv/config'
// import { config } from "dotenv"
import { defineConfig } from 'drizzle-kit';
import * as dotenv from "dotenv"

dotenv.config({ path: '.env' });
export default defineConfig({
  schema: './server/db/schema.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
})

// import { defineConfig } from 'drizzle-kit';

// export default defineConfig({
//   schema: './server/database/schema.ts', Where your tables live
//   out: './server/database/migrations',  Where Drizzle stores history
//   dialect: 'sqlite',
//   dbCredentials: {
//     url: 'file:./server/database/sqlite.db', Your database file
//   },
// });
