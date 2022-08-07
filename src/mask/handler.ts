import format from '@/mask/format'
import {
  createState,
  preventTyping,
  injectSpecialKeys,
  deletePreviousSpecialKeys,
  UserEvent
} from '@/mask/helpers'

const handler = (event: UserEvent) => {
  const state = createState(event)

  if (['insertFromPaste', undefined].includes(event.inputType)) {
    return format(state.input.value, state.mask.pattern)
  }

  if (['deleteByCut', 'deleteContentBackward'].includes(event.inputType)) {
    if (!state.input.isEmpty) {
      return deletePreviousSpecialKeys(event)
    }

    return event.target.value
  }

  if (state.input.value.length > state.mask.pattern.length) {
    return preventTyping(event)
  }

  if (state.input.key.type === 'special') {
    return preventTyping(event)
  }

  if (state.mask.key.type === 'special') {
    if (state.input.key.type !== state.mask.next.alphanumericKey.type) {
      return preventTyping(event)
    } else {
      return injectSpecialKeys(event)
    }
  }

  if (state.input.key.type !== state.mask.key.type) {
    if (state.mask.key.type !== 'alphanumeric') {
      return preventTyping(event)
    }
  }

  return state.input.value
}

export default handler
