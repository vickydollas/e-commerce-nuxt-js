import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

export const loginTable = sqliteTable('logins', {
    id: int().primaryKey({autoIncrement: true}),
    username: text().notNull(),
    password: text().notNull()
})