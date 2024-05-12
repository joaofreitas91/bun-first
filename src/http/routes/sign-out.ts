import Elysia from 'elysia'
import { auth } from './plugins/auth'
import { env } from '../../env'

export const signOut = new Elysia()
  .use(auth)
  .get('/sign-out', async ({ signOut, set }) => {
    signOut()

    set.redirect = env.REDIRECTION_URL
  })
