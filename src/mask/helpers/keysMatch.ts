import typeOf from './typeOf'

interface Options {
  inputKey: string
  maskKey: string
}

const keysMatch = ({ inputKey, maskKey }: Options) => {
  let allowedKeys: string[] = []

  if (typeOf.key.mask(maskKey) === 'alphanumeric') {
    allowedKeys = ['alpha', 'numeric']
  } else {
    allowedKeys.push(typeOf.key.mask(maskKey))
  }

  const result = allowedKeys.includes(typeOf.key.input(inputKey))

  return result
}

export default keysMatch
