import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import BootSequence from './BootSequence'
import Crosshair from './Crosshair'
import TopBar from './TopBar'
import StatusBar from './StatusBar'
import Overview from './Overview'
import Profile from './Profile'
import Deployments from './Deployments'
import Capabilities from './Capabilities'
import Credentials from './Credentials'
import Connect from './Connect'

const SECTIONS = ['overview', 'profile', 'deployments', 'capabilities', 'credentials', 'connect']

export default function ConsoleUi() {
  const [booting, setBooting] = useState(true)
  const [activeId, setActiveId] = useState(SECTIONS[0])

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] },
    )

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <AnimatePresence>{booting && <BootSequence key="boot" />}</AnimatePresence>

      {/* Static backdrop layers */}
      <div className="console-grid pointer-events-none fixed inset-0 z-0 opacity-60" />
      <div className="scanlines pointer-events-none fixed inset-0 z-0" />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(61,220,151,0.06), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(90,169,255,0.05), transparent 50%)',
        }}
      />

      <Crosshair />
      <TopBar activeId={activeId} />

      <main className="relative z-10 pb-8">
        <Overview />
        <Profile />
        <Deployments />
        <Capabilities />
        <Credentials />
        <Connect />
      </main>

      <StatusBar />
    </>
  )
}
