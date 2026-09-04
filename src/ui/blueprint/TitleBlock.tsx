import { profile } from '../../data/profile'
import { SHEETS } from './sheets'

interface Field {
  key: string
  value: string
  accent?: boolean
}

const FIELDS: Field[] = [
  { key: 'drawn by', value: profile.name },
  { key: 'role', value: profile.title },
  { key: 'location', value: profile.location },
  { key: 'sheet', value: `A-00 of ${SHEETS.length}` },
  { key: 'scale', value: '1 unit = 1 month' },
  { key: 'revision', value: 'B — in service', accent: true },
  { key: 'date', value: 'Jul 2014 — present' },
]

interface TitleBlockProps {
  className?: string
}

export default function TitleBlock({ className = '' }: TitleBlockProps) {
  return (
    <div className={`border border-bp-line bg-bp-deep ${className}`}>
      <div className="border-b border-bp-line px-3 py-2.5">
        <p className="text-2xs uppercase tracking-[0.22em] text-draft-faint">project</p>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-draft">
          Career of {profile.name}
        </p>
      </div>

      <dl className="divide-y divide-bp-line">
        {FIELDS.map((field) => (
          <div key={field.key} className="grid grid-cols-[5.75rem_1fr] divide-x divide-bp-line">
            <dt className="px-3 py-1.5 text-2xs uppercase tracking-[0.16em] text-draft-faint">
              {field.key}
            </dt>
            <dd
              className={`truncate px-3 py-1.5 text-2xs ${
                field.accent ? 'text-draft-mark' : 'text-draft-dim'
              }`}
            >
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
