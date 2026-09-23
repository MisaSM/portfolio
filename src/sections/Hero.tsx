import { Fragment } from 'react'
import { Anemone } from '../components/anemone/Anemone'
import type { HeroContent, Person } from '../content'

interface HeroProps {
  person: Person
  content: HeroContent
}

/**
 * Greeting, name, role, summary and facts, with the anemone to the right on
 * desktop and cropped off the top-right edge on mobile. The flower spans from
 * its top offset to the section's bottom edge, so its stem ends on the
 * hairline that opens the next section.
 */
export function Hero({ person, content }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-x-clip px-6 pb-14 [--flower-w:clamp(16rem,28vw,25rem)] lg:px-24 lg:pb-24"
    >
      {/*
        Below lg the stem would run behind the text, so it fades out instead.
        The 230px flower sits at the section top and the greeting starts 250px
        down, so in stem coordinates (the stem begins 131px down) the fade runs
        from the bract collar (~212px) to just above the greeting (~246px).
        On load (motion-safe) the stem starts full length and fades up to that.
      */}
      <Anemone
        className="absolute top-0 -right-14.5 bottom-0 w-57.5 lg:top-10 lg:right-26 lg:w-(--flower-w)"
        stemClassName="[--stem-fade-start:81px] [--stem-fade-end:115px] max-lg:mask-[linear-gradient(to_bottom,black_var(--stem-fade-start),transparent_var(--stem-fade-end))] max-lg:motion-safe:animate-stem-fade"
      />

      <div className="relative pt-62.5 lg:max-w-[calc(100%-var(--flower-w)-2.5rem)] lg:pt-30">
        <p className="mb-0.5 ml-1 font-serif text-greeting text-muted italic lg:mb-1.5 lg:ml-2.5">
          {content.greeting}
        </p>
        <h1 id="hero-title" className="font-serif text-name italic">
          {person.name}
        </h1>
        <p className="mt-5.5 ml-1 text-role font-medium lg:mt-10 lg:ml-2.5 lg:tracking-[-0.005em]">
          {content.role}
        </p>
        <p className="mt-3 ml-1 max-w-[34em] text-summary lg:mt-3.5 lg:ml-2.5">{content.summary}</p>

        <dl className="mt-7.5 ml-1 grid max-w-155 grid-cols-[5.75rem_minmax(0,1fr)] gap-x-4 border-t border-rule text-label lg:mt-10 lg:ml-2.5 lg:grid-cols-[8.125rem_minmax(0,1fr)] lg:gap-x-6">
          {content.facts.map((fact) => (
            <Fragment key={fact.term}>
              <dt className="border-b border-rule py-3.25 font-serif text-muted italic lg:py-3.75">
                {fact.term}
              </dt>
              <dd className="border-b border-rule py-3.25 lg:py-3.75">{fact.detail}</dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </section>
  )
}
