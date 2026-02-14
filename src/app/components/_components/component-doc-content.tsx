"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"
import { MatchCase } from "@/components/ui/match-case"
import { Preview } from "@/components/ui/preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Cloud, Flame } from "lucide-react"
import { InstallationCommandBlock } from "@/app/components/_components/installation-command-block"
import {
  isMatchCaseExampleSection,
  MatchCaseExamplePreview,
} from "@/app/components/_components/match-case-example-previews"
import {
  isTabsExampleSection,
  TabsExamplePreview,
} from "@/app/components/_components/tabs-example-previews"
import {
  resolveComponentDocContent,
  type ComponentDoc,
  type DocMode,
} from "@/app/components/_lib/docs"
import { cn } from "@/lib/utils"

function normalizeMode(value: string | null | undefined): DocMode {
  return value === "radix" ? "radix" : "base"
}

type MarkdownBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }

function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const lines = markdown.split(/\r?\n/)
  const blocks: MarkdownBlock[] = []
  let paragraphBuffer: string[] = []
  let listBuffer: string[] = []

  const pushParagraph = () => {
    if (paragraphBuffer.length === 0) {
      return
    }
    blocks.push({
      kind: "paragraph",
      text: paragraphBuffer.join(" ").trim(),
    })
    paragraphBuffer = []
  }

  const pushList = () => {
    if (listBuffer.length === 0) {
      return
    }
    blocks.push({ kind: "list", items: listBuffer })
    listBuffer = []
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      pushParagraph()
      pushList()
      continue
    }

    if (trimmed.startsWith("- ")) {
      pushParagraph()
      listBuffer.push(trimmed.slice(2).trim())
      continue
    }

    pushList()
    paragraphBuffer.push(trimmed)
  }

  pushParagraph()
  pushList()

  return blocks
}

function renderComponentDemo(doc: ComponentDoc, mode: DocMode) {
  if (doc.slug === "button") {
    return (
      <div className="flex w-full flex-wrap items-center justify-center gap-3">
        <Button>Default</Button>
        <Button size="icon" aria-label="Add item">
          +
        </Button>
      </div>
    )
  }

  if (doc.slug === "tooltip") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-md border border-border px-3 py-2 text-sm"
          title="Copy component usage to clipboard"
        >
          Hover or focus for browser tooltip
        </button>
      </div>
    )
  }

  if (doc.slug === "popover") {
    return (
      <details className="w-fit border border-border px-3 py-2 text-sm">
        <summary className="cursor-pointer list-none font-medium">
          Toggle popover sample
        </summary>
        <p className="mt-2 max-w-xl text-muted-foreground">
          A compact panel that contains form controls, quick actions, or short
          summaries without leaving context.
        </p>
      </details>
    )
  }

  if (doc.slug === "code-block") {
    const command = doc.installation[mode]
    const stripped = command.replace(/^bunx\s+/, "")

    return (
      <CodeBlock
        tabs={[
          {
            id: "bun",
            label: "bun",
            language: "bash",
            code: `bunx ${stripped}`,
          },
          {
            id: "pnpm",
            label: "pnpm",
            language: "bash",
            code: `pnpm dlx ${stripped}`,
          },
          {
            id: "yarn",
            label: "yarn",
            language: "bash",
            code: `yarn dlx ${stripped}`,
          },
        ]}
        showLineNumbers={false}
        wrap
        collapsible={false}
        copyButtonMode="icon"
      />
    )
  }

  if (doc.slug === "match-case") {
    return (
      <p className="max-w-xl text-center text-sm text-muted-foreground">
        Match Case demo is interactive on its component page.
      </p>
    )
  }

  if (doc.slug === "preview") {
    return (
      <Preview
        className="w-full max-w-3xl"
        preview={
          <div className="flex w-full flex-wrap items-center justify-center gap-3">
            <Button>Default</Button>
            <Button size="icon" aria-label="Open item">
              +
            </Button>
          </div>
        }
        code={`import { Preview } from "@/components/ui/preview"
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <Preview
      preview={
        <div className="flex items-center justify-center gap-3">
          <Button>Default</Button>
          <Button size="icon" aria-label="Open item">+</Button>
        </div>
      }
      code={\`<Button>Default</Button>\`}
      language="tsx"
    />
  )
}`}
      />
    )
  }

  if (doc.slug === "tabs") {
    return (
      <Tabs defaultValue="overview" className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="a11y">A11y</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          Use tabs to keep related content in one place without navigating away.
        </TabsContent>
        <TabsContent value="usage">
          Pair concise labels with clear panel content to reduce scanning effort.
        </TabsContent>
        <TabsContent value="a11y">
          Arrow keys move focus between triggers; Enter and Space activate tabs.
        </TabsContent>
      </Tabs>
    )
  }

  return (
    <label className="inline-flex items-center gap-3 text-sm">
      <input type="checkbox" className="h-4 w-4 accent-current" />
      <span>Enable notifications</span>
    </label>
  )
}

interface ComponentDocContentProps {
  component: ComponentDoc
  initialMode?: DocMode
}

export function ComponentDocContent({
  component,
  initialMode = "base",
}: ComponentDocContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeMode = React.useMemo(
    () => normalizeMode(searchParams.get("mode") ?? initialMode),
    [initialMode, searchParams]
  )

  const resolved = React.useMemo(
    () => resolveComponentDocContent(component, activeMode),
    [component, activeMode]
  )
  const backHref = activeMode === "radix" ? "/components?mode=radix" : "/components"
  const [matchCaseView, setMatchCaseView] = React.useState<
    "overview" | "api" | "preview"
  >("overview")

  const setMode = React.useCallback(
    (mode: DocMode) => {
      if (mode === activeMode) {
        return
      }

      const nextParams = new URLSearchParams(searchParams.toString())
      if (mode === "base") {
        nextParams.delete("mode")
      } else {
        nextParams.set("mode", mode)
      }

      const query = nextParams.toString()
      const href = query ? `${pathname}?${query}` : pathname
      router.replace(href, { scroll: false })
    },
    [activeMode, pathname, router, searchParams]
  )

  return (
    <article className="mx-auto w-full max-w-4xl space-y-10">
      <header className="pb-1">
        <h2 className="font-display text-4xl tracking-tight">{component.name}</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          {resolved.summary}
        </p>

        <div className="mt-5 border-b border-border/70">
          <div role="tablist" aria-label="Implementation mode" className="flex items-stretch">
            {[
              { id: "base", label: "Base" },
              { id: "radix", label: "Radix" },
            ].map((mode) => {
              const selected = activeMode === mode.id
              return (
                <Button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  id={`doc-tab-${mode.id}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => setMode(mode.id as DocMode)}
                  className={cn(
                    "h-7 rounded-none border-r border-border/70 border-b border-b-transparent px-2 py-0 text-xs font-medium text-muted-foreground hover:bg-transparent hover:text-foreground",
                    selected && "border-b-card bg-card text-foreground"
                  )}
                >
                  {mode.label}
                </Button>
              )
            })}
          </div>
        </div>
      </header>

      <section
        id="overview"
        className="space-y-3 scroll-mt-20"
        role="tabpanel"
        aria-labelledby={"doc-tab-" + activeMode}
      >
        <h3 className="font-display text-2xl">Overview</h3>
        <p className="max-w-2xl text-sm text-muted-foreground">{resolved.description}</p>
      </section>

      <section id="demo" className="scroll-mt-20">
        {component.slug === "preview" ? (
          renderComponentDemo(component, activeMode)
        ) : (
          <div className="flex min-h-56 w-full items-center justify-center rounded-2xl border border-border/80 bg-accent/55 p-8 md:min-h-64 md:p-10">
            {component.slug === "match-case" ? (
            <div className="flex w-full max-w-2xl flex-col gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {[
                    { id: "overview", label: "Notify", icon: Bell },
                    { id: "api", label: "Weather", icon: Cloud },
                    { id: "preview", label: "Energy", icon: Flame },
                  ].map((item) => {
                    const selected = matchCaseView === item.id
                    const ItemIcon = item.icon
                    return (
                      <Button
                        key={item.id}
                        type="button"
                        size="sm"
                        variant={selected ? "default" : "outline"}
                        onClick={() => setMatchCaseView(item.id as typeof matchCaseView)}
                        className="h-8 w-8 p-0"
                        aria-label={item.label}
                      >
                        <ItemIcon className="size-4" aria-hidden="true" />
                      </Button>
                    )
                  })}
                </div> 
              </div>

              <MatchCase value={matchCaseView} animation="blur" duration={260}>
                {({ containerProps, render }) => (
                  <div
                    {...containerProps}
                    className={cn(
                      containerProps.className,
                      "min-h-36 overflow-hidden rounded-xl border border-border/80 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_92%,var(--accent)_8%)_0%,var(--background)_100%)] p-5"
                    )}
                  >
                    {render(
                      "overview",
                      <div className="flex min-h-24 flex-col items-center justify-center gap-3 text-center">
                        <Bell className="size-10 text-foreground/85" aria-hidden="true" />
                      </div>
                    )}
                    {render(
                      "api",
                      <div className="flex min-h-24 flex-col items-center justify-center gap-3 text-center">
                        <Cloud className="size-10 text-foreground/85" aria-hidden="true" />
                      </div>
                    )}
                    {render(
                      "preview",
                      <div className="flex min-h-24 flex-col items-center justify-center gap-3 text-center">
                        <Flame className="size-10 text-foreground/85" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                )}
              </MatchCase>
            </div>
            ) : (
              renderComponentDemo(component, activeMode)
            )}
          </div>
        )}
      </section>

      <section id="installation" className="space-y-3 scroll-mt-20">
        <h3 className="font-display text-2xl">Installation</h3>
        <p className="text-sm text-muted-foreground">
          Add this component through the registry:
        </p>
        <InstallationCommandBlock installation={component.installation} mode={activeMode} />
      </section>

      {(component.slug === "match-case" || component.slug === "tabs") &&
      component.sections.length > 0 ? (
        <section id="examples" className="space-y-5 scroll-mt-20">
          <h3 className="font-display text-2xl">Examples</h3>
          <div className="space-y-8">
            {component.sections
              .filter((section) => section.id !== "examples")
              .map((section) => {
              const blocks = parseMarkdownBlocks(section.markdown)
              const renderMatchCaseExample = isMatchCaseExampleSection(section.id)

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="space-y-3 scroll-mt-20 border-t border-border/60 pt-6 first:border-t-0 first:pt-0"
                >
                  <h4 className="font-display text-xl">{section.title}</h4>
                  <div className="space-y-3">
                    {blocks.map((block, index) => {
                      if (block.kind === "list") {
                        return (
                          <ul
                            key={`${section.id}-list-${index}`}
                            className="list-disc space-y-2 pl-5 text-sm text-muted-foreground"
                          >
                            {block.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        )
                      }

                      return (
                        <p
                          key={`${section.id}-paragraph-${index}`}
                          className="text-sm text-muted-foreground"
                        >
                          {block.text}
                        </p>
                      )
                    })}
                    {renderMatchCaseExample ? (
                      <MatchCaseExamplePreview sectionId={section.id} />
                    ) : null}
                    {component.slug === "tabs" && isTabsExampleSection(section.id) ? (
                      <TabsExamplePreview sectionId={section.id} />
                    ) : null}
                  </div>
                </section>
              )
              })}
          </div>
        </section>
      ) : (
        component.sections.map((section) => {
          const blocks = parseMarkdownBlocks(section.markdown)
          return (
            <section key={section.id} id={section.id} className="space-y-3 scroll-mt-20">
              <h3 className="font-display text-2xl">{section.title}</h3>
              <div className="space-y-3">
                {blocks.map((block, index) => {
                  if (block.kind === "list") {
                    return (
                      <ul
                        key={`${section.id}-list-${index}`}
                        className="list-disc space-y-2 pl-5 text-sm text-muted-foreground"
                      >
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )
                  }

                  return (
                    <p
                      key={`${section.id}-paragraph-${index}`}
                      className="text-sm text-muted-foreground"
                    >
                      {block.text}
                    </p>
                  )
                })}
                {component.slug === "tabs" && isTabsExampleSection(section.id) ? (
                  <TabsExamplePreview sectionId={section.id} />
                ) : null}
              </div>
            </section>
          )
        })
      )}

      <section id="api" className="space-y-3 scroll-mt-20">
        <h3 className="font-display text-2xl">API reference</h3>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[620px] border-collapse">
            <thead>
              <tr>
                {["Prop", "Type", "Default", "Description"].map((head) => (
                  <th
                    key={head}
                    className={cn(
                      "border-b border-border/80 px-3 py-3 text-left text-xs uppercase tracking-[0.2em] text-muted-foreground"
                    )}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resolved.api.map((prop) => (
                <tr key={prop.name} className="border-b border-border/70">
                  <td className="px-3 py-3 font-mono text-xs">{prop.name}</td>
                  <td className="px-3 py-3">
                    <code className="inline-block rounded-md border border-border/80 bg-muted/60 px-2 py-1 font-mono text-[11px] leading-5 text-foreground">
                      {prop.type}
                    </code>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs">{prop.defaultValue}</td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="border-t border-border/80 pt-6">
        <Link
          href={backHref}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to all components
        </Link>
      </div>
    </article>
  )
}
