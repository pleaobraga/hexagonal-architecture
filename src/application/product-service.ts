import { Product } from './product'
import {
  ProductInterface,
  ProductPersistenceInterface,
  ProductServiceInterface
} from './product.interface'

export class ProductService implements ProductServiceInterface {
  constructor(private readonly persistence: ProductPersistenceInterface) {}

  async get(id: string): Promise<ProductInterface> {
    const product = await this.persistence.get(id)
    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }

  async create(
    id: string,
    name: string,
    price: number
  ): Promise<ProductInterface> {
    const product = new Product(id, name, price)
    await this.persistence.save(product)

    return product
  }

  async enable(product: ProductInterface): Promise<ProductInterface> {
    product.enable()
    await this.persistence.save(product)
    return product
  }

  async disabled(product: ProductInterface): Promise<ProductInterface> {
    product.disabled()
    await this.persistence.save(product)
    return product
  }
}
