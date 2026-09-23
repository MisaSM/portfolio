import type { Project as ProjectContent } from '../content'
import { ClaimDiagram } from './ClaimDiagram'

/** Three-per-em space after the "Built with" label, as in the artboards. */
const LABEL_SPACE = String.fromCodePoint(0x2004)

interface ProjectProps {
  project: ProjectContent
  builtWithLabel: string
  className?: string
}

/**
 * One project: meta, title, description, an optional diagram, the problem
 * write-ups (2×2 on desktop, stacked on mobile) and the "Built with" line.
 */
export function Project({ project, builtWithLabel, className = '' }: ProjectProps) {
  const titleId = `project-${project.id}`

  return (
    <article aria-labelledby={titleId} className={`flex flex-col gap-5.5 lg:gap-7 ${className}`}>
      <div className="flex flex-col gap-2.5 lg:gap-3.5">
        <p className="flex flex-wrap gap-x-7 gap-y-1 text-meta text-muted tabular-nums">
          <span>{project.period}</span>
          {/* Keeps screen readers from running the two facts together. */}
          <span className="sr-only">, </span>
          <span>{project.team}</span>
        </p>
        <h3 id={titleId} className="font-serif text-project">
          {project.title}
        </h3>
        <p className="mt-1 max-w-[34em] text-description lg:mt-2">{project.description}</p>
      </div>

      {project.diagram && <ClaimDiagram content={project.diagram} />}

      <div className="grid gap-y-7 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-10">
        {project.problems.map((problem) => (
          <div key={problem.title} className="flex flex-col gap-2.5 border-t border-rule pt-4.5">
            <h4 className="font-serif text-problem italic">{problem.title}</h4>
            <p className="max-w-[62ch] text-body">{problem.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-1 text-meta leading-[1.6]">
        <span className="font-serif text-muted italic">{builtWithLabel + LABEL_SPACE}</span>
        {project.builtWith.join(', ')}
      </p>
    </article>
  )
}
