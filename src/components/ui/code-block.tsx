"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCodeBlock } from "@/components/ui/use-code-block"

export type CodeBlockProps = {
  code?: string
  language?: string
  filename?: string
  tabs?: CodeBlockTab[]
  wrap?: boolean
  showLineNumbers?: boolean
  collapsible?: boolean
  maxCollapsedLines?: number
  copyButtonMode?: "text" | "icon"
  className?: string
}

export type CodeBlockTab = {
  id: string
  label: string
  code: string
  language?: string
  filename?: string
}

type CodeBlockContextValue = {
  code: string
  language: string
  filename?: string
  tabs: CodeBlockTab[]
  activeTabId?: string
  setActiveTabId: React.Dispatch<React.SetStateAction<string | undefined>>
  wrap: boolean
  showLineNumbers: boolean
  copyButtonMode: "text" | "icon"
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
  shouldCollapse: boolean
  visibleLines: string[]
  hiddenLineCount: number
}

const CodeBlockContext = React.createContext<CodeBlockContextValue | null>(null)

function useCodeBlockContext() {
  const context = React.useContext(CodeBlockContext)
  if (!context) {
    throw new Error("CodeBlock compound components must be used within CodeBlock.Root.")
  }
  return context
}

type CodeBlockRootProps = CodeBlockProps & {
  children: React.ReactNode
}

function CodeBlockRoot({
  code,
  language = "text",
  filename,
  tabs = [],
  wrap = false,
  showLineNumbers = true,
  collapsible = true,
  maxCollapsedLines = 6,
  copyButtonMode = "text",
  className,
  children,
}: CodeBlockRootProps) {
  const [activeTabId, setActiveTabId] = React.useState<string | undefined>(
    tabs[0]?.id
  )
  const activeTab = React.useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [activeTabId, tabs]
  )

  React.useEffect(() => {
    if (!tabs.length) {
      setActiveTabId(undefined)
      return
    }

    const exists = tabs.some((tab) => tab.id === activeTabId)
    if (!exists) {
      setActiveTabId(tabs[0].id)
    }
  }, [activeTabId, tabs])

  const resolvedCode = activeTab?.code ?? code ?? ""
  const resolvedLanguage = activeTab?.language ?? language
  const resolvedFilename = activeTab?.filename ?? filename

  const block = useCodeBlock({ code: resolvedCode, collapsible, maxCollapsedLines })

  const value = React.useMemo<CodeBlockContextValue>(
    () => ({
      code: resolvedCode,
      language: resolvedLanguage,
      filename: resolvedFilename,
      tabs,
      activeTabId,
      setActiveTabId,
      wrap,
      showLineNumbers,
      copyButtonMode,
      expanded: block.expanded,
      setExpanded: block.setExpanded,
      shouldCollapse: block.shouldCollapse,
      visibleLines: block.visibleLines,
      hiddenLineCount: block.hiddenLineCount,
    }),
    [
      block.expanded,
      block.hiddenLineCount,
      block.setExpanded,
      block.shouldCollapse,
      block.visibleLines,
      resolvedCode,
      resolvedFilename,
      resolvedLanguage,
      tabs,
      activeTabId,
      showLineNumbers,
      copyButtonMode,
      wrap,
    ]
  )

  return (
    <CodeBlockContext.Provider value={value}>
      <div
        className={cn(
          "w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-border/80 bg-card",
          className
        )}
      >
        {children}
      </div>
    </CodeBlockContext.Provider>
  )
}

type CodeBlockHeaderProps = {
  className?: string
}

function CodeBlockHeader({ className }: CodeBlockHeaderProps) {
  const { filename, language, tabs, activeTabId, setActiveTabId } =
    useCodeBlockContext()

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 border-b border-border/70 bg-background/80 px-0 py-0",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-0">
        {tabs.length ? (
          <div
            role="tablist"
            aria-label="Code variants"
            className="flex min-w-0 items-stretch"
          >
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTabId === tab.id}
                onClick={() => setActiveTabId(tab.id)}
                variant="ghost"
                size="sm"
                className={cn(
                  "h-7 rounded-none border-r border-border/70 border-b border-b-transparent px-2 py-0 font-mono text-[11px] lowercase tracking-normal text-muted-foreground hover:bg-transparent hover:text-foreground",
                  activeTabId === tab.id &&
                    "border-b-card bg-card text-foreground"
                )}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        ) : (
          <div className="px-3 py-2">
            {filename ? (
              <span className="truncate font-mono text-xs text-foreground">
                {filename}
              </span>
            ) : null}
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {language}
            </span>
          </div>
        )}
      </div>

    </div>
  )
}

type CodeBlockCopyButtonProps = {
  className?: string
}

function CodeBlockCopyButton({ className }: CodeBlockCopyButtonProps) {
  const { code, copyButtonMode } = useCodeBlockContext()
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }, [code])

  return (
    <Button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      variant="outline"
      size={copyButtonMode === "icon" ? "icon" : "sm"}
      className={cn(
        copyButtonMode === "icon"
          ? "h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
          : "h-7 px-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {copyButtonMode === "icon" ? (
        copied ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.415 0l-3-3a1 1 0 011.414-1.415l2.293 2.293 6.543-6.543a1 1 0 011.415 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5"
            fill="currentColor"
          >
            <path d="M6 2a2 2 0 00-2 2v8a2 2 0 002 2h1v2a2 2 0 002 2h7a2 2 0 002-2V8a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H6zm7 4V4H6v8h1V8a2 2 0 012-2h4zm-4 2h7v8H9V8z" />
          </svg>
        )
      ) : copied ? (
        "Copied"
      ) : (
        "Copy"
      )}
    </Button>
  )
}

type CodeBlockBodyProps = {
  className?: string
}

function CodeBlockBody({ className }: CodeBlockBodyProps) {
  const {
    wrap,
    showLineNumbers,
    visibleLines,
    shouldCollapse,
    expanded,
    hiddenLineCount,
    setExpanded,
  } = useCodeBlockContext()

  const [expandedRenderCount, setExpandedRenderCount] = React.useState(0)
  const isExpanding = expanded && shouldCollapse
  const isLargeExpansion = isExpanding && visibleLines.length > 240

  React.useEffect(() => {
    if (!isLargeExpansion) {
      setExpandedRenderCount(visibleLines.length)
      return
    }

    let frameId = 0
    setExpandedRenderCount(240)

    const step = () => {
      setExpandedRenderCount((current) => {
        const next = Math.min(current + 240, visibleLines.length)
        if (next < visibleLines.length) {
          frameId = window.requestAnimationFrame(step)
        }
        return next
      })
    }

    frameId = window.requestAnimationFrame(step)

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [isLargeExpansion, visibleLines.length])

  const linesToRender = React.useMemo(() => {
    if (!isLargeExpansion) {
      return visibleLines
    }
    return visibleLines.slice(0, expandedRenderCount)
  }, [expandedRenderCount, isLargeExpansion, visibleLines])

  const renderedLines = React.useMemo(
    () =>
      linesToRender.map((line, index) => {
        const number = index + 1
        return (
          <div
            key={number}
            className={cn(
              "grid",
              showLineNumbers ? "grid-cols-[auto_1fr] gap-4" : "grid-cols-1"
            )}
          >
            {showLineNumbers ? (
              <span className="w-8 select-none text-right text-muted-foreground/80">
                {number}
              </span>
            ) : null}
            <code className={cn(wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre")}>
              {line || " "}
            </code>
          </div>
        )
      }),
    [linesToRender, showLineNumbers, wrap]
  )

  return (
    <div className={cn("relative overflow-x-auto", wrap && "overflow-x-hidden", className)}>
      <CodeBlockCopyButton className="absolute top-2 right-2 z-10" />
      <div className="p-4 font-mono text-[13px] leading-6 text-foreground">{renderedLines}</div>

      {isLargeExpansion && expandedRenderCount < visibleLines.length ? (
        <div className="px-4 pb-3 text-center text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Rendering {visibleLines.length - expandedRenderCount} more lines...
        </div>
      ) : null}

      {shouldCollapse && !expanded ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-20 items-end justify-center bg-gradient-to-t from-card via-card/90 to-transparent p-3">
          <Button
            type="button"
            onClick={() => setExpanded(true)}
            variant="outline"
            size="sm"
            className="pointer-events-auto h-7 px-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
            aria-expanded={expanded}
          >
            {`Show more (${hiddenLineCount} lines)`}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

type CodeBlockCollapseButtonProps = {
  className?: string
}

function CodeBlockCollapseButton({ className }: CodeBlockCollapseButtonProps) {
  const { shouldCollapse, expanded, setExpanded } = useCodeBlockContext()

  if (!shouldCollapse || !expanded) {
    return null
  }

  return (
    <div className={cn("flex justify-center px-3 pb-3", className)}>
      <Button
        type="button"
        onClick={() => setExpanded(false)}
        variant="outline"
        size="sm"
        className="h-7 px-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
        aria-expanded={expanded}
      >
        Show less
      </Button>
    </div>
  )
}

function CodeBlockPrimitive(props: CodeBlockProps) {
  return (
    <CodeBlockRoot {...props}>
      <CodeBlockHeader />
      <CodeBlockBody />
      <CodeBlockCollapseButton />
    </CodeBlockRoot>
  )
}

export const CodeBlock = Object.assign(CodeBlockPrimitive, {
  Root: CodeBlockRoot,
  Header: CodeBlockHeader,
  Body: CodeBlockBody,
  CopyButton: CodeBlockCopyButton,
  CollapseButton: CodeBlockCollapseButton,
})
