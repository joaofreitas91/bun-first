import Elysia, { t } from 'elysia'
import { db } from '../../db/connection'
import { users, restaurants } from '../../db/schema'

export const registerRestaurant = new Elysia().post(
  '/restaurants',
  async ({ body, set }) => {
    const {
      restaurantName,
      restaurantDescription,
      manangerName,
      manangerPhone,
      manangerEmail,
    } = body

    const [manangerId] = await db
      .insert(users)
      .values({
        name: manangerName,
        phone: manangerPhone,
        email: manangerEmail,
        role: 'mananger',
      })
      .returning({
        id: users.id,
      })

    await db.insert(restaurants).values({
      manangerId: manangerId.id,
      name: restaurantName,
      description: restaurantDescription,
    })

    set.status = 204
  },
  {
    body: t.Object({
      restaurantName: t.String(),
      restaurantDescription: t.String(),
      manangerName: t.String(),
      manangerPhone: t.String(),
      manangerEmail: t.String(),
    }),
  },
)
