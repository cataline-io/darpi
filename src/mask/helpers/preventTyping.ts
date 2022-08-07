import { UserEvent } from './index'

const preventTyping = (event: UserEvent) => {
  return event.target.value.slice(0, -1)
}

export default preventTyping
