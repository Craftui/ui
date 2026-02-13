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
    <header className="border-b border-border/70 bg-[color:var(--background)]/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight">CraftUI</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Registry
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
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
      <div className="border-t border-border/60 md:hidden">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 px-6 py-4 text-sm text-muted-foreground">
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

