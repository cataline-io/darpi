import { Messages } from '@/types'

const messages: Messages = {
  mixed: {
    required: 'Required field',
    oneOf: 'The value must be one of {arrayOfValues}',
    notIn: 'The value cannot be one of these:: {arrayOfValues}',
    confirmed: '{field} must be equal to {reference}',
    equal: 'Must be qual to {value}',
    notEqual: 'Cannot be equal to {value}'
  },
  string: {
    isString: 'The value must be string',
    email: 'Enter a valid e-mail',
    url: 'Enter a valid URL',
    length: 'The {field} must have {length} characters',
    maxLength: 'The value must not be more than {maxLength} characters',
    minLength: 'The value must contain at least {minLength} characters',
    maxWords: 'Must be a maximum of {maxWords} words',
    minWords: 'Must be at least {minWords} words',
    first: 'The first character must be {letter}',
    last: 'The last character must be {letter}',
    onlyNumbers: 'Must be only numbers',
    notOnlyNumbers: 'Can not be only numbers',
    cpf: 'Enter a valid CPF'
  },
  number: {
    isNumber: 'The value must be numeric',
    length: 'The {field} must have {length} characters',
    max: 'Must be {max} or less',
    min: 'Must be {min} or greater',
    negative: 'The number must be negative',
    positive: 'The number must be positive',
    between: 'The number must be between {min} e {max}'
  },
  boolean: {
    isBoolean: 'The value must be boolean'
  },
  array: {
    isArray: 'The value must be array of items',
    minLength: 'Must have at least {minLength} items',
    maxLength: 'Must have items less than or equal to {maxLength}'
  },
  file: {
    isFile: 'The value must be file',
    extnames: 'Only extensions of the type: {extnames}',
    size: 'The size must be a maximum of {size}'
  }
}

export default messages
