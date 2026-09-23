export interface SiteContent {
  title: string
  placeholder: {
    heading: string
    body: string
  }
  footer: string
}

// Temporary copy for the scaffold. Replaced by the real content layer.
export const site: SiteContent = {
  title: 'Portfolio',
  placeholder: {
    heading: 'Portfolio',
    body: 'This site is being built.',
  },
  footer: 'Built with React and Vite.',
}
