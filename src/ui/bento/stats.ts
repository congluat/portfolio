import { profile } from '../../data/profile'

/** Oldest role first — the natural reading order for career charts. */
export const TIMELINE = [...profile.experience].reverse()

export const TOTAL_MONTHS = profile.experience.reduce((sum, job) => sum + job.months, 0)

export const YEARS = Math.floor(TOTAL_MONTHS / 12)

export const MAX_MONTHS = Math.max(...profile.experience.map((job) => job.months))

export const CUMULATIVE_MONTHS = TIMELINE.reduce<number[]>((acc, job) => {
  acc.push((acc[acc.length - 1] ?? 0) + job.months)
  return acc
}, [])

export const DOMAINS = ['Fintech', 'Banking', 'E-commerce', 'Insurance']
