import { cartTable } from "~~/server/db/schema"

export default defineEventHandler(async (event) => {
    const db = useDrizzle()
    try {
        const product = await db.select().from(cartTable)

        return product
    } catch (error) {
        throw createError({ statusCode: 500, message: 'server error'})
    }
})