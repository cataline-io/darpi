<template>
  <Form :form="form">
    <pre>{{ form.values.all }}</pre>
    
    <Field name="done" as="select" label="Status do serviço">
        <option :value="true">Concluído</option>
        <option :value="false">Não Concluído</option>
      </Field>

    <button>send</button>
  </Form>
</template>

<script setup lang="ts">
import { Field, Form, darpi, configure } from '@/index'

configure({
  theme: 'dark'
})

const form = darpi.newForm({
  done: darpi.boolean().required()
})
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 10rem;
  background-color: #17191d;
  font-family: Inter;
}

form {
  width: 400px;
}

pre {
  color: #fff;
}
</style>
