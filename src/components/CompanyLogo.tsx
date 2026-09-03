import { useState } from 'react'

interface CompanyLogoProps {
  src: string
  company: string
  size?: 'sm' | 'md'
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

export default function CompanyLogo({ src, company, size = 'sm' }: CompanyLogoProps) {
  const [failed, setFailed] = useState(false)
  const box = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11'

  return (
    <span
      className={`${box} flex shrink-0 items-center justify-center overflow-hidden border border-console-border bg-white p-1 opacity-85 transition-opacity duration-300 group-hover:opacity-100`}
    >
      {failed ? (
        <span className="font-mono text-[9px] font-bold text-console-bg">
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
