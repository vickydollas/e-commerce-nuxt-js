import { compare } from "bcrypt-ts"
import { eq } from "drizzle-orm"
import jwt from "jsonwebtoken"

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

    const db = useDrizzle()
    const user = await db.select().from(tables.loginTable).where(eq(tables.loginTable.username, username)).limit(1).get()
    if (!user) {
        throw createError({
            statusCode: 404,
            message: 'user proflle not found'
        })
    }
    if (!(await compare(password, user.password))) {
        throw createError({
            statusCode: 401,
            message: 'Login denied'
        })
    }
    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_PRIVATE!, {
        algorithm: 'HS256',
        expiresIn: '24h'
    })

    return { token }
})