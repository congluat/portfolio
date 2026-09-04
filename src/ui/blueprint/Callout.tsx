import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from './sheets'

interface CalloutProps {
  /** Balloon number, as used to key an annotation to a drawing. */
  tag: string
  label: string
  children: ReactNode
  delay?: number
}

/**
 * A drafting leader line: balloon + label on the left, a shoulder and a
 * diagonal that lands a dot on the annotated body.
 */
export default function Callout({ tag, label, children, delay = 0 }: CalloutProps) {
  const reduce = useReducedMotion()

  const line = {
    initial: { pathLength: reduce ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: reduce ? 0 : 0.7, delay: reduce ? 0 : delay, ease: EASE },
  }

  const dot = {
    initial: { opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.3, delay: reduce ? 0 : delay + 0.6 },
  }

  return (
    <div className="grid gap-1.5 sm:grid-cols-[9.5rem_3.5rem_1fr] sm:gap-0">
      <div className="flex items-start gap-2 sm:justify-end">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-draft-mark/60 text-[9px] text-draft-mark">
          {tag}
        </span>
        <span className="pt-1 text-2xs uppercase leading-3 tracking-[0.18em] text-draft-mark sm:text-right">
          {label}
        </span>
      </div>

      <svg
        className="hidden h-14 w-14 text-draft-mark/70 sm:block"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
      >
        <motion.path d="M0 9 H18 L48 38" stroke="currentColor" strokeWidth="1" {...line} />
        <motion.circle cx="50" cy="39.5" r="2.5" fill="currentColor" {...dot} />
      </svg>

      <svg
        className="h-4 w-full text-draft-mark/70 sm:hidden"
        viewBox="0 0 100 16"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M2 0 V10 H98"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          {...line}
        />
      </svg>

      <div className="min-w-0">{children}</div>
    </div>
  )
}
