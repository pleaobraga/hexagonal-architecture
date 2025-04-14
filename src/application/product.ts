export interface ProductInterface {
  isValid: () => boolean
  enable: () => void
  disabled: () => void
  getId: () => string
  getStatus: () => string
  getName: () => string
  getPrice: () => number
  updatePrice: (price: number) => void
}

const STATUS = {
  DISABLED: 'disabled',
  ENABLED: 'enabled'
} as const

export class Product implements ProductInterface {
  private _id: string
  private _name: string
  private _status: string
  private _price: number

  constructor(id: string, name: string, price: number) {
    this._id = id
    this._name = name
    this._price = price
    this._status = STATUS.DISABLED
    this.isValid()
  }

  isValid = () => {
    if (!this._status) {
      this._status = STATUS.DISABLED
    }

    if (this._status !== STATUS.DISABLED && this._status !== STATUS.ENABLED) {
      throw new Error('The status must be enabled or disabled')
    }

    if (!this._price || this._price < 0) {
      throw new Error('The price must be greater or equal to zero')
    }

    if (!this._name) {
      throw new Error('The name cannot be empty')
    }

    if (!this._id) {
      throw new Error('The id cannot be empty')
    }

    return true
  }

  enable = () => {
    if (this._price === 0) {
      throw new Error(
        'The price must be greater than zero to enable the product'
      )
    }

    this._status = STATUS.ENABLED
  }

  disabled = () => {
    this._status = STATUS.DISABLED
  }

  updatePrice = (price: number) => {
    this._price = price
  }

  getId = () => this._id
  getStatus = () => this._status
  getName = () => this._name
  getPrice = () => this._price
}
