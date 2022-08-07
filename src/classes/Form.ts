import { Schema, Public, InferType } from '@/types'
import Errors from '@/classes/Errors'
import Values from '@/classes/Values'
import Validations from '@/classes/Validations'

export default class NewForm<T extends Schema> {
  public submitted = false
  public loading = false
  public values: Public<Values<T>>
  public errors: Public<Errors<T>>
  public validations: Public<Validations<T>>

  constructor(schema: T) {
    this.errors = new Errors()
    this.values = new Values(schema)
    this.validations = new Validations(schema, this.errors, this.values)
  }

  public reset(newValues?: Partial<InferType<T>>) {
    Object.keys(this.values.all).forEach((key) => {
      if (newValues?.[key]) {
        this.values.set(key, newValues[key]!)
      } else {
        this.values.set(key, null!)
      }
    })

    this.errors.clearAll()

    this.submitted = false
  }
}
