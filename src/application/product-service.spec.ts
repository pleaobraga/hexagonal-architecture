import { Product } from './product'
import { ProductService } from './product-service'

describe('ProductService', () => {
  it('should get a product by id', () => {
    const mockPersistence = {
      get: jest
        .fn()
        .mockReturnValue({ id: '1', name: 'Test Product', price: 100 }),
      save: jest.fn()
    }
    const productService = new ProductService(mockPersistence)
    const product = productService.get('1')
    expect(product).toEqual({ id: '1', name: 'Test Product', price: 100 })
    expect(mockPersistence.get).toHaveBeenCalledWith('1')
  })

  it('should create a new product', () => {
    const newProduct = new Product('1', 'Test Product', 100)

    const mockPersistence = {
      get: jest.fn(),
      save: jest
        .fn()
        .mockReturnValue({ id: '1', name: 'Test Product', price: 100 })
    }
    const productService = new ProductService(mockPersistence)
    const product = productService.create('1', 'Test Product', 100)
    expect(product).toEqual({ id: '1', name: 'Test Product', price: 100 })
    expect(mockPersistence.save).toHaveBeenCalledWith(newProduct)
  })
})
