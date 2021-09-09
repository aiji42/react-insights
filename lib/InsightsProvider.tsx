import React, { createContext, FC, useCallback, useEffect, useRef } from 'react'

export type InsightsRecord = {
  sequence: string
  name: string
  type: 'MOUNTED' | 'UNMOUNTED' | 'UPDATED'
  processedAt: number
  params?: Record<string, number | string | boolean>
}

type InsightsProviderValue = {
  push: (item: InsightsRecord) => void
}

export const Context = createContext<InsightsProviderValue>({
  push: () => {}
})

type InsightsProviderProps = {
  interval?: number
}

export const InsightsProvider: FC<InsightsProviderProps> = ({
  children,
  interval = 5000
}) => {
  const ref = useRef<Array<InsightsRecord>>([])
  useEffect(() => {
    const intervalRef = setInterval(() => console.log(ref.current), interval)
    return () => {
      clearInterval(intervalRef)
    }
  }, [interval])
  const push = useCallback((item: InsightsRecord) => {
    ref.current.push(item)
  }, [])

  return <Context.Provider value={{ push }}>{children}</Context.Provider>
}
