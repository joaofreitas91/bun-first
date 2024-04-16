/* eslint-disable drizzle/enforce-delete-with-where */

import { faker } from '@faker-js/faker'
import { db } from './connection'
import { users, restaurants } from './schema'
import chalk from 'chalk'

/**
 * On create a seed:
 * Reset BD
 * Create data
 */

/**
 * Reset DB
 */
await db.delete(users)
await db.delete(restaurants)

console.log(chalk.yellow('✔️ Reseted DB'))

/**
 * Create users
 */
await db.insert(users).values([
  {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    role: 'customer',
  },
  {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    role: 'customer',
  },
])

console.log(chalk.yellow('✔️ Created users'))

/**
 * Create mananger
 */
const [mananger] = await db
  .insert(users)
  .values([
    {
      name: faker.person.firstName(),
      email: 'admin@admin.com',
      role: 'mananger',
    },
  ])
  .returning({
    id: users.id,
  })

console.log(chalk.yellow('✔️ Created mananger'))

/**
 * Create restaurant
 */

await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    manangerId: mananger.id,
  },
])

console.log(chalk.yellow('✔️ Created restaurant'))

console.log(chalk.greenBright('Database seeded successfuly!'))
process.exit()
