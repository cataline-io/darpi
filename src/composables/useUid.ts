import * as symbols from '@/symbols'
import { useInject } from './useInject'

export const useUid = () => {
  const { name } = useInject(symbols.fieldProps)

  const uid = (uniqueKey: any) => `${name}-${uniqueKey}`

  return { uid }
}
