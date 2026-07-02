import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineChevronDown } from 'react-icons/hi'

interface ScrollHintProps {
  show: boolean
  onClick: () => void
}

export default function ScrollHint({ show, onClick }: ScrollHintProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={onClick}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          aria-label="Scroll to next section"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <HiOutlineChevronDown size={20} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
