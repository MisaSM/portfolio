/**
 * Shape of all site copy. A locale file (en.ts) provides one SiteContent;
 * sections receive their slice of it and render, never hard-coding text.
 */

/** In-page anchors. Sections use these as their element ids. */
export type SectionId = 'work' | 'stack' | 'contact'

export interface Link {
  label: string
  href: string
}

export interface NavItem {
  label: string
  target: SectionId
}

export interface Person {
  /** Name shown in the hero and used for the home link. */
  name: string
  /** Full name for the page title, metadata and social preview. */
  fullName: string
  email: string
}

export interface HeaderContent {
  /** Accessible name of the anemone home link. */
  homeLabel: string
  /** Accessible name of the primary nav landmark. */
  navLabel: string
  nav: NavItem[]
  resume: Link
}

/** One row of the hero facts list (dt / dd). */
export interface Fact {
  term: string
  detail: string
}

export interface HeroContent {
  greeting: string
  role: string
  summary: string
  facts: Fact[]
}

/** A problem write-up in a project's 2×2 grid. */
export interface Problem {
  title: string
  body: string
}

export interface ClaimDiagramContent {
  drivers: [string, string]
  functionTitle: string
  steps: [string, string, string]
  outcomes: {
    won: string
    lost: string
  }
  /** Accessible description of the diagram as a whole. */
  description: string
  caption: string
}

export interface Project {
  /** Stable slug for element ids (e.g. aria-labelledby targets). */
  id: string
  period: string
  /** Team context shown next to the period, e.g. "Sole developer". */
  team: string
  title: string
  description: string
  diagram?: ClaimDiagramContent
  problems: Problem[]
  builtWith: string[]
}

export interface EarlierRole {
  period: string
  organization: string
  role: string
  details: string[]
}

export interface WorkContent {
  heading: string
  /** Label before each project's stack list. */
  builtWithLabel: string
  projects: Project[]
  earlier: {
    heading: string
    roles: EarlierRole[]
  }
}

export interface StackGroup {
  title: string
  items: string
}

export interface StackContent {
  heading: string
  /** Accessible name of the core list. */
  coreLabel: string
  core: string[]
  groups: StackGroup[]
}

export interface ContactContent {
  heading: string
  copyButton: {
    idle: string
    success: string
  }
  /** Announced through the aria-live region after a copy attempt. */
  copyStatus: {
    success: string
    failure: string
  }
  links: Link[]
}

export interface SiteContent {
  /** BCP 47 language tag for <html lang>. */
  lang: string
  person: Person
  header: HeaderContent
  hero: HeroContent
  work: WorkContent
  stack: StackContent
  contact: ContactContent
}
