import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { profile } from '../data/profile'
import SectionHeading from './SectionHeading'
import CompanyLogo from './CompanyLogo'

type Job = (typeof profile.experience)[number]

function ExperienceCard({ job, index }: { job: Job; index: number }) {
  return (
    <motion.article
      className="relative pl-20 sm:pl-24"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute left-0 sm:left-2 top-4 z-10">
        <CompanyLogo src={job.logo} alt={`${job.company} logo`} company={job.company} />
      </div>

      <motion.div
        className={`glass rounded-2xl p-5 sm:p-7 group hover:border-accent-cyan/20 transition-all duration-500 ${
          job.featured ? 'glow-cyan border-accent-cyan/10' : ''
        }`}
        whileHover={{ y: -4 }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="min-w-0">
            {job.featured && (
              <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-mono uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 rounded">
                Current
              </span>
            )}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300">
              {job.role}
            </h3>
            <p className="text-accent-cyan/80 font-medium mt-1">{job.company}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm text-white/50 font-mono">{job.period}</p>
            <p className="text-xs text-white/30">{job.duration}</p>
            <p className="text-xs text-white/40 flex items-center justify-end gap-1 mt-1">
              <HiOutlineLocationMarker className="shrink-0" />
              {job.location}
            </p>
          </div>
        </div>

        {job.description && (
          <p className="text-sm text-white/50 leading-relaxed mb-4 border-l-2 border-accent-purple/30 pl-4">
            {job.description}
          </p>
        )}

        {job.projects && job.projects.length > 0 && (
          <div className="space-y-2 mb-4">
            <p className="text-xs font-mono uppercase tracking-wider text-accent-cyan/70">
              Key Projects
            </p>
            {job.projects.map((project) => (
              <div
                key={project.name}
                className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4"
              >
                <h4 className="font-medium text-white/90 text-sm sm:text-base mb-1">
                  {project.name}
                </h4>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {job.highlights.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-mono uppercase tracking-wider text-accent-cyan/70 mb-2">
              Responsibilities & Achievements
            </p>
            <ul className="space-y-1.5">
              {job.highlights.map((h, j) => (
                <li key={j} className="text-sm text-white/60 flex gap-2">
                  <span className="text-accent-purple mt-1.5 shrink-0">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
          {job.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs font-mono text-white/40 bg-white/5 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <SectionHeading tag="Career" title="Professional" highlight="journey" />

        <div className="relative mt-16">
          <div className="absolute left-7 sm:left-11 top-0 bottom-0 w-px bg-white/10">
            <motion.div
              className="w-full bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-pink origin-top"
              initial={{ height: '0%' }}
              animate={inView ? { height: '100%' } : { height: '0%' }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>

          <div className="space-y-8">
            {profile.experience.map((job, i) => (
              <ExperienceCard key={`${job.company}-${job.period}`} job={job} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
