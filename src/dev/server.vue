<template>
  <Form :form="form">
    <pre>{{ form.errors.all }}</pre>

    <customField name="custom" />

    <Field name="darkMode" as="checkbox" :value="true"> Dark Mode </Field>

    <br />

    <Field name="drinkOk" as="radio-group">
      <span as="radio-item" value="coffee" checked>Coffee</span>
      <span as="radio-item" value="tea">Tea</span>
      <span as="radio-item" value="coke">Coke</span>
    </Field>

    <Field name="light" as="checkbox" :value="true" disabled> Dark Mode </Field>

    <Field name="darkModed2" as="switch" :value="true"> Dark Mode </Field>

    <Field name="darkModed3" as="switch"> Dark Mode </Field>

    <Field name="fullName" label="Full Name" />

    <Field name="email" label="Email" placeholder="example@example.com" />

    <Field name="password" label="Password" type="password" placeholder="******" />

    <Field name="phone" label="Phone Number" placeholder="(99) 9.9999-9999" mask="(99) 9.9999-9999" />

    <Field name="url" label="URL" prefix="https://" suffix=".com" />

    <Field label="Search" name="search" />

    <br />

    <Field name="drink2" label="Drink" as="select" placeholder="test">
      <option value="coffee">Coffee</option>
      <option value="tea">Tea</option>
      <option value="coke">Coke</option>
    </Field>

    <Field name="drink" as="select">
      <option disabled selected>Selecione uma ocupação</option>
      <option value="1">Empregador</option>
      <option value="2">Dona de casa</option>
      <option value="3">Empregado doméstico</option>
      <option value="4">Empregado com carteira assinada</option>
      <option value="5">Funcionário público</option>
      <option value="6">Rentista</option>
      <option value="7">Aposentado / Pensionista</option>
      <option value="8">Autônomo / Profissional liberal</option>
      <option value="9">Estudante</option>
      <option value="10">Desempregado</option>
      <option value="11">Empregado sem carteira</option>
      <option value="12">Outro</option>
    </Field>

    <Field name="description" label="Description" as="textarea" placeholder="description here" />

    <Field name="avatar" label="Avatar" as="file" />

    <button>send</button>
  </Form>
</template>

<script setup lang="ts">
import { Field, Form, darpi, configure } from '@/index'
import customField from './customField.vue'
import { onMounted } from 'vue'

configure({
  theme: 'dark'
})

const form = darpi.newForm({
  custom: darpi.string().required(),
  darkMode: darpi.boolean().required(),
  dark: darpi.boolean().required(),
  light: darpi.boolean().required(),
  darkModed3: darpi.boolean().required(),
  darkModed2: darpi.boolean().required(),
  fullName: darpi.string().required().minWords(2),
  email: darpi.string().required().email(),
  description: darpi.string().required().email(),
  password: darpi.string().required().minLength(6),
  phone: darpi.string().required().minLength(6),
  url: darpi.string().required(),
  search: darpi.string().required(),
  drink: darpi.string().required().oneOf(['coffee', 'tea', 'coke']),
  drink2: darpi.string().required().oneOf(['coffee', 'tea', 'coke']),
  drinkOk: darpi.string().required().oneOf(['coffee', 'tea', 'coke'])
})

onMounted(() => {
  form.values.watch('darkMode', (value) => {
    const body = document.querySelector('body')!
    const form = document.querySelector('form.darpi')!

    body.style.backgroundColor = value ? '#17191d' : '#fff'

    if (value) {
      form.classList.remove('light-theme')
      form.classList.add('dark-theme')
    } else {
      form.classList.remove('dark-theme')
      form.classList.add('light-theme')
    }
  })
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
