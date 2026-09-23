/**
 * Anemone coronaria geometry, from docs/reference/*.dc.html. Everything is
 * drawn in a 400×400 user space centered on (200, 200).
 */

export const CENTER = 200

/** One petal, pointing up from the center. Rotated into place per petal. */
export const PETAL_PATH =
  'M200 200 C168 188 140 134 154 94 C166 58 234 58 246 94 C260 134 232 188 200 200 Z'

/** Three faint veins inside a petal. */
export const VEINS_PATH =
  'M200 188 C195 150 186 120 176 96 M200 188 C200 150 200 112 200 80 M200 188 C205 150 214 120 224 96'

export type PetalLayer = 'back' | 'front'

/**
 * Paint order is also unfurl order: the three back petals, then the three
 * front petals, each 70ms after the one before.
 */
export const PETALS: readonly { rotate: number; layer: PetalLayer }[] = [
  { rotate: 28, layer: 'back' },
  { rotate: 152, layer: 'back' },
  { rotate: 268, layer: 'back' },
  { rotate: 88, layer: 'front' },
  { rotate: 214, layer: 'front' },
  { rotate: 334, layer: 'front' },
]

/** Front petals are drawn at 90% so the back petals show between them. */
export function petalTransform(rotate: number, layer: PetalLayer): string {
  const rotation = `rotate(${String(rotate)} ${String(CENTER)} ${String(CENTER)})`
  return layer === 'front'
    ? `${rotation} translate(${String(CENTER)} ${String(CENTER)}) scale(0.9) translate(-${String(CENTER)} -${String(CENTER)})`
    : rotation
}

export const PETAL_STAGGER_MS = 70

export const CENTER_RADIUS = 27
export const CENTER_RING_RADIUS = 16

/**
 * Twenty stamens ringing the center: radial filaments every 18° starting at
 * 7°, from the center's edge out to alternating lengths, each tipped with an
 * anther.
 */
export const STAMEN_TIP_RADIUS = 2.6

const round = (value: number) => Math.round(value * 10) / 10

export const STAMENS = Array.from({ length: 20 }, (_, i) => {
  const angle = ((7 + 18 * i) * Math.PI) / 180
  const outer = i % 2 === 0 ? 40 : 46
  return {
    x1: round(CENTER + CENTER_RADIUS * Math.cos(angle)),
    y1: round(CENTER + CENTER_RADIUS * Math.sin(angle)),
    x2: round(CENTER + outer * Math.cos(angle)),
    y2: round(CENTER + outer * Math.sin(angle)),
  }
})

/** The feathery bract collar partway down the stem: three fronds per side. */
export const BRACT_PATHS = [
  'M200 330 C182 318 166 300 156 276 M182 318 C172 314 164 306 160 296 M170 306 C160 304 152 298 148 290',
  'M200 332 C178 334 156 330 132 318 M176 334 C168 342 158 344 148 342 M160 330 C150 324 142 316 138 306',
  'M200 334 C186 346 170 360 150 368 M182 350 C176 360 168 368 160 372',
  'M200 330 C218 318 234 300 244 276 M218 318 C228 314 236 306 240 296 M230 306 C240 304 248 298 252 290',
  'M200 332 C222 334 244 330 268 318 M224 334 C232 342 242 344 252 342 M240 330 C250 324 258 316 262 306',
  'M200 334 C214 346 230 360 250 368 M218 350 C224 360 232 368 240 372',
]

/** Where the stem leaves the flower, in head user space. */
export const STEM_TOP = 228

/**
 * The stem's gentle S-curve, normalized to a 400×1000 box so it can stretch
 * to any height. The artboards draw the same curve from y=228 to 860 on
 * desktop and to 1565 on mobile.
 */
export const STEM_PATH = 'M200 0 C204 252 196 456 201 660 S199 864 200 1000'
