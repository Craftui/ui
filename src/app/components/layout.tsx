import { ComponentsDocsLayout } from "@/app/components/_components/components-docs-layout"

export default function ComponentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ComponentsDocsLayout>{children}</ComponentsDocsLayout>
}
