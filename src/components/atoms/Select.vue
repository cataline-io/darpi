<template>
  <div :class="['select-container', classes]" ref="selectRef">
    <button class="trigger" @click="toggle" @blur="onBlur" type="button">
      <span class="default-text">{{ selectedText }}</span>
      <Arrows />
    </button>

    <ul class="options" v-show="expanded">
      <div class="scroll">
        <li
          v-for="({ text, value, disabled, selected }, index) in options"
          :key="index"
          :class="['item', { disabled, selected }]"
          @click="disabled ? null : onSelect(value)"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
        >
          <Check v-show="selected" />
          <span class="text">{{ text }}</span>
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import * as symbols from '@/symbols'
import { Arrows, Check } from '@/components/quarks'
import { onChangePropValue } from '@/composables/onChangePropValue'
import { useOptions } from '@/composables/useOptions'
import { useInject } from '@/composables/useInject'
import { onOutsideClick } from '@/composables/onOutsideClick'
import { onPressEscape } from '@/composables/onPressEscape'
import { useSelectedText } from '@/composables/useSelectedText'

const selectRef = ref<HTMLElement | null>(null)
const expanded = ref(false)
const { options } = useOptions()
const { form } = useInject(symbols.formProps)
const field = useInject(symbols.fieldProps)
const { selectedText } = useSelectedText()

const classes = computed(() => ({
  'has-error': form.errors.hasAnyIn(field.name),
  'is-disabled': field.disabled,
  'has-scroll': options.value.length > 6
}))

options.value.forEach(({ selected, value }) => {
  if (selected) {
    form.values.set(field.name, value)
  }
})

onChangePropValue({ run: 'immediate' }, (value) => {
  form.values.set(field.name, value)

  options.value = options.value.map((option) => {
    return { ...option, selected: option.value === value }
  })
})

onPressEscape(() => {
  expanded.value = false
})

onOutsideClick(selectRef, () => {
  expanded.value = false
})

form.values.watch(field.name, (value) => {
  options.value = options.value.map((option) => {
    return { ...option, selected: option.value === value }
  })
})

function toggle() {
  if (field.disabled) return

  if (!expanded.value) {
    const items = selectRef.value!.querySelectorAll('.item')

    items.forEach((item) => {
      if (item.classList.contains('selected')) {
        item.classList.add('hover')
      }
    })
  }

  expanded.value = !expanded.value
}

function onBlur() {
  form.validations.run({
    onField: field.name,
    lazy: true,
    hasConfig: ['onBlur']
  })
}

function onSelect(value: any) {
  form.values.set(field.name, value)

  options.value = options.value.map((option) => {
    return { ...option, selected: option.value === value }
  })

  expanded.value = false

  form.validations.run({ onField: field.name, lazy: true })
}

function onMouseEnter(event: MouseEvent) {
  const target = event.target as HTMLElement
  const items = selectRef.value!.querySelectorAll('.item')

  items.forEach((item) => item.classList.remove('hover'))

  target.classList.add('hover')
}

function onMouseLeave(event: MouseEvent) {
  const target = event.target as HTMLElement

  target.classList.remove('hover')
}
</script>
