import { Section } from '../components/Section'
import type { StackContent } from '../content'

interface StackProps {
  content: StackContent
}

/**
 * Tech stack: six core items large in the serif (3 columns desktop, 2 mobile),
 * then six grouped paragraphs (3 columns desktop, 1 mobile).
 */
export function Stack({ content }: StackProps) {
  return (
    <Section id="stack" heading={content.heading}>
      <div className="flex flex-col gap-9 lg:gap-12">
        <ul
          aria-label={content.coreLabel}
          className="grid grid-cols-2 gap-x-6 border-t border-rule font-serif text-stack lg:grid-cols-3 lg:gap-x-10"
        >
          {content.core.map((item) => (
            <li key={item} className="border-b border-rule py-3 lg:py-4">
              {item}
            </li>
          ))}
        </ul>

        <div className="grid gap-y-6 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-9">
          {content.groups.map((group) => (
            <div key={group.title} className="flex flex-col gap-1.5">
              <h3 className="font-serif text-label text-muted italic">{group.title}</h3>
              <p className="text-body">{group.items}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
