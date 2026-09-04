import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import Panel from './Panel'

export default function Credentials() {
  return (
    <section id="credentials" className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Panel
          label="credentials"
          meta={
            <span className="font-mono text-2xs text-ink-faint">
              {profile.education.length} records
            </span>
          }
          bodyClassName=""
        >
          {profile.education.map((edu, i) => (
            <motion.div
              key={edu.school}
              className="group grid gap-x-6 gap-y-1.5 border-b border-console-border px-4 py-5 transition-colors last:border-b-0 hover:bg-console-hover sm:grid-cols-[150px_1fr] sm:px-6"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <span className="font-mono text-2xs text-ink-faint">{edu.period}</span>

              <span>
                <span className="block text-base font-medium text-ink">{edu.school}</span>
                <span className="mt-0.5 block text-sm text-ink-dim">{edu.degree}</span>
                {edu.note && (
                  <span className="mt-2 inline-block border border-console-border px-2 py-0.5 font-mono text-2xs text-signal-violet/80">
                    {edu.note}
                  </span>
                )}
              </span>
            </motion.div>
          ))}
        </Panel>
      </div>
    </section>
  )
}
