import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { navLinks } from '../../data/profile'

interface TopBarProps {
  activeId: string
}

function useClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return now.toLocaleTimeString('en-GB', { hour12: false })
}

export default function TopBar({ activeId }: TopBarProps) {
  const [open, setOpen] = useState(false)
  const clock = useClock()

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-console-border bg-console-bg/85 backdrop-blur-sm"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <button
          onClick={() => go('overview')}
          className="flex shrink-0 items-center gap-2 font-mono text-xs text-ink"
        >
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-signal-green" />
          <span className="font-bold tracking-tight">fraud-ops</span>
          <span className="hidden text-ink-faint sm:inline">://nguyen-luat</span>
        </button>

        <nav className="ml-auto hidden items-center md:flex">
          {navLinks.map((link) => {
            const active = activeId === link.id
            return (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`relative px-3 py-1 font-mono text-2xs uppercase tracking-[0.16em] transition-colors ${
                  active ? 'text-signal-green' : 'text-ink-faint hover:text-ink-dim'
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-px h-px bg-signal-green"
                  />
                )}
              </button>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 font-mono text-2xs text-ink-faint md:ml-4">
          <span className="hidden items-center gap-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-green" />
            live
          </span>
          <span className="tabular hidden sm:inline">{clock}</span>

          <button
            className="p-1 text-ink-dim md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <HiX size={18} /> : <HiMenuAlt4 size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="overflow-hidden border-t border-console-border bg-console-panel md:hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className="flex w-full items-center gap-3 border-b border-console-border/60 px-5 py-3 text-left font-mono text-xs uppercase tracking-[0.16em] text-ink-dim"
              >
                <span className="text-signal-green/60">▸</span>
                {link.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
