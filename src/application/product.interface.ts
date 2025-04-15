export interface ProductInterface {
  id: string
  name: string
  status: string
  price: number
  isValid(): boolean
  enable(): void
  disabled(): void
  updatePrice(price: number): void
}

export interface ProductServiceInterface {
  get(id: string): Promise<ProductInterface>
  create(id: string, name: string, price: number): Promise<ProductInterface>
  enable(product: ProductInterface): Promise<ProductInterface>
  disabled(product: ProductInterface): Promise<ProductInterface>
}

export interface ProductReader {
  get(id: string): Promise<ProductInterface>
}

export interface ProductWriter {
  save(product: ProductInterface): Promise<ProductInterface>
}

export type ProductPersistenceInterface = ProductReader & ProductWriter
