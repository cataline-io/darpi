# @cataline.io/darpi - beta

Powerful form validation library for Vue 3!

## Install

```sh
npm i @cataline.io/darpi@latest
```

## Basic Usage

Composition API

```vue
<script setup lang="ts">
import { Form, Field, darpi } from '@cataline.io/dapi'

const form = darpi.newForm({
  fullName: darpi.string().required().minWords(2),
  age: darpi.number().required().between(18, 65)
})

function send() {
  console.log(form.values.all)
}
</script>
```

Option API

```vue
<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, darpi } from '@/index'

export default defineComponent({
  components: { Form, Field },
  data() {
    return {
      form: darpi.newForm({
        fullName: darpi.string().required().minWords(2),
        age: darpi.number().required().between(18, 65)
      })
    }
  },
  methods: {
    send() {
      console.log(this.form.values.all)
    }
  }
})
</script>
```

Then, template

```vue
<template>
  <Form :form="form" @submit="send">
    <Field name="fullName" />
    <Field name="age" />

    <button> Send </button>
  </Form>
</template>
```

Full documents coming soon 🚀
