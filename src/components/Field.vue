<template>
  <div class="field" :data-field="name">
    <span v-if="label" class="label">
      {{ label }}
    </span>

    <Input v-if="as.input" v-bind="$attrs">
      <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </Input>

    <Textarea v-if="as.textarea" />

    <Select v-if="as.select" />

    <File v-if="as.file" />

    <Checkbox v-if="as.checkbox">
      <slot />
    </Checkbox>

    <Switch v-if="as.switch">
      <slot />
    </Switch>

    <RadioGroup v-if="as.radioGroup" />

    <div v-if="autoMessages" class="error-message" v-show="firstError">
      {{ firstError?.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'
import {
  Input,
  Textarea,
  Select,
  File,
  RadioGroup,
  Checkbox,
  Switch
} from '@/components/atoms'
import type { CustomValidation, InputType, As } from '@/types'
import { useInject } from '@/composables/useInject'
import * as symbols from '@/symbols'

export interface Props {
  name: string
  as?: As
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
  checked?: boolean
  value?: string | number | boolean | any[]
  label?: string
  rows?: number
  cols?: number
  resize?: 'vertical' | 'horizontal' | 'both' | 'none'
  mask?: string
  autoMessages?: boolean
  validations?: CustomValidation['test'][]
  type?: InputType
  prefix?: string
  suffix?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'input',
  type: 'text',
  value: undefined,
  autoMessages: true,
  rows: 5,
  cols: 33
})

const as = computed(() => ({
  input: props.as === 'input',
  textarea: props.as === 'textarea',
  select: props.as === 'select',
  file: props.as === 'file',
  checkbox: props.as === 'checkbox',
  switch: props.as === 'switch',
  radioGroup: props.as === 'radio-group'
}))

const { form } = useInject(symbols.formProps)
const firstError = computed(() => form.errors.firstOf(props.name))

props.validations?.forEach((validation) => {
  form.validations.add(props.name, validation, { lazy: true })
})

const slots = useSlots()

provide(symbols.fieldSlots, slots)
provide(symbols.fieldProps, props)
</script>
