import Elysia from 'elysia'
import { auth } from './plugins/auth'
import { db } from '../../db/connection'

export const getManagedRestaurant = new Elysia()
  .use(auth)
  .get('/managed-restaurant', async ({ getCurrentUser }) => {
    const { restaurantID } = await getCurrentUser()

    if (!restaurantID) {
      throw new Error('User is not a mananger')
    }

    const managedRestaurant = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, restaurantID)
      },
    })

    if (!managedRestaurant) {
      throw new Error('User not found')
    }

    return managedRestaurant
  })
