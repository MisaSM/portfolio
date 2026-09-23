# Portfolio

A single-page developer portfolio: Vite + React + TypeScript + Tailwind, prerendered to static HTML and deployed on Vercel. There is no backend, no router and nothing to fetch.

- `docs/DESIGN.md` is the source of truth for the visual design. Read it before touching anything visual.
- `docs/ISSUES.md` is the build plan; each `##` section is a GitHub issue under the "v1 launch" milestone.
- `docs/reference/*.dc.html` are design-tool artboards holding the exact copy and the anemone SVG geometry. They use template syntax (`{{t.ink}}`, `<x-dc>`, `<sc-if>`). Read them as reference only and never copy their markup wholesale. Where they disagree with DESIGN.md, DESIGN.md wins.

## Commands

```sh
pnpm install     # install dependencies (pnpm version pinned via packageManager)
pnpm dev         # start the dev server
pnpm build       # typecheck, then production build to dist/
pnpm preview     # serve the production build locally
pnpm typecheck   # tsc -b across app and node configs
pnpm lint        # ESLint (typescript-eslint type-checked, react-hooks, jsx-a11y)
pnpm format      # Prettier, including Tailwind class sorting
pnpm fonts       # regenerate public/fonts/*.woff2 from assets/fonts/ (commit the output)
```

CI runs install, `typecheck`, `lint` and `build` on every pull request and on pushes to `main`. Run all three locally before pushing.

## Layout

- `src/content/`: all copy, as typed data. `types.ts` defines `SiteContent`, `en.ts` is the English copy, and `index.ts` exports the active `content`. Sections import from `./content` and receive their slice (`content.hero`, `content.work`, ...)
- `src/sections/`: page sections (hero, work, stack, contact), which render content
- `src/components/`: reusable pieces (anemone, project, claim diagram, copy button)
- `src/styles/`: `theme.css` (tokens: colors, font families, type scale), `fonts.css` (`@font-face`), `base.css` (page defaults, focus ring)
- `public/`: static assets served as-is (subset woff2 fonts, résumé, favicons)
- `assets/fonts/`: source TTFs and licenses, not served; `scripts/build-fonts.js` turns them into `public/fonts/`

## Conventions

- **All copy lives in `src/content` as typed data.** Components and sections never hard-code user-facing text; they import it. Keep the structure language-agnostic so a second language can be added as another content file.
- **Styling follows `docs/DESIGN.md`.** Use the theme tokens rather than raw hex values or ad-hoc sizes. Tailwind v4 is configured in CSS (`@theme` in `src/styles/theme.css`); there is no `tailwind.config.js`. Tailwind's default palette and font stacks are cleared, so only the design tokens exist. Type-scale utilities (`text-name`, `text-section`, `text-body`, ...) are responsive on their own: mobile size by default, desktop size from the `lg` breakpoint.
- **Fonts are self-hosted.** Never add a request to Google Fonts or any other font host. Bodoni Moda is subset to weight 400 with optical sizing kept, and Schibsted Grotesk to weights 400–600; widen the ranges in `scripts/build-fonts.js` and rerun `pnpm fonts` if the design needs more.
- **No terminal or CLI styling, and no monospace anywhere.** No prompts, fake shell output, bracketed nav or `//` labels.
- **Accessibility is a requirement, not a polish step.** Use semantic landmarks, `section` elements with `aria-labelledby`, real `<button>` and `<a href>` elements, visible `:focus-visible` rings, WCAG AA contrast, `aria-hidden` on decorative SVGs, and respect `prefers-reduced-motion`. jsx-a11y lint errors are never disabled to get a build through.
- **No router, data-fetching or state libraries.** It is one static page.
- TypeScript is `strict` with `noUncheckedIndexedAccess`: handle possibly-undefined index access explicitly rather than with `!`.

## Workflow

- One issue per branch and per PR. Name branches `<type>/<short-slug>` (e.g. `feat/hero`), and close the issue from the PR body (`Closes #N`).
- Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`, `ci:`, `build:`.
- Don't start the next issue until the current PR has been reviewed.
