import { UserEvent } from './index'
import typeOf from './typeOf'

interface Mask {
  index: number
  pattern: string
  key: {
    value: string
    type: string
  }
  next: {
    key: {
      value: string | null
      type: string
    }
    alphanumericKey: {
      value: string | null
      type: string
    }
  }
}

const eventDetails = (event: UserEvent) => {
  const mask: Mask = {
    index: event.target.value.length - 1,
    pattern: event.target.getAttribute('mask')!,
    key: {
      value: 'null',
      type: 'special'
    },
    next: {
      key: {
        value: null,
        type: 'special'
      },
      alphanumericKey: {
        value: null,
        type: 'special'
      }
    }
  }

  const input = {
    key: {
      value: event.data!,
      type: 'special'
    }
  }

  mask.key.value = mask.pattern[mask.index]
  mask.key.type = typeOf.key.mask(mask.key.value)

  mask.next.key.value = mask.pattern[mask.index + 1] || null
  mask.next.key.type = typeOf.key.mask(mask.next.key.value!)

  input.key.type = typeOf.key.input(input.key.value)

  mask.pattern
    .split('')
    .filter((_key, index) => index >= mask.index)
    .every((key) => {
      const keyType = typeOf.key.mask(key)

      if (keyType !== 'special') {
        mask.next.alphanumericKey.type = keyType
        mask.next.alphanumericKey.value = key

        return false
      }

      return true
    })

  return { mask, input }
}

export default eventDetails
