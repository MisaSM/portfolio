import { CENTER, PETAL_PATH, PETALS, petalTransform } from './geometry'

const petalFill = { back: 'fill-accent-deep', front: 'fill-accent' } as const

/** The mark's center is larger than the hero's so it reads at small sizes. */
const MARK_CENTER_RADIUS = 40

interface AnemoneMarkProps {
  className?: string
}

/**
 * The small anemone: petals and a solid center, no veins, stamens or stem.
 * Used for the header home link (and later the favicon). Decorative; the
 * surrounding link carries the accessible name.
 */
export function AnemoneMark({ className = '' }: AnemoneMarkProps) {
  return (
    <svg viewBox="50 50 300 300" aria-hidden="true" className={className}>
      {PETALS.map(({ rotate, layer }) => (
        <path
          key={rotate}
          d={PETAL_PATH}
          transform={petalTransform(rotate, layer)}
          className={petalFill[layer]}
        />
      ))}
      <circle cx={CENTER} cy={CENTER} r={MARK_CENTER_RADIUS} className="fill-center" />
    </svg>
  )
}
