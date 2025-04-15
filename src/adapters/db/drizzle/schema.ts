import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core'

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  status: text('status').notNull(),
  price: integer('price').notNull()
})
