import { en } from './en'
import type { SiteContent } from './types'

export type * from './types'

/**
 * The active locale. A second language would add another file shaped like
 * en.ts (typed as SiteContent) and choose between them here.
 */
export const content: SiteContent = en
