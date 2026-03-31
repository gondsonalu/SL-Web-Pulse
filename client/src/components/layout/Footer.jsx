import { Link } from 'react-router-dom'
import { HiHeart } from 'react-icons/hi'
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'

const footerLinks = {
  Services: ['Web Development', 'E-Commerce', 'UI/UX Design', 'SEO Optimization', 'Web Apps'],
  Company: ['About Us', 'Projects', 'Testimonials', 'Blog', 'Careers'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'],
}

const socials = [
  { icon: FaTwitter, href: 'https://twitter.com/slwebpulse', label: 'Twitter' },
  { icon: FaLinkedin, href: 'https://linkedin.com/company/slwebpulse', label: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com/slwebpulse', label: 'GitHub' },
  { icon: FaInstagram, href: 'https://instagram.com/slwebpulse', label: 'Instagram' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-900 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm font-mono">SL</span>
              </div>
              <span className="text-white font-semibold text-lg">
                Web<span className="text-blue-400">Pulse</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Powering businesses across India and beyond with premium web development services. 
              Your success is our mission.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 glass-card flex items-center justify-center text-gray-500 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-medium text-sm mb-4">{title}</h4>
              <ul className="flex flex-col gap-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
          <p>© {year} SLWebPulse. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <HiHeart className="text-red-500 animate-pulse" /> in India
          </p>
          <p className="font-mono">
            <span className="text-green-400">●</span> All systems operational
          </p>
        </div>
      </div>
    </footer>
  )
}
