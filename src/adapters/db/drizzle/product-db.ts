import { eq } from 'drizzle-orm'

import * as schema from './schema'

import {
  ProductInterface,
  ProductPersistenceInterface
} from '../../../application/product.interface'
import { Product } from '../../../application/product'

// Generic type for the db instance (works for both Postgres and SQLite)
type DrizzleDB = {
  select: any
  insert: any
  update: any
  delete: any
  [key: string]: any
}

export class ProductDB implements ProductPersistenceInterface {
  constructor(private readonly db: DrizzleDB) {}

  async getById(id: string): Promise<any[]> {
    const result = await this.db
      .select()
      .from(schema.products)
      .where(eq(schema.products.id, id))
      .limit(1)

    return result
  }

  async get(id: string): Promise<ProductInterface> {
    const result = await this.getById(id)

    if (result.length !== 1) throw new Error('Product not found')

    const row = result[0]

    return new Product(row.id.toString(), row.name, row.price, row.status)
  }

  async update(product: ProductInterface): Promise<void> {
    await await this.db
      .update(schema.products)
      .set({
        name: product.name,
        price: product.price,
        status: product.status
      })
      .where(eq(schema.products.id, product.id))
  }

  async insert(product: ProductInterface): Promise<void> {
    await this.db.insert(schema.products).values({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      status: product.status
    })
  }

  async save(product: ProductInterface): Promise<ProductInterface> {
    const exists = await this.getById(product.id)

    if (exists.length) {
      await this.update(product)
    } else {
      await this.insert(product)
    }

    return product
  }
}
