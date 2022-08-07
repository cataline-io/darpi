/* eslint-disable no-use-before-define */
import { baseConfig } from '@/configure'
import { Validation, Formatting } from '@/types'
import StringSchema from '@/rules/string'
import NumberSchema from '@/rules/number'
import ArraySchema from '@/rules/array'
import FileSchema from '@/rules/file'

type Specify<C extends MixedSchema<any>, T> = C extends NumberSchema<any>
  ? NumberSchema<Extract<T, number | undefined>>
  : C extends StringSchema<any>
  ? StringSchema<Extract<T, string | undefined>>
  : C extends ArraySchema<any>
  ? ArraySchema<Extract<T, any[] | undefined>>
  : C extends FileSchema<any>
  ? FileSchema<Extract<T, File | undefined>>
  : MixedSchema<T>

class MixedSchema<T> {
  type!: T
  readonly validations: Validation[] = []
  readonly formattings: Formatting[] = []

  required(message?: string): Specify<this, Exclude<T, undefined>> {
    this.validations.push({
      name: 'required',
      message: message || baseConfig.messages.mixed.required,
      test: (value: any) => {
        if ([null, undefined, ''].includes(value)) {
          return false
        }

        return true
      }
    })

    return this as any
  }

  oneOf<U extends T>(
    arrayOfValues: U[],
    message?: string
  ): Specify<this, U | Extract<undefined, T>> {
    type Params = { arrayOfValues: any[] }

    this.validations.push({
      name: 'oneOf',
      params: { arrayOfValues: arrayOfValues.join(', ') },
      message: message || baseConfig.messages.mixed.oneOf,
      test: (value: any, params: Params) => {
        return params.arrayOfValues.includes(value)
      }
    })

    return this as any
  }

  notIn(arrayOfValues: any[], message?: string) {
    type Params = { arrayOfValues: any[] }

    this.validations.push({
      name: 'notIn',
      params: { arrayOfValues: arrayOfValues.join(', ') },
      message: message || baseConfig.messages.mixed.oneOf,
      test: (value: any, params: Params) => {
        return !params.arrayOfValues.includes(value)
      }
    })

    return this as any
  }

  confirmed(reference: string, message?: string) {
    type Params = {
      reference: string
      values: Record<string, any>
    }

    this.validations.push({
      name: 'confirmed',
      params: { reference },
      message: message || baseConfig.messages.mixed.confirmed,
      test: (value: any, params: Params) => {
        const { reference, values } = params

        if (values[reference] === undefined) {
          console.error('wrong reference for confirmation')

          return false
        }

        return value === values[reference]
      }
    })

    return this
  }

  equal(value: any, message?: string) {
    type Params = {
      value: any
    }

    this.validations.push({
      name: 'equal',
      params: { value },
      message: message || baseConfig.messages.mixed.equal,
      test: (value: any, params: Params) => {
        return value === params.value
      }
    })

    return this
  }

  notEqual(value: any, message?: string) {
    type Params = {
      value: any
    }

    this.validations.push({
      name: 'notEqual',
      params: { value },
      message: message || baseConfig.messages.mixed.notEqual,
      test: (value: any, params: Params) => {
        return value !== params.value
      }
    })

    return this
  }
}

export default MixedSchema
