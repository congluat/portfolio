import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.p
          className="text-sm text-white/30 font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {year} Nguyen Luat. Crafted with React + Framer Motion.
        </motion.p>

        <motion.div
          className="flex items-center gap-1 text-xs text-white/20 font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          All systems operational
        </motion.div>
      </div>
    </footer>
  )
}
