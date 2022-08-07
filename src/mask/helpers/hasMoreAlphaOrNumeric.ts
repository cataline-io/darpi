import typeOf from './typeOf'

interface Options {
  maskPattern: string
  fromIndex: number
}

const hasMoreAlphaOrNumeric = ({ maskPattern, fromIndex }: Options) => {
  let result = false

  ;[...maskPattern]
    .filter((_char, index) => index >= fromIndex)
    .every((key) => {
      if (typeOf.key.mask(key) !== 'special') {
        result = true

        return false // break
      }

      return true // continue
    })

  return result
}

export default hasMoreAlphaOrNumeric
