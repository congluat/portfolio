import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../../data/profile'
import Sheet from './Sheet'
import Callout from './Callout'
import { EASE } from './sheets'

interface ChipListProps {
  items: string[]
  delay: number
}

function ChipList({ items, delay }: ChipListProps) {
  const reduce = useReducedMotion()

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <motion.li
          key={item}
          className="border border-bp-line bg-bp-deep px-3 py-1.5 text-2xs text-draft-dim"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : delay + i * 0.07, ease: EASE }}
        >
          {item}
        </motion.li>
      ))}
    </ul>
  )
}

export default function GeneralNotes() {
  return (
    <Sheet id="bp-notes" code="A-01" title="General notes" note="read before assembly">
      <div className="space-y-9">
        <Callout tag="01" label="profile note" delay={0.05}>
          <p className="border border-bp-line bg-bp-deep p-4 text-xs leading-relaxed text-draft-dim sm:text-sm">
            {profile.summary}
          </p>
        </Callout>

        <Callout tag="02" label="certified to" delay={0.15}>
          <ChipList items={profile.certifications} delay={0.3} />
        </Callout>

        <Callout tag="03" label="commendations" delay={0.25}>
          <ChipList items={profile.awards} delay={0.4} />
        </Callout>

        <Callout tag="04" label="languages" delay={0.35}>
          <ul className="grid gap-px border border-bp-line bg-bp-line sm:grid-cols-2">
            {profile.languages.map((language) => (
              <li
                key={language.name}
                className="flex items-baseline justify-between gap-3 bg-bp-deep px-3 py-2.5"
              >
                <span className="text-2xs uppercase tracking-[0.18em] text-draft">
                  {language.name}
                </span>
                <span className="text-2xs text-draft-faint">{language.level}</span>
              </li>
            ))}
          </ul>
        </Callout>
      </div>
    </Sheet>
  )
}
