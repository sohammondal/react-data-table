import axios from 'axios'
import { useEffect, useState } from 'react'

interface URLParams {
  resourceUrl: string
  limit?: number
  query?: string
}

export function useJSONPlaceHolderData<T>(
  { resourceUrl, limit = 10, query = '' }: URLParams,
  dataBuilder: (...args: never[]) => T,
) {
  const [data, setData] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const loadMore = async () => {
    try {
      setLoading(true)

      const queryParams = new URLSearchParams({
        _page: `${page}`,
        _limit: `${limit}`,
        ...(query ? { q: query } : {}),
      }).toString()

      const { data: respData } = await axios.get(`${resourceUrl}?${queryParams}`)

      if (!respData.length) return setHasMore(false)

      const newData: T[] = respData.map(dataBuilder)

      setData((data) => [...data, ...newData])
    } catch (error) {
      console.error(error)
      setError(true)
    } finally {
      setLoading(false)
      setPage((page) => page + 1)
    }
  }

  const resetState = () => {
    setPage(1)
    setData([])
    setHasMore(true)
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (!query) return resetState()

        setLoading(true)

        const queryParams = new URLSearchParams({
          _page: '1',
          _limit: `${limit}`,
          ...(query ? { q: query } : {}),
        }).toString()

        const { data: respData } = await axios.get(`${resourceUrl}?${queryParams}`)

        const newData: T[] = respData.map(dataBuilder)

        setPage(2)
        setData(newData)
      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [query])

  return {
    data,
    hasMore,
    isLoading,
    error,
    loadMore,
  }
}
