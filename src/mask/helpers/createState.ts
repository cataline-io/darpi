import { UserEvent } from './index'
import get from './eventDetails'

const createState = (event: UserEvent) => ({
  isFirstDigit: event.target.value.length === 1,
  isLastDigit: event.target.value.length === get(event).mask.pattern.length,
  mask: {
    index: event.target.value.length - 1,
    pattern: get(event).mask.pattern,
    key: {
      value: get(event).mask.key.value,
      type: get(event).mask.key.type
    },
    next: {
      key: {
        value: get(event).mask.next.key.value,
        type: get(event).mask.next.key.type
      },
      alphanumericKey: {
        value: get(event).mask.next.alphanumericKey.value,
        type: get(event).mask.next.alphanumericKey.type
      }
    }
  },
  input: {
    isEmpty: event.target.value.length === 0,
    eventName: event.inputType,
    value: event.target.value,
    key: {
      value: get(event).input.key.value,
      type: get(event).input.key.type
    }
  }
})

export default createState
