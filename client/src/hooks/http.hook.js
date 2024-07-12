import { useCallback, useState } from "react"

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    try {
      setLoading(true)
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const resp = await fetch(url, { method, body, headers })
      const data = await resp.json()
      if (!resp.ok) {
        if (data.length > 0) {
          data.forEach(err => {
            throw Error(err.msg)
          })
        } else {
          throw new Error(data.message || 'Something went wrong...')
        }
      }

      return data
    } catch (e) {
      setError(e.message)
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = () => setError(null)
  return {
    error, request, loading, clearError
  }
}