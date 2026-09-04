import { useEffect, useState } from 'react'
import {
  HiOutlineCheck,
  HiOutlineClipboardCopy,
  HiOutlineExternalLink,
  HiOutlineMail,
  HiOutlinePhone,
} from 'react-icons/hi'
import { profile } from '../../data/profile'
import Board from './Board'
import Tile, { TileLabel } from './Tile'

const LINKEDIN_HANDLE = profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')

export default function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(timer)
  }, [copied])

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
  }

  return (
    <Board id="contact" eyebrow="Contact" title="Let's talk" meta="Open to senior & principal roles">
      {/* Call to action — the one full-bleed gradient tile on the page */}
      <Tile
        span="sm:col-span-2 lg:col-span-2 lg:row-span-2"
        className="relative flex flex-col overflow-hidden bg-gradient-to-br from-pop-blue via-pop-plum to-pop-plum p-6 text-white sm:p-8"
      >
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-white" />
          <TileLabel className="text-white/70">Available for work</TileLabel>
        </div>

        <h3 className="mt-6 text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.02] tracking-brutal">
          Let's build systems
          <br />
          that hold up.
        </h3>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
          Fraud and payments platforms, event-driven architecture, or any hard distributed-systems
          problem — happy to dig in.
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-8">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-bento-ink transition-opacity hover:opacity-90"
          >
            Send an email
          </a>
          <button
            onClick={copyEmail}
            aria-label="Copy email address"
            className="flex items-center gap-2 rounded-full border border-white/35 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            {copied ? <HiOutlineCheck size={15} /> : <HiOutlineClipboardCopy size={15} />}
            {copied ? 'Copied' : 'Copy address'}
          </button>
        </div>
      </Tile>

      {/* Email */}
      <Tile delay={0.06} className="flex flex-col justify-between p-6">
        <div className="flex items-center justify-between gap-3">
          <TileLabel>Email</TileLabel>
          <HiOutlineMail size={20} className="text-pop-blue" />
        </div>

        <div>
          <a
            href={`mailto:${profile.email}`}
            className="block break-all text-sm font-semibold tracking-tight transition-colors hover:text-pop-blue"
          >
            {profile.email}
          </a>
          <button
            onClick={copyEmail}
            aria-label="Copy email address"
            className="mt-3 flex items-center gap-1.5 rounded-full border border-bento-line px-3 py-1.5 font-mono text-2xs uppercase tracking-[0.14em] text-bento-dim transition-colors hover:border-bento-ink/25 hover:text-bento-ink"
          >
            {copied ? <HiOutlineCheck size={13} className="text-pop-teal" /> : <HiOutlineClipboardCopy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </Tile>

      {/* Phone */}
      <Tile delay={0.12} className="flex flex-col justify-between p-6">
        <div className="flex items-center justify-between gap-3">
          <TileLabel>Phone</TileLabel>
          <HiOutlinePhone size={20} className="text-pop-teal" />
        </div>

        <div>
          <a
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            className="block text-sm font-semibold tracking-tight transition-colors hover:text-pop-teal"
          >
            {profile.phone}
          </a>
          <p className="mt-1 font-mono text-2xs text-bento-faint">{profile.location}</p>
        </div>
      </Tile>

      {/* LinkedIn */}
      <Tile delay={0.18} span="sm:col-span-2 lg:col-span-2" className="p-6">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-full flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-3">
            <TileLabel>LinkedIn</TileLabel>
            <HiOutlineExternalLink
              size={18}
              className="text-bento-faint transition-colors group-hover:text-pop-plum"
            />
          </div>

          <div className="pt-6">
            <p className="text-lg font-semibold tracking-tight sm:text-xl">
              /in/{LINKEDIN_HANDLE}
            </p>
            <p className="mt-1.5 text-xs text-bento-dim">
              Full career history, recommendations and recent activity
            </p>
          </div>
        </a>
      </Tile>
    </Board>
  )
}
