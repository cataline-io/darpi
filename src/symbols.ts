import { InjectionKey, Slot } from 'vue'
import { FormPublic, CustomValidation, InputType, As } from '@/types'

export interface FormProps {
  form: FormPublic
  values?: Record<string, any>
}

export interface IFieldProps {
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

export type Slots = {
  readonly [x: string]: Slot
}

export const fieldSlots: InjectionKey<Slots> = Symbol('FormProps')
export const formProps: InjectionKey<FormProps> = Symbol('FormProps')
export const fieldProps: InjectionKey<IFieldProps> = Symbol('FieldProps')
