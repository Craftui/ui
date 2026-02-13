import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"
import { InstallationCommandBlock } from "@/app/components/_components/installation-command-block"
import { cn } from "@/lib/utils"
import { type ComponentDoc } from "@/app/components/_lib/docs"

function renderComponentDemo(doc: ComponentDoc) {
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
    return (
      <CodeBlock
        tabs={[
          {
            id: "bun",
            label: "Bun",
            language: "bash",
            code: "bunx shadcn@latest add code-block --registry https://craftui.dev/r/base",
          },
          {
            id: "npm",
            label: "Npm",
            language: "bash",
            code: "npx shadcn@latest add code-block --registry https://craftui.dev/r/base",
          },
          {
            id: "pnpm",
            label: "Pnpm",
            language: "bash",
            code: "pnpm dlx shadcn@latest add code-block --registry https://craftui.dev/r/base",
          },
        ]}
        showLineNumbers={false}
        wrap
        collapsible={false}
        copyButtonMode="icon"
      />
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
}

export function ComponentDocContent({ component }: ComponentDocContentProps) {
  return (
    <article className="mx-auto w-full max-w-4xl space-y-10">
      <header className="border-b border-border/80 pb-3">
        <h2 className="font-display text-4xl tracking-tight">{component.name}</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          {component.summary}
        </p>
      </header>

      <section id="overview" className="space-y-3 scroll-mt-20">
        <h3 className="font-display text-2xl">Overview</h3>
        <p className="max-w-2xl text-sm text-muted-foreground">
          {component.description}
        </p>
      </section>

      <section id="demo" className="scroll-mt-20">
        <div className="flex min-h-56 w-full items-center justify-center rounded-2xl border border-border/80 bg-accent/55 p-8 md:min-h-64 md:p-10">
          {renderComponentDemo(component)}
        </div>
      </section>

      <section id="installation" className="space-y-3 scroll-mt-20">
        <h3 className="font-display text-2xl">Installation</h3>
        <p className="text-sm text-muted-foreground">
          Add this component through the registry:
        </p>
        <InstallationCommandBlock installation={component.installation} />
      </section>

      <section id="api" className="space-y-3 scroll-mt-20">
        <h3 className="font-display text-2xl">API reference</h3>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[620px] border-collapse">
            <thead>
              <tr>
                {[
                  "Prop",
                  "Type",
                  "Default",
                  "Description",
                ].map((head) => (
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
              {component.api.map((prop) => (
                <tr key={prop.name} className="border-b border-border/70">
                  <td className="px-3 py-3 font-mono text-xs">{prop.name}</td>
                  <td className="px-3 py-3 font-mono text-xs">{prop.type}</td>
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

      <section id="accessibility" className="space-y-3 scroll-mt-20">
        <h3 className="font-display text-2xl">Accessibility</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {component.a11y.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="border-t border-border/80 pt-6">
        <Link
          href="/components"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to all components
        </Link>
      </div>
    </article>
  )
}
