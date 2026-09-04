import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './sheets'

/** Registration marks — the crop corners printed on a real drawing sheet. */
export function CornerMarks() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-draft-mark/50" />
      <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-draft-mark/50" />
      <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-draft-mark/50" />
      <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-draft-mark/50" />
    </span>
  )
}

interface SheetProps {
  id: string
  code: string
  title: string
  note?: ReactNode
  children: ReactNode
  bodyClassName?: string
}

export default function Sheet({
  id,
  code,
  title,
  note,
  children,
  bodyClassName = 'p-4 sm:p-6',
}: SheetProps) {
  return (
    <section id={id} className="scroll-mt-16 px-3 py-5 sm:px-6 sm:py-8">
      <motion.div
        className="relative mx-auto max-w-7xl border border-bp-line bg-bp-panel/50"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <CornerMarks />

        <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-bp-line bg-bp-deep/70 px-4 py-3 sm:px-6">
          <span className="text-2xs tracking-[0.22em] text-draft-mark">{code}</span>
          <h2 className="text-xs uppercase tracking-[0.24em] text-draft sm:text-sm">{title}</h2>
          {note && (
            <span className="ml-auto text-2xs uppercase tracking-[0.18em] text-draft-faint">
              {note}
            </span>
          )}
        </header>

        <div className={bodyClassName}>{children}</div>
      </motion.div>
    </section>
  )
}
