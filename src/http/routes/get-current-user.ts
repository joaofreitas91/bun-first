import Elysia from 'elysia'
import { auth } from './plugins/auth'
import { db } from '../../db/connection'
import { UnauthorizedError } from '../../error/unauthorized-error'

export const getCurrentUser = new Elysia()
  .use(auth)
  .get('/me', async ({ getCurrentUser }) => {
    const { userId } = await getCurrentUser()

    const user = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, userId)
      },
    })

    if (!user) {
      throw new UnauthorizedError()
    }

    return user
  })
