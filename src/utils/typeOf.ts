type Output =
  | 'null'
  | 'undefined'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'string'
  | 'unknown'

export const typeOf = (value: any): Output => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'

  if (typeof value === 'number') return 'number'
  if (typeof value === 'string') return 'string'
  if (typeof value === 'boolean') return 'boolean'

  if (value.constructor.name === 'Array') return 'array'
  if (value.constructor.name === 'Object') return 'object'

  return 'unknown'
}
