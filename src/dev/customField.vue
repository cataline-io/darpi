<template>
  <div class="custom-field">
    <input type="text" @input="onInput" />
    <span>{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { useField } from '@/index'

interface Props {
  name: string
  value?: string
}

const props = defineProps<Props>()

const { errorMessage, validate, setValue } = useField(props.name, {
  value: props.value
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement

  setValue(target.value)

  validate()
}
</script>
