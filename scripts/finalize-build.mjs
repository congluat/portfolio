import { copyFileSync, cpSync, existsSync, rmSync } from 'fs'

// Vite builds from index.dev.html so the dev entry and the deployed root
// index.html can live side by side; normalise the output name back.
if (existsSync('dist/index.dev.html')) {
  copyFileSync('dist/index.dev.html', 'dist/index.html')
  rmSync('dist/index.dev.html')
}

// GitHub Pages serves this repo from the root of main, so mirror dist/ there.
for (const dir of ['assets', 'logos']) {
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true })
  if (existsSync(`dist/${dir}`)) cpSync(`dist/${dir}`, dir, { recursive: true })
}

for (const file of ['index.html', 'favicon.svg', '.nojekyll']) {
  if (existsSync(`dist/${file}`)) copyFileSync(`dist/${file}`, file)
}
