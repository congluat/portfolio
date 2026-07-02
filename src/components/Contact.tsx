import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { FaLinkedin } from 'react-icons/fa'
import { profile } from '../data/profile'
import SectionHeading from './SectionHeading'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const links = [
    {
      icon: HiOutlineMail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: 'text-accent-cyan',
    },
    {
      icon: HiOutlinePhone,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
      color: 'text-accent-purple',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'nguyen-luat',
      href: profile.linkedin,
      color: 'text-accent-pink',
    },
  ]

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <SectionHeading
          tag="Contact"
          title="Let's build"
          highlight="something great"
          align="center"
        />

        <motion.p
          className="mt-6 text-lg text-white/50 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Open to senior engineering roles, consulting, and interesting technical challenges.
        </motion.p>

        <motion.div
          className="mt-12 grid sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label === 'LinkedIn' ? '_blank' : undefined}
              rel={link.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
              className="glass rounded-2xl p-6 group hover:glow-cyan transition-all duration-500"
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <link.icon className={`w-8 h-8 mx-auto mb-3 ${link.color} group-hover:scale-110 transition-transform`} />
              <p className="text-xs text-white/30 uppercase tracking-wider mb-1">{link.label}</p>
              <p className="text-sm text-white/70 break-all">{link.value}</p>
            </motion.a>
          ))}
        </motion.div>

        <motion.button
          onClick={copyEmail}
          className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple text-surface font-semibold text-base relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <motion.span
            key={copied ? 'copied' : 'copy'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {copied ? '✓ Email copied!' : 'Copy email address'}
          </motion.span>
        </motion.button>
      </div>
    </section>
  )
}
