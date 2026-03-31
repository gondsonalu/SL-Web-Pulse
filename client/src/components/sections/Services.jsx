import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { servicesAPI } from '../../utils/api'
import {
  HiCode, HiDeviceMobile, HiShoppingCart, HiChartBar,
  HiColorSwatch, HiCloud, HiArrowRight
} from 'react-icons/hi'

const defaultServices = [
  {
    id: 1,
    icon: 'HiCode',
    title: 'Custom Web Development',
    description: 'Full-stack web applications built with modern technologies. React, Node.js, and cutting-edge frameworks tailored to your business needs.',
    features: ['React / Next.js', 'Node.js Backend', 'REST APIs', 'Database Design'],
    color: 'blue',
  },
  {
    id: 2,
    icon: 'HiDeviceMobile',
    title: 'Responsive Design',
    description: 'Mobile-first designs that look stunning on every screen size. Pixel-perfect UI/UX that converts visitors into loyal customers.',
    features: ['Mobile First', 'Cross-browser', 'Accessibility', 'Performance'],
    color: 'cyan',
  },
  {
    id: 3,
    icon: 'HiShoppingCart',
    title: 'E-Commerce Solutions',
    description: 'Complete online stores with payment integration, inventory management, and seamless checkout experiences.',
    features: ['Payment Gateway', 'Inventory System', 'Cart & Checkout', 'Analytics'],
    color: 'violet',
  },
  {
    id: 4,
    icon: 'HiChartBar',
    title: 'SEO & Performance',
    description: 'Rank higher on Google with technical SEO, Core Web Vitals optimization, and lightning-fast load times.',
    features: ['Core Web Vitals', 'Technical SEO', 'Speed Optimization', 'Analytics Setup'],
    color: 'green',
  },
  {
    id: 5,
    icon: 'HiColorSwatch',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed to delight users and drive conversions. From wireframes to final polished UI.',
    features: ['Figma Design', 'Prototyping', 'Brand Identity', 'Design System'],
    color: 'orange',
  },
  {
    id: 6,
    icon: 'HiCloud',
    title: 'Deployment & Hosting',
    description: 'Reliable, scalable cloud deployment on Vercel, AWS, or your preferred platform with CI/CD pipelines.',
    features: ['Vercel / AWS', 'CI/CD Pipeline', 'SSL & Security', 'Monitoring'],
    color: 'pink',
  },
]

const iconMap = {
  HiCode, HiDeviceMobile, HiShoppingCart, HiChartBar, HiColorSwatch, HiCloud
}

const colorMap = {
  blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40 text-blue-400',
  cyan: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400',
  violet: 'from-violet-500/20 to-violet-600/5 border-violet-500/20 hover:border-violet-500/40 text-violet-400',
  green: 'from-green-500/20 to-green-600/5 border-green-500/20 hover:border-green-500/40 text-green-400',
  orange: 'from-orange-500/20 to-orange-600/5 border-orange-500/20 hover:border-orange-500/40 text-orange-400',
  pink: 'from-pink-500/20 to-pink-600/5 border-pink-500/20 hover:border-pink-500/40 text-pink-400',
}

export default function Services() {
  const [services, setServices] = useState(defaultServices)

  useEffect(() => {
    servicesAPI.getAll()
      .then(res => { if (res.data?.length) setServices(res.data) })
      .catch(() => {}) // fallback to defaults
  }, [])

  return (
    <section id="services" className="py-24 relative bg-dark-900">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="section-tag">⚡ What We Do</span>
          <h2 className="section-heading text-white">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4">
            End-to-end digital solutions that scale with your business
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const IconComponent = iconMap[service.icon] || HiCode
            const colorClass = colorMap[service.color] || colorMap.blue
            
            return (
              <motion.div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                whileHover={{ y: -4 }}
                className={`group relative bg-gradient-to-br ${colorClass} border backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 cursor-default overflow-hidden`}
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shimmer-bg transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-current/20 to-current/5 flex items-center justify-center mb-5 border border-current/20`}>
                    <IconComponent size={22} />
                  </div>
                  
                  <h3 className="text-white font-semibold text-lg mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>
                  
                  <ul className="flex flex-wrap gap-2">
                    {(service.features || []).map((feat) => (
                      <li key={feat} className="text-xs font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12" data-aos="fade-up">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline flex items-center gap-2 mx-auto"
          >
            Get a Free Quote <HiArrowRight />
          </button>
        </div>
      </div>
    </section>
  )
}
