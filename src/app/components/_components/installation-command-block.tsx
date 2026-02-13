"use client"

import * as React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { type InstallationSpec } from "@/app/components/_lib/docs"

type InstallationCommandBlockProps = {
  installation: InstallationSpec
}

function InstallationTabsBlock({
  installation,
}: {
  installation: Exclude<InstallationSpec, string>
}) {
  const tabs = [
    installation.base ? { key: "base", label: "Base", code: installation.base } : null,
    installation.radix
      ? { key: "radix", label: "Radix", code: installation.radix }
      : null,
  ].filter((tab): tab is { key: "base" | "radix"; label: string; code: string } => tab !== null)

  const [activeTab, setActiveTab] = React.useState<"base" | "radix">(tabs[0]?.key ?? "base")
  const active = tabs.find((tab) => tab.key === activeTab) ?? tabs[0]

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className="rounded-md border border-border/80 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            aria-pressed={activeTab === tab.key}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {active ? (
        <CodeBlock
          language="bash"
          code={active.code}
          showLineNumbers={false}
          wrap
          collapsible={false}
          copyButtonMode="icon"
        />
      ) : null}
    </div>
  )
}

export function InstallationCommandBlock({
  installation,
}: InstallationCommandBlockProps) {
  if (typeof installation === "string") {
    return (
      <CodeBlock
        language="bash"
        code={installation}
        showLineNumbers={false}
        wrap
        collapsible={false}
        copyButtonMode="icon"
      />
    )
  }

  return <InstallationTabsBlock installation={installation} />
}
