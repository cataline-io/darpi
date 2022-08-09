<template>
  <Form :form="form" @submit="send">
    <pre>{{ form.values.all }}</pre>
    <Field name="fullName" />
    <Field name="age" />

    <Field name="drink" as="select">
      <option disabled selected>select a drink</option>
      <option value="coffee">Coffee</option>
      <option value="tea">Tea</option>
      <option value="coke">Coke</option>
    </Field>

    <button>send</button>
  </Form>
</template>

<script setup lang="ts">
import { Field, Form, darpi } from '@/index'

const form = darpi.newForm({
  fullName: darpi.string().required().minWords(2),
  age: darpi.number().required().between(18, 65),
  drink: darpi.string().required()
})

function send() {
  console.log(form.values.all)
}
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
</style>
