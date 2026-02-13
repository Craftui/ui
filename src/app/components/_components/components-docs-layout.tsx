"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { publishedComponentDocs, tocItems } from "@/app/components/_lib/docs"

const groups = [
  {
    name: "Foundations",
    items: publishedComponentDocs.filter(
      (item) => item.category === "Foundations"
    ),
  },
  {
    name: "Overlays",
    items: publishedComponentDocs.filter((item) => item.category === "Overlays"),
  },
].filter((group) => group.items.length > 0)

export function ComponentsDocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const isComponentsIndex = pathname === "/components"
  const activeSlug = isComponentsIndex
    ? undefined
    : pathname.replace("/components/", "")

  return (
    <div className="w-full bg-[linear-gradient(180deg,#f9f5ef_0%,#f4ece1_100%)] text-foreground">
      <div className="mx-auto grid min-h-[calc(100vh-170px)] w-full grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_250px]">
        <aside className="border-r border-border/80 bg-[color:var(--background)]/95 px-6 py-8">
          <div className="sticky top-6 space-y-6">
            <nav className="space-y-4" aria-label="Component navigation">
              <details open>
                <summary className="cursor-pointer select-none py-1 text-sm font-medium">
                  Docs
                </summary>
                <div className="mt-2 space-y-1">
                  <Link
                    href="/components"
                    className={cn(
                      "flex w-full items-center justify-between border-b border-border/60 px-2 py-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground",
                      isComponentsIndex &&
                        "border-foreground text-foreground [border-bottom-width:2px] font-medium"
                    )}
                    aria-current={isComponentsIndex ? "page" : undefined}
                  >
                    <span>Components</span>
                  </Link>
                </div>
              </details>

              {groups.map((group) => (
                <details key={group.name} open>
                  <summary className="cursor-pointer select-none py-1 text-sm font-medium">
                    {group.name}
                  </summary>
                  <div className="mt-2 space-y-1">
                    {group.items.map((item) => {
                      const isActive = item.slug === activeSlug
                      return (
                        <Link
                          key={item.slug}
                          href={`/components/${item.slug}`}
                          className={cn(
                            "flex w-full items-center justify-between border-b border-border/60 px-2 py-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground",
                            isActive && "border-foreground text-foreground [border-bottom-width:2px] font-medium"
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <span>{item.name}</span>
                          {item.isNew ? (
                            <span className="rounded-full border border-border/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-foreground">
                              New
                            </span>
                          ) : null}
                        </Link>
                      )
                    })}
                  </div>
                </details>
              ))}
            </nav>
          </div>
        </aside>

        <section className="bg-[color:var(--background)]/70 px-6 py-8">{children}</section>

        <aside className="hidden border-l border-border/80 bg-[color:var(--background)]/85 px-6 py-8 xl:block">
          <div className="sticky top-6">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              On this page
            </p>
            {isComponentsIndex ? (
              <nav className="mt-4" aria-label="Component quick links">
                {publishedComponentDocs.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/components/${item.slug}`}
                    className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            ) : (
              <nav className="mt-4" aria-label="Table of contents">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
