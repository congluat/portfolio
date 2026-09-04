import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../../data/profile'
import Sheet from './Sheet'
import { EASE } from './sheets'

interface Group {
  category: string
  items: { name: string; ref: number }[]
}

const GROUPS = profile.skills.reduce<Group[]>((groups, skill, i) => {
  const item = { name: skill.name, ref: i + 1 }
  const group = groups.find((entry) => entry.category === skill.category)
  if (group) group.items.push(item)
  else groups.push({ category: skill.category, items: [item] })
  return groups
}, [])

const SYMBOLS: Record<string, string> = {
  Backend: 'M2 2 H12 V12 H2 Z',
  Cloud: 'M7 1.5 A5.5 5.5 0 1 1 6.99 1.5 Z',
  Architecture: 'M7 1.5 L13 12.5 H1 Z',
  DevOps: 'M7 1 L13 7 L7 13 L1 7 Z',
  Database: 'M1.5 3.5 H12.5 M1.5 7 H12.5 M1.5 10.5 H12.5',
  Messaging: 'M1.5 7 H11 M7 3 L11.5 7 L7 11',
  Observability: 'M7 1 V13 M1 7 H13 M7 3.6 A3.4 3.4 0 1 1 6.99 3.6 Z',
}

const FILLED = new Set(['Backend', 'Architecture'])

interface GlyphProps {
  category: string
}

function Glyph({ category }: GlyphProps) {
  const path = SYMBOLS[category] ?? SYMBOLS.Backend
  const filled = FILLED.has(category)

  return (
    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 text-draft-mark" aria-hidden="true">
      <path
        d={path}
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  )
}

export default function SkillLegend() {
  const reduce = useReducedMotion()

  return (
    <Sheet
      id="bp-legend"
      code="A-04"
      title="Component legend"
      note={`${profile.skills.length} components · ${GROUPS.length} classes`}
      bodyClassName="p-0"
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-bp-line text-2xs uppercase tracking-[0.18em] text-draft-faint">
            <th scope="col" className="w-10 px-3 py-2.5 font-normal sm:px-4">
              sym
            </th>
            <th scope="col" className="w-12 px-2 py-2.5 font-normal">
              ref
            </th>
            <th scope="col" className="px-2 py-2.5 font-normal">
              component
            </th>
            <th scope="col" className="hidden px-2 py-2.5 font-normal sm:table-cell sm:px-4">
              class
            </th>
          </tr>
        </thead>

        <tbody>
          {GROUPS.map((group) => (
            <Fragment key={group.category}>
              <tr>
                <th
                  scope="colgroup"
                  colSpan={4}
                  className="border-y border-bp-line bg-bp-deep px-3 py-1.5 text-left text-2xs font-normal uppercase tracking-[0.22em] text-draft-mark sm:px-4"
                >
                  {group.category}
                </th>
              </tr>

              {group.items.map((item) => (
                <motion.tr
                  key={item.name}
                  className="border-b border-bp-line/60 transition-colors hover:bg-bp-deep/70"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: reduce ? 0 : 0.35,
                    delay: reduce ? 0 : item.ref * 0.035,
                    ease: EASE,
                  }}
                >
                  <td className="px-3 py-2.5 sm:px-4">
                    <Glyph category={group.category} />
                  </td>
                  <td className="px-2 py-2.5 text-2xs tabular text-draft-faint">
                    {String(item.ref).padStart(2, '0')}
                  </td>
                  <td className="px-2 py-2.5 text-xs text-draft">{item.name}</td>
                  <td className="hidden px-2 py-2.5 text-2xs uppercase tracking-[0.14em] text-draft-faint sm:table-cell sm:px-4">
                    {group.category}
                  </td>
                </motion.tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </Sheet>
  )
}
