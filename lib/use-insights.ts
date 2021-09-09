import { ComponentType, useEffect, useRef } from 'react'
import { useInsightsProvider } from './use-insights-provider'

export const useInsights = (component: ComponentType): void => {
  const { onUpdated, onUnmounted, onMounted } = useInsightsProvider(
    component.displayName ?? component.name
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
