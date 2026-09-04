import { useCallback, useEffect, useState, type PointerEvent } from 'react'
import { useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const TILT_SPRING = { stiffness: 240, damping: 26, mass: 0.35 }

/**
 * Pointer-driven 3D tilt for a tile. Returns `enabled: false` on touch devices
 * and under reduced-motion so callers can skip the transform entirely rather
 * than paying for springs that never move.
 */
export function useTilt(max = 7) {
  const reduced = useReducedMotion()
  const [coarse, setCoarse] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse)')
    const sync = () => setCoarse(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const enabled = !coarse && !reduced

  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const smoothX = useSpring(offsetX, TILT_SPRING)
  const smoothY = useSpring(offsetY, TILT_SPRING)
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [max, -max])

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      offsetX.set((event.clientX - rect.left) / rect.width - 0.5)
      offsetY.set((event.clientY - rect.top) / rect.height - 0.5)
    },
    [offsetX, offsetY],
  )

  const onPointerLeave = useCallback(() => {
    offsetX.set(0)
    offsetY.set(0)
  }, [offsetX, offsetY])

  return { enabled, rotateX, rotateY, onPointerMove, onPointerLeave }
}
