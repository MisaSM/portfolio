// Generates the favicon set and the social preview image into public/:
//   favicon.svg, favicon-32.png, apple-touch-icon.png (from the anemone
//   geometry) and og.png (1200×630, rendered with the site's own CSS and
//   fonts). Run with `pnpm brand` after changing the anemone, the colors or
//   the name/role copy, and commit the output.
//
// Needs a local Chrome or Chromium for rasterizing. Set CHROME_PATH if it
// isn't in a standard location.
import react from '@vitejs/plugin-react'
import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { createServer as createHttpServer } from 'node:http'
import { extname, join } from 'node:path'
import { promisify } from 'node:util'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { build, createServer } from 'vite'

const root = join(import.meta.dirname, '..')
const publicDir = join(root, 'public')
const distDir = join(root, 'dist')
const run = promisify(execFile)

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ]
  const found = candidates.find((path) => path && existsSync(path))
  if (!found) throw new Error('No Chrome found. Set CHROME_PATH to a Chrome or Chromium binary.')
  return found
}

/** Reads the Night palette from theme.css so colors are defined once. */
async function readColors() {
  const css = await readFile(join(root, 'src/styles/theme.css'), 'utf8')
  const color = (name) => {
    const match = new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`).exec(css)
    if (!match?.[1]) throw new Error(`--color-${name} not found in theme.css`)
    return match[1]
  }
  return {
    bg: color('bg'),
    accent: color('accent'),
    accentDeep: color('accent-deep'),
    center: color('center'),
  }
}

/** The header mark as a standalone SVG with literal colors (no CSS). */
function faviconSvg(geometry, colors) {
  const { PETALS, PETAL_PATH, CENTER, petalTransform } = geometry
  const petals = PETALS.map(
    ({ rotate, layer }) =>
      `<path d="${PETAL_PATH}" transform="${petalTransform(rotate, layer)}" fill="${layer === 'front' ? colors.accent : colors.accentDeep}"/>`,
  ).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 50 300 300">${petals}<circle cx="${CENTER}" cy="${CENTER}" r="40" fill="${colors.center}"/></svg>\n`
}

const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
}

/** Minimal static server for dist/, so pages get the built CSS and fonts. */
function serveDist() {
  const server = createHttpServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)
    const file = join(distDir, path === '/' ? 'index.html' : path)
    readFile(file)
      .then((body) => {
        res.writeHead(200, {
          'content-type': contentTypes[extname(file)] ?? 'application/octet-stream',
        })
        res.end(body)
      })
      .catch(() => {
        res.writeHead(404)
        res.end()
      })
  })
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      resolve({ server, origin: `http://127.0.0.1:${String(address.port)}` })
    })
  })
}

async function screenshot(chrome, url, out, width, height, transparent = false) {
  await run(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-prefers-reduced-motion',
    `--window-size=${String(width)},${String(height)}`,
    ...(transparent ? ['--default-background-color=00000000'] : []),
    '--virtual-time-budget=3000',
    `--screenshot=${out}`,
    url,
  ])
  console.log(`${out.replace(root, '.')}`)
}

const chrome = findChrome()
const colors = await readColors()

// Load the app's TypeScript modules (geometry, Anemone, content) in Node.
const vite = await createServer({
  root,
  configFile: false,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false, ws: false },
  plugins: [react()],
})
const geometry = await vite.ssrLoadModule('/src/components/anemone/geometry.ts')
const { Anemone } = await vite.ssrLoadModule('/src/components/anemone/Anemone.tsx')
const { content } = await vite.ssrLoadModule('/src/content/index.ts')
await vite.close()

await writeFile(join(publicDir, 'favicon.svg'), faviconSvg(geometry, colors))
console.log('./public/favicon.svg')

// Build so dist/ has the current CSS and fonts for the rendered pages.
await build({ root, logLevel: 'warn' })
const cssFile = (await readdir(join(distDir, 'assets'))).find((file) => file.endsWith('.css'))
if (!cssFile) throw new Error('No built CSS found in dist/assets')

// Tailwind only scans src/, so this page uses inline styles (with the theme's
// CSS variables) rather than utilities that may not exist in the built CSS.
// The flower fills a positioned column; its stem runs to the image's bottom edge.
const flower = `<div style="position:absolute;top:36px;right:40px;bottom:0;width:360px;display:flex;flex-direction:column">${renderToStaticMarkup(createElement(Anemone, { className: 'flex-1' }))}</div>`
const page = (body, background) =>
  // The site CSS paints <html> with the page color; override it so the
  // transparent favicon stays transparent.
  `<!doctype html><html lang="${content.lang}" style="background:${background}"><head><meta charset="utf-8"><link rel="stylesheet" href="/assets/${cssFile}"></head><body style="margin:0;background:${background}">${body}</body></html>`

const pages = {
  // Icons are drawn at the top-left and the screenshot is cropped to size.
  'brand-favicon-32.html': page(
    `<img src="/favicon.svg" width="32" height="32" alt="" style="display:block">`,
    'transparent',
  ),
  'brand-apple-touch.html': page(
    `<div style="width:180px;height:180px;background:${colors.bg};display:grid;place-items:center"><img src="/favicon.svg" width="136" height="136" alt=""></div>`,
    colors.bg,
  ),
  'brand-og.html': page(
    `<div style="position:relative;overflow:hidden;width:1200px;height:630px;background:var(--color-bg);color:var(--color-ink)">
      ${flower}
      <div style="position:absolute;left:88px;top:0;bottom:0;width:700px;display:flex;flex-direction:column;justify-content:center">
        <p style="font-family:var(--font-serif);font-style:italic;font-size:30px;color:var(--color-muted);margin:0 0 10px 6px">${content.hero.greeting}</p>
        <p style="font-family:var(--font-serif);font-style:italic;font-size:84px;line-height:1;letter-spacing:-0.02em;margin:0">${content.person.fullName}</p>
        <p style="font-family:var(--font-sans);font-weight:500;font-size:30px;margin:28px 0 0 6px">${content.hero.role}</p>
      </div>
    </div>`,
    colors.bg,
  ),
}

for (const [name, html] of Object.entries(pages)) {
  await writeFile(join(distDir, name), html)
}

// Copy the fresh favicon into dist so the icon pages can load it.
await writeFile(join(distDir, 'favicon.svg'), faviconSvg(geometry, colors))

const { server, origin } = await serveDist()
try {
  await screenshot(
    chrome,
    `${origin}/brand-favicon-32.html`,
    join(publicDir, 'favicon-32.png'),
    32,
    32,
    true,
  )
  await screenshot(
    chrome,
    `${origin}/brand-apple-touch.html`,
    join(publicDir, 'apple-touch-icon.png'),
    180,
    180,
  )
  await screenshot(chrome, `${origin}/brand-og.html`, join(publicDir, 'og.png'), 1200, 630)
} finally {
  server.close()
  for (const name of Object.keys(pages)) await rm(join(distDir, name), { force: true })
}
