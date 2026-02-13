import { notFound, redirect } from "next/navigation"
import { ComponentDocContent } from "@/app/components/_components/component-doc-content"
import {
  getComponentDoc,
  publishedComponentDocs,
  type DocMode,
} from "@/app/components/_lib/docs"

interface ComponentPageProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ mode?: string }>
}

export async function generateStaticParams() {
  return publishedComponentDocs.map((component) => ({
    slug: component.slug,
  }))
}

export default async function ComponentPage({
  params,
  searchParams,
}: ComponentPageProps) {
  const { slug } = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const normalizedSlug = decodeURIComponent(slug).toLowerCase()
  const initialMode: DocMode =
    resolvedSearchParams?.mode === "radix" ? "radix" : "base"
  const doc = getComponentDoc(normalizedSlug)

  if (!doc) {
    if (normalizedSlug === "components") {
      redirect(`/components/${publishedComponentDocs[0].slug}`)
    }
    notFound()
  }

  return <ComponentDocContent component={doc} initialMode={initialMode} />
}
