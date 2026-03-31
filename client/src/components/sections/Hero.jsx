import { motion } from 'framer-motion'
import { HiArrowRight, HiChat } from 'react-icons/hi'
import { HiSparkles } from 'react-icons/hi2'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-900/30 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] animate-blob" style={{ animationDelay: '6s' }} />
      </div>
      
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-dark-900/50 to-dark-900" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <span className="section-tag">
              <HiSparkles className="text-blue-400" />
              Premium Web Development Agency · India
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1 variants={itemVariants} className="mb-6">
            <span className="block font-display text-6xl md:text-8xl lg:text-[110px] text-white tracking-wider leading-none">
              SLWeb
              <span className="gradient-text">Pulse</span>
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 mt-4 tracking-wide">
              Powering Your{' '}
              <span className="relative inline-block">
                <span className="text-blue-400 font-medium">Online Presence</span>
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
              </span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed mb-12"
          >
            We craft stunning, high-performance websites that turn visitors into customers. 
            From MVPs to enterprise platforms — we build it all with precision and speed.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-primary flex items-center justify-center gap-2 text-base"
            >
              Get Started <HiArrowRight />
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-outline flex items-center justify-center gap-2 text-base"
            >
              <HiChat /> Contact Us
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { number: '150+', label: 'Projects Delivered' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '5+', label: 'Years Experience' },
              { number: '50+', label: 'Happy Clients' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card px-4 py-5 text-center group hover:border-blue-500/20 transition-all duration-300"
              >
                <div className="text-3xl font-display tracking-wider text-white group-hover:text-blue-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-blue-500/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
