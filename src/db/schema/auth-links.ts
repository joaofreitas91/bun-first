import { text, pgTable, numeric, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { users } from './users'

export const authLinks = pgTable('auth_links', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  code: numeric('code').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: text('user_id')
    .references(() => users.id)
    .unique()
    .notNull(),
})
