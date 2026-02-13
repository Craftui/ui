const updates = [
  {
    date: "Feb 13, 2026",
    title: "Registry launch",
    body: "Base UI and Radix UI registries ship with the first Button component.",
  },
  {
    date: "Feb 10, 2026",
    title: "Press feedback locked",
    body: "Button API set with tactile scale-on-press for instant response.",
  },
]

export default function ChangelogPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Changelog
        </p>
        <h1 className="font-display text-4xl">What&apos;s new</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          A short record of changes to the CraftUI registry.
        </p>
      </header>

      <div className="space-y-6">
        {updates.map((item) => (
          <div key={item.title} className="glass-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {item.date}
            </p>
            <h2 className="font-display text-2xl">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

