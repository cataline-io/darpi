<template>
  <div :class="['switch-container', classes]">
    <input
      :id="field.name"
      type="checkbox"
      :name="field.name"
      :disabled="field.disabled"
      :checked="form.values.get(field.name)"
      @change="onChange($event)"
    />

    <label class="toggle" :for="field.name" />

    <span class="slot-content" v-if="hasSlotContent">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import * as symbols from '@/symbols'
import { useInject } from '@/composables/useInject'
import { onChangePropValue } from '@/composables/onChangePropValue'

const slots = useSlots()
const { form } = useInject(symbols.formProps)
const field = useInject(symbols.fieldProps)

const classes = computed(() => ({
  on: form.values.get(field.name),
  'is-disabled': field.disabled || form.loading
}))

const hasSlotContent = computed(() => {
  return slots.default!()[0].children?.length as number >= 1
})

onChangePropValue({ run: 'immediate' }, (value) => {
  form.values.set(field.name, value)
})

function onChange(event: Event) {
  const target = event.target as HTMLInputElement

  form.values.set(field.name, target.checked)

  form.validations.run({ onField: field.name, lazy: true })
}
</script>
