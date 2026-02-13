import Link from "next/link"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
  { href: "/changelog", label: "Changelog" },
  { href: "/about", label: "About" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.62)_0%,rgba(247,244,239,0.82)_100%)] supports-[backdrop-filter]:bg-[linear-gradient(180deg,rgba(255,255,255,0.38)_0%,rgba(247,244,239,0.56)_100%)] supports-[backdrop-filter]:backdrop-blur-xl supports-[backdrop-filter]:backdrop-saturate-150">
      <div className="w-full px-5 py-4 md:px-8 lg:px-10">
        <div className="flex w-full items-center justify-between gap-6">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-display text-2xl tracking-tight">Registry</span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Components
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/components"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Get started
            </Link>
            <Button className="hidden md:inline-flex">Explore components</Button>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 md:hidden">
        <div className="flex w-full flex-wrap items-center gap-4 px-5 py-3 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
