import { computed, watch } from 'vue'
import { useInject } from './useInject'
import * as symbols from '@/symbols'

interface Options {
  run: 'immediate' | 'lazy'
}

export function onChangePropValue(
  { run }: Options,
  callback: (value: any) => any
) {
  const formProps = useInject(symbols.formProps)
  const fieldProps = useInject(symbols.fieldProps)

  const value = computed(() => {
    if (fieldProps.value !== undefined) {
      return fieldProps.value
    }

    return formProps.values?.[fieldProps.name]
  })

  watch(value, () => {
    callback(value.value)
  })

  if (value.value !== undefined && run === 'immediate') {
    callback(value.value)
  }
}
