import { Elysia } from 'elysia'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'
import { env } from '../env'

const app = new Elysia().use(registerRestaurant).use(sendAuthLink)
const port = env.PORT || 3333

app.listen(port, () => {
  console.log(`🔥 HTTP Server Running with BUN on port ${port}`)
})
