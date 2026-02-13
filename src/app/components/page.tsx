import Link from "next/link"
import { Button } from "@/components/ui/button"

const components = [
  { name: "Button", status: "Available", href: "#button" },
  { name: "Tooltip", status: "In progress", href: "#tooltip" },
  { name: "Popover", status: "Planned", href: "#popover" },
  { name: "Switch", status: "Planned", href: "#switch" },
]

export default function ComponentsPage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-2xl border border-border/70 bg-[color:var(--card)] p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Components
        </p>
        <nav className="mt-6 space-y-3 text-sm">
          {components.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>{item.name}</span>
              <span className="text-xs uppercase tracking-[0.2em]">
                {item.status}
              </span>
            </Link>
          ))}
        </nav>
        <div className="mt-8 rounded-xl border border-border/70 bg-[color:var(--accent)]/35 p-4 text-xs text-muted-foreground">
          The component list evolves with the registry. Expect more additions
          monthly.
        </div>
      </aside>

      <section className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Registry Components
          </p>
          <h1 className="font-display text-4xl tracking-tight">Button</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            A tactile, press-responsive button with clean variants. Available in
            both Base UI and Radix UI registries.
          </p>
        </header>

        <div id="button" className="glass-card rounded-3xl p-8">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" className="h-10 w-10">
              B
            </Button>
          </div>
          <div className="mt-6 rounded-2xl border border-border/70 bg-white/70 p-4 font-mono text-xs text-foreground">
            import {"{ Button }"} from "@/components/ui/button"
          </div>
        </div>

        <div id="tooltip" className="rounded-3xl border border-border/70 p-6">
          <h2 className="font-display text-2xl">Tooltip</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Next up: delayed first hover, instant subsequent hovers, and
            optional animation skip.
          </p>
        </div>

        <div id="popover" className="rounded-3xl border border-border/70 p-6">
          <h2 className="font-display text-2xl">Popover</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Origin-aware motion baked in, so popovers scale from their trigger.
          </p>
        </div>

        <div id="switch" className="rounded-3xl border border-border/70 p-6">
          <h2 className="font-display text-2xl">Switch</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A match-driven animated switcher for state-based UI transitions.
          </p>
        </div>
      </section>
    </div>
  )
}

