import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { contactAPI } from '../../utils/api'
import { HiMail, HiPhone, HiCheck, HiExternalLink } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const fetchMessages = async () => {
    try {
      const res = await contactAPI.getAll()
      setMessages(res.data || [])
    } catch {
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMessages() }, [])

  const markRead = async (id) => {
    try {
      await contactAPI.markRead(id)
      setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m))
    } catch {}
  }

  const handleSelect = (msg) => {
    setSelected(msg)
    if (!msg.is_read) markRead(msg.id)
  }

  const unreadCount = messages.filter(m => !m.is_read).length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-semibold">Messages</h1>
        <p className="text-gray-500 text-sm">
          {messages.length} total · <span className="text-blue-400">{unreadCount} unread</span>
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <HiMail className="text-gray-600 text-4xl mx-auto mb-4" />
          <p className="text-gray-400">No messages yet.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-5">
          {/* Message list */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                layout
                onClick={() => handleSelect(msg)}
                className={`glass-card p-4 cursor-pointer transition-all duration-200
                  ${selected?.id === msg.id ? 'border-blue-500/40 bg-blue-500/5' : 'hover:border-blue-500/20'}
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-colors
                    ${msg.is_read ? 'bg-gray-700' : 'bg-blue-400'}`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-sm font-medium ${msg.is_read ? 'text-gray-400' : 'text-white'}`}>
                        {msg.name}
                      </span>
                      <span className="text-gray-600 text-xs">
                        {new Date(msg.created_at).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs truncate">{msg.email}</p>
                    <p className="text-gray-400 text-xs truncate mt-1">{msg.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 sticky top-6"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{selected.name}</h3>
                    <p className="text-gray-500 text-xs mt-0.5 font-mono">
                      {new Date(selected.created_at).toLocaleString('en-IN')}
                    </p>
                  </div>
                  {selected.is_read && (
                    <span className="flex items-center gap-1 text-green-400 text-xs bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full">
                      <HiCheck size={12} /> Read
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/5">
                    <HiMail className="text-blue-400 flex-shrink-0" />
                    <a href={`mailto:${selected.email}`} className="text-blue-300 hover:text-blue-200 text-sm transition-colors">
                      {selected.email}
                    </a>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/5">
                      <HiPhone className="text-blue-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{selected.phone}</span>
                    </div>
                  )}
                  {selected.service && (
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <span className="text-gray-500 text-xs font-mono">Service: </span>
                      <span className="text-blue-300 text-sm">{selected.service}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-white/3 rounded-xl border border-white/5 mb-6">
                  <p className="text-gray-400 text-xs font-mono mb-2">Message:</p>
                  <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>

                <div className="flex gap-3">
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your inquiry at SLWebPulse`}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm"
                  >
                    <HiExternalLink /> Reply via Email
                  </a>
                  {selected.phone && (
                    <a
                      href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=Hi ${selected.name}, thanks for reaching out to SLWebPulse!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex-1 flex items-center justify-center gap-2 text-sm text-green-400 border-green-500/30 hover:bg-green-500/10"
                    >
                      <FaWhatsapp /> WhatsApp
                    </a>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="glass-card p-12 text-center h-full flex items-center justify-center">
                <div>
                  <HiMail className="text-gray-700 text-5xl mx-auto mb-4" />
                  <p className="text-gray-600">Select a message to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
