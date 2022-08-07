import { Messages } from '@/types'

const messages: Messages = {
  mixed: {
    required: 'Este campo é obrigatório',
    oneOf: 'Valor deve ser um desses: {arrayOfValues}',
    notIn: 'O valor não pode um ser: {arrayOfValues}',
    confirmed: '{field} deve ser igual a {reference}',
    equal: 'Deve ser igual a {value}',
    notEqual: 'Não pode ser igual a {value}'
  },
  string: {
    isString: 'O valor precisa ser texto',
    email: 'Insira um e-mail válido',
    url: 'Insira uma URL válida',
    length: 'O {field} deve ter {length} caracteres',
    maxLength: 'O valor não deve ter mais que {maxLength} caracteres',
    minLength: 'O valor deve conter pelo menos {minLength} caracteres',
    maxWords: 'Deve ter no máximo {maxWords} palavras',
    minWords: 'Deve ter no mínimo {minWords} palavras',
    first: 'A primeira letra deve ser {letter}',
    last: 'A última letra deve ser {letter}',
    onlyNumbers: 'Deve ser apenas números',
    notOnlyNumbers: 'Não pode ser apenas números',
    cpf: 'Insira um CPF válido'
  },
  number: {
    isNumber: 'O valor precisa ser numérico',
    length: 'O {field} deve ter {length} caracteres',
    max: 'Precisa ser {max} ou menor',
    min: 'Precisa ser {min} ou maior',
    negative: 'O número deve ser negativo',
    positive: 'O número deve ser positivo',
    between: 'O número precisa estar entre {min} e {max}'
  },
  boolean: {
    isBoolean: 'O valor deve ser booleano'
  },
  array: {
    isArray: 'O valor precisar uma matriz de itens',
    minLength: 'Deve ter pelo menos {minLength} itens',
    maxLength: 'Deve ter itens menores ou iguais a {maxLength}'
  },
  file: {
    isFile: 'O valor deve ser um arquivo',
    extnames: 'São aceito apenas as extensões: {extnames}',
    size: 'O tamanho deve ser no máximo {size}'
  }
}

export default messages
