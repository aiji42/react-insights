import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef
} from 'react'

type InsightsRecord = {
  name: string
  type: 'MOUNTED' | 'UNMOUNTED' | 'UPDATED'
  params?: Record<string, number | string | boolean>
}

type InsightsProviderValue = {
  push: (item: InsightsRecord) => void
}

const Context = createContext<InsightsProviderValue>({
  push: () => {}
})

export const InsightsProvider: FC = ({ children }) => {
  const ref = useRef<Array<InsightsRecord>>([])
  useEffect(() => {
    setInterval(() => console.log(ref.current), 5000)
  }, [])
  const push = useCallback((item: InsightsRecord) => {
    ref.current.push(item)
  }, [])

  return <Context.Provider value={{ push }}>{children}</Context.Provider>
}

export const useInsightsProvider = () => {
  return useContext(Context)
}
