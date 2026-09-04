import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import Panel from './Panel'

const CATEGORY_TEXT: Record<string, string> = {
  Backend: 'text-signal-green',
  Cloud: 'text-signal-blue',
  Architecture: 'text-signal-violet',
  DevOps: 'text-signal-amber',
  Database: 'text-signal-green',
  Messaging: 'text-signal-blue',
  Observability: 'text-signal-violet',
}

export default function Capabilities() {
  const categories = [...new Set(profile.skills.map((skill) => skill.category))]

  return (
    <section id="capabilities" className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Panel
          label="capability matrix"
          meta={
            <span className="font-mono text-2xs text-ink-faint">
              {profile.skills.length} modules · {categories.length} classes
            </span>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, i) => (
              <motion.div
                key={category}
                className="group border border-console-border bg-console-raised p-4 transition-colors hover:border-ink-faint/40 sm:p-5"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className={`mb-3 border-b border-console-border pb-2.5 font-mono text-2xs uppercase tracking-[0.18em] ${
                    CATEGORY_TEXT[category] ?? 'text-ink-faint'
                  }`}
                >
                  {category}
                </p>

                <ul className="space-y-2">
                  {profile.skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <li
                        key={skill.name}
                        className="flex gap-2 font-mono text-xs leading-relaxed text-ink sm:text-sm"
                      >
                        <span className="shrink-0 text-ink-faint">›</span>
                        {skill.name}
                      </li>
                    ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  )
}
