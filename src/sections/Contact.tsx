import { CopyEmailButton } from '../components/CopyEmailButton'
import { Section } from '../components/Section'
import type { ContactContent } from '../content'

interface ContactProps {
  email: string
  content: ContactContent
}

const textLink =
  'underline decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent-text'

/**
 * Contact: the email as a mailto link, the copy button with its live status,
 * then the GitHub and résumé links. The wrapper is a size container so the
 * email can shrink to fit the column instead of wrapping.
 */
export function Contact({ email, content }: ContactProps) {
  return (
    <Section id="contact" heading={content.heading} className="pb-16 lg:pb-27.5">
      <div className="@container flex flex-col items-start gap-6 lg:gap-9">
        <a
          href={`mailto:${email}`}
          className="font-serif text-email wrap-anywhere italic underline decoration-rule decoration-1 underline-offset-[7px] transition-colors hover:decoration-accent-text lg:tracking-[-0.015em] lg:underline-offset-[14px]"
        >
          {email}
        </a>

        <div className="flex w-full flex-col gap-6 lg:w-auto lg:flex-row lg:items-center lg:gap-5">
          <CopyEmailButton
            email={email}
            labels={content.copyButton}
            messages={content.copyStatus}
          />
        </div>

        <ul className="flex gap-6 text-body lg:gap-8">
          {content.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={`${textLink} decoration-muted`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
