import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile } from '../../data/profile'
import CompanyLogo from '../../components/CompanyLogo'
import Sheet from './Sheet'
import JobDetail from './JobDetail'
import type { Job } from './JobDetail'
import useMediaQuery from './useMediaQuery'
import { EASE, companyCode, endLabel, startYear } from './sheets'

/** Oldest engagement first — the diagram reads left to right as a dependency chain. */
const CHAIN: Job[] = [...profile.experience].reverse()

const VB_W = 1240
const VB_H = 440
const STEP = 176
const NODE_W = 116
const ROW_Y = [286, 120]
const AXIS_Y = 402

const NODES = CHAIN.map((job, i) => ({
  job,
  x: 92 + i * STEP,
  y: ROW_Y[i % 2],
}))

const EDGES = NODES.slice(0, -1).map((from, i) => {
  const to = NODES[i + 1]
  const midX = (from.x + to.x) / 2
  const headX = to.x - NODE_W / 2 - 4
  return {
    key: `${from.job.company}→${to.job.company}`,
    d: `M ${from.x + NODE_W / 2 + 4} ${from.y} H ${midX} V ${to.y} H ${headX - 10}`,
    head: `M ${headX} ${to.y} L ${headX - 10} ${to.y - 6} L ${headX - 10} ${to.y + 6} Z`,
    ends: [from.job.company, to.job.company],
  }
})

interface DiagramProps {
  selected: string
  onSelect: (company: string) => void
}

function Diagram({ selected, onSelect }: DiagramProps) {
  const reduce = useReducedMotion()

  return (
    <div className="relative aspect-[1240/440] w-full">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <path
          d={`M 40 ${AXIS_Y} H ${VB_W - 40}`}
          className="stroke-bp-line"
          strokeWidth="1"
          strokeDasharray="7 7"
        />

        {NODES.map((node) => (
          <g key={node.job.company}>
            <path
              d={`M ${node.x} ${node.y + 52} V ${AXIS_Y}`}
              className="stroke-bp-line"
              strokeWidth="1"
              strokeDasharray="3 6"
              strokeOpacity="0.55"
            />
            <text
              x={node.x}
              y={AXIS_Y + 26}
              textAnchor="middle"
              fontSize="16"
              className={node.job.featured ? 'fill-draft-mark' : 'fill-draft-faint'}
            >
              {node.job.featured ? 'NOW' : startYear(node.job.period)}
            </text>
          </g>
        ))}

        {EDGES.map((edge, i) => {
          const on = edge.ends.includes(selected)
          return (
            <g key={edge.key}>
              <motion.path
                d={edge.d}
                className={on ? 'stroke-draft-mark' : 'stroke-bp-line'}
                strokeWidth={on ? 2.2 : 1.4}
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: reduce ? 0 : 0.75,
                  delay: reduce ? 0 : 0.25 + i * 0.15,
                  ease: EASE,
                }}
              />
              <motion.path
                d={edge.head}
                className={on ? 'fill-draft-mark' : 'fill-bp-line'}
                initial={{ opacity: reduce ? 1 : 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.25, delay: reduce ? 0 : 0.9 + i * 0.15 }}
              />
            </g>
          )
        })}
      </svg>

      {NODES.map((node, i) => {
        const active = node.job.company === selected
        return (
          <div
            key={node.job.company}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(node.x / VB_W) * 100}%`,
              top: `${(node.y / VB_H) * 100}%`,
              width: `${(NODE_W / VB_W) * 100}%`,
            }}
          >
            <motion.button
              type="button"
              onClick={() => onSelect(node.job.company)}
              onMouseEnter={() => onSelect(node.job.company)}
              onFocus={() => onSelect(node.job.company)}
              aria-pressed={active}
              aria-label={`${node.job.company} — ${node.job.role}, ${node.job.period}`}
              className={`flex w-full flex-col items-center gap-1.5 border px-2 py-2.5 transition-colors ${
                active
                  ? 'border-draft-mark bg-bp-panel text-draft'
                  : 'border-bp-line bg-bp-deep text-draft-dim hover:border-draft-faint'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: reduce ? 0 : 0.4,
                delay: reduce ? 0 : i * 0.12,
                ease: EASE,
              }}
            >
              <CompanyLogo
                src={node.job.logo}
                company={node.job.company}
                className="h-6 w-6 border border-bp-line bg-white"
                fallbackClassName="text-bp-bg"
              />
              <span className="w-full truncate text-center text-[10px] tracking-[0.08em]">
                {companyCode(node.job.company)}
              </span>
              {node.job.featured && (
                <span className="text-[9px] uppercase tracking-[0.12em] text-draft-mark">
                  current
                </span>
              )}
            </motion.button>
          </div>
        )
      })}
    </div>
  )
}

interface ChainListProps {
  selected: string
  onSelect: (company: string) => void
}

function ChainList({ selected, onSelect }: ChainListProps) {
  return (
    <ol>
      {profile.experience.map((job, i) => {
        const open = job.company === selected
        return (
          <li key={job.company} className="grid grid-cols-[1.25rem_1fr] gap-2">
            <div aria-hidden="true" className="relative flex justify-center">
              <span className="absolute inset-y-0 w-px bg-bp-line" />
              <span
                className={`absolute top-7 h-2 w-2 -translate-y-1/2 rotate-45 border ${
                  job.featured ? 'border-draft-mark bg-draft-mark' : 'border-bp-line bg-bp-deep'
                }`}
              />
            </div>

            <div className="mb-2 border border-bp-line bg-bp-deep">
              <button
                type="button"
                onClick={() => onSelect(open ? '' : job.company)}
                aria-expanded={open}
                className="flex w-full items-center gap-3 px-3 py-3 text-left"
              >
                <span className="text-2xs text-draft-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <CompanyLogo
                  src={job.logo}
                  company={job.company}
                  className="h-8 w-8 border border-bp-line bg-white"
                  fallbackClassName="text-bp-bg"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs text-draft">{job.company}</span>
                  <span className="block truncate text-2xs text-draft-faint">{job.role}</span>
                </span>
                <span
                  className={`shrink-0 text-2xs ${
                    job.featured ? 'text-draft-mark' : 'text-draft-faint'
                  }`}
                >
                  {endLabel(job.period)}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-bp-line p-3.5">
                      <JobDetail job={job} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default function CareerGraph() {
  const [selected, setSelected] = useState(profile.experience[0].company)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const active = profile.experience.find((job) => job.company === selected)

  return (
    <Sheet
      id="bp-network"
      code="A-02"
      title="Career service network"
      note={`${profile.experience.length} nodes · ${CHAIN.length - 1} transitions`}
    >
      {isDesktop ? (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-2xs uppercase tracking-[0.18em] text-draft-faint">
            <span>node = engagement</span>
            <span>edge = transition</span>
            <span>flow → chronological</span>
            <span className="text-draft-mark">hover or click a node to inspect</span>
          </div>

          <Diagram selected={selected} onSelect={setSelected} />

          <motion.div
            key={selected}
            className="border border-bp-line bg-bp-deep p-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <JobDetail job={active ?? profile.experience[0]} />
          </motion.div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-2xs uppercase tracking-[0.18em] text-draft-faint">
            vertical schematic · most recent first · tap a node to expand
          </p>
          <ChainList selected={selected} onSelect={setSelected} />
        </div>
      )}
    </Sheet>
  )
}
