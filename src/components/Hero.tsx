import { motion } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { FaLinkedin } from 'react-icons/fa'
import { profile } from '../data/profile'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 2.4 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-16"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent-cyan/10 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent-purple/10 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="block text-white">Nguyen</span>
          <span className="block text-gradient">Luat</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-xl sm:text-2xl md:text-3xl text-white/60 font-light mb-2"
        >
          {profile.title}
        </motion.p>

        <motion.p
          variants={item}
          className="text-sm sm:text-base text-white/40 font-mono mb-10 max-w-xl mx-auto"
        >
          {profile.subtitle}
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12"
        >
          <motion.a
            href="#experience"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple text-surface font-semibold text-sm sm:text-base"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,240,255,0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            View my work
          </motion.a>
          <motion.a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full glass text-white/80 font-medium text-sm sm:text-base flex items-center gap-2"
            whileHover={{ scale: 1.05, borderColor: 'rgba(0,240,255,0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedin className="text-accent-cyan" />
            LinkedIn
          </motion.a>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-white/50"
        >
          <span className="flex items-center gap-2">
            <HiOutlineLocationMarker className="text-accent-cyan" />
            {profile.location}
          </span>
          <span className="flex items-center gap-2">
            <HiOutlineMail className="text-accent-purple" />
            {profile.email}
          </span>
          <span className="flex items-center gap-2">
            <HiOutlinePhone className="text-accent-pink" />
            {profile.phone}
          </span>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
