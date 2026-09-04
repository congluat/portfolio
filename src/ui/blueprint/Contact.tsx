import { useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  HiOutlineCheck,
  HiOutlineClipboardCopy,
  HiOutlineExternalLink,
  HiOutlineMail,
  HiOutlinePhone,
} from 'react-icons/hi'
import { FaLinkedin } from 'react-icons/fa'
import { profile } from '../../data/profile'
import Sheet from './Sheet'
import { EASE } from './sheets'

interface Channel {
  key: string
  label: string
  value: string
  href: string
  external?: boolean
}

const CHANNELS: Channel[] = [
  { key: 'email', label: 'email', value: profile.email, href: `mailto:${profile.email}` },
  {
    key: 'phone',
    label: 'telephone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
  },
  {
    key: 'linkedin',
    label: 'linkedin',
    value: 'nguyen-luat-87509289',
    href: profile.linkedin,
    external: true,
  },
]

const ICONS: Record<string, ReactNode> = {
  email: <HiOutlineMail aria-hidden="true" />,
  phone: <HiOutlinePhone aria-hidden="true" />,
  linkedin: <FaLinkedin aria-hidden="true" />,
}

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null)
  const reduce = useReducedMotion()

  const copy = async (channel: Channel) => {
    await navigator.clipboard.writeText(channel.value)
    setCopied(channel.key)
    setTimeout(() => setCopied(null), 1800)
  }

  return (
    <Sheet id="bp-issue" code="A-06" title="Issue for contact" note="approved for release">
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1 right-0 hidden -rotate-12 border-2 border-draft-mark/50 px-4 py-2 text-center lg:block"
        >
          <p className="text-2xs uppercase tracking-[0.28em] text-draft-mark/70">issued for</p>
          <p className="text-xs uppercase tracking-[0.24em] text-draft-mark">collaboration</p>
        </div>

        <div className="divide-y divide-bp-line border border-bp-line lg:max-w-3xl">
          {CHANNELS.map((channel, i) => (
            <motion.div
              key={channel.key}
              className="flex items-center gap-3 bg-bp-deep px-3 py-3 sm:gap-5 sm:px-4"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.1, ease: EASE }}
            >
              <span className="text-draft-mark/70">{ICONS[channel.key]}</span>

              <span className="hidden w-24 shrink-0 text-2xs uppercase tracking-[0.18em] text-draft-faint sm:block">
                {channel.label}
              </span>

              <a
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                className="min-w-0 flex-1 truncate text-xs text-draft-dim transition-colors hover:text-draft sm:text-sm"
              >
                {channel.value}
              </a>

              {channel.external ? (
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${channel.label} profile`}
                  className="shrink-0 p-1 text-draft-faint transition-colors hover:text-draft-mark"
                >
                  <HiOutlineExternalLink size={15} />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => copy(channel)}
                  aria-label={`Copy ${channel.label}`}
                  className="shrink-0 p-1 text-draft-faint transition-colors hover:text-draft-mark"
                >
                  {copied === channel.key ? (
                    <HiOutlineCheck size={15} className="text-draft-mark" />
                  ) : (
                    <HiOutlineClipboardCopy size={15} />
                  )}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <p className="mt-5 max-w-2xl border-l border-draft-mark/50 pl-4 text-xs leading-relaxed text-draft-dim">
          Open to senior and principal engineering roles, architecture consulting, and hard
          problems in fraud, payments, or distributed systems.
        </p>
      </div>
    </Sheet>
  )
}
