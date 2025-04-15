import { ProductService } from './product-service'
import {
  ProductInterface,
  ProductPersistenceInterface
} from './product.interface'

// Mocked product for testing
const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 100,
  status: 'enabled',
  isValid: jest.fn().mockReturnValue(true),
  enable: jest.fn(),
  disabled: jest.fn(),
  updatePrice: jest.fn()
} as unknown as ProductInterface

// Mock persistence layer
const persistenceMock: ProductPersistenceInterface = {
  get: jest.fn().mockResolvedValue(mockProduct),
  save: jest.fn().mockResolvedValue(undefined)
}

describe('ProductService', () => {
  let service: ProductService

  beforeEach(() => {
    service = new ProductService(persistenceMock)
    jest.clearAllMocks()
  })

  it('should get a product by id', async () => {
    const product = await service.get('1')
    expect(persistenceMock.get).toHaveBeenCalledWith('1')
    expect(product.id).toBe('1')
  })

  it('should throw if product not found', async () => {
    ;(persistenceMock.get as jest.Mock).mockResolvedValueOnce(null)

    await expect(service.get('404')).rejects.toThrow('Product not found')
  })

  it('should create a new product', async () => {
    const product = await service.create('2', 'New Product', 200)
    expect(product.id).toBe('2')
    expect(persistenceMock.save).toHaveBeenCalledWith(product)
  })

  it('should enable a product and save it', async () => {
    const result = await service.enable(mockProduct)
    expect(mockProduct.enable).toHaveBeenCalled()
    expect(persistenceMock.save).toHaveBeenCalledWith(mockProduct)
    expect(result).toBe(mockProduct)
  })

  it('should disable a product and save it', async () => {
    const result = await service.disabled(mockProduct)
    expect(mockProduct.disabled).toHaveBeenCalled()
    expect(persistenceMock.save).toHaveBeenCalledWith(mockProduct)
    expect(result).toBe(mockProduct)
  })
})
