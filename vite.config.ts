import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { prerender } from './build/prerender.ts'

// On Vercel this is the production domain (the custom domain once one is
// set), even for preview deployments. Local builds fall back to the preview URL.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
const siteUrl = productionHost ? `https://${productionHost}` : 'http://localhost:4173'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerender({ siteUrl })],
})
