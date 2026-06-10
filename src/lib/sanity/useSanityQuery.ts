import { useEffect, useState } from 'react'
import { sanityClient } from './client'

// Session-level cache so route changes don't refetch identical queries.
const cache = new Map<string, unknown>()

interface QueryState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useSanityQuery<T>(query: string): QueryState<T> {
  const cached = cache.get(query) as T | undefined
  const [state, setState] = useState<QueryState<T>>({
    data: cached ?? null,
    loading: cached === undefined,
    error: null,
  })

  useEffect(() => {
    if (cache.has(query)) return
    let cancelled = false
    sanityClient
      .fetch<T>(query)
      .then((data) => {
        cache.set(query, data)
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((error: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error })
      })
    return () => {
      cancelled = true
    }
  }, [query])

  return state
}
