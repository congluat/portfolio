import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

interface CountUpProps {
  to: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
}

export default function CountUp({
  to,
  duration = 1.4,
  decimals = 0,
  suffix = '',
  prefix = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setValue,
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref} className="tabular">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}
