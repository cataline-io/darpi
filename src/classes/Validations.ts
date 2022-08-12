import { Schema, Public, InferType, CustomValidation } from '@/types'
import Errors from '@/classes/Errors'
import Values from '@/classes/Values'
import { interpolate } from '@/utils'
import { baseConfig } from '@/configure'

type events = 'onInput' | 'onBlur' | 'onChange' | 'onSubmitted'

export interface Options {
  field: string
  lazy: boolean
}

export interface RunOptions<T> {
  onField?: keyof T & string
  lazy?: boolean
  hasConfig?: events[]
}

export default class Validations<T extends Record<string, any>> {
  private values: Public<Values<T>>
  private errors: Public<Errors<T>>
  private schema: Schema = {}
  private customValidations: CustomValidation[] = []

  constructor(
    schema: Schema,
    errors: Public<Errors<T>>,
    values: Public<Values<T>>
  ) {
    this.schema = schema
    this.errors = errors
    this.values = values
  }

  public async run(options?: RunOptions<T>) {
    const { hasConfig = [], lazy = false, onField } = options || {}
    const configMatch = hasConfig.some((event) => baseConfig.validate[event])

    if (hasConfig.length >= 1 && !configMatch) return

    if (onField) {
      await this._handleField({ field: onField, lazy })
    } else {
      const exec = Object.keys(this.schema).map(async (field) => {
        return await this._handleField({ field, lazy })
      })

      await Promise.all(exec)
    }
  }

  private async _handleField({ field, lazy }: Options) {
    this._runDarpiValidations(field)

    if (!this.errors.hasAny) {
      this._runDarpiFormattings(field)

      await this._runCustomValidations({ field, lazy })
    }
  }

  private _runDarpiValidations(field: string) {
    const value = <any>this.values.get(field)
    const { validations } = this.schema[field]
    const isRequired = validations.some(({ name }) => name === 'required')
    const valueIsNull = ['', null, undefined].includes(value)

    this.errors.clearOf(field)

    if (!isRequired && valueIsNull) return

    validations.forEach((validation, index) => {
      if (validation.name === 'required') {
        validations.splice(index, 1)
        validations.unshift(validation)
      }
    })

    validations.forEach((validation) => {
      const { name, message, params, test } = validation

      const error = {
        field,
        validation: name,
        message: interpolate(message, { field, ...params })
      }

      if (valueIsNull) {
        return this.errors.add(error)
      }

      const isValid = test(value, { ...params, values: this.values.all })

      if (!isValid) {
        this.errors.add(error)
      }
    })
  }

  private _runDarpiFormattings(field: string) {
    const formattings = this.schema[field].formattings
    const value = this.values.get(field)

    formattings.map((formatting) => {
      const { params, format } = formatting
      this.values.set(field, format(value, params))
    })
  }

  private async _runCustomValidations(options: Options) {
    const toValidate = this.customValidations.filter((validation) => {
      return validation.field === options.field
    })

    const promises = toValidate.map(async (validation) => {
      const value = this.values.get(validation.field)
      const result = await validation.test(value)

      if (result !== true) {
        this.errors.add({
          field: validation.field,
          validation: validation.name,
          message: result
        })
      }
    })

    await Promise.all(promises)
  }

  public add<Key extends keyof T>(
    field: Key,
    validation: (
      value: InferType<T>[Key]
    ) => string | true | Promise<string | true>,
    options: { lazy: boolean } = { lazy: false }
  ) {
    this.customValidations.push({
      name: validation.name || 'customValidation',
      field: field as string,
      test: validation,
      lazy: options.lazy
    })
  }
}
