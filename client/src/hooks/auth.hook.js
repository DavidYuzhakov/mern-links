import { useCallback, useEffect, useState } from "react"

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null) 
  const [isReady, setIsReady] = useState(false)
  const [userId, setUserId] = useState(null) 

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwtToken }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token && data.userId) {
      login(data.token, data.userId)
    }

    setIsReady(true)
  }, [login])

  return {login, logout, token, userId, isReady}
}