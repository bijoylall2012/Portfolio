import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'github-pages-route-fallback',
      apply: 'build',
      closeBundle() {
        const outputDirectory = resolve(process.cwd(), 'dist')
        copyFileSync(resolve(outputDirectory, 'index.html'), resolve(outputDirectory, '404.html'))
      },
    },
  ],
  base: '/Portfolio/',
})
