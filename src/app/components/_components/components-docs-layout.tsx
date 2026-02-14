import { ComponentsPageAside } from "@/app/components/_components/components-page-aside"
import { ComponentsSidebarNav } from "@/app/components/_components/components-sidebar-nav"
import {
  getComponentDocs,
  getTocBySlug,
} from "@/app/components/_lib/docs.server"

export async function ComponentsDocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const docs = getComponentDocs()
  const tocBySlug = getTocBySlug()

  return (
    <div className="w-full bg-[linear-gradient(180deg,#f9f5ef_0%,#f4ece1_100%)] text-foreground">
      <div className="mx-auto grid min-h-[calc(100vh-170px)] w-full grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_250px]">
        <aside className="border-r border-border/80 bg-[color:var(--background)]/95 px-6 py-8">
          <ComponentsSidebarNav docs={docs} />
        </aside>

        <section className="bg-[color:var(--background)]/70 px-6 py-8">
          <div className="mx-auto w-full max-w-[52rem]">{children}</div>
        </section>

        <aside className="hidden border-l border-border/80 bg-[color:var(--background)]/85 px-6 py-8 xl:block">
          <ComponentsPageAside docs={docs} tocBySlug={tocBySlug} />
        </aside>
      </div>
    </div>
  )
}
