import { motion } from 'framer-motion'
import {
  HiOutlineArrowRight,
  HiOutlineExternalLink,
  HiOutlineLocationMarker,
  HiOutlineShieldCheck,
} from 'react-icons/hi'
import { profile } from '../../data/profile'
import CountUp from '../../components/CountUp'
import Sparkline from '../../components/Sparkline'
import Tile, { Chip, TileLabel } from './Tile'
import { CUMULATIVE_MONTHS, DOMAINS, MAX_MONTHS, TIMELINE, TOTAL_MONTHS, YEARS } from './stats'

const FOCUS = profile.subtitle.split(' · ')

export default function Hero() {
  return (
    <section id="profile" className="scroll-mt-28 px-4 pb-8 pt-6 sm:px-6 lg:pb-12">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(9.5rem,auto)]">
        {/* Identity — the anchor tile of the board */}
        <Tile
          span="sm:col-span-2 lg:col-span-2 lg:row-span-2"
          className="relative overflow-hidden p-6 sm:p-8"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-[0.18] blur-2xl"
            style={{ background: 'radial-gradient(circle, #2f6bff 0%, #7c5cff 60%, transparent 70%)' }}
          />

          <div className="relative flex h-full flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 rounded-full border border-pop-teal/30 bg-pop-teal/10 px-3 py-1 font-mono text-2xs uppercase tracking-[0.14em] text-pop-teal">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-pop-teal" />
                Available for work
              </span>
              <TileLabel>Est. 2014</TileLabel>
            </div>

            <h1 className="mt-6 text-[clamp(2.6rem,7vw,4.5rem)] font-bold leading-[0.95] tracking-brutal">
              {profile.name}
            </h1>

            <p className="mt-3 text-lg font-semibold tracking-tight text-pop-blue sm:text-xl">
              {profile.title}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {FOCUS.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-8">
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-2 rounded-full bg-bento-ink px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
              >
                {profile.email}
                <HiOutlineArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-bento-line px-5 py-2.5 text-sm font-medium text-bento-dim transition-colors hover:border-bento-ink/25 hover:text-bento-ink"
              >
                LinkedIn
                <HiOutlineExternalLink size={14} />
              </a>
            </div>
          </div>
        </Tile>

        {/* Years */}
        <Tile delay={0.06} className="flex flex-col justify-between p-6">
          <TileLabel>Experience</TileLabel>
          <div>
            <p className="text-5xl font-bold tracking-brutal text-bento-ink">
              <CountUp to={YEARS} suffix="+" />
            </p>
            <p className="mt-1 text-xs leading-snug text-bento-dim">
              years building backend systems
            </p>
          </div>
          <Sparkline
            data={CUMULATIVE_MONTHS}
            stroke="#2f6bff"
            className="mt-4 h-8 w-full"
            delay={0.3}
          />
        </Tile>

        {/* Companies */}
        <Tile delay={0.12} className="flex flex-col justify-between p-6">
          <TileLabel>Track record</TileLabel>
          <div>
            <p className="text-5xl font-bold tracking-brutal text-bento-ink">
              <CountUp to={profile.experience.length} />
            </p>
            <p className="mt-1 text-xs leading-snug text-bento-dim">
              companies · {DOMAINS.length} industries
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-1">
            {DOMAINS.map((domain) => (
              <span key={domain} className="font-mono text-2xs text-bento-faint">
                {domain}
              </span>
            ))}
          </div>
        </Tile>

        {/* Career load — one bar per role, oldest first */}
        <Tile
          delay={0.18}
          span="sm:col-span-2 lg:col-span-2"
          className="flex flex-col p-6"
        >
          <div className="flex items-baseline justify-between gap-4">
            <TileLabel>Months in production</TileLabel>
            <p className="text-2xl font-bold tracking-tight">
              <CountUp to={TOTAL_MONTHS} />
            </p>
          </div>

          <div className="mt-auto flex items-end gap-1.5 pt-6">
            {TIMELINE.map((job, i) => (
              <div key={job.company} className="group/bar flex-1">
                <motion.div
                  className={`w-full rounded-t-md ${
                    job.featured ? 'bg-gradient-to-t from-pop-blue to-pop-plum' : 'bg-bento-sunk'
                  }`}
                  style={{ transformOrigin: 'bottom' }}
                  initial={{ height: 3, opacity: 0 }}
                  whileInView={{
                    // Straight proportion, with a floor so the 3-month stint
                    // stays visible. A larger baseline would flatter it.
                    height: Math.max(3, Math.round((job.months / MAX_MONTHS) * 68)),
                    opacity: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 130,
                    damping: 18,
                    delay: 0.25 + i * 0.05,
                  }}
                />
                <p className="mt-2 truncate font-mono text-2xs text-bento-faint">{job.months}</p>
              </div>
            ))}
          </div>
        </Tile>

        {/* Summary */}
        <Tile delay={0.24} span="sm:col-span-2 lg:col-span-2" className="p-6 sm:p-8">
          <TileLabel>Summary</TileLabel>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-bento-dim sm:text-base">
            {profile.summary}
          </p>
        </Tile>

        {/* Location */}
        <Tile delay={0.3} className="flex flex-col justify-between p-6">
          <TileLabel>Based in</TileLabel>
          <div>
            <HiOutlineLocationMarker size={22} className="text-pop-coral" />
            <p className="mt-3 text-lg font-semibold leading-tight tracking-tight">
              Ho Chi Minh City
            </p>
            <p className="mt-1 font-mono text-2xs text-bento-faint">Vietnam · GMT+7</p>
          </div>
        </Tile>

        {/* Current focus — the one gradient tile on this board */}
        <Tile
          delay={0.36}
          className="flex flex-col justify-between bg-gradient-to-br from-pop-plum via-pop-blue to-pop-blue p-6 text-white"
        >
          <TileLabel className="text-white/65">Current focus</TileLabel>
          <div>
            <HiOutlineShieldCheck size={22} className="text-white/80" />
            <p className="mt-3 text-lg font-semibold leading-tight tracking-tight">
              Fraud &amp; Financial Crime
            </p>
            <p className="mt-1 font-mono text-2xs text-white/65">
              {profile.experience[0].company.split(' ')[0]} · real-time decisioning
            </p>
          </div>
        </Tile>
      </div>
    </section>
  )
}
