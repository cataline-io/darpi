import MixedSchema from '@/rules/mixed'
import { baseConfig } from '@/configure'

class ArraySchema<T extends any[] | undefined> extends MixedSchema<T> {
  constructor(message?: string) {
    super()

    this.isArray(message)
  }

  private isArray(message?: string) {
    this.validations.push({
      name: 'isArray',
      message: message || baseConfig.messages.array.isArray,
      test: (value: any) => {
        return value.constructor.name === 'Array'
      }
    })
  }

  minLength(minLength: number, message?: string) {
    type Params = { minLength: number }

    this.validations.push({
      name: 'minLength',
      params: { minLength },
      message: message || baseConfig.messages.array.minLength,
      test: (value: [], { minLength }: Params) => {
        return value.length >= minLength
      }
    })

    return this
  }

  maxLength(maxLength: number, message?: string) {
    type Params = { maxLength: number }

    this.validations.push({
      name: 'maxLength',
      params: { maxLength },
      message: message || baseConfig.messages.array.maxLength,
      test: (value: [], { maxLength }: Params) => {
        return value.length <= maxLength
      }
    })

    return this
  }
}

export default ArraySchema
