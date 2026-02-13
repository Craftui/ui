"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useCodeBlock } from "@/components/ui/use-code-block"

export type CodeBlockProps = {
  code: string
  language?: string
  filename?: string
  wrap?: boolean
  showLineNumbers?: boolean
  collapsible?: boolean
  maxCollapsedLines?: number
  className?: string
}

type CodeBlockContextValue = {
  code: string
  language: string
  filename?: string
  wrap: boolean
  showLineNumbers: boolean
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
  wrap = false,
  showLineNumbers = true,
  collapsible = true,
  maxCollapsedLines = 6,
  className,
  children,
}: CodeBlockRootProps) {
  const block = useCodeBlock({ code, collapsible, maxCollapsedLines })

  const value = React.useMemo<CodeBlockContextValue>(
    () => ({
      code,
      language,
      filename,
      wrap,
      showLineNumbers,
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
      code,
      filename,
      language,
      showLineNumbers,
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
  const { filename, language } = useCodeBlockContext()

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 border-b border-border/70 bg-background/80 px-3 py-2",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        {filename ? (
          <span className="truncate font-mono text-xs text-foreground">{filename}</span>
        ) : null}
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {language}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <CodeBlockCopyButton />
      </div>
    </div>
  )
}

type CodeBlockCopyButtonProps = {
  className?: string
}

function CodeBlockCopyButton({ className }: CodeBlockCopyButtonProps) {
  const { code } = useCodeBlockContext()
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
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "rounded-md border border-border/80 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
    >
      {copied ? "Copied" : "Copy"}
    </button>
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
      <div className="p-4 font-mono text-[13px] leading-6 text-foreground">{renderedLines}</div>

      {isLargeExpansion && expandedRenderCount < visibleLines.length ? (
        <div className="px-4 pb-3 text-center text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Rendering {visibleLines.length - expandedRenderCount} more lines...
        </div>
      ) : null}

      {shouldCollapse && !expanded ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-20 items-end justify-center bg-gradient-to-t from-card via-card/90 to-transparent p-3">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="pointer-events-auto rounded-md border border-border/80 bg-card px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            aria-expanded={expanded}
          >
            {`Show more (${hiddenLineCount} lines)`}
          </button>
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
      <button
        type="button"
        onClick={() => setExpanded(false)}
        className="rounded-md border border-border/80 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
        aria-expanded={expanded}
      >
        Show less
      </button>
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
