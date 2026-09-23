import type { ReactNode } from 'react'
import type { SectionId } from '../content'

interface SectionProps {
  id: SectionId
  heading: string
  children: ReactNode
  /** Extra classes, e.g. a larger bottom padding for the last section. */
  className?: string
}

/**
 * A page section below the hero: opened by a hairline, heading stacked above
 * the content on mobile, and a 3fr / 9fr grid on desktop. Labelled by its h2.
 */
export function Section({ id, heading, children, className = '' }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`flex flex-col gap-7 border-t border-rule px-6 py-14 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-x-6 lg:gap-y-0 lg:p-24 ${className}`}
    >
      <h2 id={headingId} className="font-serif text-section italic">
        {heading}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
