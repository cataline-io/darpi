export * from './keysMatch'
export * from './mergeDeep'
export * from './typeOf'
export * from './validateSize'

export function interpolate(rawMessage: string, data: Record<string, any>) {
  return rawMessage.replace(/\{(\w+)\}/g, (_match, expr) => data[expr])
}
