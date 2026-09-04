import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

const DEFAULT_GRID =
  'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(9.5rem,auto)]'

interface BoardProps {
  id: string
  eyebrow: string
  title: string
  meta?: string
  children: ReactNode
  gridClassName?: string
}

export default function Board({
  id,
  eyebrow,
  title,
  meta,
  children,
  gridClassName = DEFAULT_GRID,
}: BoardProps) {
  return (
    <section id={id} className="scroll-mt-28 px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          className="mb-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-2"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="font-mono text-2xs uppercase tracking-[0.18em] text-bento-faint">
              {eyebrow}
            </p>
            <h2 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-[2rem]">{title}</h2>
          </div>

          {meta && (
            <p className="font-mono text-2xs uppercase tracking-[0.16em] text-bento-faint">
              {meta}
            </p>
          )}
        </motion.div>

        <div className={gridClassName}>{children}</div>
      </div>
    </section>
  )
}
