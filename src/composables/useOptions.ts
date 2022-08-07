import { ref, Ref } from 'vue'
import { useInject } from './useInject'
import * as symbols from '@/symbols'

export interface Option {
  text: string
  value: string
  selected: boolean
  disabled: boolean
}

export function useOptions() {
  const slots = useInject(symbols.fieldSlots)
  const options: Ref<Option[]> = ref([])

  slots.default().forEach((element) => {
    const tag = element.type
    const content = element.children
    const attrs = element.props

    if (tag !== 'option') return
    if (typeof content !== 'string') return
    if (!attrs) return

    options.value.push({
      text: content,
      value: attrs.value,
      selected: attrs.selected === undefined ? false : true,
      disabled: attrs.disabled === undefined ? false : true
    })
  })

  return { options }
}
