import { baseConfig } from '@/configure'
import MixedSchema from '@/rules/mixed'

class NumberSchema<T extends number | undefined> extends MixedSchema<T> {
  constructor(message?: string) {
    super()

    this.isNumber(message)
  }

  private isNumber(message?: string) {
    this.validations.push({
      name: 'isNumber',
      message: message || baseConfig.messages.number.isNumber,
      test: (value: unknown) => {
        return typeof value === 'number'
      }
    })
  }

  min(min: number, message?: string) {
    type Params = { min: number }

    this.validations.push({
      name: 'min',
      params: { min },
      message: message || baseConfig.messages.number.min,
      test: (value: number, params: Params) => {
        return value >= params.min
      }
    })

    return this
  }

  max(max: number, message?: string) {
    type Params = { max: number }

    this.validations.push({
      name: 'max',
      params: { max },
      message: message || baseConfig.messages.number.max,
      test: (value: number, params: Params) => {
        return value <= params.max
      }
    })

    return this
  }

  positive(message?: string) {
    this.validations.push({
      name: 'positive',
      message: message || baseConfig.messages.number.positive,
      test: (value: number) => {
        return value > 0
      }
    })

    return this
  }

  negative(message?: string) {
    this.validations.push({
      name: 'negative',
      message: message || baseConfig.messages.number.negative,
      test: (value: number) => {
        return value < 0
      }
    })

    return this
  }

  between(min: number, max: number, message?: string) {
    type Params = {
      min: number
      max: number
    }

    this.validations.push({
      name: 'between',
      params: { min, max },
      message: message || baseConfig.messages.number.between,
      test: (value: number, params: Params) => {
        return value >= params.min && value <= params.max
      }
    })

    return this
  }

  round(type: 'toUp' | 'toDown' | 'closer') {
    type Params = {
      type: 'toUp' | 'toDown' | 'closer'
    }

    this.formattings.push({
      name: 'round',
      params: { type },
      format: (value: number, params: Params) => {
        const { type } = params

        if (type === 'toDown') return Math.floor(value)
        if (type === 'toUp') return Math.ceil(value)
        if (type === 'closer') return Math.round(value)
      }
    })

    return this
  }

  length(length: number, message?: string) {
    type Params = { length: number }

    this.validations.push({
      name: 'length',
      params: { length },
      message: message || baseConfig.messages.number.length,
      test: (value: number, { length }: Params) => {
        return value.toString().length === length
      }
    })

    return this
  }
}

export default NumberSchema
