import { onMounted, onUnmounted } from 'vue'

type Callback = (event: KeyboardEvent) => void

export function onPressEscape(callback: Callback) {
  function escapeChecker(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      callback(event)
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', escapeChecker)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', escapeChecker)
  })
}
