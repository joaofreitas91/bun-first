import { text, timestamp, pgTable, pgEnum } from "drizzle-orm/pg-core";
import { createId } from '@paralleldrive/cuid2'

export const userRoleEnum = pgEnum("user_role", ["mananger", "customer"])

export const user = pgTable("user", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  phone: text("phone"),
  role: userRoleEnum('role').default('customer').notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});