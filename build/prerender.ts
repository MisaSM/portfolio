import react from '@vitejs/plugin-react'
import { createServer, type Plugin } from 'vite'

interface PrerenderOptions {
  /** Absolute production origin, no trailing slash. */
  siteUrl: string
}

/** Shape of src/entry-server.tsx (kept here so this Node-side file doesn't pull in the app's JSX types). */
interface EntryServer {
  render: (siteUrl: string) => { lang: string; head: string; body: string }
}

/** Replaces one marker in the HTML, failing the build if it's missing. */
function replaceOnce(html: string, marker: string | RegExp, replacement: string): string {
  const found = typeof marker === 'string' ? html.includes(marker) : marker.test(html)
  if (!found) {
    throw new Error(`prerender: marker ${String(marker)} not found in index.html`)
  }
  return html.replace(marker, () => replacement)
}

/**
 * Build-only plugin that prerenders the page into index.html: sets <html
 * lang>, replaces the placeholder <title> with the full head metadata, and
 * fills #root with the rendered app. Runs inside `vite build`, so it works
 * whichever command the host uses to build.
 */
export function prerender({ siteUrl }: PrerenderOptions): Plugin {
  return {
    name: 'portfolio:prerender',
    apply: 'build',
    async transformIndexHtml(html) {
      // A throwaway SSR server, just to load the app's modules in Node.
      const server = await createServer({
        configFile: false,
        appType: 'custom',
        logLevel: 'error',
        server: { middlewareMode: true, hmr: false, ws: false },
        plugins: [react()],
      })

      try {
        const { render } = (await server.ssrLoadModule('/src/entry-server.tsx')) as EntryServer
        const { lang, head, body } = render(siteUrl)

        let out = replaceOnce(html, /<html lang="[^"]*">/, `<html lang="${lang}">`)
        out = replaceOnce(out, /<title>[^<]*<\/title>/, head)
        out = replaceOnce(out, '<div id="root"></div>', `<div id="root">${body}</div>`)
        return out
      } finally {
        await server.close()
      }
    },
  }
}
