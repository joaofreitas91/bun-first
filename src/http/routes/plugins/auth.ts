import Elysia, { t } from 'elysia'
import jwt from '@elysiajs/jwt'

import { env } from '../../../env'

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: t.Object({
        sub: t.String(),
        restaurantID: t.Optional(t.String()),
      }),
    }),
  )
  .derive({ as: 'scoped' }, ({ jwt, cookie: { authToken } }) => {
    return {
      signIn: async (userId: string, restaurantID: string | undefined) => {
        const token = await jwt.sign({
          sub: userId,
          restaurantID,
        })

        authToken.value = token

        authToken.set({
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        })
      },

      signOut: () => {
        authToken.remove()
      },
    }
  })
