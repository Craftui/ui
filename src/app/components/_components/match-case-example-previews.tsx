"use client"

import * as React from "react"
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Cloud,
  Command,
  Eye,
  FileDiff,
  FileText,
  Folder,
  LoaderCircle,
  Monitor,
  Search,
  ShieldAlert,
  Smartphone,
  Tablet,
  UserRound,
  Users,
  WifiOff,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MatchCase } from "@/components/ui/match-case"
import { Preview } from "@/components/ui/preview"
import { cn } from "@/lib/utils"

type ExampleState = {
  id: string
  label: string
  title: string
  description: string
  icon: LucideIcon
}

type MatchCaseExampleConfig = {
  sectionId: string
  animation: "fade" | "fade-up" | "fade-down" | "scale" | "blur" | "blur-up"
  duration: number
  states: ExampleState[]
}

const MATCH_CASE_EXAMPLES: MatchCaseExampleConfig[] = [
  {
    sectionId: "render-keyed-icon-swapping",
    animation: "blur",
    duration: 240,
    states: [
      {
        id: "notify",
        label: "Notify",
        title: "Notifications",
        description: "Use icon transitions for compact status controls.",
        icon: Bell,
      },
      {
        id: "weather",
        label: "Weather",
        title: "Forecast Sync",
        description: "Swap to weather context without layout movement.",
        icon: Cloud,
      },
      {
        id: "offline",
        label: "Offline",
        title: "Connection Lost",
        description: "Provide a clear state change in the same footprint.",
        icon: WifiOff,
      },
    ],
  },
  {
    sectionId: "multi-state-transitions-with-value",
    animation: "fade-up",
    duration: 220,
    states: [
      {
        id: "idle",
        label: "Idle",
        title: "System Idle",
        description: "No active jobs running right now.",
        icon: Bell,
      },
      {
        id: "syncing",
        label: "Syncing",
        title: "Syncing Data",
        description: "Background updates are currently in progress.",
        icon: LoaderCircle,
      },
      {
        id: "warning",
        label: "Warning",
        title: "Action Required",
        description: "A sync retry is needed to complete updates.",
        icon: AlertTriangle,
      },
      {
        id: "offline",
        label: "Offline",
        title: "Disconnected",
        description: "Network is unavailable. Retrying automatically.",
        icon: WifiOff,
      },
    ],
  },
  {
    sectionId: "loading-to-content-handoff",
    animation: "fade",
    duration: 200,
    states: [
      {
        id: "loading",
        label: "Loading",
        title: "Loading Content",
        description: "Preparing dashboard data and layout sections.",
        icon: LoaderCircle,
      },
      {
        id: "loaded",
        label: "Loaded",
        title: "Content Ready",
        description: "Data is loaded and ready for interaction.",
        icon: CheckCircle2,
      },
    ],
  },
  {
    sectionId: "outcome-branching-with-one-state-source",
    animation: "fade-up",
    duration: 240,
    states: [
      {
        id: "empty",
        label: "Empty",
        title: "No Results",
        description: "Try adjusting filters to find matching items.",
        icon: Search,
      },
      {
        id: "success",
        label: "Success",
        title: "Saved",
        description: "Your settings were updated successfully.",
        icon: CheckCircle2,
      },
      {
        id: "error",
        label: "Error",
        title: "Request Failed",
        description: "Something went wrong. Please retry.",
        icon: ShieldAlert,
      },
    ],
  },
  {
    sectionId: "step-flow-transitions-in-one-container",
    animation: "scale",
    duration: 220,
    states: [
      {
        id: "login",
        label: "Login",
        title: "Enter Credentials",
        description: "Start with email and password.",
        icon: UserRound,
      },
      {
        id: "otp",
        label: "OTP",
        title: "Verify Identity",
        description: "Type the six-digit one-time passcode.",
        icon: Command,
      },
      {
        id: "done",
        label: "Done",
        title: "Authenticated",
        description: "You are verified and ready to continue.",
        icon: CheckCircle2,
      },
    ],
  },
  {
    sectionId: "density-mode-switching-without-layout-churn",
    animation: "blur-up",
    duration: 220,
    states: [
      {
        id: "compact",
        label: "Compact",
        title: "Compact Density",
        description: "High information density for monitoring views.",
        icon: Monitor,
      },
      {
        id: "comfortable",
        label: "Comfort",
        title: "Comfortable Density",
        description: "Balanced spacing for day-to-day usage.",
        icon: Tablet,
      },
      {
        id: "spacious",
        label: "Spacious",
        title: "Spacious Density",
        description: "Roomy spacing for presentation contexts.",
        icon: Smartphone,
      },
    ],
  },
  {
    sectionId: "nested-panel-navigation-states",
    animation: "fade-down",
    duration: 210,
    states: [
      {
        id: "root",
        label: "Root",
        title: "Global Commands",
        description: "Navigate projects, settings, and actions.",
        icon: Command,
      },
      {
        id: "project",
        label: "Project",
        title: "Project Commands",
        description: "Open files, run tasks, and manage branches.",
        icon: Folder,
      },
      {
        id: "search",
        label: "Search",
        title: "Search Results",
        description: "Browse matching commands and resources.",
        icon: Search,
      },
    ],
  },
  {
    sectionId: "responsive-viewport-mode-switching",
    animation: "scale",
    duration: 220,
    states: [
      {
        id: "desktop",
        label: "Desktop",
        title: "Desktop Preview",
        description: "Large viewport with wide navigation and content.",
        icon: Monitor,
      },
      {
        id: "tablet",
        label: "Tablet",
        title: "Tablet Preview",
        description: "Medium viewport with adaptive two-column layout.",
        icon: Tablet,
      },
      {
        id: "mobile",
        label: "Mobile",
        title: "Mobile Preview",
        description: "Single-column touch-oriented layout.",
        icon: Smartphone,
      },
    ],
  },
  {
    sectionId: "write-preview-diff-pane-switching",
    animation: "fade",
    duration: 200,
    states: [
      {
        id: "write",
        label: "Write",
        title: "Write Panel",
        description: "Edit source content with structured controls.",
        icon: FileText,
      },
      {
        id: "preview",
        label: "Preview",
        title: "Preview Panel",
        description: "Read rendered output before publishing.",
        icon: Eye,
      },
      {
        id: "diff",
        label: "Diff",
        title: "Diff Panel",
        description: "Inspect changes against previous revisions.",
        icon: FileDiff,
      },
    ],
  },
  {
    sectionId: "scope-based-settings-surfaces",
    animation: "fade-up",
    duration: 220,
    states: [
      {
        id: "account",
        label: "Account",
        title: "Account Settings",
        description: "Personal profile and authentication controls.",
        icon: UserRound,
      },
      {
        id: "team",
        label: "Team",
        title: "Team Settings",
        description: "Roles, membership, and collaboration policies.",
        icon: Users,
      },
      {
        id: "project",
        label: "Project",
        title: "Project Settings",
        description: "Environment, integrations, and deployments.",
        icon: Folder,
      },
    ],
  },
  {
    sectionId: "priority-based-toast-presentation",
    animation: "fade-down",
    duration: 190,
    states: [
      {
        id: "info",
        label: "Info",
        title: "Informational",
        description: "Background update completed.",
        icon: Bell,
      },
      {
        id: "success",
        label: "Success",
        title: "Success",
        description: "Action completed successfully.",
        icon: CheckCircle2,
      },
      {
        id: "warning",
        label: "Warning",
        title: "Warning",
        description: "Storage is nearing capacity.",
        icon: AlertTriangle,
      },
      {
        id: "critical",
        label: "Critical",
        title: "Critical",
        description: "Immediate attention required.",
        icon: ShieldAlert,
      },
    ],
  },
  {
    sectionId: "inspector-tab-transitions-with-stable-shell",
    animation: "blur",
    duration: 220,
    states: [
      {
        id: "properties",
        label: "Props",
        title: "Properties",
        description: "Edit dimensions, spacing, and alignment.",
        icon: Command,
      },
      {
        id: "tokens",
        label: "Tokens",
        title: "Design Tokens",
        description: "Adjust semantic colors and typography values.",
        icon: Cloud,
      },
      {
        id: "events",
        label: "Events",
        title: "Events",
        description: "Review interaction handlers and callbacks.",
        icon: Bell,
      },
    ],
  },
]

const EXAMPLE_BY_ID = new Map(
  MATCH_CASE_EXAMPLES.map((example) => [example.sectionId, example] as const)
)

function renderExampleCode(config: MatchCaseExampleConfig): string {
  const union = config.states.map((state) => `"${state.id}"`).join(" | ")
  const first = config.states[0]?.id ?? "state"
  return `const [view, setView] = React.useState<${union}>("${first}")

<MatchCase value={view} animation="${config.animation}" duration={${config.duration}}>
  {({ containerProps, render }) => (
    <div {...containerProps} className="relative">
${config.states
  .map(
    (state) =>
      `      {render("${state.id}", <div>${state.title}</div>)}`
  )
  .join("\n")}
    </div>
  )}
</MatchCase>`
}

function MatchCaseExamplePreviewCard({ config }: { config: MatchCaseExampleConfig }) {
  const [activeId, setActiveId] = React.useState(config.states[0]?.id ?? "")

  return (
    <Preview
      className="w-full"
      preview={
        <div className="flex w-full max-w-2xl flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {config.states.map((state) => (
              <Button
                key={state.id}
                type="button"
                size="sm"
                variant={activeId === state.id ? "default" : "outline"}
                onClick={() => setActiveId(state.id)}
              >
                {state.label}
              </Button>
            ))}
          </div>

          <MatchCase
            value={activeId}
            animation={config.animation}
            duration={config.duration}
          >
            {({ containerProps, render }) => (
              <div
                {...containerProps}
                className={cn(
                  containerProps.className,
                  "min-h-28 overflow-hidden rounded-xl border border-border/80 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_90%,var(--accent)_10%)_0%,var(--background)_100%)] p-5"
                )}
              >
                {config.states.map((state) => {
                  const Icon = state.icon
                  return render(
                    state.id,
                    <div className="flex min-h-16 items-center gap-3">
                      <div className="rounded-lg border border-border/70 bg-background/70 p-2">
                        <Icon className="size-5 text-foreground/85" aria-hidden="true" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{state.title}</p>
                        <p className="text-xs text-muted-foreground">{state.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </MatchCase>
        </div>
      }
      code={renderExampleCode(config)}
      language="tsx"
      defaultTab="preview"
    />
  )
}

export function isMatchCaseExampleSection(sectionId: string): boolean {
  return EXAMPLE_BY_ID.has(sectionId)
}

export function MatchCaseExamplePreview({ sectionId }: { sectionId: string }) {
  const config = EXAMPLE_BY_ID.get(sectionId)
  if (!config) {
    return null
  }
  return <MatchCaseExamplePreviewCard config={config} />
}
