"use client"

import * as React from "react"
import { MatchCase } from "@/components/ui/match-case"
import { Preview } from "@/components/ui/preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type TabsExampleId =
  | "animated-tab-panels-with-match-case"
  | "vertical-orientation-for-dense-layouts"

const TABS_EXAMPLE_IDS = new Set<TabsExampleId>([
  "animated-tab-panels-with-match-case",
  "vertical-orientation-for-dense-layouts",
])

function MatchCaseTabsPreview() {
  const [value, setValue] = React.useState("overview")

  return (
    <div className="w-full max-w-2xl space-y-3">
      <Tabs value={value} onValueChange={setValue}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
      </Tabs>
      <MatchCase value={value} animation="blur-up" duration={220}>
        {({ containerProps, render }) => (
          <div
            {...containerProps}
            className={cn(
              containerProps.className,
              "min-h-24 overflow-hidden rounded-lg border border-border/80 bg-card p-4 text-sm text-muted-foreground"
            )}
          >
            {render("overview", <p>Tabs organize related content without route changes.</p>)}
            {render("usage", <p>Use short labels and keep panel content concise.</p>)}
            {render("api", <p>Supports controlled state, orientation, and activation mode.</p>)}
          </div>
        )}
      </MatchCase>
    </div>
  )
}

function VerticalTabsPreview() {
  return (
    <Tabs defaultValue="details" orientation="vertical" className="w-full max-w-2xl">
      <div className="grid gap-3 md:grid-cols-[220px_minmax(0,1fr)]">
        <TabsList className="grid h-auto w-full grid-cols-1 gap-1">
          <TabsTrigger value="details" className="justify-start">
            Details
          </TabsTrigger>
          <TabsTrigger value="activity" className="justify-start">
            Activity
          </TabsTrigger>
          <TabsTrigger value="permissions" className="justify-start">
            Permissions
          </TabsTrigger>
        </TabsList>
        <div>
          <TabsContent value="details" className="mt-0">
            Account metadata and display preferences.
          </TabsContent>
          <TabsContent value="activity" className="mt-0">
            Recent events, audit notes, and logs.
          </TabsContent>
          <TabsContent value="permissions" className="mt-0">
            Access scope and role assignments.
          </TabsContent>
        </div>
      </div>
    </Tabs>
  )
}

function renderExample(sectionId: TabsExampleId) {
  if (sectionId === "animated-tab-panels-with-match-case") {
    return <MatchCaseTabsPreview />
  }
  return <VerticalTabsPreview />
}

function exampleCode(sectionId: TabsExampleId): string {
  if (sectionId === "animated-tab-panels-with-match-case") {
    return `const [value, setValue] = React.useState("overview")

<Tabs value={value} onValueChange={setValue}>
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="usage">Usage</TabsTrigger>
    <TabsTrigger value="api">API</TabsTrigger>
  </TabsList>
</Tabs>

<MatchCase value={value} animation="blur-up" duration={220}>
  {({ containerProps, render }) => (
    <div {...containerProps}>
      {render("overview", <OverviewPanel />)}
      {render("usage", <UsagePanel />)}
      {render("api", <ApiPanel />)}
    </div>
  )}
</MatchCase>`
  }

  return `<Tabs defaultValue="details" orientation="vertical">
  <TabsList className="grid h-auto w-full grid-cols-1">
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="permissions">Permissions</TabsTrigger>
  </TabsList>
  <TabsContent value="details">Account metadata and display preferences.</TabsContent>
</Tabs>`
}

export function isTabsExampleSection(sectionId: string): boolean {
  return TABS_EXAMPLE_IDS.has(sectionId as TabsExampleId)
}

export function TabsExamplePreview({ sectionId }: { sectionId: string }) {
  if (!isTabsExampleSection(sectionId)) {
    return null
  }

  const typedId = sectionId as TabsExampleId

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
