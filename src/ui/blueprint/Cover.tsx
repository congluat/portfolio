import { motion, useReducedMotion } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi'
import { FaLinkedin } from 'react-icons/fa'
import { profile } from '../../data/profile'
import CountUp from '../../components/CountUp'
import Sparkline from '../../components/Sparkline'
import TitleBlock from './TitleBlock'
import { CornerMarks } from './Sheet'
import { EASE } from './sheets'

const TOTAL_MONTHS = profile.experience.reduce((sum, job) => sum + job.months, 0)

/** Cumulative months, oldest engagement first. */
const GROWTH = [...profile.experience].reverse().reduce<number[]>((series, job) => {
  series.push((series[series.length - 1] ?? 0) + job.months)
  return series
}, [])

const METRICS = [
  { label: 'years in practice', value: 11, suffix: '+' },
  { label: 'engagements', value: profile.experience.length, suffix: '' },
  { label: 'months logged', value: TOTAL_MONTHS, suffix: '' },
]

const [FIRST_NAME, ...LAST_NAME] = profile.name.split(' ')

export default function Cover() {
  const reduce = useReducedMotion()

  return (
    <section id="bp-cover" className="scroll-mt-16 px-3 pb-5 pt-16 sm:px-6 sm:pb-8 sm:pt-24">
      <div className="mx-auto max-w-7xl border border-bp-line/70 p-1.5 sm:p-2.5">
        <div className="relative border border-bp-line bg-bp-panel/50 p-4 sm:p-6 lg:p-9">
          <CornerMarks />

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-bp-line pb-4 text-2xs uppercase tracking-[0.2em] text-draft-faint">
            <span className="flex items-center gap-2 text-draft-mark">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-draft-mark" />
              rev b · in service
            </span>
            <span>dwg no. nl-cv-2026</span>
            <span className="hidden sm:inline">projection · first angle</span>
          </div>

          <div className="pt-7 sm:pt-10">
            <motion.p
              className="text-2xs uppercase tracking-[0.32em] text-draft-faint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              general arrangement
            </motion.p>

            <h1 className="mt-3 text-[2.75rem] font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              {[FIRST_NAME, LAST_NAME.join(' ')].filter(Boolean).map((part, i) => (
                <motion.span
                  key={part}
                  className={`block ${i === 0 ? 'text-draft' : 'text-draft-mark'}`}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: EASE }}
                >
                  {part.toUpperCase()}
                </motion.span>
              ))}
            </h1>

            <svg
              className="mt-4 h-3 w-full max-w-xl text-bp-line"
              viewBox="0 0 400 12"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <motion.path
                d="M0 6 H400"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduce ? 0 : 1.1, delay: 0.35, ease: EASE }}
              />
              <motion.path
                d="M0 0 V12 M400 0 V12"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: reduce ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              />
            </svg>

            <p className="mt-5 text-sm uppercase tracking-[0.16em] text-draft sm:text-base">
              {profile.title}
            </p>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-draft-dim sm:text-sm">
              {profile.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <a
                href="#bp-network"
                className="border border-draft-mark/50 bg-draft-mark/10 px-5 py-2.5 text-2xs uppercase tracking-[0.18em] text-draft-mark transition-colors hover:bg-draft-mark/20"
              >
                open drawing
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-bp-line px-5 py-2.5 text-2xs uppercase tracking-[0.18em] text-draft-dim transition-colors hover:border-draft-faint hover:text-draft"
              >
                <FaLinkedin aria-hidden="true" />
                linkedin
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-2xs text-draft-faint">
              <span className="flex items-center gap-1.5">
                <HiOutlineLocationMarker aria-hidden="true" className="text-draft-mark/70" />
                {profile.location}
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 transition-colors hover:text-draft"
              >
                <HiOutlineMail aria-hidden="true" className="text-draft-mark/70" />
                {profile.email}
              </a>
            </div>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-[1fr_21rem] lg:items-end">
            <div className="grid gap-px border border-bp-line bg-bp-line sm:grid-cols-3">
              {METRICS.map((metric) => (
                <div key={metric.label} className="bg-bp-deep px-4 py-4">
                  <p className="text-2xs uppercase tracking-[0.18em] text-draft-faint">
                    {metric.label}
                  </p>
                  <p className="mt-1.5 text-3xl font-bold leading-none text-draft-mark sm:text-4xl">
                    <CountUp to={metric.value} suffix={metric.suffix} duration={1.6} />
                  </p>
                </div>
              ))}

              <div className="flex items-center justify-between gap-4 bg-bp-deep px-4 py-3 sm:col-span-3">
                <p className="text-2xs uppercase tracking-[0.18em] text-draft-faint">
                  cumulative months · 2014 → now
                </p>
                <Sparkline
                  data={GROWTH}
                  stroke="#ffcf5c"
                  delay={0.5}
                  className="h-8 w-28 shrink-0 sm:w-44"
                />
              </div>
            </div>

            <TitleBlock />
          </div>
        </div>
      </div>
    </section>
  )
}
