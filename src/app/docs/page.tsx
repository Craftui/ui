const sections = [
  {
    title: "Getting started",
    body: "Choose your registry stack, then add components directly through the shadcn CLI. We keep the API consistent between Base UI and Radix UI.",
  },
  {
    title: "Registry endpoints",
    body: "Base UI registry lives at /r/base. Radix UI registry lives at /r/radix. Use the matching endpoint for your project.",
  },
  {
    title: "Install a component",
    body: "Example: bunx shadcn@latest add button --registry https://craftui.ai/r/base",
  },
  {
    title: "API conventions",
    body: "Every component ships with tactile feedback, a small set of variants, and a focus on minimal props that are easy to remember.",
  },
]

export default function DocsPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Documentation
        </p>
        <h1 className="font-display text-4xl">Docs</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Practical guidance on using CraftUI registries in your shadcn workflow.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="glass-card rounded-2xl p-6">
            <h2 className="font-display text-2xl">{section.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{section.body}</p>
          </article>
        ))}
      </div>

      <div className="rounded-3xl border border-border/70 bg-white/70 p-6 font-mono text-xs text-foreground">
        bunx shadcn@latest add button --registry https://craftui.ai/r/radix
      </div>
    </div>
  )
}

