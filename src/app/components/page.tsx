import Link from "next/link"
import { componentDocs } from "@/app/components/_lib/docs"

export default function ComponentsHomePage() {
  return (
    <article className="mx-auto w-full max-w-4xl space-y-10">
      <header className="border-b border-border/80 pb-3">
        <h2 className="font-display text-4xl tracking-tight">Components</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Browse the CraftUI component catalog from the left navigation. Each
          component page includes a live demo, installation command, API
          reference, and accessibility guidance.
        </p>
      </header>

      <section className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {componentDocs.map((item) => (
            <Link
              key={item.slug}
              href={`/components/${item.slug}`}
              className="border border-border px-4 py-3 transition-colors hover:bg-[color:var(--background)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">{item.name}</span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}
