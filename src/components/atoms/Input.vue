<template>
  <div :class="['input-container', classes]">
    <div class="prefix" v-if="field.prefix">
      {{ field.prefix }}
    </div>

    <div v-if="hasPrepend" class="prepend">
      <slot name="prepend" />
    </div>

    <input
      :id="field.name"
      :name="field.name"
      :type="inputType"
      :value="form.values.get(field.name)"
      :placeholder="field.placeholder"
      :disabled="field.disabled || form.loading"
      :mask="field.mask"
      @input="onInput($event)"
      @change="onChange"
      @blur="onBlur"
    />

    <div v-if="hasAppend" class="append">
      <slot name="append" />
    </div>

    <div class="suffix" v-if="field.suffix">
      {{ field.suffix }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'
import mask from '@/mask'
import * as symbols from '@/symbols'
import { onChangePropValue } from '@/composables/onChangePropValue'
import { useInject } from '@/composables/useInject'
import { baseConfig } from '@/configure'

const { form } = useInject(symbols.formProps)
const field = useInject(symbols.fieldProps)
const slots = useSlots()

const hasAppend = computed(() => Object.keys(slots).includes('append'))
const hasPrepend = computed(() => Object.keys(slots).includes('prepend'))

const inputType = computed(() => {
  const valueType = form.values.typeof(field.name)

  return valueType === 'number' ? 'number' : field.type
})

const classes = computed(() => ({
  'has-prefix': field.prefix,
  'has-suffix': field.suffix,
  'has-prepend': hasPrepend.value,
  'has-append': hasAppend.value,
  'has-error': form.errors.hasAnyIn(field.name),
  'is-disabled': field.disabled || form.loading
}))

onChangePropValue({ run: 'immediate' }, (value) => {
  let newValue = value

  if (field.mask) {
    newValue = mask.format(value.toString(), field.mask)
  }

  form.values.set(field.name, newValue)
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
  const target = event.target as HTMLInputElement

  if (field.mask) {
    target.value = mask.handler(event as any)

    form.values.set(field.name, target.value)
  } else {
    form.values.set(field.name, target.value)
  }

  if (baseConfig.validate.onSubmitted && form.submitted) {
    return form.validations.run({ onField: field.name })
  }

  form.validations.run({ onField: field.name, hasConfig: ['onInput'] })
}
</script>
