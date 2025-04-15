import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { eq } from 'drizzle-orm'
import { products } from './schema'
import { ProductPersistence } from './product-persistence'
import { Product } from '../../../application/product'

// Utility: create fresh in-memory db for each test
function createTestDb() {
  const sqlite = new Database(':memory:')
  return drizzle(sqlite, { schema: { products } })
}

describe('ProductPersistence', () => {
  let db: ReturnType<typeof createTestDb>
  let repo: ProductPersistence

  beforeEach(async () => {
    db = createTestDb()
    repo = new ProductPersistence(db)

    // Create table manually since we're not using migrations here
    await db.run(
      `CREATE TABLE products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        price INTEGER NOT NULL
      )`
    )
  })

  it('should save a new product', async () => {
    const product = new Product('1', 'Test Product', 100)
    const saved = await repo.save(product)

    const rows = await db.select().from(products)
    expect(rows.length).toBe(1)
    expect(rows[0].name).toBe('Test Product')
    expect(saved).toEqual(product)
  })

  it('should update an existing product', async () => {
    await db.insert(products).values({
      id: 1,
      name: 'Old Name',
      price: 50,
      status: 'disabled'
    })

    const product = new Product('1', 'Updated Name', 150, 'enabled')
    await repo.save(product)

    const updated = await db.select().from(products).where(eq(products.id, 1))
    expect(updated[0].name).toBe('Updated Name')
    expect(updated[0].price).toBe(150)
    expect(updated[0].status).toBe('enabled')
  })

  it('should get a product by id', async () => {
    await db.insert(products).values({
      id: 1,
      name: 'Get Me',
      price: 80,
      status: 'enabled'
    })

    const result = await repo.get('1')
    expect(result.name).toBe('Get Me')
    expect(result.price).toBe(80)
  })

  it('should throw if product not found', async () => {
    await expect(repo.get('999')).rejects.toThrow('Product not found')
  })
})
