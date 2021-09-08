import { ComponentType, useEffect, useRef } from 'react'

export const useInsights = (component: ComponentType): void => {
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current &&
      console.log(`${component.displayName ?? component.name}: updated.`)
  })

  useEffect(() => {
    !mounted.current &&
      console.log(`${component.displayName ?? component.name}: mounted.`)
    mounted.current = true
    return () => {
      console.log(`${component.displayName ?? component.name}: unmounted.`)
    }
  }, [])
}
