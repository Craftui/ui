"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type MatchValue = string | number

type MatchCaseAnimation =
  | "none"
  | "fade"
  | "fade-up"
  | "fade-down"
  | "scale"
  | "blur"
  | "blur-up"

type MatchCaseRenderOptions = {
  animation?: MatchCaseAnimation
  duration?: number
  easing?: string
  className?: string
}

type MatchCaseRenderApi<T extends MatchValue> = {
  value: T
  is: (...cases: T[]) => boolean
  render: (match: T, node: React.ReactNode, options?: MatchCaseRenderOptions) => React.ReactNode
  containerProps: React.HTMLAttributes<HTMLDivElement>
}

type MatchCaseProps<T extends MatchValue> = {
  value: T
  animation?: MatchCaseAnimation
  duration?: number
  easing?: string
  className?: string
  children: (api: MatchCaseRenderApi<T>) => React.ReactNode
}

type TransitionSlotProps = {
  state: "active" | "exiting"
  animation: MatchCaseAnimation
  duration: number
  easing: string
  className?: string
  children: React.ReactNode
}

type StylePair = {
  from: React.CSSProperties
  to: React.CSSProperties
}

function getStylePair(animation: MatchCaseAnimation, state: "active" | "exiting"): StylePair {
  if (animation === "none") {
    return state === "active"
      ? { from: { opacity: 1 }, to: { opacity: 1 } }
      : { from: { opacity: 1 }, to: { opacity: 0 } }
  }

  if (animation === "fade") {
    return state === "active"
      ? { from: { opacity: 0 }, to: { opacity: 1 } }
      : { from: { opacity: 1 }, to: { opacity: 0 } }
  }

  if (animation === "fade-down") {
    return state === "active"
      ? { from: { opacity: 0, transform: "translateY(-8px)" }, to: { opacity: 1, transform: "translateY(0)" } }
      : { from: { opacity: 1, transform: "translateY(0)" }, to: { opacity: 0, transform: "translateY(8px)" } }
  }

  if (animation === "scale") {
    return state === "active"
      ? { from: { opacity: 0, transform: "scale(0.985)" }, to: { opacity: 1, transform: "scale(1)" } }
      : { from: { opacity: 1, transform: "scale(1)" }, to: { opacity: 0, transform: "scale(0.985)" } }
  }

  if (animation === "blur") {
    return state === "active"
      ? { from: { opacity: 0, filter: "blur(8px)" }, to: { opacity: 1, filter: "blur(0px)" } }
      : { from: { opacity: 1, filter: "blur(0px)" }, to: { opacity: 0, filter: "blur(8px)" } }
  }

  if (animation === "blur-up") {
    return state === "active"
      ? {
          from: { opacity: 0, filter: "blur(6px)" },
          to: { opacity: 1, filter: "blur(0px)" },
        }
      : {
          from: { opacity: 1, filter: "blur(0px)" },
          to: { opacity: 0, filter: "blur(6px)" },
        }
  }

  return state === "active"
    ? { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } }
    : { from: { opacity: 1, transform: "translateY(0)" }, to: { opacity: 0, transform: "translateY(-8px)" } }
}

function TransitionSlot({
  state,
  animation,
  duration,
  easing,
  className,
  children,
}: TransitionSlotProps) {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const [isSettled, setIsSettled] = React.useState(animation === "none" || reducedMotion)
  const stylePair = React.useMemo(
    () => getStylePair(animation, state),
    [animation, state]
  )

  React.useEffect(() => {
    if (animation === "none" || reducedMotion) {
      setIsSettled(true)
      return
    }

    setIsSettled(false)
    const frame = window.requestAnimationFrame(() => {
      setIsSettled(true)
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [animation, reducedMotion, state])

  const style = React.useMemo<React.CSSProperties>(() => {
    const base =
      animation === "none" || reducedMotion
        ? stylePair.to
        : isSettled
          ? stylePair.to
          : stylePair.from

    return {
      ...base,
      transition:
        animation === "none" || reducedMotion
          ? undefined
          : `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
      willChange:
        animation === "none" || reducedMotion ? undefined : "opacity, transform, filter",
    }
  }, [animation, duration, easing, isSettled, reducedMotion, stylePair])

  return (
    <div
      className={cn(
        "col-start-1 row-start-1",
        state === "active" ? "z-10" : "pointer-events-none z-0",
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}

export function MatchCase<T extends MatchValue>({
  value,
  animation = "fade-up",
  duration = 220,
  easing = "cubic-bezier(0.2, 0.8, 0.2, 1)",
  className,
  children,
}: MatchCaseProps<T>) {
  const previousValueRef = React.useRef(value)
  const timeoutRef = React.useRef<number | null>(null)
  const [exitingValue, setExitingValue] = React.useState<T | null>(null)

  React.useLayoutEffect(() => {
    if (previousValueRef.current === value) {
      return
    }

    const previousValue = previousValueRef.current
    setExitingValue(previousValue)
    previousValueRef.current = value

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setExitingValue((current) => (current === previousValue ? null : current))
      timeoutRef.current = null
    }, duration)
  }, [duration, value])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const render = React.useCallback(
    (match: T, node: React.ReactNode, options?: MatchCaseRenderOptions) => {
      const isActive = value === match
      const isExiting = exitingValue === match

      if (!isActive && !isExiting) {
        return null
      }

      return (
        <TransitionSlot
          key={`${String(match)}-${isActive ? "active" : "exiting"}`}
          state={isActive ? "active" : "exiting"}
          animation={options?.animation ?? animation}
          duration={options?.duration ?? duration}
          easing={options?.easing ?? easing}
          className={options?.className}
        >
          {node}
        </TransitionSlot>
      )
    },
    [animation, duration, easing, exitingValue, value]
  )

  return children({
    value,
    is: (...cases: T[]) => cases.includes(value),
    render,
    containerProps: {
      className: cn("relative grid", className),
    },
  })
}
