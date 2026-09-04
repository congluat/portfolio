import { useEffect, useState } from 'react'

/**
 * Targeting reticle that tracks the pointer, with a live coordinate readout.
 * Suppressed on touch devices where there is no persistent pointer.
 */
export default function Crosshair() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setActive(true)
    }
    const leave = () => setActive(false)

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [])

  if (!active) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden md:block" aria-hidden="true">
      <div
        className="absolute left-0 right-0 h-px bg-signal-green/15"
        style={{ top: pos.y }}
      />
      <div
        className="absolute bottom-0 top-0 w-px bg-signal-green/15"
        style={{ left: pos.x }}
      />
      <div
        className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal-green/40"
        style={{ left: pos.x, top: pos.y }}
      />
      <span
        className="absolute translate-x-4 translate-y-3 font-mono text-2xs text-signal-green/50"
        style={{ left: pos.x, top: pos.y }}
      >
        {String(pos.x).padStart(4, '0')}:{String(pos.y).padStart(4, '0')}
      </span>
    </div>
  )
}
