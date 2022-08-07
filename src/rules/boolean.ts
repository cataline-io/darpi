import MixedSchema from '@/rules/mixed'
import { baseConfig } from '@/configure'

class BooleanSchema<T extends boolean | undefined> extends MixedSchema<T> {
  constructor(message?: string) {
    super()

    this.isBoolean(message)
  }

  private isBoolean(message?: string) {
    this.validations.push({
      name: 'isBoolean',
      message: message || baseConfig.messages.boolean.isBoolean,
      test: (value: unknown) => {
        return typeof value === 'boolean'
      }
    })
  }
}

export default BooleanSchema
