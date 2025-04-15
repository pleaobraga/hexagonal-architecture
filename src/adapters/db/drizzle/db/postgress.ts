import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from '../schema'
import { env } from '../../../../env'

// Initialize PostgreSQL pool connection
export const client = new Pool({
  connectionString: env.DATABASE_URL
})

export const db = drizzle(client, { schema, logger: env.ENV === 'dev' })

export { schema }
