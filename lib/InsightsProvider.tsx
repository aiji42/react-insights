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
    const intervalRef = setInterval(() => {
      pushHarperData(ref.current)
      ref.current = []
    }, interval)
    return () => {
      clearInterval(intervalRef)
    }
  }, [interval])
  const push = useCallback((item: InsightsRecord) => {
    ref.current.push(item)
  }, [])

  return <Context.Provider value={{ push }}>{children}</Context.Provider>
}

const pushHarperData = (records: InsightsRecord[]) => {
  if (records.length < 1) return
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `${import.meta.env.VITE_HARPER_TOKEN}`)

  const body = JSON.stringify({
    operation: 'insert',
    schema: 'react_insight',
    table: 'insights',
    records: records.map((record) => ({
      ...record,
      location: window.location,
      userAgent: window.navigator.userAgent,
      language: window.navigator.language
    }))
  })

  const requestOptions = {
    method: 'POST',
    headers,
    body
  }

  fetch('https://samle-cloud-aiji.harperdbcloud.com', requestOptions)
}
