type Props = Record<string, any>

const isObject = (item: unknown) => {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export const mergeDeep = (target: Props, source: Props) => {
  let output = { ...target }

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output = { ...output, ...{ [key]: source[key] } }
        } else {
          output[key] = mergeDeep(target[key], source[key])
        }
      } else {
        output = { ...output, ...{ [key]: source[key] } }
      }
    })
  }
  return output
}
