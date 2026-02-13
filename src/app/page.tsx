import Link from "next/link"
import { Button } from "@/components/ui/button"

const principles = [
  {
    title: "Scale on press",
    description:
      "The interface should feel like it listens. A slight press-scale makes actions feel immediate.",
  },
  {
    title: "Instant follow-up tooltips",
    description:
      "Delay the first tooltip, then remove the delay so exploration feels fast.",
  },
  {
    title: "Origin-aware motion",
    description:
      "Popovers should scale from their trigger, not the center of the screen.",
  },
]

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="grid gap-12 pt-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            CraftUI Registry
          </p>
          <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
            A calm, editorial registry for animated interfaces.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Inspired by Emil Kowalski&apos;s interaction thesis. We ship gentle,
            tactile UI with clear APIs for both Base UI and Radix UI.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg">Browse components</Button>
            <Button variant="outline" size="lg">
              Read the docs
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Light theme by default</span>
            <span>Base UI + Radix UI</span>
            <span>Registry-first workflow</span>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-8">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Manifesto
              </p>
              <h2 className="font-display text-2xl">
                Your interface should answer back.
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We believe in tiny, intentional feedback loops that make your UI
              feel alive without adding noise. Components are built to feel
              immediate, thoughtful, and unmistakably crafted.
            </p>
            <div className="space-y-3 rounded-2xl border border-border/70 bg-[color:var(--accent)]/30 p-5 text-sm">
              <p className="font-medium">Registry endpoints</p>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <span>Base UI: /r/base</span>
                <span>Radix UI: /r/radix</span>
              </div>
              <Link
                href="/docs"
                className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                See usage in Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        {principles.map((item) => (
          <div key={item.title} className="glass-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Principle
            </p>
            <h3 className="font-display text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <h2 className="font-display text-3xl">Start with the button.</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The first component locks the API style we will follow throughout
            the registry: sensible defaults, clean variants, and tactile press
            feedback.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Registry usage
          </p>
          <h3 className="font-display text-2xl">Install from the CLI</h3>
          <div className="mt-6 space-y-4 text-sm text-muted-foreground">
            <div className="rounded-2xl border border-border/70 bg-white/70 p-4 font-mono text-xs text-foreground">
              bunx shadcn@latest add button --registry https://craftui.dev/r/base
            </div>
            <div className="rounded-2xl border border-border/70 bg-white/70 p-4 font-mono text-xs text-foreground">
              bunx shadcn@latest add button --registry https://craftui.dev/r/radix
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
