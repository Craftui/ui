export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border/70 px-6 py-10 md:px-10 md:py-12 lg:px-14">
        <div className="mx-auto grid w-full max-w-[1320px] gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-3xl space-y-5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              About CraftUI
            </p>
            <h1 className="font-display text-[clamp(2rem,4.8vw,3.7rem)] leading-[0.97] tracking-[-0.02em] text-balance">
              Built by one developer for products that should age with dignity.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              CraftUI is a small library with a specific belief: interface style
              should not expire every season. We design for evergreen clarity,
              antique character, and subtle feedback that makes software feel
              responsive without noise.
            </p>
          </div>

          <div className="max-w-md rounded-2xl border border-border/80 bg-background/70 p-5 lg:justify-self-end">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              Design intent
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-[0.98rem]">
              <li className="border-b border-border/70 pb-3">
                Structured layouts that prioritize reading rhythm before
                ornament.
              </li>
              <li className="border-b border-border/70 pb-3">
                Warm, low-noise visuals grounded in tokens and consistent
                spacing.
              </li>
              <li>
                Intentional motion that clarifies interaction without adding
                visual clutter.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 px-6 py-10 md:px-10 md:py-12 lg:px-14">
        <div className="mx-auto grid w-full max-w-[1320px] gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              Philosophy
            </p>
            <h2 className="font-display text-[clamp(1.9rem,5vw,4rem)] leading-[0.98] tracking-tight">
              Formal by default.
              <br />
              Interactive by intent.
            </h2>
          </div>

          <div className="space-y-8">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              We avoid trend-driven decoration and component clutter. Instead of
              stacking cards everywhere, we use typography, spacing, and rhythm
              to organize meaning. Motion is reserved for orientation: hover
              response, focus visibility, and state transition.
            </p>

            <div className="divide-y divide-border/80 border-y border-border/80">
              {[
                {
                  title: "Evergreen Form",
                  detail:
                    "Layouts are editorial and restrained so pages remain relevant beyond a single visual trend cycle.",
                },
                {
                  title: "Antique Character",
                  detail:
                    "Tone comes from material-like warmth, soft edges, and measured contrast rather than glossy effects.",
                },
                {
                  title: "Subtle Feedback",
                  detail:
                    "Every control should acknowledge intent with small, fast cues that guide focus and preserve calm.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="group py-5 transition-colors duration-200 motion-reduce:transition-none"
                >
                  <h3 className="font-display text-2xl leading-tight tracking-tight transition-transform duration-200 group-hover:translate-x-[2px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[0.98rem]">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-10 md:py-12 lg:px-14">
        <div className="mx-auto w-full max-w-[1320px]">
          <div>
            <p className="max-w-4xl font-display text-[clamp(1.35rem,3.2vw,2.35rem)] leading-[1.08] tracking-tight">
              CraftUI is not trying to look new. It is trying to stay good.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Durable visual language, thoughtful interaction cues, and
              components that feel composed in real products.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
