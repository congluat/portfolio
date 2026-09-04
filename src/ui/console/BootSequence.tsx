import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../../data/profile'

const LINES = [
  'establishing secure channel .............',
  `authenticating operator: ${profile.name.toUpperCase().replace(' ', '_')}`,
  `mounting deployment records (${profile.experience.length}) ....`,
  'loading capability matrix ..............',
  'streaming event pipeline ...............',
]

const LINE_DELAY = 190

export default function BootSequence() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible >= LINES.length) return
    const timer = setTimeout(() => setVisible((n) => n + 1), LINE_DELAY)
    return () => clearTimeout(timer)
  }, [visible])

  const done = visible >= LINES.length

  return (
    <motion.div
      className="console-grid fixed inset-0 z-[100] flex items-center justify-center bg-console-bg px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <div className="w-full max-w-lg font-mono text-xs sm:text-sm">
        <div className="mb-5 flex items-center gap-2 text-ink-faint">
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-signal-amber" />
          <span className="uppercase tracking-[0.22em]">fraud-ops console</span>
        </div>

        <div className="space-y-1.5">
          {LINES.slice(0, visible).map((line) => (
            <motion.div
              key={line}
              className="flex gap-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-signal-green">[ ok ]</span>
              <span className="text-ink-dim">{line}</span>
            </motion.div>
          ))}
        </div>

        {done && (
          <motion.div
            className="mt-5 flex items-center gap-3 border-t border-console-border pt-4 text-signal-green"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-glow-green">[ live ]</span>
            <span>console ready</span>
            <span className="animate-blink">█</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
