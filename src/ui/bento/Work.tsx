import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineArrowUpRight } from 'react-icons/hi2'
import { profile } from '../../data/profile'
import CompanyLogo from '../../components/CompanyLogo'
import Board from './Board'
import JobDetail from './JobDetail'
import { Chip, TILE_SURFACE, TileLabel } from './Tile'
import { TOTAL_MONTHS } from './stats'

type Job = (typeof profile.experience)[number]

/** Deliberately uneven spans so the board reads as a curated wall, not a list. */
const SPANS = [
  'sm:col-span-2 lg:col-span-2 lg:row-span-2',
  '',
  '',
  '',
  '',
  'sm:col-span-2 lg:col-span-2',
  'sm:col-span-2 lg:col-span-2',
]

const ENTRANCE = { type: 'spring', stiffness: 150, damping: 20, mass: 0.7 } as const

function layoutIdFor(job: Job) {
  return `bento-job-${job.company}`
}

interface CompanyTileProps {
  job: Job
  index: number
  expanded: boolean
  onOpen: () => void
}

function CompanyTile({ job, index, expanded, onOpen }: CompanyTileProps) {
  const featured = Boolean(job.featured)

  return (
    <motion.div
      className={SPANS[index] ?? ''}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...ENTRANCE, delay: (index % 4) * 0.06 }}
    >
      {/* No pointer tilt here — a rotated ancestor breaks layoutId measurement. */}
      <motion.div
        layoutId={layoutIdFor(job)}
        className={`h-full ${TILE_SURFACE} transition-shadow duration-300 hover:shadow-[0_4px_8px_-4px_rgba(22,22,26,0.08),0_28px_60px_-30px_rgba(22,22,26,0.4)]`}
      >
        <button
          onClick={onOpen}
          aria-expanded={expanded}
          aria-haspopup="dialog"
          className="group flex h-full w-full flex-col p-6 text-left"
        >
          <div className="flex w-full items-start gap-3">
            <CompanyLogo
              src={job.logo}
              company={job.company}
              className={`${
                featured ? 'h-12 w-12' : 'h-10 w-10'
              } rounded-xl border border-bento-line bg-white transition-transform duration-300 group-hover:scale-105`}
              fallbackClassName="text-bento-ink"
            />

            {featured && (
              <span className="flex items-center gap-1.5 rounded-full border border-pop-teal/30 bg-pop-teal/10 px-2.5 py-1 font-mono text-2xs uppercase tracking-[0.14em] text-pop-teal">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-pop-teal" />
                Current
              </span>
            )}

            <HiOutlineArrowUpRight
              size={16}
              className="ml-auto shrink-0 text-bento-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pop-blue"
            />
          </div>

          <h3
            className={`mt-5 font-semibold leading-tight tracking-tight ${
              featured ? 'text-2xl sm:text-3xl' : 'text-base'
            }`}
          >
            {job.company}
          </h3>

          <p className={`mt-1.5 text-bento-dim ${featured ? 'text-base' : 'text-xs'}`}>
            {job.role}
          </p>

          {featured && (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-bento-dim">
              {job.description}
            </p>
          )}

          {featured && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {job.tech.slice(0, 6).map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
              <Chip className="border-transparent bg-transparent text-bento-faint">
                +{job.tech.length - 6} more
              </Chip>
            </div>
          )}

          <div className="mt-auto flex w-full flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-6">
            <TileLabel>{job.period}</TileLabel>
            <TileLabel className="text-bento-dim">{job.duration}</TileLabel>
          </div>
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function Work() {
  const [activeCompany, setActiveCompany] = useState<string | null>(null)
  const activeJob = profile.experience.find((job) => job.company === activeCompany)

  useEffect(() => {
    if (!activeJob) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveCompany(null)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeJob])

  return (
    <>
      <Board
        id="work"
        eyebrow="Experience"
        title="Where I've shipped"
        meta={`${profile.experience.length} companies · ${TOTAL_MONTHS} months`}
      >
        {profile.experience.map((job, i) => (
          <CompanyTile
            key={job.company}
            job={job}
            index={i}
            expanded={activeCompany === job.company}
            onOpen={() => setActiveCompany(job.company)}
          />
        ))}
      </Board>

      <AnimatePresence>
        {activeJob && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-bento-ink/25 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setActiveCompany(null)}
            aria-hidden="true"
          />
        )}

        {activeJob && (
          /* No exit transition: the grid tile owns the morph back via layoutId. */
          <div
            key="panel"
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <JobDetail
              job={activeJob}
              layoutId={layoutIdFor(activeJob)}
              onClose={() => setActiveCompany(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
