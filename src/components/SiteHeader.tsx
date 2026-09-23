import type { HeaderContent } from '../content'
import { AnemoneMark } from './anemone/AnemoneMark'

interface SiteHeaderProps {
  content: HeaderContent
}

/**
 * Mobile: mark and Résumé pill on one row, nav underneath.
 * Desktop: mark on the left, nav and pill on the right.
 * DOM order (mark, nav, pill) is the tab order at every width.
 */
export function SiteHeader({ content }: SiteHeaderProps) {
  return (
    <header className="grid grid-cols-[auto_1fr] items-center gap-y-1 px-6 pt-3.5 lg:grid-cols-[auto_1fr_auto] lg:gap-x-11 lg:px-24 lg:py-7">
      <a
        href="#top"
        aria-label={content.homeLabel}
        className="-ml-1.5 flex size-11 items-center justify-center lg:ml-0"
      >
        <AnemoneMark className="size-8.5" />
      </a>

      <nav
        aria-label={content.navLabel}
        className="col-span-2 row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:justify-self-end"
      >
        <ul className="flex gap-6.5 text-nav tracking-[0.01em] lg:gap-11">
          {content.nav.map((item) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                className="inline-block py-3 text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href={content.resume.href}
        className="col-start-2 row-start-1 inline-flex h-11 items-center justify-self-end rounded-full border border-muted px-5 text-nav transition-colors hover:border-accent-text hover:text-accent-text lg:col-start-3"
      >
        {content.resume.label}
      </a>
    </header>
  )
}
