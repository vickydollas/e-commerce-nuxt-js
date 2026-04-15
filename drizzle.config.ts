import 'dotenv/config'
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

// import { defineConfig } from 'drizzle-kit';

// export default defineConfig({
//   schema: './server/database/schema.ts', Where your tables live
//   out: './server/database/migrations',  Where Drizzle stores history
//   dialect: 'sqlite',
//   dbCredentials: {
//     url: 'file:./server/database/sqlite.db', Your database file
//   },
// });
