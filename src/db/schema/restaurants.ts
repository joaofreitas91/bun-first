import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'

import { users } from './users'

export const restaurants = pgTable('restaurants', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull().unique(),
  manangerId: text('mananger_id').references(() => users.id, {
    // cascade options
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const restaurantsRelation = relations(restaurants, ({ one }) => {
  return {
    mananger: one(users, {
      fields: [restaurants.manangerId],
      references: [users.id],
      relationName: 'restaurant_user',
    }),
  }
})
