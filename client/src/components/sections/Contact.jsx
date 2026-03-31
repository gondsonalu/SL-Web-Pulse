import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { contactAPI } from '../../utils/api'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi'

const contactInfo = [
  { icon: HiMail, label: 'Email', value: 'hello@slwebpulse.com', href: 'mailto:hello@slwebpulse.com' },
  { icon: HiPhone, label: 'WhatsApp', value: '+91 98765 43210', href: 'https://wa.me/919876543210' },
  { icon: HiLocationMarker, label: 'Location', value: 'India (Remote Worldwide)', href: null },
]

const services = [
  'Business Website', 'E-Commerce Store', 'Web Application',
  'Landing Page', 'Website Redesign', 'Other'
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }

    setLoading(true)
    try {
      await contactAPI.send(form)
      toast.success('Message sent! We\'ll reply within 24 hours. 🚀')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch (err) {
      toast.error('Failed to send. Please try WhatsApp or email directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-dark-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="section-tag">📨 Let's Talk</span>
          <h2 className="section-heading text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4">
            Ready to build something amazing? Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6" data-aos="fade-right">
            {contactInfo.map((item) => (
              <div key={item.label} className="glass-card p-5 flex items-center gap-4 hover:border-blue-500/20 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-blue-400 text-xl" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-mono">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-white hover:text-blue-300 transition-colors font-medium text-sm">
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-white font-medium text-sm">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Response time */}
            <div className="glass-card p-5 border-blue-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-mono">Available Now</span>
              </div>
              <p className="text-gray-400 text-sm">We typically respond within 2–4 hours during business hours (IST).</p>
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            data-aos="fade-left"
            className="lg:col-span-3 glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400" />

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-gray-400 text-xs font-mono mb-2 block">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-mono mb-2 block">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="rahul@company.com"
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-gray-400 text-xs font-mono mb-2 block">Phone (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-mono mb-2 block">Service Required</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="input-field appearance-none"
                >
                  <option value="" className="bg-dark-900">Select a service</option>
                  {services.map(s => (
                    <option key={s} value={s} className="bg-dark-900">{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-gray-400 text-xs font-mono mb-2 block">Your Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project — what do you need, timeline, budget, etc."
                rows={5}
                className="input-field resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <HiPaperAirplane className="rotate-45" />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
