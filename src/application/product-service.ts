import { Product } from "./product"
import { ProductInterface, ProductPersistenceInterface, ProductServiceInterface } from "./product.interface"

export class ProductService implements ProductServiceInterface {
  constructor(private readonly persistence: ProductPersistenceInterface) {}

  get(id: string): ProductInterface {
    return this.persistence.get(id)
  }

  create(id: string, name: string, price: number): ProductInterface {
    const product = new Product(id, name, price)
    return this.persistence.save(product)
  }

  enable(product: ProductInterface): ProductInterface {
    product.enable()
    return this.persistence.save(product)
  }

  disabled(product: ProductInterface): ProductInterface {
    product.disabled()
    return this.persistence.save(product)
  }
}
