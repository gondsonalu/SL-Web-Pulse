import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * ProtectedRoute — wraps admin layout routes.
 *
 * Usage in App.jsx:
 *   <Route path="/admin/*" element={<ProtectedRoute />}>
 *     <Route path="dashboard" element={<AdminDashboard />} />
 *     ...
 *   </Route>
 *
 * If authenticated  → renders the nested <Outlet> (child routes)
 * If not            → redirects to /admin/login
 * While loading     → shows a spinner (max 4s thanks to AuthContext timeout)
 */
export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020409] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-600 text-xs font-mono">Verifying session…</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  // Authenticated — render whatever child route matched
  return <Outlet />
}
