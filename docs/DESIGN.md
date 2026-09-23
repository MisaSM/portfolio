# Portfolio design spec

Source of truth for the visual design. The artboards in `reference/` show the finished layout and contain the exact copy and the anemone SVG. They were exported from a design tool and use template syntax (`{{t.ink}}`, `<x-dc>`, `<sc-if>`), so read them as reference and rebuild in React; never copy their markup wholesale. When they disagree with this file, this file wins.

## Principles

- **No terminal or CLI styling, anywhere.** No monospace fonts, no command prompts, no bracketed nav, no `//` code comments used as labels, no fake shell output. "Developer" comes through the work itself and through how well the site is built.
- **Red means alive.** The accent appears only in the anemone and in interactive states (hover, focus, current item, the winning path in the claim diagram). Never as decoration on static text.
- **Every fact appears once.** No duplicated name rows or repeated summaries.
- **One bold element.** The anemone is the only ornament; everything around it stays quiet.
- **Built properly.** Semantic HTML (`header`, `nav`, `main`, `section` with `aria-labelledby`, `article`, `dl`), real `<button>`s and `<a href>`s, visible keyboard focus, WCAG AA contrast, `prefers-reduced-motion` respected.

## Color

Night is the site. Day is a matching light palette, kept for a possible future light mode (not scheduled).

| Token | Night | Day | Use |
|---|---|---|---|
| `bg` | `#0f0b0c` | `#f1ebe3` | Page background |
| `ink` | `#efe6dc` | `#1c1315` | Primary text |
| `muted` | `#a0938d` | `#6a5c57` | Secondary text, labels, stem and leaves |
| `rule` | `#2e2426` | `#d6cbc1` | Hairlines between rows and sections |
| `accent` | `#9e2b3f` | `#9e2b3f` | Front petals |
| `accent-deep` | `#721f2d` | `#721f2d` | Back petals (accent mixed 28% toward black) |
| `accent-text` | `#c07582` | `#8e2739` | Accent on text and strokes: hovers, focus rings, current nav, diagram winner |
| `center` | `#0f0b0c` | `#1c1315` | Flower center, stamens, petal veins |

## Type

Two families with clean roles. Serif for anything read as identity; sans for anything read as information.

- **Bodoni Moda** (variable, roman and italic, optical sizing on). Name, greeting, section headings, project titles, problem titles, field labels, core stack items, email.
- **Schibsted Grotesk** (400, 500, 600). Role line, summary, body copy, values, nav, meta, buttons.
- Fallbacks: `Didot, 'Bodoni 72', Georgia, serif` and `system-ui, sans-serif`.

| Element | Desktop | Mobile | Notes |
|---|---|---|---|
| Name (h1) | 208px / 0.86 | 92px / 0.9 | Bodoni italic 400, letter-spacing -0.035em |
| Greeting "Hi, I'm" | 30px | 21px | Bodoni italic, muted |
| Role line | 24px | 18px | Grotesk 500 |
| Summary | 19px / 1.6 | 16px / 1.6 | Max ~34em |
| Section heading (h2) | 40px / 1.1 | 32px | Bodoni italic 400 |
| Project title (h3) | 60px / 1 | 42px | Bodoni roman 400, letter-spacing -0.02em |
| Problem title (h4) | 25px / 1.2 | 22px | Bodoni italic |
| Body | 16px / 1.65 | 15px / 1.65 | Max 62ch |
| Field labels (dt, "Built with", "Tech") | 17px | 15px | Bodoni italic, muted |
| Meta (dates, team) | 15px | 14px | Grotesk, muted |
| Core stack items | 32px / 1.2 | 24px | Bodoni roman |
| Email | 60px / 1.1 | 22px | Bodoni italic, underline in `rule`, `accent-text` on hover |
| Nav | 15px | 15px | Grotesk, sentence case |

Rules: sentence case everywhere, no all-caps labels, tabular numerals for dates.

## Layout

- Desktop reference width 1440px, 96px side padding. Mobile 24px side padding, single column.
- **Header:** anemone mark (home link, 44px target) on the left. Right side: nav (Work, Stack, Contact as in-page anchors) and a Résumé pill button.
- **Hero:** greeting, name, role, summary, then a `dl` of facts (Currently, Based in, Education, Languages) with hairline rows. The anemone sits to the right on desktop (top-right and cropped off the edge on mobile). Its stem runs down and ends exactly on the hairline that opens the next section.
- **Sections:** separated by a 1px `rule` hairline. On desktop each is a two-column grid (`3fr` heading column, `9fr` content, 24px gap) with 96px vertical padding. On mobile the heading stacks above the content, with 56px padding.
- **Selected work:** PorChat Go (flagship, with the claim-race diagram), then PorChat, then "Earlier work" as a compact list (dates, organization and role, bulleted details). Each project has meta, title, one-paragraph description, a 2×2 grid of problem write-ups (single column on mobile, each topped by a hairline), and a "Built with" line.
- **Tech stack:** six core items large in the serif (3 columns desktop, 2 mobile), then six grouped small paragraphs (3 columns desktop, 1 mobile).
- **Contact:** email as a `mailto:` link, a Copy email button with an `aria-live` status, then GitHub and Résumé links.
- No cards, no shadows, no gradients. Structure comes from hairlines and spacing.

## Components

- **Anemone.** An SVG *Anemone coronaria*: three back petals (`accent-deep`) and three front petals (`accent`, scaled 0.9), faint veins, a dark domed center ringed by stamens, a feathery bract collar partway down the stem, and a thin stem in `muted`. Petal and stamen geometry is in the reference artboards. Reused small, with no veins or stamens, as the header mark and the favicon.
- **Claim diagram.** Two driver pills feed into the "Claim edge function" box listing three numbered steps. The outputs are "Claimed" (drawn in `accent-text`) and "HTTP 409 Conflict" (drawn in `muted`). There's a horizontal version for desktop and a vertical one for mobile. Give it an accessible description.
- **Copy email button.** Idle label "Copy email", success label "Copied". On failure it says copying isn't available and to select the address instead; never claim success when it failed. Resets after about 2.6s.

## Motion

One orchestrated moment only. On load, the petals unfurl: scale from 0.55 and rotate from -14deg, 1.2s, `cubic-bezier(.2,.75,.15,1)`, 70ms stagger. The center fades in at 550ms. Disabled entirely under `prefers-reduced-motion`. No other ambient animation, and no scroll-triggered reveals. Hover transitions are fine.
