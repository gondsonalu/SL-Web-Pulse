import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { aboutAPI } from '../../utils/api'
import { HiCheckCircle, HiLightningBolt, HiHeart, HiStar } from 'react-icons/hi'

const defaultAbout = {
  heading: 'Building Digital Excellence',
  description: `We are a passionate team of developers, designers, and strategists based in India. 
  Since 2019, we've been helping businesses establish a powerful online presence through clean code, 
  stunning design, and data-driven strategies.`,
  mission: 'Our mission is to democratize access to world-class web development, making premium digital experiences affordable for every business — from startups to enterprises.',
  ceo_name: 'Suraj L.',
  ceo_title: 'CEO & Lead Developer',
  ceo_image: null,
  values: [
    { icon: 'HiLightningBolt', title: 'Speed', desc: 'Fast delivery without compromising quality' },
    { icon: 'HiHeart', title: 'Passion', desc: 'We love what we build and it shows' },
    { icon: 'HiStar', title: 'Excellence', desc: 'Every pixel, every line of code matters' },
    { icon: 'HiCheckCircle', title: 'Reliability', desc: '24/7 support and on-time delivery' },
  ],
  skills: ['React', 'Node.js', 'Next.js', 'Supabase', 'PostgreSQL', 'MongoDB', 'AWS', 'Figma', 'TailwindCSS', 'TypeScript']
}

const iconMap = { HiLightningBolt, HiHeart, HiStar, HiCheckCircle }

export default function About() {
  const [about, setAbout] = useState(defaultAbout)

  useEffect(() => {
    aboutAPI.get()
      .then(res => { if (res.data) setAbout({ ...defaultAbout, ...res.data }) })
      .catch(() => {})
  }, [])

  return (
    <section id="about" className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Bg glow */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="section-tag">🏢 Who We Are</span>
          <h2 className="section-heading text-white">
            About <span className="gradient-text">Us</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left — CEO card */}
          <motion.div
            data-aos="fade-right"
            className="relative"
          >
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400" />
              
              {/* CEO Avatar */}
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 overflow-hidden">
                  {about.ceo_image ? (
                    <img src={about.ceo_image} alt={about.ceo_name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-2xl font-mono">{about.ceo_name?.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">{about.ceo_name}</div>
                  <div className="text-blue-400 text-sm font-mono">{about.ceo_title}</div>
                </div>
              </div>

              <h3 className="text-white text-2xl font-semibold mb-4">{about.heading}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{about.description}</p>
              
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-gray-300 text-sm leading-relaxed italic">"{about.mission}"</p>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-2xl border border-blue-500/20 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-500/10 rounded-xl border border-cyan-500/20 -z-10" />
          </motion.div>

          {/* Right — Values */}
          <div data-aos="fade-left">
            <h3 className="text-white text-2xl font-semibold mb-8">Our Core Values</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {(about.values || defaultAbout.values).map((val) => {
                const IconComp = iconMap[val.icon] || HiCheckCircle
                return (
                  <div key={val.title} className="glass-card-hover p-5">
                    <IconComp className="text-blue-400 text-2xl mb-3" />
                    <div className="text-white font-medium mb-1">{val.title}</div>
                    <div className="text-gray-500 text-sm">{val.desc}</div>
                  </div>
                )
              })}
            </div>

            {/* Tech stack */}
            <div>
              <h4 className="text-gray-400 text-sm font-mono mb-4">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {(about.skills || defaultAbout.skills).map((skill) => (
                  <span key={skill} className="text-sm font-mono text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full hover:bg-blue-500/20 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
