import { computed } from 'vue'
import { useInject } from './useInject'
import * as symbols from '@/symbols'
import { useOptions } from './useOptions'

export function useSelectedText() {
  const { form } = useInject(symbols.formProps)
  const field = useInject(symbols.fieldProps)
  const { options } = useOptions()

  const selectedText = computed(() => {
    const formValue = form.values.get(field.name)

    if (![undefined, null].includes(formValue)) {
      const option = options.value.find(({ value }) => value === formValue)

      return option?.text || ''
    }

    const selected = options.value.find((option) => option.selected)

    if (selected) {
      return selected.text || ''
    }

    if (field.placeholder) {
      return field.placeholder || ''
    }
  })

  return { selectedText }
}
