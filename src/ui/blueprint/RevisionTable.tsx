import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../../data/profile'
import Sheet from './Sheet'
import { EASE } from './sheets'

/** Oldest first, so revision letters run A, B, ... like a real revision block. */
const REVISIONS = [...profile.education].reverse().map((entry, i) => ({
  rev: String.fromCharCode(65 + i),
  ...entry,
}))

export default function RevisionTable() {
  const reduce = useReducedMotion()

  return (
    <Sheet
      id="bp-revisions"
      code="A-05"
      title="Revision history"
      note={`${REVISIONS.length} revisions`}
      bodyClassName="p-0"
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-bp-line text-2xs uppercase tracking-[0.18em] text-draft-faint">
            <th scope="col" className="w-12 px-3 py-2.5 font-normal sm:px-4">
              rev
            </th>
            <th scope="col" className="w-24 px-2 py-2.5 font-normal sm:w-32">
              date
            </th>
            <th scope="col" className="px-2 py-2.5 font-normal sm:px-4">
              description
            </th>
          </tr>
        </thead>

        <tbody>
          {REVISIONS.map((entry, i) => (
            <motion.tr
              key={entry.school}
              className="border-b border-bp-line/60 align-top last:border-b-0"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.1, ease: EASE }}
            >
              <td className="px-3 py-4 sm:px-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-draft-mark/60 text-2xs text-draft-mark">
                  {entry.rev}
                </span>
              </td>
              <td className="px-2 py-4 text-2xs tabular text-draft-dim">{entry.period}</td>
              <td className="px-2 py-4 sm:px-4">
                <p className="text-xs text-draft">{entry.school}</p>
                <p className="mt-1 text-2xs text-draft-dim">{entry.degree}</p>
                {entry.note && (
                  <p className="mt-1.5 text-2xs uppercase tracking-[0.16em] text-draft-mark/80">
                    note · {entry.note}
                  </p>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </Sheet>
  )
}
