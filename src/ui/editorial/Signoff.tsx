import { useState } from 'react'
import { profile } from '../../data/profile'
import Reveal, { SectionHead } from './Reveal'

export default function Signoff() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="signoff" className="px-5 py-14 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead index="05 / Signoff" title="Get in touch" aside="Response within 24h" />

        {/* The email as a headline — the loudest element on the page */}
        <a
          href={`mailto:${profile.email}`}
          className="block font-sans font-extrabold uppercase leading-[0.9] tracking-brutal text-graphite transition-colors hover:text-vermilion"
        >
          <Reveal className="text-[clamp(1.8rem,7.5vw,6rem)]">{profile.email}</Reveal>
        </a>

        <div className="mt-12 grid gap-8 border-t-2 border-graphite pt-7 sm:grid-cols-3">
          <div>
            <p className="mb-2 font-mono text-2xs uppercase tracking-[0.18em] text-graphite-faint">
              Phone
            </p>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="font-sans text-lg font-bold tracking-tight hover:text-vermilion"
            >
              {profile.phone}
            </a>
          </div>

          <div>
            <p className="mb-2 font-mono text-2xs uppercase tracking-[0.18em] text-graphite-faint">
              LinkedIn
            </p>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-lg font-bold tracking-tight hover:text-vermilion"
            >
              nguyen-luat →
            </a>
          </div>

          <div>
            <p className="mb-2 font-mono text-2xs uppercase tracking-[0.18em] text-graphite-faint">
              Copy address
            </p>
            <button
              onClick={copyEmail}
              className="font-sans text-lg font-bold tracking-tight hover:text-vermilion"
            >
              {copied ? 'Copied ✓' : 'Copy email'}
            </button>
          </div>
        </div>

        <p className="mt-12 max-w-2xl text-base leading-relaxed text-graphite-dim">
          Open to senior and principal engineering roles, architecture consulting, and hard
          problems in fraud, payments, or distributed systems.
        </p>
      </div>
    </section>
  )
}
