<template>
  <form :class="['darpi', theme]" @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'
import type { FormPublic } from '@/types'
import * as symbols from '@/symbols'
import { baseConfig } from '@/configure'

export interface Props {
  form: FormPublic
  values?: Record<string, any>
}

const props = defineProps<Props>()
const emit = defineEmits(['submit'])

const theme = computed(() => {
  switch (baseConfig.theme) {
    case 'dark':
      return 'dark-theme'
    case 'light':
      return 'light-theme'
    case undefined:
      return null
  }
})

async function onSubmit() {
  props.form.submitted = true

  await props.form.validations.run({ lazy: true })

  if (!props.form.errors.hasAny) {
    emit('submit')
  }
}

provide(symbols.formProps, props)
</script>
