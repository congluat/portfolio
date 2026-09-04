import { useState } from 'react'

interface CompanyLogoProps {
  src: string
  company: string
  /** Container classes, so each UI style can size and frame the logo itself. */
  className?: string
  fallbackClassName?: string
}

function initials(company: string) {
  return company
    .split(/\s+/)
    .filter((word) => word.length > 2 && word[0] === word[0].toUpperCase())
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

export default function CompanyLogo({
  src,
  company,
  className = 'h-8 w-8 border border-console-border bg-white opacity-85 transition-opacity duration-300 group-hover:opacity-100',
  fallbackClassName = 'text-console-bg',
}: CompanyLogoProps) {
  const [failed, setFailed] = useState(false)

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden p-1 ${className}`}
    >
      {failed ? (
        <span className={`font-mono text-[9px] font-bold ${fallbackClassName}`}>
          {initials(company)}
        </span>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`}
          alt=""
          loading="lazy"
          className="max-h-full max-w-full object-contain"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}
