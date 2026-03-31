import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { projectsAPI } from '../../utils/api'
import { HiExternalLink, HiCode } from 'react-icons/hi'

const defaultProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-featured online store with real-time inventory, Razorpay integration, and admin dashboard.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    category: 'E-Commerce',
    image_url: null,
    live_url: '#',
    github_url: '#',
  },
  {
    id: 2,
    title: 'SaaS Dashboard',
    description: 'Analytics platform with real-time charts, user management, and subscription billing system.',
    tech: ['Next.js', 'Supabase', 'Chart.js', 'Tailwind'],
    category: 'SaaS',
    image_url: null,
    live_url: '#',
    github_url: '#',
  },
  {
    id: 3,
    title: 'Restaurant Web App',
    description: 'Online ordering system with table booking, menu management, and WhatsApp notifications.',
    tech: ['React', 'Firebase', 'Razorpay', 'Twilio'],
    category: 'Food & Beverage',
    image_url: null,
    live_url: '#',
    github_url: '#',
  },
  {
    id: 4,
    title: 'Real Estate Portal',
    description: 'Property listing platform with advanced filters, map view, and lead management CRM.',
    tech: ['React', 'Node.js', 'MongoDB', 'Maps API'],
    category: 'Real Estate',
    image_url: null,
    live_url: '#',
    github_url: '#',
  },
  {
    id: 5,
    title: 'Educational Platform',
    description: 'Online learning platform with video courses, quizzes, progress tracking, and certificates.',
    tech: ['Next.js', 'PostgreSQL', 'AWS S3', 'Stripe'],
    category: 'EdTech',
    image_url: null,
    live_url: '#',
    github_url: '#',
  },
  {
    id: 6,
    title: 'Healthcare Booking',
    description: 'Doctor appointment system with SMS reminders, patient records, and billing management.',
    tech: ['React', 'Node.js', 'MySQL', 'SMS API'],
    category: 'Healthcare',
    image_url: null,
    live_url: '#',
    github_url: '#',
  },
]

const gradients = [
  'from-blue-600/30 to-cyan-600/10',
  'from-violet-600/30 to-blue-600/10',
  'from-cyan-600/30 to-teal-600/10',
  'from-indigo-600/30 to-violet-600/10',
  'from-blue-600/30 to-indigo-600/10',
  'from-teal-600/30 to-cyan-600/10',
]

export default function Projects() {
  const [projects, setProjects] = useState(defaultProjects)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    projectsAPI.getAll()
      .then(res => { if (res.data?.length) setProjects(res.data) })
      .catch(() => {})
  }, [])

  const categories = ['All', ...new Set(projects.map(p => p.category))]
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="py-24 bg-dark-800 relative">
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="section-tag">🚀 Portfolio</span>
          <h2 className="section-heading text-white">
            Our <span className="gradient-text">Work</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4">
            Real projects. Real results. Explore our portfolio of successful digital products.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10" data-aos="fade-up">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'glass-card text-gray-400 hover:text-white hover:border-blue-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              data-aos="fade-up"
              data-aos-delay={i * 60}
              className="glass-card overflow-hidden group hover:border-blue-500/30 transition-all duration-300"
            >
              {/* Project image / placeholder */}
              <div className={`relative h-48 bg-gradient-to-br ${gradients[i % gradients.length]} overflow-hidden`}>
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <HiCode size={48} className="text-blue-400/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                <span className="absolute top-3 left-3 text-xs font-mono text-blue-300 bg-blue-500/20 border border-blue-500/20 px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {(project.tech || []).map(t => (
                    <span key={t} className="text-xs font-mono text-gray-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.live_url && project.live_url !== '#' && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                      <HiExternalLink /> Live Demo
                    </a>
                  )}
                  {project.github_url && project.github_url !== '#' && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors">
                      <HiCode /> Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
