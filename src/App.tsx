import { site } from './content/site'

export function App() {
  return (
    <div className="flex min-h-dvh flex-col px-6 lg:px-24">
      <header className="border-b border-rule py-6">
        <p className="text-nav">{site.title}</p>
      </header>
      <main className="flex-1 py-14 lg:py-24">
        <h1 className="font-serif text-section italic">{site.placeholder.heading}</h1>
        <p className="mt-4 max-w-[62ch] text-body text-muted">{site.placeholder.body}</p>
      </main>
      <footer className="border-t border-rule py-6">
        <p className="text-meta text-muted">{site.footer}</p>
      </footer>
    </div>
  )
}
