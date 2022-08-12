import MixedSchema from '@/rules/mixed'
import { baseConfig } from '@/configure'
import { validateSize } from '@/utils'

class FileSchema<T extends File | undefined> extends MixedSchema<T> {
  constructor(message?: string) {
    super()

    this.isFile(message)
  }

  private isFile(message?: string) {
    this.validations.push({
      name: 'isFile',
      message: message || baseConfig.messages.file.isFile,
      test: (value: unknown) => {
        return value instanceof File
      }
    })
  }

  extnames(extnames: string[], message?: string) {
    type Params = { extnames: string }

    this.validations.push({
      name: 'extnames',
      params: { extnames: extnames.join(', ') },
      message: message || baseConfig.messages.file.extnames,
      test: (value: File, params: Params) => {
        const fileExt = value.name.split('.').pop()!.toLowerCase()

        return params.extnames.split(', ').some((extname) => {
          return extname.toLowerCase() === fileExt
        })
      }
    })

    return this
  }

  size(size: string, message?: string) {
    type Params = { size: string }

    this.validations.push({
      name: 'size',
      params: { size },
      message: message || baseConfig.messages.file.size,
      test: (value: File, params: Params) => {
        return validateSize({
          bytes: value.size,
          reference: params.size
        })
      }
    })

    return this
  }
}

export default FileSchema
