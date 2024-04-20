import { Elysia, t } from 'elysia'
import jwt from '@elysiajs/jwt'
import cookie from '@elysiajs/cookie'

import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'

import { env } from '../env'

const app = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: t.Object({
        sub: t.String(),
        restaurantID: t.Optional(t.String()),
      }),
    }),
  )
  .use(cookie())
  .use(registerRestaurant)
  .use(sendAuthLink)

const port = env.PORT || 3333

app.listen(port, () => {
  console.log(`🔥 HTTP Server Running with BUN on port ${port}`)
})
