import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { HiOutlineBriefcase } from 'react-icons/hi'
import { profile } from '../data/profile'
import SectionHeading from './SectionHeading'

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <SectionHeading
          tag="Career"
          title="Professional"
          highlight="journey"
        />

        <div className="relative mt-16">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-white/10">
            <motion.div
              className="w-full bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-pink origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-8">
            {profile.experience.map((job, i) => (
              <motion.article
                key={`${job.company}-${job.period}`}
                className="relative pl-12 sm:pl-20"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <motion.div
                  className={`absolute left-2 sm:left-6 top-6 w-4 h-4 rounded-full border-2 ${
                    job.featured
                      ? 'border-accent-cyan bg-accent-cyan/20 glow-cyan'
                      : 'border-accent-purple/50 bg-surface'
                  }`}
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.2 }}
                />

                <motion.div
                  className={`glass rounded-2xl p-6 sm:p-8 group hover:border-accent-cyan/20 transition-all duration-500 ${
                    job.featured ? 'glow-cyan border-accent-cyan/10' : ''
                  }`}
                  whileHover={{ y: -4 }}
                >
                  {job.featured && (
                    <span className="inline-block px-2 py-0.5 mb-3 text-[10px] font-mono uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 rounded">
                      Current
                    </span>
                  )}

                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                        {job.role}
                      </h3>
                      <p className="text-accent-cyan/80 font-medium flex items-center gap-2 mt-1">
                        <HiOutlineBriefcase className="shrink-0" />
                        {job.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/50 font-mono">{job.period}</p>
                      <p className="text-xs text-white/30">{job.duration}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {job.highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        className="text-sm sm:text-base text-white/60 flex gap-2"
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.05 }}
                      >
                        <span className="text-accent-purple mt-1.5 shrink-0">▸</span>
                        {h}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-mono text-white/40 bg-white/5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
