import { z } from 'zod'

const envSchema = z.object({
  ENV: z.enum(['dev', 'test', 'prod']).default('prod'),
  DATABASE_URL: z.string().url(),
  REST_PORT: z.string(),
  GRAPHQL_PORT: z.string()
})

export const env = envSchema.parse(process.env)
