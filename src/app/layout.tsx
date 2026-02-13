import type { Metadata } from "next"
import { Fraunces, Work_Sans } from "next/font/google"
import "./globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
})

const body = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CraftUI Registry",
  description: "An editorial light-theme registry for elegant, animated UI.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <div className="relative isolate flex min-h-screen flex-col overflow-x-clip bg-[color:var(--background)]">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 8%, rgba(255,255,255,0.76), transparent 36%), radial-gradient(circle at 86% 10%, rgba(255,219,187,0.12), transparent 34%), radial-gradient(circle at 22% 38%, rgba(192,220,194,0.07), transparent 28%), radial-gradient(circle at 78% 60%, rgba(169,195,235,0.06), transparent 32%), radial-gradient(circle at 52% 78%, rgba(244,170,147,0.05), transparent 30%), linear-gradient(180deg, #fdfbf7 0%, #f7f4ef 40%, #f2ece2 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.09]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at 0 0, rgba(24,19,16,0.08) 0 1px, transparent 1px 4px), repeating-linear-gradient(0deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 3px)",
            }}
          />
          <SiteHeader />
          <main className="w-full flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
