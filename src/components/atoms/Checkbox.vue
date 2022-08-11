<template>
  <div :class="['checkbox-container', classes]">
    <input
      :id="field.name"
      type="checkbox"
      :name="field.name"
      :disabled="field.disabled"
      :checked="form.values.get(field.name)"
      @change="onChange($event)"
    />
    <label :for="field.name">
      <div class="checkmark" />

      <div class="slot-content">
        <slot />
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as symbols from '@/symbols'
import { useInject } from '@/composables/useInject'
import { onChangePropValue } from '@/composables/onChangePropValue'

const { form } = useInject(symbols.formProps)
const field = useInject(symbols.fieldProps)

const classes = computed(() => ({
  'is-checked': form.values.get(field.name),
  'is-disabled': field.disabled || form.loading
}))

if (field.checked) {
  form.values.set(field.name, true)
}

onChangePropValue({ run: 'immediate' }, (value) => {
  form.values.set(field.name, value)
})

function onChange(event: Event) {
  const target = event.target as HTMLInputElement

  form.values.set(field.name, target.checked)

  form.validations.run({ onField: field.name, lazy: true })
}
</script>
