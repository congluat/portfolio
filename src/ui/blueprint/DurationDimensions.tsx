import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../../data/profile'
import Sheet from './Sheet'
import { EASE, companyCode } from './sheets'

const SPANS = [...profile.experience].sort((a, b) => b.months - a.months)
const MAX_MONTHS = SPANS[0].months
const TOTAL_MONTHS = profile.experience.reduce((sum, job) => sum + job.months, 0)

function ArrowHead() {
  return (
    <svg viewBox="0 0 8 10" className="h-2.5 w-2 fill-current" aria-hidden="true">
      <path d="M0 5 L8 0 L8 10 Z" />
    </svg>
  )
}

interface DimensionLineProps {
  widthPct: number
  delay: number
  accent?: boolean
}

/**
 * Dimension line with extension ticks and arrowheads. Narrow spans put their
 * arrows outside the extension lines, the way a drawing does when the
 * dimension is too tight to hold them.
 */
function DimensionLine({ widthPct, delay, accent = false }: DimensionLineProps) {
  const reduce = useReducedMotion()
  const tight = widthPct < 22

  const arrow = {
    initial: { opacity: reduce ? 1 : 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.3, delay: reduce ? 0 : delay + 0.6 },
  }

  return (
    <div
      className={`relative h-3 ${accent ? 'text-draft-mark' : 'text-draft-dim'}`}
      style={{ width: `${widthPct}%` }}
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M0 6 H100"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : delay, ease: EASE }}
        />
        <motion.path
          d="M0 0 V12 M100 0 V12"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.65"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: reduce ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.3, delay: reduce ? 0 : delay + 0.5 }}
        />
      </svg>

      <motion.span
        className={`absolute top-1/2 -translate-y-1/2 ${
          tight ? 'right-full mr-0.5 rotate-180' : 'left-0'
        }`}
        {...arrow}
      >
        <ArrowHead />
      </motion.span>
      <motion.span
        className={`absolute top-1/2 -translate-y-1/2 ${
          tight ? 'left-full ml-0.5' : 'right-0 rotate-180'
        }`}
        {...arrow}
      >
        <ArrowHead />
      </motion.span>
    </div>
  )
}

export default function DurationDimensions() {
  return (
    <Sheet
      id="bp-spans"
      code="A-03"
      title="Engagement spans"
      note="all dimensions in months"
    >
      <div className="space-y-5">
        <div className="border border-bp-line bg-bp-deep px-3 py-3.5 sm:px-4">
          <p className="mb-2 text-2xs uppercase tracking-[0.2em] text-draft-mark">
            overall · {TOTAL_MONTHS} mo logged across {profile.experience.length} engagements
          </p>
          <DimensionLine widthPct={100} delay={0} accent />
        </div>

        <div className="divide-y divide-bp-line border border-bp-line">
          {SPANS.map((job, i) => (
            <div
              key={job.company}
              className="grid grid-cols-[4.5rem_1fr_3rem] items-center gap-2.5 px-3 py-3 transition-colors hover:bg-bp-deep sm:grid-cols-[10rem_1fr_4.5rem] sm:gap-5 sm:px-4"
            >
              <div className="min-w-0">
                <p
                  className={`truncate text-2xs tracking-[0.12em] ${
                    job.featured ? 'text-draft-mark' : 'text-draft'
                  }`}
                >
                  {companyCode(job.company)}
                </p>
                <p className="hidden truncate text-2xs text-draft-faint sm:block">{job.period}</p>
              </div>

              {/* Left padding keeps room for the outward arrows on tight spans. */}
              <div className="flex items-center pl-3">
                <DimensionLine
                  widthPct={(job.months / MAX_MONTHS) * 100}
                  delay={0.12 + i * 0.09}
                  accent={job.featured}
                />
              </div>

              <p
                className={`text-right text-2xs tabular ${
                  job.featured ? 'text-draft-mark' : 'text-draft-dim'
                }`}
              >
                {job.months} MO
              </p>
            </div>
          ))}
        </div>

        <p className="text-2xs uppercase tracking-[0.16em] text-draft-faint">
          scale · longest span ({MAX_MONTHS} mo) drawn full width
        </p>
      </div>
    </Sheet>
  )
}
