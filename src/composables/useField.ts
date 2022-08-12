import { useInject } from '@/composables/useInject'
import * as symbols from '@/symbols'
import type { CustomValidation } from '@/types'
import { computed } from 'vue'

interface UseFieldOptions {
  value?: any
  validations?: Array<CustomValidation['test']>
}

interface ValidateOptions {
  lazy?: boolean
}

interface AddError {
  validation: string
  message: string
}

export function useField(name: string, options?: UseFieldOptions) {
  const { form } = useInject(symbols.formProps)
  const { value, validations } = options || {}

  if (value) {
    form.values.set(name, value)
  }

  if (validations) {
    validations.forEach((validation) => {
      form.validations.add(name, validation, { lazy: true })
    })
  }

  const errorMessage = computed(() => form.errors.firstOf(name)?.message)
  const reactiveValue = computed(() => form.values.get(name))
  const valueType = computed(() => form.values.typeof(name))

  function validate(options?: ValidateOptions) {
    return form.validations.run({ onField: name, ...options })
  }

  function setValue(value: any) {
    form.values.set(name, value)
  }

  function watchValue(callback: (newValue: any) => void) {
    form.values.watch(name, callback)
  }

  function addError(options: AddError) {
    form.errors.add({ field: name, ...options })
  }

  function clearErrors() {
    form.errors.clearOf(name)
  }

  return {
    value: reactiveValue,
    errorMessage,
    valueType,
    validate,
    setValue,
    watchValue,
    addError,
    clearErrors
  }
}
