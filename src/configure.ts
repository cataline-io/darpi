import { Config, NewConfig } from '@/types'
import * as allMessages from '@/messages'
import { reactive } from 'vue'

export const baseConfig: Config = reactive({
  locale: 'en',
  messages: allMessages.en,
  validate: {
    onBlur: false,
    onChange: false,
    onInput: false,
    onSubmitted: true
  }
})

export const configure = (newConfig: NewConfig) => {
  if (newConfig.locale) {
    baseConfig.locale = newConfig.locale
    baseConfig.messages = allMessages[newConfig.locale]
  }

  if (newConfig.messages) {
    baseConfig.messages = {
      ...baseConfig.messages,
      ...(<any>newConfig.messages)
    }
  }

  if (newConfig.validate) {
    baseConfig.validate = { ...baseConfig.validate, ...newConfig.validate }
  }

  if (newConfig.theme) {
    baseConfig.theme = newConfig.theme
  }
}
