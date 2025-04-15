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

    await db.run(`
        CREATE TABLE products (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          status TEXT NOT NULL,
          price INTEGER NOT NULL
        )
      `)
  })

  it('should insert a new product using save()', async () => {
    const product = new Product('1', 'New Product', 100)
    const saved = await repo.save(product)

    const rows = await db.select().from(products)
    expect(rows.length).toBe(1)
    expect(rows[0].name).toBe('New Product')
    expect(saved).toEqual(product)
  })

  it('should update an existing product using save()', async () => {
    await db.insert(products).values({
      id: 1,
      name: 'Old',
      price: 50,
      status: 'disabled'
    })

    const product = new Product('1', 'Updated', 150, 'enabled')
    await repo.save(product)

    const updated = await db.select().from(products).where(eq(products.id, 1))
    expect(updated[0].name).toBe('Updated')
    expect(updated[0].price).toBe(150)
    expect(updated[0].status).toBe('enabled')
  })

  it('should insert a product using insert()', async () => {
    const product = new Product('2', 'Inserted Product', 200)
    await repo.insert(product)

    const result = await db.select().from(products).where(eq(products.id, 2))
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Inserted Product')
  })

  it('should update a product using update()', async () => {
    await db.insert(products).values({
      id: 3,
      name: 'To be updated',
      price: 90,
      status: 'disabled'
    })

    const product = new Product('3', 'Now Updated', 120, 'enabled')
    await repo.update(product)

    const result = await db.select().from(products).where(eq(products.id, 3))
    expect(result[0].name).toBe('Now Updated')
    expect(result[0].price).toBe(120)
    expect(result[0].status).toBe('enabled')
  })

  it('should return product from get()', async () => {
    await db.insert(products).values({
      id: 4,
      name: 'Get This',
      price: 80,
      status: 'enabled'
    })

    const product = await repo.get('4')
    expect(product.name).toBe('Get This')
    expect(product.price).toBe(80)
    expect(product.status).toBe('enabled')
  })

  it('should throw if get() fails', async () => {
    await expect(repo.get('999')).rejects.toThrow('Product not found')
  })

  it('should return row from getById()', async () => {
    await db.insert(products).values({
      id: 5,
      name: 'Row Only',
      price: 60,
      status: 'enabled'
    })

    const result = await repo.getById('5')
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Row Only')
  })
})
