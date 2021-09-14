import { ComponentType, useEffect, useRef } from 'react'
import { useInsightsProvider } from './use-insights-provider'

export const useInsights = (component: ComponentType | string): void => {
  const { onUpdated, onUnmounted, onMounted } = useInsightsProvider(
    typeof component === 'string'
      ? component
      : component.displayName ?? component.name
  )
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current && onUpdated()
  })

  useEffect(() => {
    !mounted.current && onMounted()

    mounted.current = true
    return () => {
      onUnmounted()
    }
  }, [])
}
