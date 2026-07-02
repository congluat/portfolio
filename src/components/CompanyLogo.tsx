import { useState } from 'react'
import { motion } from 'framer-motion'

interface CompanyLogoProps {
  src: string
  alt: string
  company: string
  darkBg?: boolean
}

function getInitials(company: string) {
  return company
    .split(/\s+/)
    .filter((word) => word.length > 2 && word[0] === word[0].toUpperCase())
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

export default function CompanyLogo({ src, alt, company, darkBg }: CompanyLogoProps) {
  const [error, setError] = useState(false)
  const logoSrc = `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`

  return (
    <motion.div
      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center p-2.5 shrink-0 overflow-hidden border border-white/10 shadow-lg ${
        darkBg ? 'bg-black' : 'bg-white'
      }`}
      whileHover={{ scale: 1.08, rotate: 3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {!error ? (
        <img
          src={logoSrc}
          alt={alt}
          className="max-w-full max-h-full object-contain"
          loading="lazy"
          onError={() => setError(true)}
        />
      ) : (
        <span className="font-display font-bold text-surface text-xs sm:text-sm">
          {getInitials(company)}
        </span>
      )}
    </motion.div>
  )
}
