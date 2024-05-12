import { Elysia } from 'elysia'

import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'

import { env } from '../env'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)

const port = env.PORT || 3333

app.listen(port, () => {
  console.log(`🔥 HTTP Server Running with BUN on port ${port}`)
})
