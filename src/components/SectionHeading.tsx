import { motion } from 'framer-motion'

interface SectionHeadingProps {
  tag: string
  title: string
  highlight: string
  align?: 'left' | 'center'
}

export default function SectionHeading({
  tag,
  title,
  highlight,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <motion.span
        className="inline-block font-mono text-xs sm:text-sm text-accent-cyan tracking-widest uppercase mb-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        // {tag}
      </motion.span>
      <motion.h2
        className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}{' '}
        <span className="text-gradient">{highlight}</span>
      </motion.h2>
    </div>
  )
}
