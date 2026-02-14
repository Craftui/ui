"use client"

import { CodeBlock } from "@/components/ui/code-block"
import { type DocMode, type InstallationSpec } from "@/app/components/_lib/docs"

type InstallationCommandBlockProps = {
  mode: DocMode
  installation: InstallationSpec
}

function toPackageManagerCommands(command: string) {
  const stripped = command.replace(/^bunx\s+/, "")
  return [
    { id: "bun", label: "bun", language: "bash", code: `bunx ${stripped}` },
    { id: "pnpm", label: "pnpm", language: "bash", code: `pnpm dlx ${stripped}` },
    { id: "yarn", label: "yarn", language: "bash", code: `yarn dlx ${stripped}` },
  ]
}

export function InstallationCommandBlock({ mode, installation }: InstallationCommandBlockProps) {
  const managerTabs = toPackageManagerCommands(installation[mode])

  return (
    <CodeBlock
      tabs={managerTabs}
      showLineNumbers={false}
      wrap
      collapsible={false}
      copyButtonMode="icon"
    />
  )
}
