import Form from '@/classes/Form'
import * as rules from '@/rules'
import { Schema } from '@/types'
import { reactive } from 'vue'

export const darpi = {
  string(message?: string) {
    return new rules.String(message)
  },
  number(message?: string) {
    return new rules.Number(message)
  },
  boolean(message?: string) {
    return new rules.Boolean(message)
  },
  array(message?: string) {
    return new rules.Array(message)
  },
  file(message?: string) {
    return new rules.File(message)
  },
  newForm<T extends Schema>(schema: T) {
    return reactive(new Form(schema))
  }
}
