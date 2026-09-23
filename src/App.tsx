import { content } from './content'

// Placeholder shell until the header, hero and sections are built.
export function App() {
  const { person, hero } = content

  return (
    <div className="flex min-h-dvh flex-col px-6 lg:px-24">
      <header className="border-b border-rule py-6">
        <p className="text-nav">{person.name}</p>
      </header>
      <main className="flex-1 py-14 lg:py-24">
        <p className="font-serif text-greeting text-muted italic">{hero.greeting}</p>
        <h1 className="font-serif text-name italic">{person.name}</h1>
        <p className="mt-6 text-role font-medium">{hero.role}</p>
      </main>
      <footer className="border-t border-rule py-6">
        <p className="text-meta text-muted">{person.fullName}</p>
      </footer>
    </div>
  )
}
