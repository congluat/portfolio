import { copyFileSync, existsSync } from 'fs'

if (existsSync('dist/index.dev.html')) {
  copyFileSync('dist/index.dev.html', 'dist/index.html')
}
