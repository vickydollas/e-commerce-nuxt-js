import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

export const loginTable = sqliteTable('logins', {
    id: int().primaryKey({autoIncrement: true}),
    username: text().notNull(),
    password: text().notNull()
})

export const cartTable = sqliteTable('cart', {
    id: int('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
    category: text('categories').notNull(),
    price: int('price').notNull(),
    emoji: text('emoji').notNull(),
    badge: text('badge').notNull(),
    stock: text('stock').notNull(),
    quantity: int('quantity').default(1).notNull()
})