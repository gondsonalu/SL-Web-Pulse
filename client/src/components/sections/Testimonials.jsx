import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'CEO, TechStartup India',
    avatar: 'RS',
    rating: 5,
    text: 'SLWebPulse transformed our startup\'s digital presence completely. The website they built is not just beautiful — it\'s fast, SEO-optimized, and has increased our leads by 300% in just 3 months!',
    location: 'Mumbai, India',
  },
  {
    id: 2,
    name: 'Priya Mehta',
    role: 'Founder, DesignCo',
    avatar: 'PM',
    rating: 5,
    text: 'Working with SLWebPulse was a game-changer. They delivered our e-commerce platform ahead of schedule, and their attention to detail is extraordinary. Highly recommend!',
    location: 'Bangalore, India',
  },
  {
    id: 3,
    name: 'Arjun Patel',
    role: 'Director, EduTech Solutions',
    avatar: 'AP',
    rating: 5,
    text: 'The team is incredibly responsive and technically brilliant. They built our learning platform from scratch and it handles thousands of concurrent users without a hitch.',
    location: 'Ahmedabad, India',
  },
  {
    id: 4,
    name: 'Sneha Verma',
    role: 'Restaurant Owner',
    avatar: 'SV',
    rating: 5,
    text: 'I needed an online ordering system for my restaurant. SLWebPulse delivered exactly what I envisioned — and my online orders have tripled since launch. Worth every rupee!',
    location: 'Delhi, India',
  },
  {
    id: 5,
    name: 'Kiran Reddy',
    role: 'CTO, FinTech Startup',
    avatar: 'KR',
    rating: 5,
    text: 'Their code quality is exceptional. Clean, well-documented, and scalable. The admin dashboard they built has made our operations 10x more efficient.',
    location: 'Hyderabad, India',
  },
]

const avatarColors = ['from-blue-500 to-blue-700', 'from-violet-500 to-purple-700', 'from-cyan-500 to-teal-700', 'from-pink-500 to-rose-700', 'from-amber-500 to-orange-600']

export default function Testimonials() {
  const swiperRef = useRef(null)

  return (
    <section id="testimonials" className="py-24 bg-dark-800 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute left-0 top-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="section-tag">⭐ Client Love</span>
          <h2 className="section-heading text-white">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4">
            Don't just take our word for it — hear from the businesses we've helped grow.
          </p>
        </div>

        <div className="relative" data-aos="fade-up" data-aos-delay="100">
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper }}
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={t.id}>
                <div className="glass-card p-6 h-full relative group hover:border-blue-500/20 transition-all duration-300">
                  {/* Quote mark */}
                  <div className="absolute top-4 right-5 text-5xl text-blue-500/10 font-display leading-none select-none">"</div>
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <HiStar key={j} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
                    "{t.text}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-xs font-mono">{t.avatar}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{t.name}</div>
                      <div className="text-gray-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <span className="text-xs font-mono text-gray-600">{t.location}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom nav */}
          <div className="flex justify-center gap-3 mt-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/30 transition-all duration-200"
            >
              <HiChevronLeft />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/30 transition-all duration-200"
            >
              <HiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
