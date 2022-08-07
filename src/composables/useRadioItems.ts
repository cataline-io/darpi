import { ref, Ref } from 'vue'
import { useInject } from './useInject'
import * as symbols from '@/symbols'

export interface RadioItem {
  text: string
  value: string
  checked: boolean
  disabled: boolean
}

export function useRadioItems() {
  const slots = useInject(symbols.fieldSlots)
  const radios: Ref<RadioItem[]> = ref([])

  slots.default().forEach((element) => {
    const tag = element.type
    const content = element.children
    const attrs = element.props

    if (!attrs) return
    if (tag !== 'span') return
    if (typeof content !== 'string') return
    if (attrs.as !== 'radio-item') return

    radios.value.push({
      text: content,
      value: attrs.value,
      checked: attrs.checked === undefined ? false : true,
      disabled: attrs.disabled === undefined ? false : true
    })
  })

  return { radios }
}
