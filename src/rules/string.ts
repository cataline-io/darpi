import { baseConfig } from '@/configure'
import MixedSchema from '@/rules/mixed'

class StringSchema<T extends string | undefined> extends MixedSchema<T> {
  constructor(message?: string) {
    super()

    this.isString(message)
  }

  private isString(message?: string) {
    this.validations.push({
      name: 'isString',
      message: message || baseConfig.messages.string.isString,
      test: (value: any) => {
        return typeof value === 'string'
      }
    })
  }

  email(message?: string) {
    this.validations.push({
      name: 'email',
      message: message || baseConfig.messages.string.email,
      test: (value: string) => {
        const regexEmail =
          /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i

        return regexEmail.test(value)
      }
    })

    return this
  }

  url(message?: string) {
    this.validations.push({
      name: 'url',
      message: message || baseConfig.messages.string.url,
      test: (value: string) => {
        const regexUrl =
          /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

        return regexUrl.test(value)
      }
    })

    return this
  }

  length(length: number, message?: string) {
    type Params = { length: number }

    this.validations.push({
      name: 'length',
      params: { length },
      message: message || baseConfig.messages.string.length,
      test: (value: string, { length }: Params) => {
        return value.length === length
      }
    })

    return this
  }

  maxLength(maxLength: number, message?: string) {
    type Params = { maxLength: number }

    this.validations.push({
      name: 'max',
      params: { maxLength },
      message: message || baseConfig.messages.string.maxLength,
      test: (value: string, { maxLength }: Params) => {
        return value.length <= maxLength
      }
    })

    return this
  }

  minLength(minLength: number, message?: string) {
    type Params = { minLength: number }

    this.validations.push({
      name: 'minLength',
      params: { minLength },
      message: message || baseConfig.messages.string.minLength,
      test: (value: string, { minLength }: Params) => {
        return value.length >= minLength
      }
    })

    return this
  }

  maxWords(maxWords: number, message?: string) {
    type Params = { maxWords: number }

    this.validations.push({
      name: 'maxWords',
      params: { maxWords },
      message: message || baseConfig.messages.string.maxWords,
      test: (value: string, { maxWords }: Params) => {
        const wordCount = value.trim().split(' ').length

        return wordCount <= maxWords
      }
    })

    return this
  }

  minWords(minWords: number, message?: string) {
    type Params = { minWords: number }

    this.validations.push({
      name: 'minWords',
      params: { minWords },
      message: message || baseConfig.messages.string.minWords,
      test: (value: string, { minWords }: Params) => {
        const wordCount = value.trim().split(' ').length

        return wordCount >= minWords
      }
    })

    return this
  }

  lowercase() {
    this.formattings.push({
      name: 'lowercase',
      format: (value: string) => {
        return value.toLocaleLowerCase()
      }
    })

    return this
  }

  uppercase() {
    this.formattings.push({
      name: 'uppercase',
      format: (value: string) => {
        return value.toUpperCase()
      }
    })

    return this
  }

  trim() {
    this.formattings.push({
      name: 'trim',
      format: (value: string) => {
        return value.trim()
      }
    })

    return this
  }

  first(letter: string, message?: string) {
    type Params = { letter: string }

    this.validations.push({
      name: 'first',
      params: { letter },
      message: message || baseConfig.messages.string.first,
      test: (value: string, params: Params) => {
        const firstLetter = [...value.trim()][0]

        return firstLetter === params.letter
      }
    })

    return this
  }

  last(letter: string, message?: string) {
    type Params = { letter: string }

    this.validations.push({
      name: 'last',
      params: { letter },
      message: message || baseConfig.messages.string.last,
      test: (value: string, params: Params) => {
        const lastLetter = [...value.trim()].pop()

        return lastLetter === params.letter
      }
    })

    return this
  }

  notOnlyNumbers(message?: string) {
    this.validations.push({
      name: 'notOnlyNumbers',
      message: message || baseConfig.messages.string.notOnlyNumbers,
      test: (value: string) => {
        const isOnlyNumbers = /^\d+$/.test(value)

        return !isOnlyNumbers
      }
    })

    return this
  }

  onlyNumbers(message?: string) {
    this.validations.push({
      name: 'onlyNumbers',
      message: message || baseConfig.messages.string.onlyNumbers,
      test: (value: string) => {
        const onlyNumbers = /^\d+$/.test(value)

        return onlyNumbers
      }
    })

    return this
  }

  cpf(message?: string) {
    this.validations.push({
      name: 'cpf',
      message: message || baseConfig.messages.string.cpf,
      test: (value: string) => {
        const replacedCpf = value.replace(/\D/g, '')
        
        const valuesToReject = [
          '00000000000',
          '11111111111',
          '22222222222',
          '33333333333',
          '44444444444',
          '55555555555',
          '66666666666',
          '77777777777',
          '88888888888',
          '99999999999'
        ]

        if (valuesToReject.includes(replacedCpf)) {
          return false
        }

        let sum, rest

        sum = 0

        for (let i = 1; i <= 9; i++) {
          sum = sum + parseInt(replacedCpf.substring(i - 1, i)) * (11 - i)
        }

        rest = (sum * 10) % 11

        if (rest === 10 || rest === 11) rest = 0

        if (rest !== parseInt(replacedCpf.substring(9, 10))) return false

        sum = 0

        for (let i = 1; i <= 10; i++) {
          sum = sum + parseInt(replacedCpf.substring(i - 1, i)) * (12 - i)
        }

        rest = (sum * 10) % 11

        if (rest === 10 || rest === 11) rest = 0

        if (rest !== parseInt(replacedCpf.substring(10, 11))) {
          return false
        }

        return true
      }
    })

    return this
  }
}

export default StringSchema
