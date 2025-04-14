export interface ProductInterface {
  isValid: () => boolean
  enable: () => void
  disabled: () => void
  getId: () => string
  getStatus: () => string
  getName: () => string
  getPrice: () => number
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

  getId = () => this._id
  getStatus = () => this._status
  getName = () => this._name
  getPrice = () => this._price
}
