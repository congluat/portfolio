import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import Board from './Board'
import Tile, { TileLabel } from './Tile'

interface CategoryMeta {
  category: string
  span: string
  accent: string
  dot: string
  featured?: boolean
}

/** Bigger categories get bigger tiles — that is what makes the grid asymmetric. */
const CATEGORIES: CategoryMeta[] = [
  {
    category: 'Cloud',
    span: 'sm:col-span-2 lg:col-span-2 lg:row-span-2',
    accent: 'text-pop-blue',
    dot: 'bg-pop-blue',
    featured: true,
  },
  {
    category: 'Architecture',
    span: 'sm:col-span-2 lg:col-span-2',
    accent: 'text-pop-plum',
    dot: 'bg-pop-plum',
  },
  { category: 'Backend', span: '', accent: 'text-pop-coral', dot: 'bg-pop-coral' },
  { category: 'Messaging', span: '', accent: 'text-pop-sun', dot: 'bg-pop-sun' },
  {
    category: 'Database',
    span: 'sm:col-span-2 lg:col-span-2',
    accent: 'text-pop-teal',
    dot: 'bg-pop-teal',
  },
  { category: 'Observability', span: '', accent: 'text-pop-blue', dot: 'bg-pop-blue' },
  { category: 'DevOps', span: '', accent: 'text-pop-plum', dot: 'bg-pop-plum' },
]

export default function Skills() {
  return (
    <Board
      id="skills"
      eyebrow="Capabilities"
      title="The toolkit"
      meta={`${profile.skills.length} core skills · ${CATEGORIES.length} domains`}
    >
      {CATEGORIES.map((meta, i) => {
        const items = profile.skills.filter((skill) => skill.category === meta.category)

        return (
          <Tile key={meta.category} span={meta.span} delay={(i % 4) * 0.06} className="flex flex-col p-6">
            <div className="flex items-baseline justify-between gap-3">
              <TileLabel className={meta.accent}>{meta.category}</TileLabel>
              <span className="font-mono text-2xs text-bento-faint">
                {String(items.length).padStart(2, '0')}
              </span>
            </div>

            <ul className={`mt-auto space-y-2 pt-6 ${meta.featured ? 'sm:space-y-3' : ''}`}>
              {items.map((skill, j) => (
                <motion.li
                  key={skill.name}
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + j * 0.07, duration: 0.4 }}
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />
                  <span
                    className={`font-semibold leading-tight tracking-tight ${
                      meta.featured ? 'text-lg sm:text-2xl' : 'text-sm'
                    }`}
                  >
                    {skill.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </Tile>
        )
      })}
    </Board>
  )
}
