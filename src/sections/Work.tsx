import { Project } from '../components/Project'
import { Section } from '../components/Section'
import type { WorkContent } from '../content'

interface WorkProps {
  content: WorkContent
}

/** Selected work: the flagship project first, each later one opened by a hairline. */
export function Work({ content }: WorkProps) {
  return (
    <Section id="work" heading={content.heading}>
      <div className="flex flex-col gap-12 lg:gap-18">
        {content.projects.map((project, i) => (
          <Project
            key={project.id}
            project={project}
            builtWithLabel={content.builtWithLabel}
            className={i > 0 ? 'border-t border-rule pt-12 lg:pt-18' : ''}
          />
        ))}
      </div>
    </Section>
  )
}
