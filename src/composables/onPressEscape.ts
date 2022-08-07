import { useEventListener } from './useEventListener'

type Callback = (event: KeyboardEvent) => void

export function onPressEscape(callback: Callback) {
  useEventListener(document, 'keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      callback(event)
    }
  })
}
