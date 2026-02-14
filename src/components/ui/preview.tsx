"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { CodeBlock, type CodeBlockTab } from "@/components/ui/code-block"
import { cn } from "@/lib/utils"

export type PreviewCodeTab = {
  id: string
  label: string
  code: string
  language?: string
  filename?: string
}

export type PreviewProps = {
  preview: React.ReactNode
  code?: string
  language?: string
  filename?: string
  codeTabs?: PreviewCodeTab[]
  defaultTab?: "preview" | "code"
  previewClassName?: string
  className?: string
}

function toCodeBlockTabs(tabs: PreviewCodeTab[]): CodeBlockTab[] {
  return tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    code: tab.code,
    language: tab.language,
    filename: tab.filename,
  }))
}

export function Preview({
  preview,
  code,
  language = "tsx",
  filename,
  codeTabs = [],
  defaultTab = "preview",
  previewClassName,
  className,
}: PreviewProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(defaultTab)

  const hasCode = Boolean(codeTabs.length || code)
  const resolvedCode = code ?? codeTabs[0]?.code ?? ""
  const resolvedLanguage = codeTabs[0]?.language ?? language
  const resolvedFilename = codeTabs[0]?.filename ?? filename
  const resolvedTabs = codeTabs.length ? toCodeBlockTabs(codeTabs) : undefined

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border/80 bg-card",
        className
      )}
    >
      <div className="flex items-stretch border-b border-border/70">
        <Button
          type="button"
          role="tab"
          aria-selected={activeTab === "preview"}
          variant="ghost"
          size="sm"
          onClick={() => setActiveTab("preview")}
          className={cn(
            "h-8 rounded-none border-r border-border/70 border-b border-b-transparent px-3 py-0 text-xs font-medium text-muted-foreground hover:bg-transparent hover:text-foreground",
            activeTab === "preview" && "border-b-card bg-card text-foreground"
          )}
        >
          Preview
        </Button>
        {hasCode ? (
          <Button
            type="button"
            role="tab"
            aria-selected={activeTab === "code"}
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("code")}
            className={cn(
              "h-8 rounded-none border-r border-border/70 border-b border-b-transparent px-3 py-0 text-xs font-medium text-muted-foreground hover:bg-transparent hover:text-foreground",
              activeTab === "code" && "border-b-card bg-card text-foreground"
            )}
          >
            Code
          </Button>
        ) : null}
      </div>

      {activeTab === "preview" ? (
        <div
          className={cn(
            "flex min-h-56 w-full items-center justify-center bg-accent/55 p-8 md:min-h-64 md:p-10",
            previewClassName
          )}
        >
          {preview}
        </div>
      ) : (
        <CodeBlock
          code={resolvedCode}
          language={resolvedLanguage}
          filename={resolvedFilename}
          tabs={resolvedTabs}
          showLineNumbers={false}
          collapsible={false}
          wrap
          copyButtonMode="icon"
          className="rounded-none border-0"
        />
      )}
    </div>
  )
}
