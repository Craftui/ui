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
  | "ai-chat-response-state-switching"

const MATCH_CASE_EXAMPLE_IDS = new Set<MatchCaseExampleId>([
  "loading-to-content-handoff",
  "step-flow-transitions-in-one-container",
  "nested-panel-navigation-states",
  "ai-chat-response-state-switching",
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

function ChatInterfacePreview() {
  const [state, setState] = React.useState<"thinking" | "answer" | "sources">("thinking")

  return (
    <ExampleShell
      labels={[
        { id: "thinking", label: "Thinking" },
        { id: "answer", label: "Answer" },
        { id: "sources", label: "Sources" },
      ]}
      value={state}
      onChange={(next) => setState(next as typeof state)}
    >
      <div className="overflow-hidden rounded-xl border border-border/80 bg-card/95">
        <div className="flex min-h-56 flex-col gap-4 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_92%,var(--accent)_8%)_0%,var(--background)_100%)] p-4">
          <div className="ml-auto max-w-[84%] rounded-2xl rounded-br-md border border-border/70 bg-card px-3 py-2 text-sm">
            Design a calm AI chat panel for account settings with short answers.
          </div>
          <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-border/70 bg-background/90 px-3 py-2">
            <p className="mb-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Craft Assistant
            </p>
            <MatchCase value={state} animation="blur-up" duration={220}>
              {({ containerProps, render }) => (
                <div {...containerProps} className={cn(containerProps.className, "min-h-16")}>
                  {render(
                    "thinking",
                    <div className="space-y-2">
                      <p className="text-sm text-foreground/85">Thinking through layout and copy...</p>
                      <div className="flex items-center gap-1.5">
                        <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
                        <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground/60 [animation-delay:120ms]" />
                        <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground/60 [animation-delay:240ms]" />
                      </div>
                    </div>
                  )}
                  {render(
                    "answer",
                    <p className="text-sm text-foreground/90">
                      Use a two-column settings layout, keep the chat in a rounded panel, and pin the
                      composer to the bottom with concise prompts.
                    </p>
                  )}
                  {render(
                    "sources",
                    <div className="space-y-1.5 text-sm">
                      <p className="text-foreground/90">Suggested references:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>1. Conversation shell with sticky composer</li>
                        <li>2. Status-aware assistant bubble transitions</li>
                        <li>3. Settings actions as inline quick replies</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </MatchCase>
          </div>
        </div>
        <div className="border-t border-border/70 bg-card/80 px-3 py-2">
          <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/90 px-3 py-2 text-sm text-muted-foreground">
            <span className="truncate">Ask follow-up about tone, spacing, or accessibility...</span>
            <Button size="sm" className="ml-auto h-7 rounded-md px-2 text-xs">
              Send
            </Button>
          </div>
        </div>
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
  return <ChatInterfacePreview />
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
  if (sectionId === "ai-chat-response-state-switching") {
    return `const [state, setState] = React.useState<"thinking" | "answer" | "sources">("thinking")

<div className="chat-thread">
  <UserMessage />
  <AssistantBubble>
    <MatchCase value={state} animation="blur-up" duration={220}>
      {({ containerProps, render }) => (
        <div {...containerProps}>
          {render("thinking", <TypingState />)}
          {render("answer", <AnswerState />)}
          {render("sources", <SourceListState />)}
        </div>
      )}
    </MatchCase>
  </AssistantBubble>
  <Composer />
</div>`
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
