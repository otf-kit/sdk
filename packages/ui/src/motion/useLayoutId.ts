import { useId } from 'react'

export function useLayoutId(key: string): string {
  const id = useId()
  return `${key}-${id}`
}
