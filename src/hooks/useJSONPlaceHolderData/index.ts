import axios from 'axios'
import { useState } from 'react'

interface URLParams {
  resourceUrl: string
  limit?: number
}

export function useJSONPlaceHolderData<T>(
  { resourceUrl, limit = 10 }: URLParams,
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

      const { data: respData } = await axios.get(`${resourceUrl}?_page=${page}&_limit=${limit}`)

      if (!respData.length) {
        setHasMore(false)
        return
      }

      const newData: T[] = respData.map(dataBuilder)

      setData((data) => [...data, ...newData])
    } catch (error) {
      console.log(error)
      setError(true)
    } finally {
      setLoading(false)
      setPage(page + 1)
    }
  }

  return {
    data,
    hasMore,
    isLoading,
    error,
    loadMore,
  }
}
