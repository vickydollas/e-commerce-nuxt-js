import { hash } from "bcrypt-ts"
// import { loginTable } from "~~/server/db/schema"
// import { tables, useDrizzle } from "~~/server/utils/drizzle"

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event)

    if (!(username && password)) {
        throw createError({
            statusCode: 400,
            message: 'Username and password must be provided'
        })
    }

    const hashedPassword = await hash(password, 8)
    const db = useDrizzle()
    const inserResult = await db.insert(tables.loginTable).values({
        username: username,
        password: hashedPassword
    }).returning()
    return inserResult
})