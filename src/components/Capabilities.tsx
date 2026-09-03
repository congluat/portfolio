import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import Panel from './Panel'

const SEGMENTS = 24

const CATEGORY_COLOR: Record<string, string> = {
  Backend: 'bg-signal-green',
  Cloud: 'bg-signal-blue',
  Architecture: 'bg-signal-violet',
  DevOps: 'bg-signal-amber',
  Database: 'bg-signal-green',
  Messaging: 'bg-signal-blue',
  Observability: 'bg-signal-violet',
}

const CATEGORY_TEXT: Record<string, string> = {
  Backend: 'text-signal-green',
  Cloud: 'text-signal-blue',
  Architecture: 'text-signal-violet',
  DevOps: 'text-signal-amber',
  Database: 'text-signal-green',
  Messaging: 'text-signal-blue',
  Observability: 'text-signal-violet',
}

function Meter({ level, category, delay }: { level: number; category: string; delay: number }) {
  const filled = Math.round((level / 100) * SEGMENTS)
  const color = CATEGORY_COLOR[category] ?? 'bg-signal-green'

  return (
    <span className="flex gap-[3px]" aria-hidden="true">
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <motion.span
          key={i}
          className={`h-3.5 w-[3px] ${i < filled ? color : 'bg-console-border'}`}
          initial={{ opacity: 0, scaleY: 0.3 }}
          whileInView={{ opacity: i < filled ? 1 : 0.6, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * 0.014, duration: 0.22 }}
        />
      ))}
    </span>
  )
}

export default function Capabilities() {
  const categories = [...new Set(profile.skills.map((s) => s.category))]

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
          bodyClassName=""
        >
          {profile.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-console-border px-4 py-3.5 transition-colors last:border-b-0 hover:bg-console-hover sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:px-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <span className="min-w-0">
                <span className="block truncate font-mono text-sm text-ink">{skill.name}</span>
                <span
                  className={`font-mono text-2xs uppercase tracking-[0.14em] ${
                    CATEGORY_TEXT[skill.category] ?? 'text-ink-faint'
                  } opacity-70`}
                >
                  {skill.category}
                </span>
              </span>

              <span className="col-span-2 sm:col-span-1 sm:justify-self-end">
                <Meter level={skill.level} category={skill.category} delay={i * 0.05} />
              </span>

              <span className="tabular justify-self-end font-mono text-xs text-ink-dim sm:w-12 sm:text-right">
                {skill.level}%
              </span>
            </motion.div>
          ))}
        </Panel>
      </div>
    </section>
  )
}
