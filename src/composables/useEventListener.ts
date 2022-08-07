import { onMounted, onUnmounted, unref, Ref } from 'vue'

export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: EventTarget | Ref<EventTarget | null>,
  eventName: K,
  callback: (event: HTMLElementEventMap[K]) => any
) {
  onMounted(() => {
    const element = unref(target)

    if (!element) {
      throw new Error('Invalid target')
    }

    element.addEventListener(eventName, callback as any)
  })

  onUnmounted(() => {
    const element = unref(target)

    if (!element) return

    element.removeEventListener(eventName, callback as any)
  })
}
