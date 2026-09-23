# Portfolio

My developer portfolio: a single page built with Vite, React, TypeScript and Tailwind CSS, prerendered to static HTML and deployed on Vercel.

## Requirements

- Node.js 22.13+ or 24 (CI uses the version in `.nvmrc`)
- pnpm 10. The exact version is pinned in `package.json` (`packageManager`), and pnpm switches to it automatically. Alternatively, run `corepack enable`.

## Setup

```sh
pnpm install
pnpm dev
```

The dev server runs at http://localhost:5173.

## Scripts

| Script           | What it does                                            |
| ---------------- | ------------------------------------------------------- |
| `pnpm dev`       | Start the Vite dev server with hot reload               |
| `pnpm build`     | Typecheck, then build for production into `dist/`       |
| `pnpm preview`   | Serve the production build locally                      |
| `pnpm typecheck` | Run the TypeScript compiler without emitting            |
| `pnpm lint`      | Lint with ESLint (typescript-eslint, React Hooks, a11y) |
| `pnpm format`    | Format everything with Prettier                         |

## Project structure

```
docs/            Design spec, build plan and reference artboards
public/          Static assets (fonts, résumé, favicons)
src/
  components/    Reusable components
  content/       All site copy as typed data
  sections/      Page sections
  styles/        Global CSS and Tailwind theme
```

## Continuous integration

GitHub Actions (`.github/workflows/ci.yml`) runs on every pull request and on pushes to `main`: a cached `pnpm install`, then `typecheck`, `lint` and `build`.

## Deployment

Vercel builds the project with its Vite preset (`pnpm build`, output `dist/`). No extra configuration is needed.
