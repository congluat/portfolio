import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-[1] w-96 h-96 rounded-full"
      style={{
        left: position.x - 192,
        top: position.y - 192,
        background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, rgba(168,85,247,0.03) 40%, transparent 70%)',
      }}
      animate={{ x: 0, y: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      aria-hidden="true"
    />
  )
}
