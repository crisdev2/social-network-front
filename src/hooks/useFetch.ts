import axios, { AxiosError } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { AxiosConfig } from '../utilities/axios'

export const useFetch = (path: string) => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<null | AxiosError>(null)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [lastRequest, setLastRequest] = useState<number>(Date.now())
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  const handleReload = () => {
    setLastRequest(Date.now())
  }

  const requestTime = useMemo(() => (end - start), [end, start])

  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      try {
        setStart(Date.now())
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/${path}`, {
          ...AxiosConfig,
          signal: abortController.signal,
        })
        setData(response.data)
        setLoaded(true)
      } catch (error) {
        const err = error as AxiosError
        if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
          setError(err)
          setLoaded(false)
        }
      } finally {
        setEnd(Date.now())
      }
    }
    fetchData()
    return () => {
      setData(null)
      setError(null)
      setLoaded(false)
      console.log('Unmount component')
      return abortController.abort()
    }
  }, [lastRequest])

  return { data, error, loaded, handleReload, requestTime }
}
