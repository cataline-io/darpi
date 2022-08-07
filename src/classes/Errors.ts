export interface Error {
  validation: string
  field: string
  message: string
}

export default class Errors<T> {
  private _errors: Error[] = []

  public get all() {
    return this._errors
  }

  public get hasAny() {
    return this._errors.length > 0
  }

  public hasAnyIn(field: keyof T & string) {
    return this._errors.some((error) => error.field === field)
  }

  public firstOf(field: keyof T & string) {
    return this._errors.find((error) => error.field === field)
  }

  public clearAll() {
    this._errors = []
  }

  public clearOf(field: keyof T & string) {
    this._errors = this._errors.filter((error) => {
      return error.field !== field && error.validation
    })
  }

  public add(newError: Error) {
    const errorAlreadyExists = this._errors.some(({ field, validation }) => {
      return field === newError.field && validation === newError.validation
    })

    if (!errorAlreadyExists) {
      this._errors.push(newError)
    }
  }
}
