export interface ProductInterface {
  isValid(): boolean
  enable(): void
  disabled(): void
  updatePrice(price: number): void
}

export interface ProductServiceInterface {
  get(id: string): ProductInterface
  create(id: string, name: string, price: number): ProductInterface
  enable(product: ProductInterface): ProductInterface
  disabled(product: ProductInterface): ProductInterface
}

export interface ProductReader {
  get(id: string): ProductInterface
}

export interface ProductWriter {
  save(product: ProductInterface): ProductInterface
}

export type ProductPersistenceInterface = ProductReader & ProductWriter
