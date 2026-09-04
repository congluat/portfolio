import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Type that slides up from behind a mask — the editorial reveal signature.
 *
 * The observer has to sit on the outer mask, not on the moving span: an
 * IntersectionObserver treats content clipped by an ancestor's overflow as
 * off-screen, so observing the span that starts translated out of the mask
 * would never report it as visible and the reveal would never fire.
 */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <span ref={ref} className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '115%' }}
        animate={inView ? { y: '0%' } : { y: '115%' }}
        transition={{ duration: 0.85, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

interface RuleProps {
  delay?: number
  className?: string
}

/** Hairline or heavy rule that draws itself from the left. */
export function Rule({ delay = 0, className = 'h-px bg-graphite' }: RuleProps) {
  return (
    <motion.div
      className={`w-full origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: EASE }}
    />
  )
}

interface SectionHeadProps {
  index: string
  title: string
  aside?: string
}

export function SectionHead({ index, title, aside }: SectionHeadProps) {
  return (
    <header className="mb-10 sm:mb-14">
      <Rule className="h-[3px] bg-graphite" />
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 pt-3">
        <span className="font-mono text-2xs tracking-[0.2em] text-vermilion">{index}</span>
        <h2 className="font-sans text-2xl font-extrabold uppercase tracking-brutal sm:text-4xl">
          <Reveal delay={0.05}>{title}</Reveal>
        </h2>
        {aside && (
          <span className="ml-auto font-mono text-2xs uppercase tracking-[0.16em] text-graphite-faint">
            {aside}
          </span>
        )}
      </div>
    </header>
  )
}
