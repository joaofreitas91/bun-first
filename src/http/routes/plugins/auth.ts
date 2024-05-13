import Elysia, { t, type Static } from 'elysia'
import jwt from '@elysiajs/jwt'

import { env } from '../../../env'

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    }),
  )
  .derive({ as: 'scoped' }, ({ jwt, cookie: { authToken } }) => {
    return {
      signIn: async (payload: Static<typeof jwtPayload>) => {
        const token = await jwt.sign({
          sub: payload.sub,
          restaurantId: payload.restaurantId,
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

      getCurrentUser: async () => {
        const token = await jwt.verify(authToken.value)

        if (!token) {
          throw new Error('Not authorized')
        }

        return {
          userId: token.sub,
          restaurantID: token.restaurantId,
        }
      },
    }
  })
