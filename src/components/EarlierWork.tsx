import type { WorkContent } from '../content'

interface EarlierWorkProps {
  content: WorkContent['earlier']
  className?: string
}

/**
 * Compact list of earlier roles: hairline rows with dates, organization and
 * role, and bulleted details. Three columns from xl (at lg the content column
 * is too narrow for three), stacked below that.
 */
export function EarlierWork({ content, className = '' }: EarlierWorkProps) {
  return (
    <div className={`flex flex-col gap-4.5 lg:gap-6 ${className}`}>
      <h3 className="font-serif text-subsection italic">{content.heading}</h3>

      <ul>
        {content.roles.map((role) => (
          <li
            key={role.organization}
            className="flex flex-col gap-2 border-t border-rule py-5 lg:py-6.5 xl:grid xl:grid-cols-[9.375rem_minmax(0,1fr)_minmax(0,1.5fr)] xl:items-baseline xl:gap-x-8 xl:gap-y-0"
          >
            <p className="text-meta text-muted tabular-nums">{role.period}</p>
            <div className="flex flex-col gap-2 lg:gap-1.5">
              <h4 className="text-entry font-medium">{role.organization}</h4>
              <p className="font-serif text-meta leading-normal text-muted italic">{role.role}</p>
            </div>
            <ul className="mt-1.5 flex list-disc flex-col gap-2 pl-4.5 text-body leading-[1.6] xl:mt-0">
              {role.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
