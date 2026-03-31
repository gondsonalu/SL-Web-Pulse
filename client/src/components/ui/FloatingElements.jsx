import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/919876543210?text=Hi%20SLWebPulse!%20I'm%20interested%20in%20your%20web%20development%20services."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Chat on WhatsApp"
        >
          {/* Ping rings */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-10" style={{ animationDelay: '0.5s' }} />
          
          <div className="relative w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/40 group-hover:shadow-green-500/60 transition-shadow">
            <FaWhatsapp size={28} className="text-white" />
          </div>

          {/* Tooltip */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-dark-800 border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Chat with us!
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  )
}

export function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-900"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-500/40"
        >
          <span className="text-white font-bold text-2xl font-mono">SL</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="text-white font-semibold text-xl mb-1">
            Web<span className="text-blue-400">Pulse</span>
          </div>
          <div className="text-gray-600 text-xs font-mono">Powering your online presence...</div>
        </motion.div>

        {/* Progress bar */}
        <motion.div className="w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
