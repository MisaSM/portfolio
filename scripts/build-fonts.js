// Converts the source TTFs in assets/fonts/ into the subset woff2 files served
// from public/fonts/. Run with `pnpm fonts` after changing a source font, the
// character set or the axis ranges, and commit the output.
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import subsetFont from 'subset-font'

const root = join(import.meta.dirname, '..')
const sourceDir = join(root, 'assets/fonts')
const outDir = join(root, 'public/fonts')

// Latin, Latin-1 Supplement (covers Spanish), general punctuation and a few
// common symbols. Mirrors the "latin" range Google Fonts serves.
const ranges = [
  [0x0020, 0x007e],
  [0x00a0, 0x00ff],
  [0x0131, 0x0131],
  [0x0152, 0x0153],
  [0x02bb, 0x02bc],
  [0x02c6, 0x02c6],
  [0x02da, 0x02da],
  [0x02dc, 0x02dc],
  [0x2000, 0x206f],
  [0x20ac, 0x20ac],
  [0x2122, 0x2122],
  [0x2191, 0x2191],
  [0x2193, 0x2193],
  [0x2212, 0x2212],
  [0x2215, 0x2215],
]

let text = ''
for (const [start, end] of ranges) {
  for (let cp = start; cp <= end; cp++) text += String.fromCodePoint(cp)
}

// Keep tnum for tabular dates, plus kerning, ligatures and numeral forms.
const keepFeatures = [
  'kern',
  'liga',
  'calt',
  'ccmp',
  'locl',
  'mark',
  'mkmk',
  'case',
  'lnum',
  'onum',
  'pnum',
  'tnum',
  'frac',
  'numr',
  'dnom',
  'sups',
  'ordn',
]

// DESIGN.md uses Bodoni Moda only at weight 400 (optical sizing stays
// variable) and Schibsted Grotesk at 400 to 600. Widen these if the design
// ever needs other weights.
const fonts = [
  {
    source: 'BodoniModa-VariableFont_opsz,wght.ttf',
    output: 'bodoni-moda-roman.woff2',
    variationAxes: { wght: 400 },
  },
  {
    source: 'BodoniModa-Italic-VariableFont_opsz,wght.ttf',
    output: 'bodoni-moda-italic.woff2',
    variationAxes: { wght: 400 },
  },
  {
    source: 'SchibstedGrotesk-VariableFont_wght.ttf',
    output: 'schibsted-grotesk.woff2',
    variationAxes: { wght: { min: 400, max: 600 } },
  },
]

const licenses = ['OFL-BodoniModa.txt', 'OFL-SchibstedGrotesk.txt']

await mkdir(outDir, { recursive: true })

for (const font of fonts) {
  const input = await readFile(join(sourceDir, font.source))
  const woff2 = await subsetFont(input, text, {
    targetFormat: 'woff2',
    keepFeatures,
    variationAxes: font.variationAxes,
  })
  await writeFile(join(outDir, font.output), woff2)
  console.log(`${font.output}: ${(woff2.length / 1024).toFixed(1)} kB`)
}

for (const license of licenses) {
  await copyFile(join(sourceDir, license), join(outDir, license))
}
