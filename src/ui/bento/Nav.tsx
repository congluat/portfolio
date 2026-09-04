import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'

const NAV = [
  { id: 'profile', label: 'Profile' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState(NAV[0].id)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.3 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.1, 0.3, 0.6] },
    )

    NAV.forEach((link) => {
      const el = document.getElementById(link.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center gap-3 rounded-full border border-bento-line bg-white/70 p-1.5 pl-4 shadow-[0_2px_6px_-2px_rgba(22,22,26,0.08),0_18px_40px_-24px_rgba(22,22,26,0.3)] backdrop-blur-xl">
          <button
            onClick={() => go('profile')}
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          >
            <span className="h-5 w-5 rounded-lg bg-gradient-to-br from-pop-blue to-pop-plum" />
            Nguyen Luat
          </button>

          <nav className="ml-auto hidden items-center gap-0.5 md:flex">
            {NAV.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className="relative rounded-full px-3.5 py-2 text-xs font-medium text-bento-dim transition-colors hover:text-bento-ink"
              >
                {activeId === link.id && (
                  <motion.span
                    layoutId="bento-nav-pill"
                    className="absolute inset-0 rounded-full bg-bento-sunk"
                    transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                  />
                )}
                <span
                  className={`relative ${activeId === link.id ? 'text-bento-ink' : ''}`}
                >
                  {link.label}
                </span>
              </button>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault()
              go('contact')
            }}
            className="hidden rounded-full bg-bento-ink px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-85 md:block"
          >
            Get in touch
          </a>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="ml-auto rounded-full bg-bento-sunk p-2.5 text-bento-ink md:hidden"
          >
            {open ? <HiX size={16} /> : <HiMenuAlt4 size={16} />}
          </button>
        </div>

        <div className="mx-6 h-px overflow-hidden rounded-full bg-transparent">
          <motion.div
            className="h-px origin-left bg-gradient-to-r from-pop-blue to-pop-plum"
            style={{ scaleX: progress }}
          />
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              className="mt-2 overflow-hidden rounded-3xl border border-bento-line bg-white/90 backdrop-blur-xl md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-2">
                {NAV.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => go(link.id)}
                    className={`block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                      activeId === link.id
                        ? 'bg-bento-sunk text-bento-ink'
                        : 'text-bento-dim hover:text-bento-ink'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
