import { motion, useScroll, useSpring } from 'framer-motion'
import { profile } from '../data/profile'

export default function StatusBar() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 })

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-console-border bg-console-bg/90 backdrop-blur-sm">
      <motion.div
        className="h-px origin-left bg-signal-green"
        style={{ scaleX: progress }}
      />
      <div className="mx-auto flex h-8 max-w-7xl items-center gap-4 px-4 font-mono text-2xs text-ink-faint sm:px-6">
        <span className="flex items-center gap-1.5 text-signal-green">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal-green" />
          operational
        </span>
        <span className="hidden sm:inline">{profile.location}</span>
        <span className="ml-auto hidden md:inline">
          11+ yrs uptime · {profile.experience.length} deployments
        </span>
        <span className="ml-auto md:ml-0">© {new Date().getFullYear()}</span>
      </div>
    </div>
  )
}
