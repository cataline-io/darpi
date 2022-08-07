import { hasMoreAlphaOrNumeric, keysMatch, typeOf } from '@/mask/helpers'

const format = (value: string, maskPattern: string) => {
  // regex remove all special characters, except a-z A-Z 0-9
  const values = [...value.replace(/[^a-zA-Z0-9]/g, '')]

  const result = [...maskPattern].reduce((result, maskKey, index) => {
    if (typeOf.key.mask(maskKey) === 'special') {
      if (values[0]) {
        return result + maskKey
      }

      if (!hasMoreAlphaOrNumeric({ maskPattern, fromIndex: index })) {
        const maskTemp = [...maskPattern]
          .filter((_char, i) => i < index)
          .join('')

        if (maskTemp.length === result.length) {
          return result + maskKey
        }
      }
    }

    let temp = ''
    let done = false

    const nextCompatibleKey = () => {
      while (!done) {
        if (!values[0]) {
          done = true
          break
        }

        if (keysMatch({ maskKey, inputKey: values[0] })) {
          done = true
          temp = values.shift()!
        } else {
          values.shift()
        }
      }

      return temp
    }

    return result + nextCompatibleKey()
  }, '')

  return result
}

export default format
