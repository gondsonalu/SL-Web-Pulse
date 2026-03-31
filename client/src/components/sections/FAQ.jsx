import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPlus, HiMinus } from 'react-icons/hi'

const faqs = [
  {
    q: 'How much does a website cost?',
    a: 'Our pricing starts from ₹15,000 for a basic business website. E-commerce platforms start from ₹40,000, and custom web applications are quoted based on requirements. We offer flexible payment plans to suit every budget.'
  },
  {
    q: 'How long does it take to build a website?',
    a: 'A standard business website takes 7–14 days. E-commerce stores take 3–5 weeks. Complex web applications can take 6–12 weeks depending on features. We always provide a clear timeline before starting.'
  },
  {
    q: 'Do you provide hosting and domain services?',
    a: 'Yes! We handle everything — domain registration, hosting setup, SSL certificates, and deployment. We use reliable platforms like Vercel, AWS, and DigitalOcean for maximum uptime and performance.'
  },
  {
    q: 'Will my website be mobile-friendly?',
    a: 'Absolutely. Every website we build is fully responsive and tested on all screen sizes — mobile, tablet, and desktop. We follow a mobile-first approach to ensure the best experience for all users.'
  },
  {
    q: 'Do you provide SEO optimization?',
    a: 'Yes, all our websites come with on-page SEO basics included — meta tags, structured data, semantic HTML, sitemap, and performance optimization. We also offer advanced SEO packages separately.'
  },
  {
    q: 'Can I update the website content myself?',
    a: 'Yes! We build a custom admin panel or integrate a CMS so you can easily update content, add blog posts, manage products, and more — without any coding knowledge.'
  },
  {
    q: 'Do you offer post-launch support?',
    a: 'We offer 30 days of free post-launch support for bug fixes and minor changes. After that, we have affordable monthly maintenance packages starting from ₹2,000/month.'
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Absolutely! Website redesign is one of our specialties. We analyze your current site, understand your goals, and create a modern, high-performance version that truly represents your brand.'
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      data-aos="fade-up"
      data-aos-delay={index * 50}
      className={`glass-card border transition-all duration-300 cursor-pointer
        ${open ? 'border-blue-500/30 bg-blue-500/5' : 'hover:border-blue-500/20'}`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-6">
        <h3 className={`font-medium text-base pr-4 transition-colors duration-200 ${open ? 'text-blue-300' : 'text-white'}`}>
          {faq.q}
        </h3>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300
          ${open ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-400'}`}>
          {open ? <HiMinus size={16} /> : <HiPlus size={16} />}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="h-px bg-white/5 mb-4" />
              <p className="text-gray-400 leading-relaxed text-sm">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-dark-900 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="section-tag">❓ Got Questions?</span>
          <h2 className="section-heading text-white">
            Frequently <span className="gradient-text">Asked</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mt-4">
            Everything you need to know about working with us. Still have questions? Just reach out.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <div className="text-center mt-12" data-aos="fade-up">
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Ask Us Directly →
          </button>
        </div>
      </div>
    </section>
  )
}
