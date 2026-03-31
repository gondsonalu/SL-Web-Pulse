import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')

    if (!token) {
      // No token — not logged in, unblock immediately
      setLoading(false)
      return
    }

    // Safety timeout: if server never responds (offline/cold start),
    // stop blocking the UI after 4s and clear the stale token.
    const timeout = setTimeout(() => {
      localStorage.removeItem('admin_token')
      setLoading(false)
    }, 4000)

    authAPI.verify()
      .then(res => setUser(res.data.user))
      .catch(() => {
        // Token invalid or server error — clear it
        localStorage.removeItem('admin_token')
      })
      .finally(() => {
        clearTimeout(timeout)
        setLoading(false)
      })

    return () => clearTimeout(timeout)
  }, [])

  const login = async (credentials) => {
    const res = await authAPI.login(credentials)
    localStorage.setItem('admin_token', res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
