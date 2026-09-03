import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineClipboardCopy, HiOutlineCheck, HiOutlineExternalLink } from 'react-icons/hi'
import { profile } from '../data/profile'
import Panel from './Panel'

interface Channel {
  key: string
  value: string
  href: string
  external?: boolean
  accent: string
}

const CHANNELS: Channel[] = [
  {
    key: 'email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    accent: 'text-signal-green',
  },
  {
    key: 'phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    accent: 'text-signal-blue',
  },
  {
    key: 'linkedin',
    value: 'nguyen-luat-87509289',
    href: profile.linkedin,
    external: true,
    accent: 'text-signal-violet',
  },
]

export default function Connect() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (channel: Channel) => {
    await navigator.clipboard.writeText(channel.value)
    setCopied(channel.key)
    setTimeout(() => setCopied(null), 1800)
  }

  return (
    <section id="connect" className="px-4 py-10 pb-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Panel
          label="establish connection"
          meta={
            <span className="flex items-center gap-1.5 font-mono text-2xs text-signal-green">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal-green" />
              channel open
            </span>
          }
        >
          <div className="font-mono text-sm">
            <p className="mb-5 flex items-center gap-2 text-ink-faint">
              <span className="text-signal-green">$</span>
              contact --list
              <span className="animate-blink text-signal-green">█</span>
            </p>

            <div className="space-y-1">
              {CHANNELS.map((channel, i) => (
                <motion.div
                  key={channel.key}
                  className="group flex items-center gap-3 border border-transparent px-3 py-3 transition-colors hover:border-console-border hover:bg-console-raised sm:gap-6"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <span
                    className={`w-20 shrink-0 text-2xs uppercase tracking-[0.16em] ${channel.accent}`}
                  >
                    {channel.key}
                  </span>

                  <a
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener noreferrer' : undefined}
                    className="min-w-0 flex-1 truncate text-xs text-ink-dim transition-colors hover:text-ink sm:text-sm"
                  >
                    {channel.value}
                  </a>

                  {channel.external ? (
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-1 text-ink-faint transition-colors hover:text-signal-green"
                      aria-label={`Open ${channel.key}`}
                    >
                      <HiOutlineExternalLink size={15} />
                    </a>
                  ) : (
                    <button
                      onClick={() => copy(channel)}
                      className="shrink-0 p-1 text-ink-faint transition-colors hover:text-signal-green"
                      aria-label={`Copy ${channel.key}`}
                    >
                      {copied === channel.key ? (
                        <HiOutlineCheck size={15} className="text-signal-green" />
                      ) : (
                        <HiOutlineClipboardCopy size={15} />
                      )}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            <p className="mt-6 border-t border-console-border pt-5 text-xs leading-relaxed text-ink-faint">
              <span className="text-signal-green">›</span> Open to senior and principal
              engineering roles, architecture consulting, and hard problems in fraud, payments,
              or distributed systems.
            </p>
          </div>
        </Panel>
      </div>
    </section>
  )
}
