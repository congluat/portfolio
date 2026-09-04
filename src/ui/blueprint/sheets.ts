export interface SheetMeta {
  id: string
  code: string
  label: string
}

/** Sheet index — drives the nav, the section headers and the title-block counter. */
export const SHEETS: SheetMeta[] = [
  { id: 'bp-cover', code: 'A-00', label: 'Cover' },
  { id: 'bp-notes', code: 'A-01', label: 'Notes' },
  { id: 'bp-network', code: 'A-02', label: 'Network' },
  { id: 'bp-spans', code: 'A-03', label: 'Spans' },
  { id: 'bp-legend', code: 'A-04', label: 'Legend' },
  { id: 'bp-revisions', code: 'A-05', label: 'Revisions' },
  { id: 'bp-issue', code: 'A-06', label: 'Issue' },
]

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const COMPANY_CODES: Record<string, string> = {
  'NAB Innovation Centre Vietnam': 'NAB',
  TIKI: 'TIKI',
  'SAI Digital': 'SAI',
  'Sun Life': 'SUNLIFE',
  'Hee Solutions Limited': 'HEE',
  'DXC Technology': 'DXC',
  Vietbank: 'VIETBANK',
}

/** Short drawing tag for a company, the way a drawing labels a component. */
export function companyCode(company: string): string {
  return COMPANY_CODES[company] ?? company.slice(0, 7).toUpperCase()
}

export function startYear(period: string): string {
  return period.split(' — ')[0].split(' ').pop() ?? ''
}

export function endLabel(period: string): string {
  const end = period.split(' — ')[1] ?? ''
  return end === 'Present' ? 'NOW' : (end.split(' ').pop() ?? '')
}
