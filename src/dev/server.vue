<template>
  <Form :form="form" @submit="send">
    <Field name="fullName" />
    <Field name="age" />

    <button>send</button>
  </Form>
</template>

<script setup lang="ts">
import { Field, Form, darpi } from '@/index'

const form = darpi.newForm({
  fullName: darpi.string().required().minWords(2),
  age: darpi.number().required().between(18, 65)
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
