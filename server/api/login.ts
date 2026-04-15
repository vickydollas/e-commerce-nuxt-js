import { loginTable } from "../db/schema"
import { useDrizzle } from "../utils/drizzle"
export default defineEventHandler(async (event) => {
    const login = useDrizzle().select().from(loginTable).all()

    return login
})