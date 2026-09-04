export interface FuzzyMatch {
  score: number
  /** Indices in the target that matched, for highlighting. */
  positions: number[]
}

const BOUNDARIES = '/.-_ '

/** Subsequence match, rewarding consecutive hits and word boundaries. */
export function fuzzyMatch(query: string, target: string): FuzzyMatch | null {
  const needle = query.toLowerCase().replace(/\s+/g, '')
  if (!needle) return { score: 0, positions: [] }

  const haystack = target.toLowerCase()
  const positions: number[] = []
  let score = 0
  let cursor = 0
  let previous = -2

  for (const char of needle) {
    const found = haystack.indexOf(char, cursor)
    if (found === -1) return null

    positions.push(found)
    if (found === previous + 1) score += 8
    if (found === 0 || BOUNDARIES.includes(haystack[found - 1])) score += 6
    score -= Math.min(found - cursor, 4)

    previous = found
    cursor = found + 1
  }

  return { score, positions }
}
