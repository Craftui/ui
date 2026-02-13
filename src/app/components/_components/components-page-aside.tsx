"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { publishedComponentDocs, tocItems } from "@/app/components/_lib/docs"

function ComponentsPageAsideImpl() {
  const pathname = usePathname()
  const isComponentsIndex = pathname === "/components"

  return (
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
  )
}

export const ComponentsPageAside = React.memo(ComponentsPageAsideImpl)
