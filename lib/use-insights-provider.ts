import { v4 as uuidv4 } from 'uuid'
import { useCallback, useContext, useRef } from 'react'
import { Context, InsightsRecord } from './InsightsProvider'

export const useInsightsProvider = (name: string) => {
  const uuid = useRef(uuidv4())
  const { push } = useContext(Context)
  const onMounted = useCallback(
    (params?: InsightsRecord['params']) => {
      push({
        sequence: uuid.current,
        name,
        processedAt: Date.now(),
        type: 'MOUNTED',
        params
      })
    },
    [push, name]
  )
  const onUnmounted = useCallback(
    (params?: InsightsRecord['params']) => {
      push({
        sequence: uuid.current,
        name,
        processedAt: Date.now(),
        type: 'UNMOUNTED',
        params
      })
    },
    [push, name]
  )
  const onUpdated = useCallback(
    (params?: InsightsRecord['params']) => {
      push({
        sequence: uuid.current,
        name,
        processedAt: Date.now(),
        type: 'UPDATED',
        params
      })
    },
    [push, name]
  )

  return { onMounted, onUnmounted, onUpdated }
}
