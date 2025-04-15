import { ProductDB, postgresDb } from './adapters/db/drizzle'
import { ProductService } from './application/product-service'

const productDB = new ProductDB(postgresDb)
const productService = new ProductService(productDB)


