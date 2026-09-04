import { motion } from 'framer-motion'
import { HiOutlineX } from 'react-icons/hi'
import { profile } from '../../data/profile'
import CompanyLogo from '../../components/CompanyLogo'
import { Chip, TileLabel } from './Tile'

type Job = (typeof profile.experience)[number]

interface JobDetailProps {
  job: Job
  layoutId: string
  onClose: () => void
}

export default function JobDetail({ job, layoutId, onClose }: JobDetailProps) {
  return (
    <motion.div
      layoutId={layoutId}
      role="dialog"
      aria-modal="true"
      aria-label={`${job.company} — ${job.role}`}
      className="pointer-events-auto flex max-h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-bento-line bg-bento-tile shadow-[0_40px_100px_-40px_rgba(22,22,26,0.55)]"
    >
      <div className="flex items-start gap-4 border-b border-bento-line px-6 py-5 sm:px-8">
        <CompanyLogo
          src={job.logo}
          company={job.company}
          className="h-12 w-12 rounded-2xl border border-bento-line bg-white"
          fallbackClassName="text-bento-ink"
        />

        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
            {job.company}
          </h3>
          <p className="mt-1 text-sm text-bento-dim">{job.role}</p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close details"
          className="shrink-0 rounded-full bg-bento-sunk p-2.5 text-bento-dim transition-colors hover:text-bento-ink"
        >
          <HiOutlineX size={16} />
        </button>
      </div>

      <div className="overflow-y-auto px-6 py-6 sm:px-8">
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-2xs uppercase tracking-[0.14em] text-bento-faint">
          <span>{job.period}</span>
          <span>{job.duration}</span>
          <span>{job.location}</span>
        </div>

        <p className="mt-5 border-l-2 border-pop-blue pl-4 text-[0.95rem] leading-relaxed text-bento-dim">
          {job.description}
        </p>

        {job.projects && job.projects.length > 0 && (
          <div className="mt-8">
            <TileLabel>Selected projects</TileLabel>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {job.projects.map((project) => (
                <div
                  key={project.name}
                  className="rounded-2xl border border-bento-line bg-bento-sunk/45 p-4"
                >
                  <p className="text-sm font-semibold tracking-tight">{project.name}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-bento-dim">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <TileLabel>What I did</TileLabel>
          <ul className="mt-3 space-y-2.5">
            {job.highlights.map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-bento-dim">
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-pop-teal" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-1.5 border-t border-bento-line pt-6">
          {job.tech.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
