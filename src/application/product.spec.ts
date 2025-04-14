import { Product } from './product'

describe('Product', () => {
  it('Should enable product', () => {
    const product = new Product('1', 'Product 1', 12)

    product.enable()

    expect(product.getStatus()).toBe('enabled')
  })
})
