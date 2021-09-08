import { useEffect, useRef } from 'react'

export const useInsights = (name?: string): void => {
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current && console.log(`${name ?? ''}: updated.`)
  })

  useEffect(() => {
    !mounted.current && console.log(`${name ?? ''}: mounted.`)
    mounted.current = true
    return () => {
      console.log(`${name ?? ''}: unmounted.`)
    }
  }, [])
}
