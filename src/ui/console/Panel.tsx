import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface PanelProps {
  /** Short machine-style label shown in the panel header */
  label: string
  /** Optional right-aligned metadata in the header */
  meta?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
  delay?: number
}

export default function Panel({
  label,
  meta,
  children,
  className = '',
  bodyClassName = '',
  delay = 0,
}: PanelProps) {
  return (
    <motion.div
      className={`panel corner-ticks ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="panel-head">
        <span className="text-signal-green">▸</span>
        <span className="flex-1 truncate">{label}</span>
        {meta && <span className="shrink-0 normal-case tracking-normal">{meta}</span>}
      </div>
      <div className={bodyClassName || 'p-4 sm:p-6'}>{children}</div>
    </motion.div>
  )
}
