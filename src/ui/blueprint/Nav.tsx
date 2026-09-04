import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { profile } from '../../data/profile'
import { EASE, SHEETS } from './sheets'

interface NavProps {
  activeId: string
}

export default function Nav({ activeId }: NavProps) {
  const [open, setOpen] = useState(false)
  const activeIndex = Math.max(
    SHEETS.findIndex((sheet) => sheet.id === activeId),
    0,
  )

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-bp-line bg-bp-bg/90 backdrop-blur-sm"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => go(SHEETS[0].id)}
          className="flex shrink-0 items-center gap-2 text-2xs uppercase tracking-[0.18em] text-draft"
        >
          <span className="h-1.5 w-1.5 rotate-45 bg-draft-mark" />
          <span>nl-cv-2026</span>
          <span className="hidden text-draft-faint sm:inline">/ {profile.name}</span>
        </button>

        <nav aria-label="Sheets" className="ml-auto hidden items-center lg:flex">
          {SHEETS.map((sheet) => {
            const active = activeId === sheet.id
            return (
              <button
                key={sheet.id}
                type="button"
                onClick={() => go(sheet.id)}
                aria-current={active ? 'true' : undefined}
                className={`relative px-3 py-1 text-2xs uppercase tracking-[0.16em] transition-colors ${
                  active ? 'text-draft-mark' : 'text-draft-faint hover:text-draft-dim'
                }`}
              >
                <span className="mr-1.5 opacity-60">{sheet.code}</span>
                {sheet.label}
                {active && (
                  <motion.span
                    layoutId="bp-nav-active"
                    className="absolute inset-x-2 -bottom-px h-px bg-draft-mark"
                  />
                )}
              </button>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 text-2xs text-draft-faint lg:ml-4">
          <span className="tabular hidden sm:inline">
            sheet {String(activeIndex + 1).padStart(2, '0')} / {SHEETS.length}
          </span>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle sheet index"
            aria-expanded={open}
            className="p-1 text-draft-dim lg:hidden"
          >
            {open ? <HiX size={18} /> : <HiMenuAlt4 size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Sheets"
            className="overflow-hidden border-t border-bp-line bg-bp-panel lg:hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {SHEETS.map((sheet) => (
              <button
                key={sheet.id}
                type="button"
                onClick={() => go(sheet.id)}
                className="flex w-full items-center gap-3 border-b border-bp-line/60 px-5 py-3 text-left text-2xs uppercase tracking-[0.16em] text-draft-dim"
              >
                <span className="text-draft-mark/70">{sheet.code}</span>
                {sheet.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
