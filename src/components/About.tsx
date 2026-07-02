import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { profile } from '../data/profile'
import SectionHeading from './SectionHeading'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: '9+', label: 'Years Experience' },
    { value: '7', label: 'Companies' },
    { value: '3', label: 'Cloud Platforms' },
    { value: '∞', label: 'Lines of Java' },
  ]

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <SectionHeading
          tag="About Me"
          title="Building systems that"
          highlight="matter"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-6">
              {profile.summary}
            </p>

            <div className="flex flex-wrap gap-2">
              {profile.certifications.map((cert, i) => (
                <motion.span
                  key={cert}
                  className="px-3 py-1.5 rounded-lg glass text-xs sm:text-sm text-white/60"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {cert}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass rounded-2xl p-6 sm:p-8 text-center group hover:glow-cyan transition-shadow duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="font-display text-4xl sm:text-5xl font-bold text-gradient mb-2"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
