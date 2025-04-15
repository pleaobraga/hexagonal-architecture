import { eq } from 'drizzle-orm'

import { client, db } from './db'
import { products } from './schema'

async function seed() {
  // Optional: check if already seeded
  const exists = await db
    .select()
    .from(products)
    .where(eq(products.id, 'prod-1'))
  if (exists.length > 0) {
    console.log('Seed already exists, skipping...')
    await client.end()
    return
  }

  await db.insert(products).values([
    { id: 'prod-1', name: 'Product A', status: 'enabled', price: 100 },
    { id: 'prod-2', name: 'Product B', status: 'disabled', price: 150 },
    { id: 'prod-3', name: 'Product C', status: 'enabled', price: 200 }
  ])

  console.log('✅ Seed complete')
  await client.end()
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  client.end()
})
