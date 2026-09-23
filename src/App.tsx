import { site } from './content/site'

export function App() {
  return (
    <div className="flex min-h-dvh flex-col px-6 md:px-24">
      <header className="py-6">
        <p>{site.title}</p>
      </header>
      <main className="flex-1 py-14 md:py-24">
        <h1 className="text-4xl">{site.placeholder.heading}</h1>
        <p className="mt-4 max-w-prose">{site.placeholder.body}</p>
      </main>
      <footer className="py-6">
        <p>{site.footer}</p>
      </footer>
    </div>
  )
}
