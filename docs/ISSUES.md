# Build plan: v1 launch

Each `##` heading is one GitHub issue title; the text under it is the issue body. Create them in this order under a milestone named "v1 launch".

## Scaffold the project

Set up the empty repo as a Vite + React + TypeScript single-page app with pnpm, Tailwind, linting, formatting and CI.

**Acceptance criteria**
- TypeScript strict mode plus `noUncheckedIndexedAccess`
- Tailwind using its CSS-based theme config (tokens come in the next issue)
- ESLint (typescript-eslint, react-hooks, jsx-a11y) and Prettier
- Scripts: `dev`, `build`, `preview`, `typecheck`, `lint`, `format`
- Folders: `src/components`, `src/sections`, `src/content`, `src/styles`
- No router, data-fetching or state libraries
- GitHub Actions on pull requests and pushes to `main`: pnpm install (cached), typecheck, lint, build
- `CLAUDE.md` and `README.md` at the root
- Typecheck, lint and build all pass

## Design tokens and self-hosted fonts

Bring the color and type system from `docs/DESIGN.md` into the codebase and serve the fonts from the site itself.

**Acceptance criteria**
- All color tokens from DESIGN.md defined once as CSS variables and exposed through the Tailwind theme
- Bodoni Moda (roman and italic, variable) and Schibsted Grotesk served as woff2 via `@font-face` with `font-display: swap`; convert from the TTFs in `public/fonts/` if needed
- The display face is preloaded
- Base styles: background, text color, font smoothing, visible `:focus-visible` ring in `accent-text`
- No request to Google Fonts or any other font host

## Typed content layer

Move every piece of copy into typed data so sections only render.

**Acceptance criteria**
- `src/content/` holds typed data for hero facts, projects (meta, title, description, problems, stack), earlier work, core and grouped stack, and contact links
- Copy matches the reference artboards exactly
- Types are exported and used by sections; no copy is hard-coded in components
- Structured so a second language could be added later as another content file

## Header, hero and the anemone

Build the top of the page.

**Acceptance criteria**
- Header with anemone mark (home link, accessible name), in-page nav (Work, Stack, Contact) and Résumé pill
- Hero with greeting, name, role, summary and facts `dl`, matching DESIGN.md sizes on desktop and mobile
- `Anemone` component reproducing the reference SVG, with the stem ending on the next section's hairline
- Unfurl animation per DESIGN.md, disabled under `prefers-reduced-motion`
- Decorative SVGs are `aria-hidden`

## Selected work section

Build the flagship project, the second project and their shared layout.

**Acceptance criteria**
- Reusable `Project` component: meta, title, description, problem grid (2×2 desktop, stacked mobile), "Built with" line
- Claim-race diagram as an SVG component, horizontal on desktop and vertical on mobile, with an accessible description and a caption
- Winning path and "Claimed" drawn in `accent-text`; everything else neutral
- Semantic `article` per project

## Earlier work and tech stack

Build the compact earlier-work list and the stack section.

**Acceptance criteria**
- Earlier work: hairline rows with dates, organization and role, and bulleted details; three-column on desktop, stacked on mobile
- Stack: six core items large in the serif, then six grouped paragraphs, per DESIGN.md
- Section headings linked with `aria-labelledby`

## Contact and copy-to-clipboard

Build the contact section.

**Acceptance criteria**
- Email as a `mailto:` link
- Copy email button using the Clipboard API: shows "Copied" on success, an honest failure message otherwise, resets after about 2.6s
- Status announced through an `aria-live="polite"` region
- GitHub and Résumé links

## Responsive and accessibility pass

Check the whole page end to end.

**Acceptance criteria**
- Layout holds from 360px to 1600px+ with no horizontal scroll
- Full keyboard navigation with visible focus everywhere
- All text meets WCAG AA contrast
- Sensible reading order and landmarks with a screen reader
- Lighthouse accessibility score of 100

## Prerendering, metadata and social preview

Make the page arrive as real HTML and preview well when shared.

**Acceptance criteria**
- The page is rendered to static HTML at build time and hydrated on the client; content is visible with JavaScript disabled
- Title, description, canonical URL, Open Graph and Twitter card tags
- 1200×630 social preview image in the site's style
- Anemone favicon (SVG plus PNG fallbacks)

## Résumé, final links and launch

Ship it.

**Acceptance criteria**
- Résumé PDF in `public/` and linked from the header and contact section
- All placeholder links replaced
- Production deployment on Vercel from `main`, preview deployments on PRs
- Custom domain configured if one is chosen
- Link previews checked in at least one messaging app
