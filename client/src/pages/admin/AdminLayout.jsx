import { useState } from 'react'
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import {
  HiViewGrid, HiFolder, HiCog, HiUser, HiMail,
  HiLogout, HiChevronRight, HiX
} from 'react-icons/hi'

const navItems = [
  { to: '/admin/dashboard', icon: HiViewGrid, label: 'Dashboard' },
  { to: '/admin/projects',  icon: HiFolder,   label: 'Projects'  },
  { to: '/admin/services',  icon: HiCog,      label: 'Services'  },
  { to: '/admin/about',     icon: HiUser,     label: 'About'     },
  { to: '/admin/messages',  icon: HiMail,     label: 'Messages'  },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* ── Sidebar ────────────────────────────────────────── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative flex-shrink-0 bg-dark-800 border-r border-white/5 flex flex-col overflow-hidden"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-white/5 gap-3 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-xs font-mono">SL</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="text-white font-semibold text-sm whitespace-nowrap"
              >
                Web<span className="text-blue-400">Pulse</span> Admin
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                 ${isActive
                   ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                   : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
                 }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className="flex-shrink-0" />

                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-sm font-medium whitespace-nowrap flex-1"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {isActive && !collapsed && (
                    <HiChevronRight size={14} className="text-blue-400 flex-shrink-0" />
                  )}

                  {/* Tooltip when collapsed */}
                  {collapsed && (
                    <span className="pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap rounded-lg bg-dark-700 border border-white/10 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      {label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User + logout */}
        <div className="p-3 border-t border-white/5 flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-3 px-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">
                  {user?.email?.charAt(0).toUpperCase() ?? 'A'}
                </span>
              </div>
              <div className="overflow-hidden">
                <div className="text-white text-xs font-medium truncate">{user?.email ?? 'Admin'}</div>
                <div className="text-gray-600 text-xs">Administrator</div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-500
                        hover:text-red-400 hover:bg-red-500/10 transition-all duration-200
                        ${collapsed ? 'justify-center' : ''}`}
          >
            <HiLogout size={17} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>

        {/* Collapse toggle button */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="absolute top-[18px] -right-3 z-10 w-6 h-6 flex items-center justify-center
                     rounded-full bg-dark-700 border border-white/10
                     text-gray-400 hover:text-white hover:border-blue-500/40 transition-all duration-200"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <motion.span
            animate={{ rotate: collapsed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <HiChevronRight size={12} />
          </motion.span>
        </button>
      </motion.aside>

      {/* ── Main content area ───────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-dark-800/60 border-b border-white/5 flex items-center px-6 gap-4 backdrop-blur-sm flex-shrink-0">
          <h2 className="text-white font-medium text-sm">SLWebPulse Admin</h2>
          <div className="ml-auto flex items-center gap-2 text-xs text-gray-500 font-mono">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            System Online
          </div>
        </header>

        {/* Page outlet */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
