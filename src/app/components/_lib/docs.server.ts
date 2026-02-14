import "server-only"

import fs from "node:fs"
import path from "node:path"
import { cache } from "react"
import {
  getTocItemsForDoc,
  type ComponentDoc,
  type ComponentDocModeContent,
  type ComponentStatus,
  type DocMode,
  type MarkdownSection,
  type TocItem,
} from "@/app/components/_lib/docs"

type FrontmatterDoc = Omit<ComponentDoc, "sections">

const COMPONENT_DOCS_DIR = path.join(process.cwd(), "content", "components")
const SECTION_HEADING_PATTERN = /^##\s+(.+)$/

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function parseMarkdownSections(markdown: string): MarkdownSection[] {
  const lines = markdown.split(/\r?\n/)
  const sections: MarkdownSection[] = []
  let currentTitle: string | null = null
  let buffer: string[] = []

  const pushSection = () => {
    if (!currentTitle) {
      return
    }
    const trimmed = buffer.join("\n").trim()
    sections.push({
      id: slugify(currentTitle),
      title: currentTitle,
      markdown: trimmed,
    })
    currentTitle = null
    buffer = []
  }

  for (const line of lines) {
    const headingMatch = line.match(SECTION_HEADING_PATTERN)
    if (headingMatch) {
      pushSection()
      currentTitle = headingMatch[1].trim()
      continue
    }

    if (currentTitle) {
      buffer.push(line)
    }
  }

  pushSection()
  return sections.filter((section) => section.markdown.length > 0)
}

function parseFrontmatter(raw: string, filename: string): FrontmatterDoc {
  const frontmatterMatch = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/)
  if (!frontmatterMatch) {
    throw new Error(`Missing frontmatter in ${filename}`)
  }

  try {
    return JSON.parse(frontmatterMatch[1]) as FrontmatterDoc
  } catch (error) {
    throw new Error(`Invalid frontmatter JSON in ${filename}: ${String(error)}`)
  }
}

function parseComponentDocFile(filepath: string): ComponentDoc {
  const filename = path.basename(filepath)
  const raw = fs.readFileSync(filepath, "utf8")
  const frontmatterMatch = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/)

  if (!frontmatterMatch) {
    throw new Error(`Unable to parse frontmatter/body in ${filename}`)
  }

  const meta = parseFrontmatter(raw, filename)
  const sections = parseMarkdownSections(frontmatterMatch[2] ?? "")

  return {
    ...meta,
    sections,
  }
}

const getComponentDocsCached = cache((): ComponentDoc[] => {
  const entries = fs
    .readdirSync(COMPONENT_DOCS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => parseComponentDocFile(path.join(COMPONENT_DOCS_DIR, entry.name)))

  return entries.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
})

export function getComponentDocs(): ComponentDoc[] {
  return getComponentDocsCached()
}

export function getPublishedComponentDocs(): ComponentDoc[] {
  return getComponentDocs().filter((doc) => doc.status === "Available")
}

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return getComponentDocs().find((doc) => doc.slug === slug)
}

export function getTocBySlug(): Record<string, TocItem[]> {
  return Object.fromEntries(
    getComponentDocs().map((doc) => [doc.slug, getTocItemsForDoc(doc)])
  )
}

export type {
  ComponentDoc,
  ComponentDocModeContent,
  ComponentStatus,
  DocMode,
  TocItem,
}
