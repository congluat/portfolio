import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import Masthead from './Masthead'
import Brief from './Brief'
import Record from './Record'
import Practice from './Practice'
import Schooling from './Schooling'
import Signoff from './Signoff'

const NAV = [
  { id: 'brief', label: 'Brief' },
  { id: 'record', label: 'Record' },
  { id: 'practice', label: 'Practice' },
  { id: 'schooling', label: 'Schooling' },
  { id: 'signoff', label: 'Signoff' },
]

export default function EditorialUi() {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 })

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-5 sm:px-8">
          <button
            onClick={() => go('masthead')}
            className="font-sans text-sm font-extrabold uppercase tracking-brutal"
          >
            Nguyen Luat
          </button>

          <nav className="ml-auto hidden gap-7 md:flex">
            {NAV.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className="font-mono text-2xs uppercase tracking-[0.18em] text-graphite-dim transition-colors hover:text-vermilion"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            className="ml-auto md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <HiX size={20} /> : <HiMenuAlt4 size={20} />}
          </button>
        </div>

        <div className="h-[2px] bg-graphite" />
        <motion.div className="h-[2px] origin-left bg-vermilion" style={{ scaleX: progress }} />

        <AnimatePresence>
          {open && (
            <motion.nav
              className="overflow-hidden bg-paper md:hidden"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25 }}
            >
              {NAV.map((link) => (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  className="block w-full border-b border-graphite/20 px-5 py-3.5 text-left font-sans text-lg font-extrabold uppercase tracking-brutal"
                >
                  {link.label}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <Masthead />
        <Brief />
        <Record />
        <Practice />
        <Schooling />
        <Signoff />
      </main>

      {/* Colophon */}
      <footer className="px-5 pb-10 sm:px-8">
        <div className="mx-auto max-w-[1400px] border-t-2 border-graphite pt-5">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono text-2xs uppercase tracking-[0.16em] text-graphite-faint">
            <span className="text-graphite">Nguyen Luat</span>
            <span>Senior Software Engineer</span>
            <span className="ml-auto">Set in Inter &amp; JetBrains Mono</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </>
  )
}
