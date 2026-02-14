"use client"

import * as React from "react"
import { CheckCircle2, LoaderCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MatchCase } from "@/components/ui/match-case"
import { Preview } from "@/components/ui/preview"
import { cn } from "@/lib/utils"

type MatchCaseExampleId =
  | "loading-to-content-handoff"
  | "step-flow-transitions-in-one-container"
  | "nested-panel-navigation-states"
  | "write-preview-diff-pane-switching"

const MATCH_CASE_EXAMPLE_IDS = new Set<MatchCaseExampleId>([
  "loading-to-content-handoff",
  "step-flow-transitions-in-one-container",
  "nested-panel-navigation-states",
  "write-preview-diff-pane-switching",
])

type ExampleShellProps = {
  labels: Array<{ id: string; label: string }>
  value: string
  onChange: (next: string) => void
  children: React.ReactNode
}

function ExampleShell({ labels, value, onChange, children }: ExampleShellProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {labels.map((item) => (
          <Button
            key={item.id}
            type="button"
            size="sm"
            variant={item.id === value ? "default" : "outline"}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      {children}
    </div>
  )
}

function LoadingToContentPreview() {
  const [view, setView] = React.useState<"loading" | "loaded">("loading")

  return (
    <ExampleShell
      labels={[
        { id: "loading", label: "Loading" },
        { id: "loaded", label: "Loaded" },
      ]}
      value={view}
      onChange={(next) => setView(next as typeof view)}
    >
      <MatchCase value={view} animation="blur" duration={260}>
        {({ containerProps, render }) => (
          <div
            {...containerProps}
            className={cn(
              containerProps.className,
              "min-h-28 overflow-hidden rounded-xl border border-border/80 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_90%,var(--accent)_10%)_0%,var(--background)_100%)] p-5"
            )}
          >
            {render(
              "loading",
              <div className="flex min-h-16 items-center gap-3">
                <div className="rounded-full border border-border/80 bg-background/70 p-2">
                  <LoaderCircle className="size-5 animate-spin text-foreground/85" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Syncing dashboard data</p>
                  <p className="text-xs text-muted-foreground">Fetching metrics and activity.</p>
                </div>
              </div>
            )}
            {render(
              "loaded",
              <div className="flex min-h-16 items-center gap-3">
                <div className="rounded-full border border-emerald-300/50 bg-emerald-100/70 p-2">
                  <CheckCircle2 className="size-5 text-emerald-700" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Content ready</p>
                  <p className="text-xs text-muted-foreground">All widgets are now interactive.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </MatchCase>
    </ExampleShell>
  )
}

function StepFlowPreview() {
  const [step, setStep] = React.useState<"login" | "otp" | "done">("login")

  return (
    <ExampleShell
      labels={[
        { id: "login", label: "Login" },
        { id: "otp", label: "OTP" },
        { id: "done", label: "Done" },
      ]}
      value={step}
      onChange={(next) => setStep(next as typeof step)}
    >
      <MatchCase value={step} animation="scale" duration={220}>
        {({ containerProps, render }) => (
          <div
            {...containerProps}
            className={cn(
              containerProps.className,
              "min-h-40 overflow-hidden rounded-xl border border-border/80 bg-background/85 p-4"
            )}
          >
            {render(
              "login",
              <div className="space-y-3">
                <p className="text-sm font-medium">Sign in</p>
                <input
                  readOnly
                  value="jagrit@example.com"
                  className="w-full rounded-md border border-border/80 bg-card px-3 py-2 text-sm"
                />
                <Button size="sm">Continue</Button>
              </div>
            )}
            {render(
              "otp",
              <div className="space-y-3">
                <p className="text-sm font-medium">Verify OTP</p>
                <input
                  readOnly
                  value="123456"
                  className="w-full rounded-md border border-border/80 bg-card px-3 py-2 text-sm tracking-[0.28em]"
                />
                <Button size="sm">Verify</Button>
              </div>
            )}
            {render(
              "done",
              <div className="flex min-h-28 items-center gap-3">
                <CheckCircle2 className="size-6 text-emerald-700" />
                <div>
                  <p className="text-sm font-medium">Authenticated</p>
                  <p className="text-xs text-muted-foreground">You can continue to dashboard.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </MatchCase>
    </ExampleShell>
  )
}

function NestedPanelPreview() {
  const [panel, setPanel] = React.useState<"root" | "project" | "search">("root")

  return (
    <ExampleShell
      labels={[
        { id: "root", label: "Root" },
        { id: "project", label: "Project" },
        { id: "search", label: "Search" },
      ]}
      value={panel}
      onChange={(next) => setPanel(next as typeof panel)}
    >
      <div className="overflow-hidden rounded-xl border border-border/80 bg-card">
        <div className="border-b border-border/70 px-3 py-2">
          <div className="flex items-center gap-2 rounded-md border border-border/70 bg-background/80 px-2 py-1.5 text-xs text-muted-foreground">
            <Search className="size-3.5" />
            <span>Type a command...</span>
          </div>
        </div>
        <MatchCase value={panel} animation="fade-down" duration={200}>
          {({ containerProps, render }) => (
            <div {...containerProps} className={cn(containerProps.className, "min-h-40 p-3")}>
              {render(
                "root",
                <ul className="space-y-1.5 text-sm">
                  <li className="rounded-md border border-border/60 px-2 py-1.5">Open recent file</li>
                  <li className="rounded-md border border-border/60 px-2 py-1.5">Go to project settings</li>
                  <li className="rounded-md border border-border/60 px-2 py-1.5">Create new component</li>
                </ul>
              )}
              {render(
                "project",
                <ul className="space-y-1.5 text-sm">
                  <li className="rounded-md border border-border/60 px-2 py-1.5">Run build pipeline</li>
                  <li className="rounded-md border border-border/60 px-2 py-1.5">Open pull requests</li>
                  <li className="rounded-md border border-border/60 px-2 py-1.5">Switch environment</li>
                </ul>
              )}
              {render(
                "search",
                <ul className="space-y-1.5 text-sm">
                  <li className="rounded-md border border-border/60 px-2 py-1.5">button.tsx</li>
                  <li className="rounded-md border border-border/60 px-2 py-1.5">match-case.tsx</li>
                  <li className="rounded-md border border-border/60 px-2 py-1.5">components/page.tsx</li>
                </ul>
              )}
            </div>
          )}
        </MatchCase>
      </div>
    </ExampleShell>
  )
}

function EditorPanePreview() {
  const [pane, setPane] = React.useState<"write" | "preview" | "diff">("write")

  return (
    <ExampleShell
      labels={[
        { id: "write", label: "Write" },
        { id: "preview", label: "Preview" },
        { id: "diff", label: "Diff" },
      ]}
      value={pane}
      onChange={(next) => setPane(next as typeof pane)}
    >
      <div className="overflow-hidden rounded-xl border border-border/80 bg-card">
        <div className="border-b border-border/70 px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          docs/match-case.md
        </div>
        <MatchCase value={pane} animation="fade" duration={180}>
          {({ containerProps, render }) => (
            <div {...containerProps} className={cn(containerProps.className, "min-h-44 p-3")}>
              {render(
                "write",
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Editor</p>
                  <textarea
                    readOnly
                    value={"## Match Case\nSwitch states with animated transitions."}
                    className="h-28 w-full resize-none rounded-md border border-border/70 bg-background/80 p-2 text-sm"
                  />
                </div>
              )}
              {render(
                "preview",
                <div className="space-y-2 rounded-md border border-border/70 bg-background/80 p-3">
                  <p className="text-base font-medium">Match Case</p>
                  <p className="text-sm text-muted-foreground">
                    Switch states with animated transitions.
                  </p>
                </div>
              )}
              {render(
                "diff",
                <div className="space-y-1 font-mono text-xs">
                  <p className="rounded bg-emerald-100/70 px-2 py-1 text-emerald-800">
                    + Added loading handoff example
                  </p>
                  <p className="rounded bg-rose-100/70 px-2 py-1 text-rose-800">
                    - Removed generic placeholder copy
                  </p>
                  <p className="rounded bg-emerald-100/70 px-2 py-1 text-emerald-800">
                    + Added nested command panel demo
                  </p>
                </div>
              )}
            </div>
          )}
        </MatchCase>
      </div>
    </ExampleShell>
  )
}

function renderExample(sectionId: MatchCaseExampleId) {
  if (sectionId === "loading-to-content-handoff") {
    return <LoadingToContentPreview />
  }
  if (sectionId === "step-flow-transitions-in-one-container") {
    return <StepFlowPreview />
  }
  if (sectionId === "nested-panel-navigation-states") {
    return <NestedPanelPreview />
  }
  return <EditorPanePreview />
}

function exampleCode(sectionId: MatchCaseExampleId): string {
  if (sectionId === "loading-to-content-handoff") {
    return `const [view, setView] = React.useState<"loading" | "loaded">("loading")

<MatchCase value={view} animation="blur" duration={260}>
  {({ containerProps, render }) => (
    <div {...containerProps}>
      {render("loading", <LoaderCircle className="animate-spin" />)}
      {render("loaded", <CheckCircle2 />)}
    </div>
  )}
</MatchCase>`
  }
  if (sectionId === "nested-panel-navigation-states") {
    return `const [panel, setPanel] = React.useState<"root" | "project" | "search">("root")

<MatchCase value={panel} animation="fade-down" duration={200}>
  {({ containerProps, render }) => (
    <div {...containerProps}>
      {render("root", <RootCommands />)}
      {render("project", <ProjectCommands />)}
      {render("search", <SearchResults />)}
    </div>
  )}
</MatchCase>`
  }
  if (sectionId === "write-preview-diff-pane-switching") {
    return `const [pane, setPane] = React.useState<"write" | "preview" | "diff">("write")

<MatchCase value={pane} animation="fade" duration={180}>
  {({ containerProps, render }) => (
    <div {...containerProps}>
      {render("write", <EditorPane />)}
      {render("preview", <MarkdownPreview />)}
      {render("diff", <DiffView />)}
    </div>
  )}
</MatchCase>`
  }
  return `const [step, setStep] = React.useState<"login" | "otp" | "done">("login")

<MatchCase value={step} animation="scale" duration={220}>
  {({ containerProps, render }) => (
    <div {...containerProps}>
      {render("login", <LoginForm />)}
      {render("otp", <OtpInput />)}
      {render("done", <SuccessState />)}
    </div>
  )}
</MatchCase>`
}

export function isMatchCaseExampleSection(sectionId: string): boolean {
  return MATCH_CASE_EXAMPLE_IDS.has(sectionId as MatchCaseExampleId)
}

export function MatchCaseExamplePreview({ sectionId }: { sectionId: string }) {
  if (!isMatchCaseExampleSection(sectionId)) {
    return null
  }

  const typedId = sectionId as MatchCaseExampleId

  return (
    <Preview
      className="w-full"
      preview={renderExample(typedId)}
      code={exampleCode(typedId)}
      language="tsx"
      defaultTab="preview"
    />
  )
}
