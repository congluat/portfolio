import { motion } from 'framer-motion'
import { profile } from '../data/profile'

export default function Preloader() {
  const letters = profile.name.split('')

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative mb-8">
        <motion.div
          className="w-24 h-24 rounded-full border-2 border-accent-cyan/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-t-accent-purple border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center font-display font-bold text-2xl text-gradient"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          NL
        </motion.div>
      </div>

      <div className="flex gap-1 sm:gap-2">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="font-display text-2xl sm:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5 + i * 0.06,
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="mt-8 h-0.5 bg-white/10 rounded-full overflow-hidden w-48"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 1, duration: 1, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}
