import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  componentDocs,
  type ComponentDoc,
  tocItems,
} from "@/app/components/_lib/docs"

type LayoutPreset = {
  shell: string
  sidebar: string
  navItem: string
  navItemActive: string
  main: string
  tableHead: string
  code: string
}

const preset: LayoutPreset = {
  shell: "bg-[linear-gradient(180deg,#f9f5ef_0%,#f4ece1_100%)] text-foreground",
  sidebar: "border-r border-border/70 bg-[color:var(--background)]/85",
  navItem:
    "group block rounded-2xl border border-transparent px-3 py-3 text-left transition-colors hover:border-border/80 hover:bg-[color:var(--background)]",
  navItemActive:
    "border-border bg-[color:var(--background)] ring-1 ring-border/50",
  main: "bg-[color:var(--background)]/65",
  tableHead:
    "border-b border-border/80 text-left text-xs uppercase tracking-[0.2em] text-muted-foreground",
  code: "rounded-md border border-border/80 bg-[color:var(--card)] px-3 py-2 font-mono text-xs",
}

const groups = [
  {
    id: "foundations",
    name: "Foundations",
    items: componentDocs.filter((item) => item.category === "Foundations"),
  },
  {
    id: "overlays",
    name: "Overlays",
    items: componentDocs.filter((item) => item.category === "Overlays"),
  },
]

function renderComponentDemo(doc: ComponentDoc) {
  if (doc.slug === "button") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    )
  }

  if (doc.slug === "tooltip") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-md border border-border px-3 py-2 text-sm"
          title="Copy component usage to clipboard"
        >
          Hover or focus for browser tooltip
        </button>
      </div>
    )
  }

  if (doc.slug === "popover") {
    return (
      <details className="w-fit rounded-xl border border-border px-3 py-2 text-sm">
        <summary className="cursor-pointer list-none font-medium">
          Toggle popover sample
        </summary>
        <p className="mt-2 max-w-xl text-muted-foreground">
          A compact panel that contains form controls, quick actions, or short
          summaries without leaving context.
        </p>
      </details>
    )
  }

  return (
    <label className="inline-flex items-center gap-3 text-sm">
      <input type="checkbox" className="h-4 w-4 accent-current" />
      <span>Enable notifications</span>
    </label>
  )
}

interface ComponentDocShellProps {
  activeComponent?: ComponentDoc
}

export function ComponentDocShell({ activeComponent }: ComponentDocShellProps) {
  const current = activeComponent

  return (
    <div className={cn("w-full", preset.shell)}>
      <div className="mx-auto grid min-h-[calc(100vh-170px)] w-full grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className={cn("px-5 py-8 lg:px-6", preset.sidebar)}>
          <div className="sticky top-24 space-y-6">
            <div className="space-y-3">
              <h1 className="font-display text-2xl tracking-tight">
                Component Library
              </h1>
              <p className="text-sm text-muted-foreground">
                Browse every component and jump straight into docs, demos, and
                API details.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Quick jump
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {groups.map((group) => (
                  <a
                    key={group.id}
                    href={`#${group.id}`}
                    className="rounded-full border border-border/80 px-3 py-1 text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {group.name}
                  </a>
                ))}
              </div>
            </div>

            <nav className="space-y-4" aria-label="Component navigation">
              {groups.map((group) => (
                <div key={group.name} id={group.id} className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {group.name}
                  </p>
                  <div className="space-y-1.5">
                    {group.items.map((item) => {
                      const isActive = item.slug === current?.slug
                      return (
                        <Link
                          key={item.slug}
                          href={`/components/${item.slug}`}
                          className={cn(
                            preset.navItem,
                            isActive && preset.navItemActive
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-medium text-foreground">
                              {item.name}
                            </span>
                            <span className="rounded-full border border-border/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                              {item.status}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                            {item.summary}
                          </p>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <section className={cn("px-5 py-8 lg:px-8", preset.main)}>
          {current ? (
            <article className="mx-auto w-full max-w-4xl space-y-10">
              <header className="border-b border-border/80 pb-6">
                <h2 className="font-display text-4xl tracking-tight">{current.name}</h2>
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                  {current.summary}
                </p>
                <nav
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label="Component page sections"
                >
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="rounded-full border border-border/80 px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </header>

              <section id="overview" className="space-y-3 scroll-mt-28">
                <h3 className="font-display text-2xl">Overview</h3>
                <p className="max-w-2xl text-sm text-muted-foreground">
                  {current.description}
                </p>
              </section>

              <section id="demo" className="space-y-4 scroll-mt-28">
                <h3 className="font-display text-2xl">Interactive demo</h3>
                <div className="rounded-2xl border border-border p-5">
                  {renderComponentDemo(current)}
                </div>
              </section>

              <section id="installation" className="space-y-3 scroll-mt-28">
                <h3 className="font-display text-2xl">Installation</h3>
                <p className="text-sm text-muted-foreground">
                  Add this component through the registry:
                </p>
                <code className={preset.code}>{current.installation}</code>
              </section>

              <section id="api" className="space-y-3 scroll-mt-28">
                <h3 className="font-display text-2xl">API reference</h3>
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full min-w-[620px] border-collapse">
                    <thead>
                      <tr>
                        <th className={cn("px-3 py-3", preset.tableHead)}>Prop</th>
                        <th className={cn("px-3 py-3", preset.tableHead)}>Type</th>
                        <th className={cn("px-3 py-3", preset.tableHead)}>Default</th>
                        <th className={cn("px-3 py-3", preset.tableHead)}>
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {current.api.map((prop) => (
                        <tr key={prop.name} className="border-b border-border/70">
                          <td className="px-3 py-3 font-mono text-xs">{prop.name}</td>
                          <td className="px-3 py-3 font-mono text-xs">{prop.type}</td>
                          <td className="px-3 py-3 font-mono text-xs">
                            {prop.defaultValue}
                          </td>
                          <td className="px-3 py-3 text-sm text-muted-foreground">
                            {prop.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="accessibility" className="space-y-3 scroll-mt-28">
                <h3 className="font-display text-2xl">Accessibility</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {current.a11y.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </article>
          ) : (
            <div className="mx-auto w-full max-w-4xl space-y-8 rounded-3xl border border-border p-6 lg:p-8">
              <header className="space-y-3">
                <h2 className="font-display text-4xl tracking-tight">Components</h2>
                <p className="max-w-2xl text-sm text-muted-foreground">
                  Explore the full catalog. Select any component from the left
                  sidebar to read usage, test behavior, and inspect APIs.
                </p>
              </header>

              <div className="grid gap-3 sm:grid-cols-2">
                {componentDocs.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/components/${item.slug}`}
                    className="rounded-2xl border border-border p-4 transition-colors hover:bg-[color:var(--background)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-medium">{item.name}</h3>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {item.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
