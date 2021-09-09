import { ComponentType, useEffect, useRef } from 'react'
import { useInsightsProvider } from './InsightsProvider'

export const useInsights = (component: ComponentType): void => {
  const { push } = useInsightsProvider()
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current &&
      push({ name: component.displayName ?? component.name, type: 'UPDATED' })
  })

  useEffect(() => {
    !mounted.current &&
      push({ name: component.displayName ?? component.name, type: 'MOUNTED' })

    mounted.current = true
    return () => {
      push({ name: component.displayName ?? component.name, type: 'UNMOUNTED' })
    }
  }, [])
}
