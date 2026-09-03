import { motion } from 'framer-motion'

interface SparklineProps {
  data: number[]
  className?: string
  stroke?: string
  delay?: number
}

const W = 100
const H = 26

export default function Sparkline({
  data,
  className = '',
  stroke = '#3ddc97',
  delay = 0,
}: SparklineProps) {
  if (data.length < 2) return null

  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = max - min || 1

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - ((value - min) / span) * (H - 4) - 2
    return `${x.toFixed(2)},${y.toFixed(2)}`
  })

  const line = `M ${points.join(' L ')}`
  const area = `${line} L ${W},${H} L 0,${H} Z`
  const gradientId = `spark-${stroke.replace('#', '')}`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d={area}
        fill={`url(#${gradientId})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.5 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}
