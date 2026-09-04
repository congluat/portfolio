export type UiStyle = 'console' | 'editorial' | 'bento' | 'blueprint' | 'ide'

/**
 * Which visual style the site renders.
 *
 * Every value maps to a folder under `src/ui/` that owns its own layout,
 * typography and motion language. All styles read the same content from
 * `src/data/profile.ts`, so switching here changes only the presentation.
 *
 *   console    Fraud-operations monitoring console — dark, hairline panels,
 *              career as a deployment log
 *   editorial  Swiss / brutalist print — warm paper, oversized type, one accent
 *   bento      Apple-style bento grid — soft light tiles, spring motion, 3D tilt
 *   blueprint  Technical drawing — career as a service dependency diagram
 *   ide        Code editor workspace — file tree, tabs, command palette
 */
export const UI_STYLE: UiStyle = 'ide'
