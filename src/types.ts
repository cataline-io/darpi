import MixedSchema from '@/rules/mixed'
import Form from '@/classes/Form'

export type InferType<T> = {
  [P in keyof T]: T[P] extends MixedSchema<infer TS> ? TS : any
}

export interface CustomValidation {
  name: string
  field: string
  test: (value: any) => string | true | Promise<string | true>
  lazy: boolean
}

export interface Messages {
  mixed: {
    required: string
    confirmed: string
    oneOf: string
    notIn: string
    equal: string
    notEqual: string
  }
  string: {
    isString: string
    email: string
    url: string
    length: string
    minLength: string
    maxLength: string
    minWords: string
    maxWords: string
    first: string
    last: string
    onlyNumbers: string
    notOnlyNumbers: string
    cpf: string
  }
  number: {
    isNumber: string
    length: string
    min: string
    max: string
    positive: string
    negative: string
    between: string
  }
  boolean: {
    isBoolean: string
  }
  array: {
    isArray: string
    minLength: string
    maxLength: string
  }
  file: {
    isFile: string
    extnames: string
    size: string
  }
}

export interface Validation {
  name: string
  message: string
  params?: Record<string, any>
  test: (value: any, params?: any) => boolean
}

export interface Formatting {
  name: string
  params?: Record<string, any>
  format: (value: any, params?: any) => any
}

export interface Schema {
  [key: string]: {
    validations: Validation[]
    formattings: Formatting[]
  }
}

export interface Config {
  locale: 'en' | 'ptBR'
  messages: Messages
  theme?: 'light' | 'dark'
  validate: {
    onSubmitted: boolean
    onChange: boolean
    onInput: boolean
    onBlur: boolean
  }
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export interface NewConfig
  extends Partial<Omit<Config, 'messages' | 'validate'>> {
  messages?: DeepPartial<Config['messages']>
  validate?: DeepPartial<Config['validate']>
}

export type Public<T> = {
  [P in keyof T]: T[P]
}

export type FormPublic = Public<Form<Record<string, any>>>

export type InputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'

export type As =
  | 'input'
  | 'textarea'
  | 'radio-group'
  | 'checkbox'
  | 'select'
  | 'switch'
  | 'file'
