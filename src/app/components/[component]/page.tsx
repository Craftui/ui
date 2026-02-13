import { notFound } from "next/navigation"
import { ComponentDocShell } from "@/app/components/_components/component-doc-shell"
import { componentDocs, getComponentDoc } from "@/app/components/_lib/docs"

interface ComponentPageProps {
  params: Promise<{ component: string }>
}

export async function generateStaticParams() {
  return componentDocs.map((component) => ({
    component: component.slug,
  }))
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { component } = await params
  const doc = getComponentDoc(component)

  if (!doc) {
    notFound()
  }

  return <ComponentDocShell activeComponent={doc} />
}
