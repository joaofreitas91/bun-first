import { Elysia } from 'elysia'

import { env } from '../env'

import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'
import { getCurrentUser } from './routes/get-current-user'
import { getManagedRestaurant } from './routes/get-managed-restaurant'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getCurrentUser)
  .use(getManagedRestaurant)
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status

        return error.toResponse()
      }

      default: {
        console.error(error)

        return new Response(null, { status: 500 })
      }
    }
  })

const port = env.PORT || 3333

app.listen(port, () => {
  console.log(`🔥 HTTP Server Running with BUN on port ${port}`)
})
