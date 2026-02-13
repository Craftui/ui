const sections = [
  {
    id: "getting-started",
    title: "Getting started",
    body: "Choose your registry stack, then add components directly through the shadcn CLI. We keep the API consistent between Base UI and Radix UI.",
  },
  {
    id: "registry-endpoints",
    title: "Registry endpoints",
    body: "Base UI registry lives at https://craftui.dev/r/base. Radix UI registry lives at https://craftui.dev/r/radix. Use the matching endpoint for your project.",
  },
  {
    id: "install-component",
    title: "Install a component",
    body: "Example: bunx shadcn@latest add button --registry https://craftui.dev/r/base",
  },
  {
    id: "api-conventions",
    title: "API conventions",
    body: "Every component ships with tactile feedback, a small set of variants, and a focus on minimal props that are easy to remember.",
  },
]

const toc = sections.map((section) => ({
  id: section.id,
  title: section.title,
}))

const sideNav = [
  { id: "getting-started", label: "Getting started" },
  { id: "registry-endpoints", label: "Registry" },
  { id: "install-component", label: "Install" },
  { id: "api-conventions", label: "API conventions" },
]

export default function DocsPage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr_220px]">
      <aside className="h-fit rounded-2xl border border-border/70 bg-[color:var(--card)] p-5">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Docs
        </p>
        <nav className="mt-6 space-y-2 text-sm">
          {sideNav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <div className="space-y-10">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Documentation
          </p>
          <h1 className="font-display text-4xl">Docs</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Practical guidance on using CraftUI registries in your shadcn
            workflow.
          </p>
        </header>

        <div className="space-y-6">
          {sections.map((section) => (
            <article
              key={section.title}
              id={section.id}
              className="glass-card scroll-mt-24 rounded-2xl p-6"
            >
              <h2 className="font-display text-2xl">{section.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-border/70 bg-white/70 p-6 font-mono text-xs text-foreground">
          bunx shadcn@latest add button --registry https://craftui.dev/r/radix
        </div>
      </div>

      <aside className="h-fit rounded-2xl border border-border/70 bg-[color:var(--card)] p-5">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          On this page
        </p>
        <nav className="mt-6 space-y-2 text-sm">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  )
}
