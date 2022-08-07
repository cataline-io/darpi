<template>
  <div :class="['textarea-container', classes]">
    <textarea
      :id="field.name"
      :name="field.name"
      :rows="field.rows"
      :cols="field.cols"
      :value="value"
      :disabled="field.disabled"
      :placeholder="field.placeholder"
      @input="onInput($event)"
      @change="onChange"
      @blur="onBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as symbols from '@/symbols'
import { onChangePropValue } from '@/composables/onChangePropValue'
import { useInject } from '@/composables/useInject'
import { baseConfig } from '@/configure'

const { form } = useInject(symbols.formProps)
const field = useInject(symbols.fieldProps)
const value = computed<any>(() => form.values.get(field.name))

const classes = computed(() => ({
  'resize-horizontal': field.resize === 'horizontal',
  'resize-vertical': field.resize === 'vertical',
  'resize-both': field.resize === 'both',
  'is-disabled': field.disabled || form.loading,
  'has-error': form.errors.hasAnyIn(field.name)
}))

onChangePropValue({ run: 'immediate' }, (value) => {
  form.values.set(field.name, value)
})

function onChange() {
  form.validations.run({
    onField: field.name,
    hasConfig: ['onChange'],
    lazy: true
  })
}

function onBlur() {
  form.validations.run({
    onField: field.name,
    hasConfig: ['onBlur'],
    lazy: true
  })
}

function onInput(event: Event) {
  const target = <HTMLInputElement>event.target

  form.values.set(field.name, target.value)

  if (baseConfig.validate.onSubmitted && form.submitted) {
    return form.validations.run({ onField: field.name })
  }

  form.validations.run({ onField: field.name, hasConfig: ['onInput'] })
}
</script>
