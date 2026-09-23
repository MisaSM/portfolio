import { renderToString } from 'react-dom/server'
import { App } from './App'
import { content } from './content'
import { renderHead } from './head'

export interface PrerenderResult {
  lang: string
  head: string
  body: string
}

/**
 * Build-time only (see build/prerender.ts): renders the page to static HTML
 * so it arrives complete and works without JavaScript. The client entry
 * (main.tsx) then hydrates it.
 */
export function render(siteUrl: string): PrerenderResult {
  return {
    lang: content.lang,
    head: renderHead(content, siteUrl),
    body: renderToString(<App />),
  }
}
