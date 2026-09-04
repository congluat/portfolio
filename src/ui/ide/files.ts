import { profile } from '../../data/profile'
import type { Line, Token, TokenKind } from './tokens'

type Job = (typeof profile.experience)[number]

export type Language = 'markdown' | 'json' | 'typescript'

export interface VirtualFile {
  id: string
  name: string
  path: string
  language: Language
  lines: Line[]
  /** Experience files show the company mark instead of a file-type icon. */
  logo?: string
  company?: string
}

export interface FileFolder {
  name: string
  files: VirtualFile[]
}

export const LANGUAGE_LABEL: Record<Language, string> = {
  markdown: 'Markdown',
  json: 'JSON',
  typescript: 'TypeScript',
}

/** Prose is hard-wrapped so the gutter reads like a real source file. */
const WRAP = 76

const T = (text: string, kind: TokenKind = 'text'): Token => ({ text, kind })
const link = (text: string, href: string): Token => ({ text, kind: 'link', href })
const blank: Line = []

function wrap(text: string, width = WRAP): string[] {
  const out: string[] = []
  let current = ''

  for (const word of text.split(/\s+/).filter(Boolean)) {
    if (current && current.length + 1 + word.length > width) {
      out.push(current)
      current = word
    } else {
      current = current ? `${current} ${word}` : word
    }
  }
  if (current) out.push(current)

  return out.length ? out : ['']
}

// --- markdown ---------------------------------------------------------------

const mdHeading = (level: 1 | 2 | 3, text: string): Line => [
  T(`${'#'.repeat(level)} `, 'punct'),
  T(text, level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3'),
]

const mdBold = (text: string): Token[] => [T('**', 'punct'), T(text, 'bold'), T('**', 'punct')]
const mdCode = (text: string): Token[] => [T('`', 'punct'), T(text, 'code'), T('`', 'punct')]

const mdLink = (label: string, href: string): Token[] => [
  T('[', 'punct'),
  link(label, href),
  T('](', 'punct'),
  { text: href, kind: 'faint', href },
  T(')', 'punct'),
]

const mdQuote = (text: string): Line => [T('> ', 'punct'), T(text, 'quote')]

const mdField = (label: string, ...value: Token[]): Line => [
  T('- ', 'bullet'),
  ...mdBold(label),
  T(': ', 'punct'),
  ...value,
]

const mdParagraph = (text: string, kind: TokenKind = 'text'): Line[] =>
  wrap(text).map((row) => [T(row, kind)])

const mdBullet = (text: string, kind: TokenKind = 'dim'): Line[] => {
  const rows = wrap(text, WRAP - 2)
  return rows.map((row, i) => (i === 0 ? [T('- ', 'bullet'), T(row, kind)] : [T(`  ${row}`, kind)]))
}

/** Packs `items` into backticked inline-code runs that stay inside the wrap width. */
function mdCodeChips(items: string[]): Line[] {
  const lines: Line[] = []
  let current: Token[] = []
  let width = 0

  for (const item of items) {
    const cost = item.length + 3
    if (current.length && width + cost > WRAP) {
      lines.push(current)
      current = []
      width = 0
    }
    if (current.length) {
      current.push(T(' '))
      width += 1
    }
    current.push(...mdCode(item))
    width += item.length + 2
  }
  if (current.length) lines.push(current)

  return lines
}

// --- json -------------------------------------------------------------------

const pad = (depth: number) => '  '.repeat(depth)

const jsonKey = (depth: number, key: string): Token[] => [
  T(pad(depth)),
  T('"', 'punct'),
  T(key, 'key'),
  T('"', 'punct'),
  T(': ', 'punct'),
]

const jsonString = (value: string, comma = false): Token[] => [
  T('"', 'punct'),
  T(value, 'string'),
  T('"', 'punct'),
  ...(comma ? [T(',', 'punct')] : []),
]

const jsonPunct = (depth: number, text: string): Line => [T(pad(depth)), T(text, 'punct')]

// --- typescript -------------------------------------------------------------

const tsString = (value: string): Token[] => [T("'", 'punct'), T(value, 'string'), T("'", 'punct')]

const tsProp = (key: string, value: Token[], comma = true): Line => [
  T(pad(1)),
  T(key, 'key'),
  T(': ', 'punct'),
  ...value,
  ...(comma ? [T(',', 'punct')] : []),
]

// --- file content -----------------------------------------------------------

/** Trims corporate filler so `NAB Innovation Centre Vietnam` becomes `nab`. */
const FILLER = new Set([
  'innovation',
  'centre',
  'center',
  'vietnam',
  'limited',
  'ltd',
  'inc',
  'corp',
  'company',
  'co',
  'group',
  'technology',
  'technologies',
  'solutions',
  'solution',
])

function slugify(company: string) {
  const words = company
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/\s+/)
    .filter(Boolean)
  const kept = words.filter((word) => !FILLER.has(word))
  return (kept.length ? kept : words).slice(0, 2).join('-')
}

const TOTAL_MONTHS = profile.experience.reduce((sum, job) => sum + job.months, 0)
const CATEGORIES = [...new Set(profile.skills.map((skill) => skill.category))]

function experienceFile(job: Job): VirtualFile {
  const name = `${slugify(job.company)}.md`
  const lines: Line[] = [
    mdHeading(1, job.company),
    blank,
    mdQuote(`${job.role} · ${job.period}`),
    blank,
    mdField('Role', T(job.role, 'dim')),
    mdField('Period', T(`${job.period} (${job.duration})`, 'dim')),
    mdField('Location', T(job.location, 'dim')),
    mdField(
      'Status',
      T(job.featured ? 'current position' : 'completed', job.featured ? 'code' : 'dim'),
    ),
    blank,
    mdHeading(2, 'Overview'),
    blank,
    ...mdParagraph(job.description),
    blank,
  ]

  if (job.projects?.length) {
    lines.push(mdHeading(2, 'Projects'), blank)
    job.projects.forEach((project) => {
      lines.push(mdHeading(3, project.name), blank, ...mdParagraph(project.description, 'dim'), blank)
    })
  }

  lines.push(mdHeading(2, 'Highlights'), blank)
  job.highlights.forEach((highlight) => lines.push(...mdBullet(highlight)))

  lines.push(blank, mdHeading(2, 'Stack'), blank, ...mdCodeChips(job.tech), blank)

  return {
    id: `experience/${name}`,
    name,
    path: `experience/${name}`,
    language: 'markdown',
    lines,
    logo: job.logo,
    company: job.company,
  }
}

const EXPERIENCE_FILES = profile.experience.map(experienceFile)

const README: VirtualFile = {
  id: 'README.md',
  name: 'README.md',
  path: 'README.md',
  language: 'markdown',
  lines: [
    mdHeading(1, profile.name),
    blank,
    mdQuote(profile.subtitle),
    blank,
    mdField('Role', T(profile.title, 'dim')),
    mdField('Location', T(profile.location, 'dim')),
    mdField('Email', { text: profile.email, kind: 'code', copy: profile.email }),
    mdField('LinkedIn', ...mdLink('nguyen-luat', profile.linkedin)),
    blank,
    mdHeading(2, 'Summary'),
    blank,
    ...mdParagraph(profile.summary),
    blank,
    mdHeading(2, 'At a glance'),
    blank,
    mdField(
      'Experience',
      T(`${profile.experience.length} companies · ${TOTAL_MONTHS} months`, 'dim'),
    ),
    mdField(
      'Currently',
      T(`${profile.experience[0].role} @ ${profile.experience[0].company}`, 'dim'),
    ),
    mdField('Focus', T(CATEGORIES.join(' · '), 'dim')),
    mdField('Languages', T(profile.languages.map((l) => l.name).join(', '), 'dim')),
    blank,
    mdHeading(2, 'Workspace'),
    blank,
    ...EXPERIENCE_FILES.map((file, i) => [
      T('- ', 'bullet'),
      ...mdCode(file.path),
      T(' — ', 'punct'),
      T(profile.experience[i].period, 'dim'),
    ]),
    [T('- ', 'bullet'), ...mdCode('skills.json'), T(' — ', 'punct'), T('capability matrix', 'dim')],
    [
      T('- ', 'bullet'),
      ...mdCode('credentials.md'),
      T(' — ', 'punct'),
      T('certifications, awards, languages', 'dim'),
    ],
    [T('- ', 'bullet'), ...mdCode('education.md'), T(' — ', 'punct'), T('schools', 'dim')],
    [T('- ', 'bullet'), ...mdCode('contact.ts'), T(' — ', 'punct'), T('how to reach me', 'dim')],
    blank,
    [T('Press ', 'faint'), ...mdCode('Ctrl'), T(' ', 'faint'), ...mdCode('K'), T(' to jump to any file.', 'faint')],
    blank,
  ],
}

const SKILLS: VirtualFile = {
  id: 'skills.json',
  name: 'skills.json',
  path: 'skills.json',
  language: 'json',
  lines: [
    [T('{', 'punct')],
    [...jsonKey(1, 'engineer'), ...jsonString(profile.name, true)],
    [...jsonKey(1, 'title'), ...jsonString(profile.title, true)],
    [...jsonKey(1, 'total'), T(String(profile.skills.length), 'number'), T(',', 'punct')],
    [...jsonKey(1, 'categories'), T('[', 'punct')],
    ...CATEGORIES.flatMap((category, index): Line[] => {
      const skills = profile.skills.filter((skill) => skill.category === category)
      const last = index === CATEGORIES.length - 1
      return [
        jsonPunct(2, '{'),
        [...jsonKey(3, 'name'), ...jsonString(category, true)],
        [...jsonKey(3, 'count'), T(String(skills.length), 'number'), T(',', 'punct')],
        [...jsonKey(3, 'skills'), T('[', 'punct')],
        ...skills.map((skill, i): Line => [T(pad(4)), ...jsonString(skill.name, i < skills.length - 1)]),
        jsonPunct(3, ']'),
        jsonPunct(2, last ? '}' : '},'),
      ]
    }),
    jsonPunct(1, '],'),
    [...jsonKey(1, 'primaryStack'), T('[', 'punct')],
    ...profile.experience[0].tech.map(
      (tech, i): Line => [T(pad(2)), ...jsonString(tech, i < profile.experience[0].tech.length - 1)],
    ),
    jsonPunct(1, ']'),
    [T('}', 'punct')],
  ],
}

const CREDENTIALS: VirtualFile = {
  id: 'credentials.md',
  name: 'credentials.md',
  path: 'credentials.md',
  language: 'markdown',
  lines: [
    mdHeading(1, 'Credentials'),
    blank,
    mdHeading(2, 'Certifications'),
    blank,
    ...profile.certifications.flatMap((item) => mdBullet(item, 'text')),
    blank,
    mdHeading(2, 'Awards'),
    blank,
    ...profile.awards.flatMap((item) => mdBullet(item, 'text')),
    blank,
    mdHeading(2, 'Languages'),
    blank,
    ...profile.languages.map((language): Line => [
      T('- ', 'bullet'),
      ...mdBold(language.name),
      T(' — ', 'punct'),
      T(language.level, 'dim'),
    ]),
    blank,
  ],
}

const EDUCATION: VirtualFile = {
  id: 'education.md',
  name: 'education.md',
  path: 'education.md',
  language: 'markdown',
  lines: [
    mdHeading(1, 'Education'),
    blank,
    ...profile.education.flatMap((entry): Line[] => [
      mdHeading(2, entry.school),
      blank,
      mdField('Degree', T(entry.degree, 'dim')),
      mdField('Period', T(entry.period, 'dim')),
      ...(entry.note ? [mdField('Note', T(entry.note, 'dim'))] : []),
      blank,
    ]),
  ],
}

const CONTACT: VirtualFile = {
  id: 'contact.ts',
  name: 'contact.ts',
  path: 'contact.ts',
  language: 'typescript',
  lines: [
    [T('/**', 'comment')],
    [T(' * Open to senior and staff backend roles.', 'comment')],
    [T(' * Fraud, payments, event-driven platforms.', 'comment')],
    [T(' */', 'comment')],
    blank,
    [T('export', 'keyword'), T(' '), T('const', 'keyword'), T(' '), T('contact', 'key'), T(' = {', 'punct')],
    tsProp('name', tsString(profile.name)),
    tsProp('title', tsString(profile.title)),
    tsProp('location', tsString(profile.location)),
    [
      ...tsProp('email', [
        T("'", 'punct'),
        { text: profile.email, kind: 'string', copy: profile.email },
        T("'", 'punct'),
      ]),
      T('  // click to copy', 'comment'),
    ],
    tsProp('phone', [
      T("'", 'punct'),
      link(profile.phone, `tel:${profile.phone.replace(/\s+/g, '')}`),
      T("'", 'punct'),
    ]),
    tsProp('linkedin', [T("'", 'punct'), link(profile.linkedin, profile.linkedin), T("'", 'punct')]),
    [T('} ', 'punct'), T('as', 'keyword'), T(' '), T('const', 'keyword')],
    blank,
    [
      T('export', 'keyword'),
      T(' '),
      T('type', 'keyword'),
      T(' '),
      T('Contact', 'key'),
      T(' = ', 'punct'),
      T('typeof', 'keyword'),
      T(' contact', 'text'),
    ],
    blank,
    [
      T('export', 'keyword'),
      T(' '),
      T('const', 'keyword'),
      T(' '),
      T('mailto', 'key'),
      T(' = ', 'punct'),
      T("'", 'punct'),
      link(`mailto:${profile.email}`, `mailto:${profile.email}`),
      T("'", 'punct'),
    ],
    blank,
    [T('// Response time: usually within a day.', 'comment')],
    blank,
  ],
}

export const FOLDERS: FileFolder[] = [{ name: 'experience', files: EXPERIENCE_FILES }]

export const ROOT_FILES: VirtualFile[] = [README, SKILLS, CREDENTIALS, EDUCATION, CONTACT]

export const ALL_FILES: VirtualFile[] = [...ROOT_FILES, ...EXPERIENCE_FILES]

/** The current role — the one entry flagged `featured` in the profile data. */
export const FEATURED_FILE_ID =
  EXPERIENCE_FILES[profile.experience.findIndex((job) => job.featured)]?.id ?? EXPERIENCE_FILES[0].id

export const DEFAULT_OPEN = [README.id, FEATURED_FILE_ID]

export const WORKSPACE_NAME = 'nguyen-luat'

export const WORKSPACE_META = `${profile.experience.length} companies · ${TOTAL_MONTHS} months`
