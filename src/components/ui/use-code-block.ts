"use client"

import * as React from "react"

type UseCodeBlockOptions = {
  code: string
  collapsible?: boolean
  maxCollapsedLines?: number
}

export function useCodeBlock({
  code,
  collapsible = true,
  maxCollapsedLines = 6,
}: UseCodeBlockOptions) {
  const [expanded, setExpanded] = React.useState(false)

  const lines = React.useMemo(() => code.replace(/\r\n/g, "\n").split("\n"), [code])
  const shouldCollapse = React.useMemo(
    () => collapsible && lines.length > maxCollapsedLines,
    [collapsible, lines.length, maxCollapsedLines]
  )
  const visibleLines = React.useMemo(
    () => (shouldCollapse && !expanded ? lines.slice(0, maxCollapsedLines) : lines),
    [expanded, lines, maxCollapsedLines, shouldCollapse]
  )
  const hiddenLineCount = React.useMemo(
    () => Math.max(0, lines.length - maxCollapsedLines),
    [lines.length, maxCollapsedLines]
  )

  return {
    expanded,
    setExpanded,
    lines,
    shouldCollapse,
    visibleLines,
    hiddenLineCount,
  }
}
