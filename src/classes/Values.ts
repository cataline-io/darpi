import { InferType, Schema } from '@/types'

export interface Value {
  field: string
  type: string
  value: any
}

export interface Watch {
  field: string
  callback: (newValue: any) => void
}

export default class Values<T extends Record<string, any>> {
  private _values: Value[] = []
  private _watchers: Watch[] = []

  constructor(schema: Schema) {
    this._values = Object.keys(schema).map((key) => {
      const rawObject = {
        type: schema[key].validations[0].name.slice(2).toLowerCase(),
        field: key,
        value: null
      }

      return new Proxy(rawObject, {
        set: (target: Value, prop: keyof Value, value) => {
          if (prop === 'value') {
            this._watchers.forEach((watch) => {
              if (watch.field === target.field) {
                watch.callback(value)
              }
            })
          }

          return Reflect.set(target, prop, value)
        }
      })
    })
  }

  public get all() {
    const obj: Record<string, any> = {}

    this._values.forEach(({ field, value }) => {
      obj[field] = value
    })

    return obj as InferType<T>
  }

  public get<Key extends keyof T>(field: Key) {
    const fieldFound = this._values.find((item) => item.field === field)

    return fieldFound?.value as InferType<T>[Key]
  }

  public typeof(field: keyof T) {
    const fieldFound = this._values.find((item) => item.field === field)

    if (!fieldFound) {
      throw new Error('Field not found')
    }

    return fieldFound.type
  }

  public update(fields?: Partial<InferType<T>>) {
    if (!fields) return

    Object.keys(fields).forEach((key) => {
      this.set(key, fields[key]!)
    })
  }

  public set<Key extends keyof T>(field: Key, value: InferType<T>[Key]) {
    const fieldIndex = this._values.findIndex((item) => item.field === field)

    if (fieldIndex < 0) {
      throw new Error(`Field ${field.toString()} not found`)
    }

    const grossValue = <any>value
    const fieldType = this.typeof(field)

    if ([undefined, null].includes(grossValue)) {
      return (this._values[fieldIndex].value = null)
    }

    let newValue: any = grossValue

    if (fieldType === 'string') {
      newValue = grossValue.toString()
    }

    if (fieldType === 'number') {
      newValue = grossValue ? parseFloat(grossValue) : grossValue
    }

    if (fieldType === 'boolean') {
      newValue = JSON.parse(grossValue)
    }

    this._values[fieldIndex].value = newValue
  }

  public watch<Key extends keyof T>(
    field: Key,
    callback: (newValue: InferType<T>[Key]) => void
  ) {
    this._watchers.push({ field: field as any, callback: callback })
  }
}
