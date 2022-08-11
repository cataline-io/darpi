<template>
  <div class="radio-group-container">
    <span v-for="(radioItem, index) in radios" :key="index">
      <label :for="uid(index)">
        <input
          :id="uid(index)"
          type="radio"
          :name="field.name"
          :disabled="radioItem.disabled"
          :checked="radioItem.checked"
          :value="radioItem.value"
          @change="onChange($event)"
        />

        <div class="checkmark" />
        <span class="text">{{ radioItem.text }}</span>
      </label>
    </span>
  </div>
</template>

<script setup lang="ts">
import * as symbols from '@/symbols'
import { onChangePropValue } from '@/composables/onChangePropValue'
import { useInject } from '@/composables/useInject'
import { useRadioItems } from '@/composables/useRadioItems'
import { useUid } from '@/composables/useUid'

const { radios } = useRadioItems()
const { form } = useInject(symbols.formProps)
const field = useInject(symbols.fieldProps)
const { uid } = useUid()

radios.value.forEach(({ checked, value }) => {
  if (checked) {
    form.values.set(field.name, value)
  }
})

onChangePropValue({ run: 'immediate' }, (value) => {
  form.values.set(field.name, value)

  updateChecked(value)
})

form.values.watch(field.name, (value) => {
  updateChecked(value)
})

function onChange(event: Event) {
  const target = event.target as HTMLInputElement

  form.values.set(field.name, target.value)

  form.validations.run({
    onField: field.name,
    lazy: true
  })
}

function updateChecked(value: any) {
  radios.value = radios.value.map((radio) => {
    return { ...radio, checked: radio.value === value }
  })
}
</script>
