import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { prerender } from './build/prerender.ts'

// The public address of the site: used for the canonical URL and the social
// preview image, and printed on the résumé. Change it here when a custom
// domain is added. (Vercel's VERCEL_PROJECT_PRODUCTION_URL isn't used: it
// ignores *.vercel.app aliases and picked the auto-generated deployment host.)
const siteUrl = 'https://anemone-dev.vercel.app'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerender({ siteUrl })],
})
