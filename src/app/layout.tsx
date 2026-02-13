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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <div className="min-h-screen">
          <SiteHeader />
          <main className="w-full pt-10">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
