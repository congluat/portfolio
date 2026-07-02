import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { profile } from '../data/profile'
import SectionHeading from './SectionHeading'

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <SectionHeading
          tag="Education"
          title="Academic"
          highlight="background"
        />

        <div className="mt-16 space-y-6">
          {profile.education.map((edu, i) => (
            <motion.div
              key={edu.school}
              className="glass rounded-2xl p-6 sm:p-8 flex gap-4 sm:gap-6 items-start group hover:glow-cyan transition-shadow duration-500"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ x: 4 }}
            >
              <motion.div
                className="p-3 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 shrink-0"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <HiOutlineAcademicCap className="w-6 h-6 text-accent-cyan" />
              </motion.div>
              <div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-gradient transition-all">
                  {edu.school}
                </h3>
                <p className="text-white/60 mt-1">{edu.degree}</p>
                <p className="text-sm font-mono text-white/30 mt-2">{edu.period}</p>
                {edu.note && (
                  <span className="inline-block mt-2 text-xs text-accent-purple/80">
                    {edu.note}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {profile.awards.length > 0 && (
          <motion.div
            className="mt-8 glass rounded-2xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <span className="text-2xl mb-2 block">🏆</span>
            {profile.awards.map((award) => (
              <p key={award} className="text-white/60 text-sm sm:text-base">
                {award}
              </p>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
