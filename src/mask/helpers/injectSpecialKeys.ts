import { UserEvent } from './index'
import typeOf from './typeOf'

const injectSpecialKeys = (event: UserEvent) => {
  const maskPattern = event.target.getAttribute('mask')!
  const currentIndex = event.target.value.length - 1
  const valueBeforeTyping = event.target.value.slice(0, -1)
  const inputKey = event.data!

  let nextSpecialKeysKeys = ''

  maskPattern
    .split('')
    .filter((_key, index) => index >= currentIndex)
    .every((key) => {
      if (typeOf.key.mask(key) === 'special') {
        nextSpecialKeysKeys += key

        return true // continue
      }

      return false // break
    })

  return valueBeforeTyping + nextSpecialKeysKeys + inputKey
}

export default injectSpecialKeys
