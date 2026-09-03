import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import Panel from './Panel'

const FOCUS = [
  'Fraud & Financial Crime',
  'Real-time Decisioning',
  'Event-Driven Architecture',
  'Cloud-Native Platforms',
  'Team Leadership',
]

export default function Profile() {
  return (
    <section id="profile" className="px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Panel label="operator profile" meta={<span className="text-signal-green">verified</span>}>
          <p className="text-base leading-relaxed text-ink-dim sm:text-lg">{profile.summary}</p>

          <div className="mt-7 border-t border-console-border pt-5">
            <p className="mb-3 font-mono text-2xs uppercase tracking-[0.18em] text-ink-faint">
              focus areas
            </p>
            <div className="flex flex-wrap gap-2">
              {FOCUS.map((item, i) => (
                <motion.span
                  key={item}
                  className="border border-console-border bg-console-raised px-3 py-1.5 font-mono text-2xs text-ink-dim"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </Panel>

        <Panel label="clearances" delay={0.1} bodyClassName="">
          {profile.certifications.map((cert, i) => (
            <motion.div
              key={cert}
              className="flex items-start gap-3 border-b border-console-border px-4 py-3.5 sm:px-6"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <span className="mt-0.5 font-mono text-2xs text-signal-green">[✓]</span>
              <span className="text-sm text-ink-dim">{cert}</span>
            </motion.div>
          ))}

          {profile.awards.map((award) => (
            <div
              key={award}
              className="flex items-start gap-3 border-b border-console-border px-4 py-3.5 sm:px-6"
            >
              <span className="mt-0.5 font-mono text-2xs text-signal-amber">[★]</span>
              <span className="text-sm text-ink-dim">{award}</span>
            </div>
          ))}

          <div className="px-4 py-4 sm:px-6">
            <p className="mb-3 font-mono text-2xs uppercase tracking-[0.18em] text-ink-faint">
              languages
            </p>
            {profile.languages.map((lang) => (
              <div key={lang.name} className="flex justify-between py-1 font-mono text-2xs">
                <span className="text-ink-dim">{lang.name}</span>
                <span className="text-signal-blue/80">{lang.level}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  )
}
