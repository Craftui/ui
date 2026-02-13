export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          About
        </p>
        <h1 className="font-display text-4xl">Why CraftUI exists</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          We&apos;re building a registry that treats motion as a quiet, helpful
          response rather than a spectacle.
        </p>
      </header>

      <div className="glass-card rounded-3xl p-8">
        <h2 className="font-display text-3xl">
          Interfaces should answer back.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          CraftUI is inspired by Emil Kowalski&apos;s thesis on tactile UI. We aim
          to ship components with carefully tuned feedback loops, origin-aware
          animation, and clear API surfaces that feel effortless to use.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border/70 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Principle
          </p>
          <h3 className="font-display text-2xl">Responsive</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Every interaction should acknowledge the user instantly.
          </p>
        </div>
        <div className="rounded-2xl border border-border/70 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Principle
          </p>
          <h3 className="font-display text-2xl">Intentional</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Motion is a cue, not decoration. It clarifies hierarchy.
          </p>
        </div>
        <div className="rounded-2xl border border-border/70 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Principle
          </p>
          <h3 className="font-display text-2xl">Quiet</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            The interface should feel calm, stable, and composed.
          </p>
        </div>
      </div>
    </div>
  )
}

