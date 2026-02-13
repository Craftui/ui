import Link from "next/link"

const footerLinks = [
  { href: "/components", label: "Components" },
  { href: "/changelog", label: "Changelog" },
  { href: "/about", label: "About" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-transparent">
      <div className="flex w-full flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
        <div className="space-y-2">
          <p className="font-display text-lg">CraftUI Registry</p>
          <p className="max-w-md text-sm text-muted-foreground">
            An editorial, light-first registry built for calm, responsive
            interfaces with practical interaction patterns.
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
        <p className="text-xs text-muted-foreground">© 2026 CraftUI. All rights reserved.</p>
      </div>
    </footer>
  )
}
