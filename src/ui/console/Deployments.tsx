import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../../data/profile'
import Panel from './Panel'
import CompanyLogo from '../../components/CompanyLogo'

type Job = (typeof profile.experience)[number]

const MAX_MONTHS = Math.max(...profile.experience.map((job) => job.months))

interface LogRowProps {
  job: Job
  index: number
  open: boolean
  onToggle: () => void
}

function LogRow({ job, index, open, onToggle }: LogRowProps) {
  const start = job.period.split(' — ')[0]
  const state = job.featured ? 'ACTIVE' : 'CLOSED'

  return (
    <motion.div
      className="group border-b border-console-border last:border-b-0"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={`grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-3 py-3.5 text-left transition-colors hover:bg-console-hover sm:px-4 md:grid-cols-[92px_auto_1fr_150px_84px] md:gap-4 ${
          open ? 'bg-console-raised' : ''
        }`}
      >
        {/* timestamp */}
        <span className="hidden font-mono text-2xs text-ink-faint md:block">{start}</span>

        <CompanyLogo src={job.logo} company={job.company} />

        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-ink">{job.company}</span>
          <span className="block truncate font-mono text-2xs text-ink-faint">{job.role}</span>
        </span>

        {/* duration bar */}
        <span className="hidden md:block">
          <span className="mb-1 block font-mono text-2xs text-ink-faint">{job.duration}</span>
          <span className="block h-1 w-full bg-console-border">
            <motion.span
              className={`block h-full ${job.featured ? 'bg-signal-green' : 'bg-signal-blue/55'}`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: job.months / MAX_MONTHS }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + index * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </span>
        </span>

        <span className="flex items-center justify-end gap-2">
          <span
            className={`font-mono text-2xs tracking-wider ${
              job.featured ? 'text-signal-green' : 'text-ink-faint/70'
            }`}
          >
            {state}
          </span>
          <motion.span
            className="font-mono text-2xs text-ink-faint"
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.25 }}
          >
            ▸
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-console-bg/60"
          >
            <div className="space-y-5 border-t border-console-border px-4 py-5 sm:px-6 md:pl-[124px]">
              <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-2xs text-ink-faint md:hidden">
                <span>{job.period}</span>
                <span>{job.duration}</span>
              </div>

              <p className="border-l border-signal-green/40 pl-4 text-sm leading-relaxed text-ink-dim">
                {job.description}
              </p>

              <p className="font-mono text-2xs text-ink-faint">
                <span className="text-ink-dim">location</span> · {job.location}
              </p>

              {job.projects && job.projects.length > 0 && (
                <div>
                  <p className="mb-2.5 font-mono text-2xs uppercase tracking-[0.18em] text-signal-blue/80">
                    payloads
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {job.projects.map((project) => (
                      <div
                        key={project.name}
                        className="border border-console-border bg-console-panel p-3.5"
                      >
                        <p className="mb-1 font-mono text-xs font-medium text-ink">
                          {project.name}
                        </p>
                        <p className="text-xs leading-relaxed text-ink-faint">
                          {project.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="mb-2.5 font-mono text-2xs uppercase tracking-[0.18em] text-signal-blue/80">
                  operations
                </p>
                <ul className="space-y-1.5">
                  {job.highlights.map((line) => (
                    <li key={line} className="flex gap-2.5 text-xs leading-relaxed text-ink-dim">
                      <span className="mt-0.5 shrink-0 font-mono text-signal-green/60">›</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 border-t border-console-border pt-4">
                {job.tech.map((tech) => (
                  <span
                    key={tech}
                    className="border border-console-border px-2 py-0.5 font-mono text-2xs text-ink-faint"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Deployments() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="deployments" className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Panel
          label="deployment log"
          meta={
            <span className="font-mono text-2xs text-ink-faint">
              {profile.experience.length} records · 132 mos
            </span>
          }
          bodyClassName=""
        >
          <div className="hidden grid-cols-[92px_auto_1fr_150px_84px] gap-4 border-b border-console-border px-4 py-2 font-mono text-2xs uppercase tracking-[0.16em] text-ink-faint/70 md:grid">
            <span>start</span>
            <span />
            <span>target / role</span>
            <span>duration</span>
            <span className="text-right">state</span>
          </div>

          {profile.experience.map((job, i) => (
            <LogRow
              key={job.company}
              job={job}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </Panel>
      </div>
    </section>
  )
}
