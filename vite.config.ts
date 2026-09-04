import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    // GitHub Pages serves this repo from main/docs.
    outDir: 'docs',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.dev.html'),
    },
  },
})
