import { SiteHeader } from './components/SiteHeader'
import { content } from './content'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Stack } from './sections/Stack'
import { Work } from './sections/Work'

export function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full border border-muted bg-bg text-nav focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-5 focus:py-3"
      >
        {content.header.skipLink}
      </a>

      <div id="top" className="mx-auto max-w-360">
        <SiteHeader content={content.header} />
        <main id="main">
          <Hero person={content.person} content={content.hero} />
          <Work content={content.work} />
          <Stack content={content.stack} />
          <Contact email={content.person.email} content={content.contact} />
        </main>
        {/* The full name connects the site to the résumé (DESIGN.md, "Name"). */}
        <footer className="border-t border-rule px-6 py-6 lg:px-24">
          <p className="text-meta text-muted">{content.person.fullName}</p>
        </footer>
      </div>
    </>
  )
}
