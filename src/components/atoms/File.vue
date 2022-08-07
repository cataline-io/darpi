<template>
  <div :class="['file-container', classes]">
    <input
      :id="field.name"
      :name="field.name"
      :disabled="field.disabled"
      type="file"
      @change="onChange($event)"
    />

    <label :for="field.name">
      <span class="filename">{{ filename }}</span>
      <UploadIcon />
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInject } from '@/composables/useInject'
import * as symbols from '@/symbols'
import { UploadIcon } from '@/components/quarks'

const { form } = useInject(symbols.formProps)
const field = useInject(symbols.fieldProps)

const classes = computed(() => ({
  'has-error': form.errors.hasAnyIn(field.name),
  'is-disabled': field.disabled || form.loading,
  'has-file': ![null, undefined].includes(form.values.get(field.name))
}))

const filename = computed(() => {
  const file = <File>form.values.get(field.name)

  if (file) {
    return file.name
  } else if (field.placeholder) {
    return field.placeholder
  } else {
    return 'Choose a file...'
  }
})

function onChange(event: Event) {
  const target = <HTMLInputElement>event.target
  const files = <FileList>target.files

  form.values.set(field.name, files[0])

  form.validations.run({ onField: field.name, lazy: true })
}
</script>
