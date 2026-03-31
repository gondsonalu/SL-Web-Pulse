import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projectsAPI, contactAPI } from '../../utils/api'
import { HiFolder, HiMail, HiEye, HiTrendingUp, HiArrowRight } from 'react-icons/hi'

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card p-6 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-300"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 ${color}`} />
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-xs font-mono mb-2">{label}</p>
        <p className="text-white text-3xl font-display tracking-wider">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} opacity-80 flex items-center justify-center`}>
        <Icon className="text-white" size={18} />
      </div>
    </div>
  </motion.div>
)

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, messages: 0, unread: 0 })
  const [recentMessages, setRecentMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([projectsAPI.getAll(), contactAPI.getAll()])
      .then(([proj, msgs]) => {
        const messages = msgs.data || []
        setStats({
          projects: proj.data?.length || 0,
          messages: messages.length,
          unread: messages.filter(m => !m.is_read).length,
        })
        setRecentMessages(messages.slice(0, 5))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const statCards = [
    { icon: HiFolder, label: 'Total Projects', value: stats.projects, color: 'from-blue-500 to-blue-700 bg-blue-500', delay: 0 },
    { icon: HiMail, label: 'Total Messages', value: stats.messages, color: 'from-violet-500 to-violet-700 bg-violet-500', delay: 0.1 },
    { icon: HiEye, label: 'Unread Messages', value: stats.unread, color: 'from-cyan-500 to-cyan-700 bg-cyan-500', delay: 0.2 },
    { icon: HiTrendingUp, label: 'Services Active', value: 6, color: 'from-green-500 to-emerald-700 bg-green-500', delay: 0.3 },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-semibold mb-1">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(card => <StatCard key={card.label} {...card} />)}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-white font-medium mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Add New Project', to: '/admin/projects?action=new', color: 'text-blue-400' },
              { label: 'Edit Services', to: '/admin/services', color: 'text-cyan-400' },
              { label: 'Update About Section', to: '/admin/about', color: 'text-violet-400' },
              { label: 'View Messages', to: '/admin/messages', color: 'text-green-400' },
            ].map(action => (
              <Link
                key={action.label}
                to={action.to}
                className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/6 border border-white/5 hover:border-blue-500/20 transition-all duration-200 group"
              >
                <span className={`text-sm ${action.color}`}>{action.label}</span>
                <HiArrowRight className="text-gray-600 group-hover:text-gray-400 transition-colors" size={14} />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Recent Messages</h3>
            <Link to="/admin/messages" className="text-blue-400 text-xs hover:text-blue-300">View all →</Link>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : recentMessages.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-8">No messages yet</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recentMessages.map(msg => (
                <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${msg.is_read ? 'bg-gray-600' : 'bg-blue-400'}`} />
                  <div className="min-w-0">
                    <div className="text-white text-sm font-medium truncate">{msg.name}</div>
                    <div className="text-gray-500 text-xs truncate">{msg.message}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
