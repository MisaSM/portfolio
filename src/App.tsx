import { SiteHeader } from './components/SiteHeader'
import { content } from './content'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'

export function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-bg px-5 py-3 text-nav focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        {content.header.skipLink}
      </a>

      <div id="top" className="mx-auto max-w-360">
        <SiteHeader content={content.header} />
        <main id="main">
          <Hero person={content.person} content={content.hero} />
          <Work content={content.work} />
        </main>
        {/* Placeholder until the footer is designed; keeps the landmark in place. */}
        <footer className="border-t border-rule px-6 py-6 lg:px-24">
          <p className="text-meta text-muted">{content.person.fullName}</p>
        </footer>
      </div>
    </>
  )
}
