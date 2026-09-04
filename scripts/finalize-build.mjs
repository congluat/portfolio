import { copyFileSync, cpSync, existsSync, rmSync } from 'fs'

// Vite builds from index.dev.html so the dev entry and the published artifact
// can coexist in the repo root; normalise the output name back.
if (existsSync('docs/index.dev.html')) {
  copyFileSync('docs/index.dev.html', 'docs/index.html')
  rmSync('docs/index.dev.html')
}

// Transitional: Pages still serves from the repo root until the source is
// switched to main/docs, so keep the root copy in sync as well.
for (const dir of ['assets', 'logos']) {
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true })
  if (existsSync(`docs/${dir}`)) cpSync(`docs/${dir}`, dir, { recursive: true })
}

for (const file of ['index.html', 'favicon.svg', '.nojekyll']) {
  if (existsSync(`docs/${file}`)) copyFileSync(`docs/${file}`, file)
}
