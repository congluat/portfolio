import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTilt } from './useTilt'

export const TILE_SURFACE =
  'rounded-3xl border border-bento-line bg-bento-tile shadow-[0_2px_4px_-2px_rgba(22,22,26,0.06),0_20px_48px_-28px_rgba(22,22,26,0.28)]'

const ENTRANCE = { type: 'spring', stiffness: 150, damping: 20, mass: 0.7 } as const

interface TileProps {
  children: ReactNode
  /** Grid placement utilities for the outer cell, kept off the tilted surface. */
  span?: string
  /** Utilities for the tile surface itself — padding, gradients, text colour. */
  className?: string
  delay?: number
  tilt?: boolean
}

export default function Tile({
  children,
  span = '',
  className = '',
  delay = 0,
  tilt = true,
}: TileProps) {
  const reduced = useReducedMotion()
  const { enabled, rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt()
  const tilting = tilt && enabled

  return (
    <motion.div
      className={`[perspective:1100px] ${span}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...ENTRANCE, delay }}
    >
      <motion.div
        onPointerMove={tilting ? onPointerMove : undefined}
        onPointerLeave={tilting ? onPointerLeave : undefined}
        whileHover={tilting ? { scale: 1.012 } : undefined}
        transition={ENTRANCE}
        style={tilting ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        className={`h-full ${TILE_SURFACE} ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface TileLabelProps {
  children: ReactNode
  className?: string
}

export function TileLabel({ children, className = 'text-bento-faint' }: TileLabelProps) {
  return (
    <p className={`font-mono text-2xs uppercase tracking-[0.16em] ${className}`}>{children}</p>
  )
}

interface ChipProps {
  children: ReactNode
  className?: string
}

export function Chip({
  children,
  className = 'border-bento-line bg-bento-sunk/60 text-bento-dim',
}: ChipProps) {
  return (
    <span className={`rounded-full border px-2.5 py-1 font-mono text-2xs ${className}`}>
      {children}
    </span>
  )
}
