import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import './styles/index.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element #root not found')
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is prerendered at build time (build/prerender.ts), so
// hydrate it. The dev server serves an empty #root, so render from scratch.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
