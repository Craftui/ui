const exclusiveComponents = [
  {
    name: "Pulse Hint",
    status: "Shipping",
    detail: "Context cues that surface only when users pause.",
  },
  {
    name: "Edge Dock",
    status: "Preview",
    detail: "Pinned tools that stay light but feel physically anchored.",
  },
  {
    name: "Timeline Scrub",
    status: "Soon",
    detail: "Micro-scrubbing interactions for dense workflows.",
  },
  {
    name: "Ghost Queue",
    status: "Lab",
    detail: "Background jobs with calm, live progress feedback.",
  },
]

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 py-12 md:px-10 lg:px-14">
        <div
          className="pointer-events-none absolute inset-[-30%] blur-[4px]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 16% 18%, rgba(255, 255, 255, 0.92), transparent 32%), radial-gradient(circle at 86% 26%, rgba(241, 230, 215, 0.7), transparent 30%), linear-gradient(120deg, rgba(255, 255, 255, 0.56), transparent 58%)",
          }}
        />
        <div className="relative mx-auto flex w-full max-w-[1320px] justify-center">
          <div className="max-w-4xl space-y-6 text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              CraftUI library
            </p>
            <h1 className="font-display text-[clamp(2.3rem,8vw,6.6rem)] leading-[0.94] tracking-[-0.02em] text-balance">
              Tiny feedback.
              <br />
              Heavy lifting.
              <br />
              Quietly cinematic.
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
              CraftUI is built for interfaces that whisper every state change.
              We keep motion precise, remove UI noise, and make hard product
              behavior feel effortless.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border/70 px-6 py-12 md:px-10 lg:px-14">
        <div className="relative mx-auto grid w-full max-w-[1320px] gap-8 text-center lg:grid-cols-[0.74fr_1.26fr] lg:text-left">
          <aside className="order-2 lg:order-1">
            <div className="sticky top-10 space-y-5 pt-1">
              <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
                Built differently
              </p>
              <h2 className="font-display text-[clamp(1.9rem,4.8vw,4.1rem)] leading-[0.96] tracking-tight">
                Crafted
                <br />
                for product
                <br />
                velocity.
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                We are staging a few exclusive blocks before release. They are
                designed for real product teams that need expressive polish
                without complexity.
              </p>
            </div>
          </aside>
          <div className="order-1 grid auto-rows-auto gap-4 md:grid-cols-2 lg:order-2">
            {exclusiveComponents.map((component) => (
              <article
                key={component.name}
                className="rounded-[1.2rem] border border-border bg-[rgba(251,249,246,0.94)] p-[1.1rem_1.2rem] transition-transform duration-200 ease-out hover:-translate-y-[4px] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                  {component.status}
                </p>
                <h3 className="mt-2 font-display text-[1.8rem] leading-[1.02] tracking-tight">
                  {component.name}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {component.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-12 md:px-10 lg:px-14">
        <div className="relative mx-auto flex w-full max-w-[1320px] items-end justify-center">
          <div className="w-full space-y-8 pt-10 md:space-y-12">
            <p className="text-center text-[11px] uppercase tracking-[0.4em] text-muted-foreground lg:text-left">
              Motion that respects focus
            </p>
            <div className="grid gap-6 text-center lg:grid-cols-[1.2fr_0.8fr] lg:text-left">
              <h2 className="font-display text-[clamp(1.9rem,5.8vw,4.6rem)] leading-[0.96] tracking-tight text-balance">
                Get first access to the unapologetically useful set.
              </h2>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground lg:justify-self-end">
                No filler updates. Just releases, previews, and the small
                interactions that make real products feel alive.
              </p>
            </div>
            <form
              className="grid grid-cols-1 gap-[0.7rem] rounded-full border border-border bg-[rgba(251,249,246,0.96)] p-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:gap-[0.8rem]"
              action="#"
            >
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                className="min-h-12 w-full rounded-full border border-[rgba(31,26,23,0.22)] bg-[rgba(255,255,255,0.98)] px-4 text-[0.95rem] text-foreground outline-none transition-colors duration-150 placeholder:text-[color-mix(in_srgb,var(--muted-foreground)_92%,black_8%)] focus:border-foreground focus:bg-white focus:outline-2 focus:outline-[rgba(31,26,23,0.16)] focus:outline-offset-1 motion-reduce:transition-none"
                autoComplete="name"
              />
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="min-h-12 w-full rounded-full border border-[rgba(31,26,23,0.22)] bg-[rgba(255,255,255,0.98)] px-4 text-[0.95rem] text-foreground outline-none transition-colors duration-150 placeholder:text-[color-mix(in_srgb,var(--muted-foreground)_92%,black_8%)] focus:border-foreground focus:bg-white focus:outline-2 focus:outline-[rgba(31,26,23,0.16)] focus:outline-offset-1 motion-reduce:transition-none"
                autoComplete="email"
              />
              <button
                type="submit"
                className="min-h-12 rounded-full border border-foreground bg-foreground px-6 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-background transition-transform duration-150 hover:-translate-y-px hover:bg-black active:translate-y-px active:scale-[0.99] md:min-w-56 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Reserve your seat
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
