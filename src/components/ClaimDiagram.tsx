import type { ClaimDiagramContent } from '../content'

interface LayoutProps {
  content: ClaimDiagramContent
  className: string
}

/**
 * The claim race: two driver pills feed the edge function's three steps, and
 * exactly one request comes out claimed. Only the winning path and "Claimed"
 * use accent-text; everything else stays neutral. Geometry follows the
 * reference artboards.
 */
export function ClaimDiagram({ content }: { content: ClaimDiagramContent }) {
  return (
    <figure className="flex flex-col gap-4 pt-5 pb-1 lg:pt-9 lg:pb-2">
      <Vertical content={content} className="w-full max-w-85.5 xl:hidden" />
      <Horizontal content={content} className="hidden w-full xl:block" />
      <figcaption className="max-w-[60ch] text-meta leading-[1.55] text-muted">
        {content.caption}
      </figcaption>
    </figure>
  )
}

/** Desktop (xl and up): left to right, 880×250. */
function Horizontal({ content, className }: LayoutProps) {
  const [driverA, driverB] = content.drivers

  return (
    <svg viewBox="0 0 880 250" role="img" aria-label={content.description} className={className}>
      <g fill="none" strokeWidth={1.2} className="stroke-muted">
        <rect x={1} y={47} width={150} height={46} rx={23} />
        <rect x={1} y={157} width={150} height={46} rx={23} />
        <path d="M151 70 C220 70 232 125 294 125" />
        <path d="M151 180 C220 180 232 125 294 125" />
        <path d="M287 120 L296 125 L287 130" />
        <path d="M580 125 C640 125 648 180 690 180" />
        <path d="M683 175 L692 180 L683 185" />
        <rect x={698} y={157} width={180} height={46} rx={23} />
      </g>
      <g fill="none" strokeWidth={1.4} className="stroke-accent-text">
        <path d="M580 125 C640 125 648 70 690 70" />
        <path d="M683 65 L692 70 L683 75" />
        <rect x={698} y={47} width={180} height={46} rx={23} />
      </g>
      <rect
        x={300}
        y={30}
        width={280}
        height={190}
        rx={10}
        fill="none"
        strokeWidth={1.2}
        className="stroke-ink"
      />
      <line x1={324} y1={86} x2={556} y2={86} strokeWidth={1} className="stroke-rule" />

      <g fontSize={15} textAnchor="middle" className="font-sans">
        <text x={76} y={75} className="fill-ink">
          {driverA}
        </text>
        <text x={76} y={185} className="fill-ink">
          {driverB}
        </text>
        <text x={788} y={75} fontWeight={500} className="fill-accent-text">
          {content.outcomes.won}
        </text>
        <text x={788} y={185} className="fill-muted">
          {content.outcomes.lost}
        </text>
      </g>

      <text x={324} y={68} fontSize={20} className="fill-ink font-serif italic">
        {content.functionTitle}
      </text>
      <g className="font-sans">
        {content.steps.map((step, i) => {
          const y = 116 + i * 34
          return (
            <g key={step}>
              <text x={324} y={y} fontSize={14} className="fill-muted">
                {i + 1}
              </text>
              <text x={346} y={y} fontSize={15} className="fill-ink">
                {step}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

/** Mobile and tablet (below xl): top to bottom, 342×420. */
function Vertical({ content, className }: LayoutProps) {
  const [driverA, driverB] = content.drivers

  return (
    <svg viewBox="0 0 342 420" role="img" aria-label={content.description} className={className}>
      <g fill="none" strokeWidth={1.2} className="stroke-muted">
        <rect x={1} y={1} width={156} height={44} rx={22} />
        <rect x={185} y={1} width={156} height={44} rx={22} />
        <path d="M79 45 C79 80 171 70 171 106" />
        <path d="M263 45 C263 80 171 70 171 106" />
        <path d="M166 99 L171 108 L176 99" />
        <path d="M171 300 C171 336 263 330 263 364" />
        <path d="M258 357 L263 366 L268 357" />
        <rect x={185} y={372} width={156} height={44} rx={22} />
      </g>
      <g fill="none" strokeWidth={1.4} className="stroke-accent-text">
        <path d="M171 300 C171 336 79 330 79 364" />
        <path d="M74 357 L79 366 L84 357" />
        <rect x={1} y={372} width={156} height={44} rx={22} />
      </g>
      <rect
        x={1}
        y={112}
        width={340}
        height={188}
        rx={10}
        fill="none"
        strokeWidth={1.2}
        className="stroke-ink"
      />
      <line x1={22} y1={164} x2={320} y2={164} strokeWidth={1} className="stroke-rule" />

      <g fontSize={14} textAnchor="middle" className="font-sans">
        <text x={79} y={28} className="fill-ink">
          {driverA}
        </text>
        <text x={263} y={28} className="fill-ink">
          {driverB}
        </text>
        <text x={79} y={399} fontWeight={500} className="fill-accent-text">
          {content.outcomes.won}
        </text>
        <text x={263} y={399} className="fill-muted">
          {content.outcomes.lost}
        </text>
      </g>

      <text x={22} y={148} fontSize={19} className="fill-ink font-serif italic">
        {content.functionTitle}
      </text>
      <g className="font-sans">
        {content.steps.map((step, i) => {
          const y = 194 + i * 34
          return (
            <g key={step}>
              <text x={22} y={y} fontSize={13} className="fill-muted">
                {i + 1}
              </text>
              <text x={42} y={y} fontSize={14} className="fill-ink">
                {step}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
