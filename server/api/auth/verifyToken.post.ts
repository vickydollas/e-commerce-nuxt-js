import jwt from "jsonwebtoken"
import type { jwtUserInfo } from "~~/types/addToCart"

export default defineEventHandler(async (event) => {
    const { token } = await readBody(event)

    if (!token) {
        throw createError({ statusCode: 400})
    }
    const user = jwt.verify(token, process.env.JWT_PRIVATE!) as jwtUserInfo
    if(user){
        return {
            success: true,
            user
        }
    }
    throw createError({statusCode: 401})
})