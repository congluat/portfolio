import { motion } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi'
import { FaLinkedin } from 'react-icons/fa'
import { profile } from '../data/profile'
import ScrambleText from './ScrambleText'
import CountUp from './CountUp'
import Sparkline from './Sparkline'

const METRICS = [
  {
    label: 'years_active',
    note: 'since 2014',
    value: 11,
    suffix: '+',
    series: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    color: '#3ddc97',
  },
  {
    label: 'deployments',
    note: 'companies shipped with',
    value: 7,
    suffix: '',
    series: [1, 2, 2, 3, 4, 5, 6, 7],
    color: '#5aa9ff',
  },
  {
    label: 'domains',
    note: 'banking · commerce · insurance · trading',
    value: 4,
    suffix: '',
    series: [1, 1, 2, 2, 3, 3, 4, 4],
    color: '#a78bfa',
  },
]

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

export default function Overview() {
  const ticker = profile.experience.map((job) => ({
    stamp: job.period.split(' — ')[0],
    company: job.company,
    role: job.role.split(' · ')[0],
    state: job.featured ? 'ACTIVE' : 'CLOSED',
  }))

  return (
    <section id="overview" className="relative px-4 pb-12 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="grid gap-4 lg:grid-cols-[1.12fr_1fr]"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09, delayChildren: 1.2 }}
        >
          {/* Operator identity */}
          <motion.div
            variants={fade}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="panel corner-ticks flex flex-col justify-between p-5 sm:p-8"
          >
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-2xs uppercase tracking-[0.2em] text-ink-faint">
                <span className="flex items-center gap-1.5 text-signal-green">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal-green" />
                  available
                </span>
                <span>clearance · senior</span>
              </div>

              <h1 className="font-mono text-[2.5rem] font-bold leading-[0.95] tracking-tighter text-ink sm:text-6xl lg:text-7xl">
                <ScrambleText text="NGUYEN" delay={1300} className="block" />
                <ScrambleText
                  text="LUAT"
                  delay={1600}
                  className="block text-signal-green text-glow-green"
                />
              </h1>

              <p className="mt-5 text-lg text-ink-dim sm:text-xl">{profile.title}</p>
              <p className="mt-2 max-w-md font-mono text-xs leading-relaxed text-ink-faint sm:text-sm">
                {profile.subtitle}
              </p>
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="#deployments"
                  className="group flex items-center gap-2 border border-signal-green/40 bg-signal-green/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-signal-green transition-colors hover:bg-signal-green/20"
                >
                  <span className="animate-blink">▸</span>
                  inspect log
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-console-border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ink-dim transition-colors hover:border-ink-faint hover:text-ink"
                >
                  <FaLinkedin />
                  linkedin
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-console-border pt-5 font-mono text-2xs text-ink-faint">
                <span className="flex items-center gap-1.5">
                  <HiOutlineLocationMarker className="text-signal-green/70" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineMail className="text-signal-blue/70" />
                  {profile.email}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Live metrics */}
          <motion.div
            variants={fade}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="panel corner-ticks"
          >
            <div className="panel-head">
              <span className="text-signal-green">▸</span>
              <span className="flex-1">system metrics</span>
              <span className="normal-case tracking-normal text-signal-green/70">realtime</span>
            </div>

            <div className="divide-y divide-console-border">
              {METRICS.map((metric, i) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between gap-4 p-5 sm:px-6 sm:py-7"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-2xs uppercase tracking-[0.16em] text-ink-faint">
                      {metric.label}
                    </p>
                    <p
                      className="mt-1.5 font-mono text-3xl font-bold leading-none sm:text-4xl"
                      style={{ color: metric.color }}
                    >
                      <CountUp to={metric.value} suffix={metric.suffix} duration={1.8} />
                    </p>
                    <p className="mt-2 font-mono text-2xs text-ink-faint/70">{metric.note}</p>
                  </div>

                  <Sparkline
                    data={metric.series}
                    stroke={metric.color}
                    delay={0.4 + i * 0.12}
                    className="h-9 w-24 shrink-0 sm:w-32"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Career event ticker */}
        <motion.div
          className="panel mt-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <div className="flex items-center">
            <span className="shrink-0 border-r border-console-border bg-console-raised px-4 py-2.5 font-mono text-2xs uppercase tracking-[0.18em] text-signal-green">
              event stream
            </span>

            <div className="relative flex-1 overflow-hidden py-2.5">
              <motion.div
                className="flex w-max gap-8 whitespace-nowrap font-mono text-2xs"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
              >
                {[...ticker, ...ticker].map((event, i) => (
                  <span key={i} className="flex items-center gap-2.5 text-ink-faint">
                    <span className="text-ink-dim">{event.stamp}</span>
                    <span className="text-ink">{event.company}</span>
                    <span>{event.role}</span>
                    <span
                      className={
                        event.state === 'ACTIVE' ? 'text-signal-green' : 'text-ink-faint/60'
                      }
                    >
                      [{event.state}]
                    </span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
