import { copyFileSync, existsSync } from 'fs'

if (existsSync('index.dev.html')) {
  copyFileSync('index.dev.html', 'index.html')
}
