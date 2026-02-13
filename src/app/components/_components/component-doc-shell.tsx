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
  sidebarHeading: string
  sectionTitle: string
  navItem: string
  navItemActive: string
  main: string
  toc: string
  tocLink: string
  tocLinkActive: string
  tableHead: string
  code: string
}

const preset: LayoutPreset = {
  shell: "bg-[linear-gradient(180deg,#f9f5ef_0%,#f4ece1_100%)] text-foreground",
  sidebar: "border-r border-border/80 bg-[color:var(--background)]/95",
  sidebarHeading: "uppercase tracking-[0.28em] text-muted-foreground",
  sectionTitle: "border-b border-border/80 pb-3",
  navItem:
    "flex w-full items-center justify-between border-b border-border/60 px-2 py-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground",
  navItemActive:
    "border-foreground text-foreground [border-bottom-width:2px] font-medium",
  main: "bg-[color:var(--background)]/70",
  toc: "border-l border-border/80 bg-[color:var(--background)]/85",
  tocLink:
    "block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
  tocLinkActive: "text-foreground",
  tableHead:
    "border-b border-border/80 text-left text-xs uppercase tracking-[0.2em] text-muted-foreground",
  code: "rounded-md border border-border/80 bg-[color:var(--card)] px-3 py-2 font-mono text-xs",
}

const groups = [
  {
    name: "Foundations",
    items: componentDocs.filter((item) => item.category === "Foundations"),
  },
  {
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
      <details className="w-fit border border-border px-3 py-2 text-sm">
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
    <div
      className={cn(
        "relative left-1/2 -mt-10 w-full max-w-none -translate-x-1/2 overflow-x-hidden",
        preset.shell
      )}
    >
      <div className="mx-auto grid min-h-[calc(100vh-170px)] w-full grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_250px]">
        <aside className={cn("px-6 py-8", preset.sidebar)}>
          <div className="sticky top-6 space-y-8">
            <div className="space-y-3">
              <p className={cn("text-xs", preset.sidebarHeading)}>Components docs</p>
              <h1 className="font-display text-2xl tracking-tight">CraftUI</h1>
              <p className="text-sm text-muted-foreground">
                Full-width three-column documentation with structured navigation.
              </p>
            </div>

            <nav className="space-y-4" aria-label="Component navigation">
              <p className={cn("text-xs", preset.sidebarHeading)}>Library</p>
              {groups.map((group) => (
                <details key={group.name} open>
                  <summary className="cursor-pointer select-none py-1 text-sm font-medium">
                    {group.name}
                  </summary>
                  <div className="mt-2 space-y-1">
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
                          <span>{item.name}</span>
                          <span className="text-[10px] uppercase tracking-[0.18em]">
                            {item.status}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </details>
              ))}
            </nav>
          </div>
        </aside>

        <section className={cn("px-6 py-8", preset.main)}>
          {current ? (
            <article className="mx-auto w-full max-w-4xl space-y-10">
              <header className={preset.sectionTitle}>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Component
                </p>
                <h2 className="mt-3 font-display text-4xl tracking-tight">
                  {current.name}
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                  {current.summary}
                </p>
              </header>

              <section id="overview" className="space-y-3 scroll-mt-20">
                <h3 className="font-display text-2xl">Overview</h3>
                <p className="max-w-2xl text-sm text-muted-foreground">
                  {current.description}
                </p>
              </section>

              <section id="demo" className="space-y-4 scroll-mt-20">
                <h3 className="font-display text-2xl">Interactive demo</h3>
                <div className="border border-border p-5">
                  {renderComponentDemo(current)}
                </div>
              </section>

              <section id="installation" className="space-y-3 scroll-mt-20">
                <h3 className="font-display text-2xl">Installation</h3>
                <p className="text-sm text-muted-foreground">
                  Add this component through the registry:
                </p>
                <code className={preset.code}>{current.installation}</code>
              </section>

              <section id="api" className="space-y-3 scroll-mt-20">
                <h3 className="font-display text-2xl">API reference</h3>
                <div className="overflow-x-auto border border-border">
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

              <section id="accessibility" className="space-y-3 scroll-mt-20">
                <h3 className="font-display text-2xl">Accessibility</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {current.a11y.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </article>
          ) : (
            <div className="mx-auto w-full max-w-4xl border border-border p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Components
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-tight">
                Pick a component
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                This layout uses one page per component for interactive demos and
                API reference. Choose an item from the sidebar to start.
              </p>
            </div>
          )}
        </section>

        <aside className={cn("hidden px-6 py-8 xl:block", preset.toc)}>
          <div className="sticky top-6">
            <p className={cn("text-xs", preset.sidebarHeading)}>On this page</p>
            {current ? (
              <nav className="mt-4" aria-label="Table of contents">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      preset.tocLink,
                      item.id === "overview" && preset.tocLinkActive
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            ) : (
              <nav className="mt-4" aria-label="Component quick links">
                {componentDocs.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/components/${item.slug}`}
                    className={preset.tocLink}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
