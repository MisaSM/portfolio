import { Fragment } from 'react'
import {
  BRACT_PATHS,
  CENTER,
  CENTER_RADIUS,
  CENTER_RING_RADIUS,
  PETAL_PATH,
  PETAL_STAGGER_MS,
  PETALS,
  STAMEN_TIP_RADIUS,
  STAMENS,
  STEM_PATH,
  STEM_TOP,
  VEINS_PATH,
  petalTransform,
} from './geometry'

const petalFill = { back: 'fill-accent-deep', front: 'fill-accent' } as const
const veinOpacity = { back: 0.3, front: 0.26 } as const

// The stem SVG starts at STEM_TOP inside the 400-unit-wide head, so pull it up
// by the rest of the head's height. Margin percentages resolve against width.
const stemOverlap = `${String(((400 - STEM_TOP) / 400) * 100)}%`

interface AnemoneProps {
  className?: string
  /** Extra classes for the stem SVG, e.g. a mask that fades it out. */
  stemClassName?: string
}

/**
 * The hero flower. The head keeps a square aspect ratio; the stem is a
 * separate SVG stretched to fill the rest of the element's height, so the
 * stem ends exactly at the element's bottom edge. Position and size the
 * element from outside. Decorative, so hidden from assistive tech.
 */
export function Anemone({ className = '', stemClassName = '' }: AnemoneProps) {
  return (
    <div aria-hidden="true" className={`flex flex-col ${className}`}>
      <svg viewBox="0 0 400 400" className="relative z-10 aspect-square w-full">
        <g
          fill="none"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeOpacity={0.75}
          className="stroke-muted"
        >
          {BRACT_PATHS.map((d) => (
            <path key={d} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </g>

        {PETALS.map(({ rotate, layer }, i) => (
          <g key={rotate} transform={petalTransform(rotate, layer)}>
            <g
              className="origin-[200px_200px] transform-view motion-safe:animate-unfurl"
              style={{ animationDelay: `${String(i * PETAL_STAGGER_MS)}ms` }}
            >
              <path d={PETAL_PATH} className={petalFill[layer]} />
              <path
                d={VEINS_PATH}
                fill="none"
                strokeWidth={1}
                strokeOpacity={veinOpacity[layer]}
                className="stroke-center"
              />
            </g>
          </g>
        ))}

        <g className="motion-safe:animate-settle">
          <circle cx={CENTER} cy={CENTER} r={CENTER_RADIUS} className="fill-center" />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={CENTER_RING_RADIUS}
            fill="none"
            strokeWidth={1}
            strokeOpacity={0.16}
            className="stroke-ink"
          />
          <g strokeWidth={1.2} className="fill-center stroke-center">
            {STAMENS.map(({ x1, y1, x2, y2 }) => (
              <Fragment key={`${String(x2)},${String(y2)}`}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} />
                <circle cx={x2} cy={y2} r={STAMEN_TIP_RADIUS} />
              </Fragment>
            ))}
          </g>
        </g>
      </svg>

      <svg
        viewBox="0 0 400 1000"
        preserveAspectRatio="none"
        className={`min-h-0 w-full flex-1 ${stemClassName}`}
        style={{ marginTop: `-${stemOverlap}` }}
      >
        <path
          d={STEM_PATH}
          fill="none"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeOpacity={0.75}
          vectorEffect="non-scaling-stroke"
          className="stroke-muted"
        />
      </svg>
    </div>
  )
}
