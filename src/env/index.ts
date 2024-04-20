import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().min(4),
  API_BASE_URL: z.string().url().min(1),
  REDIRECTION_URL: z.string().url().min(1),
  DATABASE_URL: z.string().url().min(1),
})

export const env = envSchema.parse(process.env)
