import { cartTable } from "~~/server/db/schema"
// import type { ProductType } from "~~/types/addToCart"

export default defineEventHandler(async (event) => {
    const db = useDrizzle()
    try {
        const product = await db.select().from(cartTable)

        return product
    } catch (error) {
        throw createError({ statusCode: 500, message: 'server error'})
    }
})