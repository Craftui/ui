import { notFound, redirect } from "next/navigation"
import { ComponentDocShell } from "@/app/components/_components/component-doc-shell"
import { componentDocs, getComponentDoc } from "@/app/components/_lib/docs"

interface ComponentPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return componentDocs.map((component) => ({
    slug: component.slug,
  }))
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params
  const normalizedSlug = decodeURIComponent(slug).toLowerCase()
  const doc = getComponentDoc(normalizedSlug)

  if (!doc) {
    if (normalizedSlug === "components") {
      redirect(`/components/${componentDocs[0].slug}`)
    }
    notFound()
  }

  return <ComponentDocShell activeComponent={doc} />
}
