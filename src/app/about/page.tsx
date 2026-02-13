export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 py-12 md:px-10 lg:px-14">
        <div
          className="pointer-events-none absolute inset-[-28%] blur-[5px]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 14% 14%, rgba(255, 255, 255, 0.92), transparent 30%), radial-gradient(circle at 83% 22%, rgba(241, 230, 215, 0.56), transparent 29%), radial-gradient(circle at 58% 84%, rgba(232, 212, 186, 0.28), transparent 34%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1320px]">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              About CraftUI
            </p>
            <h1 className="font-display text-[clamp(2.2rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-balance">
              Built by one developer
              <br />
              for products that should
              <br />
              age with dignity.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              CraftUI is a small library with a specific belief: interface style
              should not expire every season. We design for evergreen clarity,
              antique character, and subtle feedback that makes software feel
              responsive without noise.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 px-6 py-12 md:px-10 lg:px-14">
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

      <section className="px-6 py-12 md:px-10 lg:px-14">
        <div className="mx-auto w-full max-w-[1320px]">
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
            CraftUI is not trying to look new. It is trying to stay good.
            Durable visual language, thoughtful interaction cues, and components
            that feel composed in real products.
          </p>
        </div>
      </section>
    </div>
  )
}
