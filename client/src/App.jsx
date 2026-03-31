import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { LoadingScreen } from './components/ui/FloatingElements'

// Public
import HomePage from './pages/HomePage'

// Admin pages
import AdminLogin    from './pages/admin/AdminLogin'
import AdminLayout   from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProjects  from './pages/admin/AdminProjects'
import AdminServices  from './pages/admin/AdminServices'
import AdminAbout     from './pages/admin/AdminAbout'
import AdminMessages  from './pages/admin/AdminMessages'

export default function App() {
  const [appLoading, setAppLoading] = useState(true)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0a1628',
              color: '#e2e8f0',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#3b82f6', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />

        {/* App-level loading screen (brand intro) */}
        <AnimatePresence mode="wait">
          {appLoading && (
            <LoadingScreen key="loader" onComplete={() => setAppLoading(false)} />
          )}
        </AnimatePresence>

        {!appLoading && (
          <Routes>
            {/* ── Public ─────────────────────────────────── */}
            <Route path="/" element={<HomePage />} />

            {/* ── Admin login — always reachable ─────────── */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ── /admin → /admin/dashboard shortcut ──────── */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

            {/* ── Protected zone ───────────────────────────
                ProtectedRoute renders <Outlet />.
                AdminLayout is a nested layout that also renders <Outlet />.
                Child routes fill the inner outlet.
            ──────────────────────────────────────────────── */}
            <Route path="/admin/*" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index                  element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard"       element={<AdminDashboard />} />
                <Route path="projects"        element={<AdminProjects />}  />
                <Route path="services"        element={<AdminServices />}  />
                <Route path="about"           element={<AdminAbout />}     />
                <Route path="messages"        element={<AdminMessages />}  />
                {/* Unknown admin path → dashboard */}
                <Route path="*"               element={<Navigate to="dashboard" replace />} />
              </Route>
            </Route>

            {/* ── Global 404 → home ──────────────────────── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </AuthProvider>
  )
}
