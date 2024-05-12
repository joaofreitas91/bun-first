import Elysia, { t } from 'elysia'
import { auth } from './plugins/auth'
import { db } from '../../db/connection'
import dayjs from 'dayjs'
import { authLinks } from '../../db/schema'
import { eq } from 'drizzle-orm'

export const authenticateFromLink = new Elysia().use(auth).get(
  '/auth-links/authenticate',
  async ({ query, set, signIn }) => {
    const { code, redirect } = query

    const authLinkFromCode = await db.query.authLinks.findFirst({
      where(fields, { eq }) {
        return eq(fields.code, code)
      },
    })

    if (!authLinkFromCode) {
      throw new Error('Auth Link Not Found')
    }

    const daysSinceAuthLinkWasCreated = dayjs().diff(
      authLinkFromCode.createdAt,
      'days',
    )

    if (daysSinceAuthLinkWasCreated > 7) {
      throw new Error('Auth Link Expired')
    }

    const managedRestaurant = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.manangerId, authLinkFromCode.userId)
      },
    })

    signIn({
      sub: authLinkFromCode.userId,
      restaurantID: managedRestaurant?.id,
    })

    await db.delete(authLinks).where(eq(authLinks.code, code))

    set.redirect = redirect
  },
  {
    query: t.Object({
      code: t.String(),
      redirect: t.String(),
    }),
  },
)
