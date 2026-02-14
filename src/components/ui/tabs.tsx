"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type TabsOrientation = "horizontal" | "vertical"
type TabsActivationMode = "automatic" | "manual"

type TabsContextValue = {
  value: string | undefined
  setValue: (value: string) => void
  orientation: TabsOrientation
  activationMode: TabsActivationMode
  baseId: string
  registerTrigger: (
    value: string,
    node: HTMLButtonElement | null
  ) => () => void
  moveFocus: (currentValue: string, key: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs compound components must be used within <Tabs>.")
  }
  return context
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: TabsOrientation
  activationMode?: TabsActivationMode
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      value: valueProp,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      activationMode = "automatic",
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const isControlled = valueProp !== undefined
    const value = isControlled ? valueProp : uncontrolledValue
    const baseId = React.useId()
    const triggerMapRef = React.useRef(new Map<string, HTMLButtonElement>())

    const setValue = React.useCallback(
      (nextValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(nextValue)
        }
        onValueChange?.(nextValue)
      },
      [isControlled, onValueChange]
    )

    const registerTrigger = React.useCallback(
      (triggerValue: string, node: HTMLButtonElement | null) => {
        if (node) {
          triggerMapRef.current.set(triggerValue, node)
        } else {
          triggerMapRef.current.delete(triggerValue)
        }

        return () => {
          triggerMapRef.current.delete(triggerValue)
        }
      },
      []
    )

    const moveFocus = React.useCallback(
      (currentValue: string, key: string) => {
        const items = Array.from(triggerMapRef.current.entries()).filter(
          ([, node]) => !node.disabled
        )

        if (!items.length) {
          return
        }

        const currentIndex = items.findIndex(([itemValue]) => itemValue === currentValue)
        const fallbackIndex = currentIndex >= 0 ? currentIndex : 0
        let nextIndex = fallbackIndex

        const isHorizontal = orientation === "horizontal"
        const previousKeys = isHorizontal
          ? new Set(["ArrowLeft", "ArrowUp"])
          : new Set(["ArrowUp"])
        const nextKeys = isHorizontal
          ? new Set(["ArrowRight", "ArrowDown"])
          : new Set(["ArrowDown"])

        if (previousKeys.has(key)) {
          nextIndex = (fallbackIndex - 1 + items.length) % items.length
        } else if (nextKeys.has(key)) {
          nextIndex = (fallbackIndex + 1) % items.length
        } else if (key === "Home") {
          nextIndex = 0
        } else if (key === "End") {
          nextIndex = items.length - 1
        } else {
          return
        }

        const [nextValue, nextNode] = items[nextIndex]
        nextNode.focus()
        if (activationMode === "automatic") {
          setValue(nextValue)
        }
      },
      [activationMode, orientation, setValue]
    )

    const contextValue = React.useMemo<TabsContextValue>(
      () => ({
        value,
        setValue,
        orientation,
        activationMode,
        baseId,
        registerTrigger,
        moveFocus,
      }),
      [value, setValue, orientation, activationMode, baseId, registerTrigger, moveFocus]
    )

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-slot="tabs"
          data-orientation={orientation}
          className={cn("w-full", className)}
          {...props}
        />
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = "Tabs"

export type TabsListProps = React.HTMLAttributes<HTMLDivElement>

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useTabsContext()

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        data-slot="tabs-list"
        data-orientation={orientation}
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
          className
        )}
        {...props}
      />
    )
  }
)
TabsList.displayName = "TabsList"

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, onClick, onKeyDown, ...props }, ref) => {
    const {
      value: selectedValue,
      setValue,
      activationMode,
      baseId,
      registerTrigger,
      moveFocus,
    } = useTabsContext()
    const isSelected = selectedValue === value
    const triggerId = `${baseId}-trigger-${value}`
    const contentId = `${baseId}-content-${value}`

    const localRef = React.useRef<HTMLButtonElement | null>(null)

    React.useEffect(() => registerTrigger(value, localRef.current), [registerTrigger, value])

    return (
      <button
        ref={(node) => {
          localRef.current = node
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        type="button"
        role="tab"
        id={triggerId}
        aria-selected={isSelected}
        aria-controls={contentId}
        data-slot="tabs-trigger"
        data-state={isSelected ? "active" : "inactive"}
        tabIndex={isSelected ? 0 : -1}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-[color,background-color,box-shadow] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm",
          className
        )}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) {
            setValue(value)
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) {
            return
          }

          if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowDown" ||
            event.key === "Home" ||
            event.key === "End"
          ) {
            event.preventDefault()
            moveFocus(value, event.key)
            return
          }

          if (
            activationMode === "manual" &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault()
            setValue(value)
          }
        }}
        {...props}
      />
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  forceMount?: boolean
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, forceMount = false, ...props }, ref) => {
    const { value: selectedValue, baseId } = useTabsContext()
    const isSelected = selectedValue === value
    const triggerId = `${baseId}-trigger-${value}`
    const contentId = `${baseId}-content-${value}`

    if (!forceMount && !isSelected) {
      return null
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={contentId}
        aria-labelledby={triggerId}
        tabIndex={0}
        hidden={!isSelected}
        data-slot="tabs-content"
        data-state={isSelected ? "active" : "inactive"}
        className={cn(
          "mt-2 rounded-lg border border-border/80 bg-card p-4 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          className
        )}
        {...props}
      />
    )
  }
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
