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

export class ProductPersistence implements ProductPersistenceInterface {
  constructor(private readonly db: DrizzleDB) {}

  async get(id: string): Promise<ProductInterface> {
    const result = await this.db
      .select()
      .from(schema.products)
      .where(eq(schema.products.id, Number(id)))
      .limit(1)

    const row = result[0]

    if (!row) throw new Error('Product not found')

    return new Product(row.id.toString(), row.name, row.price, row.status)
  }

  async save(product: ProductInterface): Promise<ProductInterface> {
    const exists = await this.db
      .select({ id: schema.products.id })
      .from(schema.products)
      .where(eq(schema.products.id, Number(product.id)))
      .limit(1)

    if (exists.length) {
      await this.db
        .update(schema.products)
        .set({
          name: product.name,
          price: product.price,
          status: product.status
        })
        .where(eq(schema.products.id, Number(product.id)))
    } else {
      await this.db.insert(schema.products).values({
        id: Number(product.id),
        name: product.name,
        price: product.price,
        status: product.status
      })
    }

    return product
  }
}
