import { Product } from './product'

describe('Product', () => {
  it('Should be able to enable a product', () => {
    const product = new Product('1', 'Product 1', 12)

    product.enable()

    expect(product.status).toBe('enabled')
  })

  it('Should not be able to enable a product', () => {
    const product = new Product('1', 'Product 1', 10)

    product.updatePrice(0)

    expect(() => product.enable()).toThrow()
  })

  it('Should be able to disable a product', () => {
    const product = new Product('1', 'Product 1', 12)

    product.enable()
    product.disabled()

    expect(product.status).toBe('disabled')
  })

  it('should return true for a valid product', () => {
    const product = new Product('1', 'Product 1', 10)
    expect(product.isValid()).toBe(true)
  })

  it('should throw if id is empty', () => {
    expect(() => new Product('', 'Product 1', 10)).toThrow(
      'The id cannot be empty'
    )
  })

  it('should throw if name is empty', () => {
    expect(() => new Product('1', '', 10)).toThrow('The name cannot be empty')
  })

  it('should throw if price is negative', () => {
    expect(() => new Product('1', 'Product 1', -1)).toThrow(
      'The price must be greater or equal to zero'
    )
  })

  it('should throw if status is invalid', () => {
    const product = new Product('1', 'Product 1', 10)
    // @ts-ignore - force invalid status for test
    product['_status'] = 'invalid'
    expect(() => product.isValid()).toThrow(
      'The status must be enabled or disabled'
    )
  })

  it('should return the correct id', () => {
    const product = new Product('123', 'Test Product', 99)
    expect(product.id).toBe('123')
  })

  it('should return the correct name', () => {
    const product = new Product('123', 'Test Product', 99)
    expect(product.name).toBe('Test Product')
  })

  it('should return the correct price', () => {
    const product = new Product('123', 'Test Product', 99)
    expect(product.price).toBe(99)
  })

  it('should return the default status as disabled', () => {
    const product = new Product('123', 'Test Product', 99)
    expect(product.status).toBe('disabled')
  })
})
