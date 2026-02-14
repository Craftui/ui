export type ApiProp = {
  name: string
  type: string
  defaultValue: string
  description: string
}

export type DocMode = "base" | "radix"

export type InstallationSpec = Record<DocMode, string>

export type ComponentDocModeContent = {
  summary?: string
  description?: string
  api?: ApiProp[]
  a11y?: string[]
}

export type ComponentStatus = "Available" | "In progress" | "Planned"

export type ComponentCategory = "Foundations" | "Overlays" | "Utility"

export type MarkdownSection = {
  id: string
  title: string
  markdown: string
}

export type ComponentDoc = {
  slug: string
  name: string
  status: ComponentStatus
  isNew?: boolean
  order: number
  category: ComponentCategory
  summary: string
  description: string
  installation: InstallationSpec
  api: ApiProp[]
  a11y: string[]
  sections: MarkdownSection[]
  modeContent?: Partial<Record<DocMode, ComponentDocModeContent>>
}

export type TocLinkItem = {
  type: "link"
  id: string
  label: string
}

export type TocGroupItem = {
  type: "group"
  label: string
  items: TocLinkItem[]
}

export type TocItem = TocLinkItem | TocGroupItem

export function resolveComponentDocContent(doc: ComponentDoc, mode: DocMode) {
  const modeContent = doc.modeContent?.[mode]
  return {
    summary: modeContent?.summary ?? doc.summary,
    description: modeContent?.description ?? doc.description,
    api: modeContent?.api ?? doc.api,
    a11y: modeContent?.a11y ?? doc.a11y,
  }
}

export function getTocItemsForDoc(doc?: ComponentDoc): TocItem[] {
  const baseItems: TocItem[] = [
    { type: "link", id: "overview", label: "Overview" },
    { type: "link", id: "demo", label: "Interactive demo" },
    { type: "link", id: "installation", label: "Installation" },
  ]

  const contentItems = (doc?.sections ?? [])
    .filter((section) =>
      doc?.slug === "match-case" || doc?.slug === "tabs" ? section.id !== "examples" : true
    )
    .map<TocLinkItem>((section) => ({
      type: "link",
      id: section.id,
      label: section.title,
    }))

  if ((doc?.slug === "match-case" || doc?.slug === "tabs") && contentItems.length > 0) {
    return [
      ...baseItems,
      { type: "link", id: "examples", label: "Examples" },
      { type: "group", label: "Examples", items: contentItems },
      { type: "link", id: "api", label: "API reference" },
    ]
  }

  return [
    ...baseItems,
    ...contentItems,
    { type: "link", id: "api", label: "API reference" },
  ]
}
