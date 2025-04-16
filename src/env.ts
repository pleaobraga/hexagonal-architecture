import { z } from 'zod'

const envSchema = z.object({
  ENV: z.enum(['dev', 'test', 'prod']).default('prod'),
  DATABASE_URL: z.string().url(),
  APP_PORT: z.string()
})

export const env = envSchema.parse(process.env)
