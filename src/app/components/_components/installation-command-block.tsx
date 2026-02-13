"use client"

import { CodeBlock } from "@/components/ui/code-block"
import { type InstallationSpec } from "@/app/components/_lib/docs"

type InstallationCommandBlockProps = {
  installation: InstallationSpec
}

export function InstallationCommandBlock({
  installation,
}: InstallationCommandBlockProps) {
  return (
    <CodeBlock
      tabs={[
        { id: "base", label: "Base", language: "bash", code: installation.base },
        { id: "radix", label: "Radix", language: "bash", code: installation.radix },
      ]}
      showLineNumbers={false}
      wrap
      collapsible={false}
      copyButtonMode="icon"
    />
  )
}
