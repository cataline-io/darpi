import { onMounted, onUnmounted, unref, Ref } from 'vue'

type Target = HTMLElement | Ref<HTMLElement | null>
type Callback = (event: MouseEvent) => void

export function onOutsideClick(target: Target, callback: Callback) {
  const handleClick = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement
    const targetElement = unref(target) as HTMLElement

    if (targetElement && !targetElement.contains(clickedElement)) {
      callback(event)
    }
  }

  onMounted(() => {
    if (!unref(target)) {
      throw new Error('Invalid target')
    }

    document.addEventListener('click', handleClick)
  })

  onUnmounted(() => {
    if (!unref(target)) return

    document.removeEventListener('click', handleClick)
  })
}
