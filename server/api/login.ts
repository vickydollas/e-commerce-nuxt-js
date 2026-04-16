// import { loginTable } from "../db/schema"
// import { useDrizzle } from "../utils/drizzle"

const table = ['yessss', 'nooooo', 'bokooo', 'budyyy']
export default defineEventHandler(async (event) => {
    // const login = useDrizzle().select().from(loginTable).all()

    return table
})