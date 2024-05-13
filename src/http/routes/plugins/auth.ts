import Elysia, { t, type Static } from 'elysia'
import jwt from '@elysiajs/jwt'

import { env } from '../../../env'
import { UnauthorizedError } from '../../../error/unauthorized-error'

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .error({
    UNAUTHORIZED: UnauthorizedError,
  })
  .onError(({ error, code, set }) => {
    switch (code) {
      case 'UNAUTHORIZED': {
        set.status = 401
        return { code, message: error.message }
      }
    }
  })
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
          throw new UnauthorizedError()
        }

        return {
          userId: token.sub,
          restaurantID: token.restaurantId,
        }
      },
    }
  })
