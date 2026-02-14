"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { publishedComponentDocs } from "@/app/components/_lib/docs"

const groupOrder = ["Foundations", "Utility", "Overlays"] as const

const groups = groupOrder
  .map((name) => ({
    name,
    items: publishedComponentDocs.filter((item) => item.category === name),
  }))
  .filter((group) => group.items.length > 0)

function ComponentsSidebarNavImpl() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")
  const modeQuery = mode === "radix" ? "?mode=radix" : ""
  const isComponentsIndex = pathname === "/components"
  const activeSlug = isComponentsIndex
    ? undefined
    : pathname.replace("/components/", "")

  return (
    <div className="sticky top-[6.25rem] space-y-6 [transform:translateZ(0)]">
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
                    href={`/components/${item.slug}${modeQuery}`}
                    className={cn(
                      "flex w-full items-center justify-between border-b border-border/60 px-2 py-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground",
                      isActive && "border-foreground text-foreground [border-bottom-width:2px] font-medium"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </details>
        ))}
      </nav>
    </div>
  )
}

export const ComponentsSidebarNav = React.memo(ComponentsSidebarNavImpl)
