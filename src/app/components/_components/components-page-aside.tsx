"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { type ComponentDoc, type TocItem } from "@/app/components/_lib/docs"

interface ComponentsPageAsideProps {
  docs: ComponentDoc[]
  tocBySlug: Record<string, TocItem[]>
}

function ComponentsPageAsideImpl({ docs, tocBySlug }: ComponentsPageAsideProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")
  const modeQuery = mode === "radix" ? "?mode=radix" : ""
  const isComponentsIndex = pathname === "/components"
  const activeSlug = isComponentsIndex
    ? undefined
    : pathname.replace("/components/", "")
  const tocItems = React.useMemo(
    () => (activeSlug ? tocBySlug[activeSlug] ?? [] : []),
    [activeSlug, tocBySlug]
  )

  return (
    <div className="sticky top-[6.25rem] [transform:translateZ(0)]">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        On this page
      </p>
      {isComponentsIndex ? (
        <nav className="mt-4" aria-label="Component quick links">
          {docs.map((item) => (
            <Link
              key={item.slug}
              href={`/components/${item.slug}${modeQuery}`}
              className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      ) : (
        <nav className="mt-4" aria-label="Table of contents">
          {tocItems.map((item, index) => (
            item.type === "link" ? (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <div key={item.label} className="pt-1">
                {(() => {
                  const previous = tocItems[index - 1]
                  const isDuplicateHeading =
                    previous?.type === "link" &&
                    previous.label.toLowerCase() === item.label.toLowerCase()

                  if (isDuplicateHeading) {
                    return null
                  }

                  return (
                    <p className="py-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {item.label}
                    </p>
                  )
                })()}
                {item.items.map((subItem) => (
                  <a
                    key={subItem.id}
                    href={`#${subItem.id}`}
                    className="block py-1 pl-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {subItem.label}
                  </a>
                ))}
              </div>
            )
          ))}
        </nav>
      )}
    </div>
  )
}

export const ComponentsPageAside = React.memo(ComponentsPageAsideImpl)
