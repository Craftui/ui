import Link from "next/link"

const footerLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/changelog", label: "Changelog" },
  { href: "/about", label: "About" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-[color:var(--background)]/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-display text-lg">CraftUI Registry</p>
          <p className="max-w-md text-sm text-muted-foreground">
            An editorial, light-first registry inspired by Emil Kowalski&apos;s
            interaction philosophy. Built for calm, responsive interfaces.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 CraftUI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

