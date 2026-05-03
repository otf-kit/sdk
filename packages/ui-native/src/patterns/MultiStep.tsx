/**
 * MultiStep + Step + useMultiStep — declarative wizard primitive.
 *
 * State machine + transition coordinator for multi-step flows (onboarding,
 * KYC, checkout, log-workout). COMPOSES with `<StepPageLayout>`: a `<Step>` is
 * just a slot — pass `<StepPageLayout title="…">` as its child to get the
 * reference-style hero header, then your inputs, then call `next()` from a CTA.
 *
 * API sketch + anti-patterns are tracked in:
 *   docs/design-references/reference templates-reference/PATTERNS.md  (entry 5)
 *   docs/design-references/reference templates-reference/PATTERNS.md (entry 1)
 *   kits/fitness-kit/.todo/mobile flow primitives/PRD.md  (section "1. MultiStep")
 *
 * Anti-patterns explicitly avoided: reference's BackHandlerManager global
 * singleton, reference's legacy `Animated` API, mutable module-scope state.
 */

import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'
import { BackHandler } from 'react-native'
import Animated, {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  useReducedMotion,
} from 'react-native-reanimated'
import { Circle, XStack, YStack } from 'tamagui'

// ─── Public types ────────────────────────────────────────────────────────────

export type MultiStepTransition = 'slide_horizontal' | 'fade' | 'none'
export type MultiStepProgress = 'bar' | 'dots' | 'segments' | 'none'

export interface StepProps {
  /** Unique id for `goTo(name)`. Must be stable across renders. */
  name: string
  /** Disables the Next CTA via context until true. Default: true. */
  canGoNext?: boolean
  children: ReactNode
}

export interface MultiStepProps {
  /** Ordered `<Step>` children. Each must have a unique `name`. */
  children: ReactElement<StepProps> | ReactElement<StepProps>[]
  /** Index to start on. Default: 0. */
  initialIndex?: number
  /** Called with the accumulated bag when `next()` advances past the last step. */
  onComplete?: (data: Record<string, unknown>) => void
  /** Called when `back()` is invoked on the first step (or hardware back). */
  onCancel?: () => void
  /** Step-to-step animation. Default: `slide_horizontal`. */
  transition?: MultiStepTransition
  /** Progress indicator above the active step. Default: `bar`. */
  progress?: MultiStepProgress
}

export interface UseMultiStep {
  /** Zero-based index of the active step. */
  index: number
  /** Total number of steps. */
  total: number
  /** `name` of the active step. */
  name: string
  /** Advance one step; calls `onComplete(data)` past the last step. No-op when `canGoNext` is false. */
  next: () => void
  /** Go back one step; calls `onCancel()` on the first step. */
  back: () => void
  /** Jump to a step by `name`. Throws if the name doesn't exist. */
  goTo: (name: string) => void
  /** Stash a value in the wizard's data bag (delivered to `onComplete`). */
  set: (key: string, value: unknown) => void
  /** Read a value from the wizard's data bag. */
  get: <T>(key: string) => T | undefined
  /** Whether the active step has set `canGoNext` true. */
  canGoNext: boolean
  /** Imperatively flip the active step's `canGoNext` (for nested controls). */
  setCanGoNext: (v: boolean) => void
}

// ─── Context ────────────────────────────────────────────────────────────────

const MultiStepContext = createContext<UseMultiStep | null>(null)

/**
 * Hook for nested controls inside a `<Step>` body — call `next()`, read
 * `index`, stash values via `set()`. Throws if used outside `<MultiStep>`.
 */
export function useMultiStep(): UseMultiStep {
  const ctx = useContext(MultiStepContext)
  if (!ctx) {
    throw new Error('useMultiStep must be used inside a <MultiStep> tree.')
  }
  return ctx
}

// ─── Step ────────────────────────────────────────────────────────────────────

/**
 * Wrapper for one step in a `<MultiStep>` flow. Compose with `<StepPageLayout>`
 * for the hero/title/description shell, or render arbitrary children directly.
 */
export function Step({ children }: StepProps): ReactNode {
  return <>{children}</>
}

// ─── Progress indicators ────────────────────────────────────────────────────

interface ProgressProps {
  variant: MultiStepProgress
  index: number
  total: number
}

function ProgressIndicator({ variant, index, total }: ProgressProps): ReactNode {
  if (variant === 'none' || total <= 1) return null

  if (variant === 'bar') {
    const pct = ((index + 1) / total) * 100
    return (
      <YStack
        height={4}
        width="100%"
        backgroundColor="$color5"
        borderRadius={2}
        overflow="hidden"
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: total, now: index + 1 }}
      >
        <YStack
          height={4}
          width={`${pct}%`}
          backgroundColor="$color9"
          borderRadius={2}
          animation="quick"
        />
      </YStack>
    )
  }

  if (variant === 'dots') {
    return (
      <XStack
        gap="$2"
        justifyContent="center"
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: total, now: index + 1 }}
      >
        {Array.from({ length: total }, (_, i) => {
          const active = i === index
          return (
            <Circle
              key={i}
              size={active ? 10 : 6}
              backgroundColor={i <= index ? '$color9' : '$color5'}
              animation="quick"
            />
          )
        })}
      </XStack>
    )
  }

  // segments
  return (
    <XStack
      gap="$1.5"
      width="100%"
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: total, now: index + 1 }}
    >
      {Array.from({ length: total }, (_, i) => (
        <YStack
          key={i}
          flex={1}
          height={4}
          borderRadius={2}
          backgroundColor={i <= index ? '$color9' : '$color5'}
          animation="quick"
        />
      ))}
    </XStack>
  )
}

// ─── MultiStep ──────────────────────────────────────────────────────────────

/**
 * Declarative wizard controller. Owns step index + transition direction +
 * a per-step `canGoNext` flag + a key/value data bag delivered to
 * `onComplete`. Renders a progress indicator + the active `<Step>` child.
 *
 * Hardware-back is handled per-instance via a `BackHandler` subscription
 * (no global singleton) — back on the first step calls `onCancel`.
 */
export function MultiStep({
  children,
  initialIndex = 0,
  onComplete,
  onCancel,
  transition = 'slide_horizontal',
  progress = 'bar',
}: MultiStepProps): ReactNode {
  const reducedMotion = useReducedMotion()

  // Normalize children to a flat array, narrow to ReactElement<StepProps>.
  const steps = useMemo(() => {
    const arr = Children.toArray(children).filter(
      (c): c is ReactElement<StepProps> => isValidElement(c),
    )
    if (arr.length === 0) {
      throw new Error('<MultiStep> requires at least one <Step> child.')
    }
    const seen = new Set<string>()
    for (const step of arr) {
      const name = step.props.name
      if (!name) throw new Error('Every <Step> must have a non-empty `name` prop.')
      if (seen.has(name)) {
        throw new Error(`<MultiStep> duplicate step name: "${name}".`)
      }
      seen.add(name)
    }
    return arr
  }, [children])

  const total = steps.length
  const safeInitial = Math.min(Math.max(initialIndex, 0), total - 1)

  const [index, setIndex] = useState(safeInitial)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [canGoNext, setCanGoNext] = useState<boolean>(true)
  const dataRef = useRef<Record<string, unknown>>({})

  const activeStep = steps[index]
  if (!activeStep) {
    // Defensive: should never happen given clamping above + non-empty steps.
    throw new Error(`<MultiStep> active step out of range (index=${index}).`)
  }
  const activeName = activeStep.props.name
  const activeCanGoNext = activeStep.props.canGoNext

  // Sync the step's static `canGoNext` prop into context whenever the step
  // changes. Steps that omit the prop default to true; steps that pass an
  // explicit boolean win over the imperative `setCanGoNext` until they remount.
  useEffect(() => {
    setCanGoNext(activeCanGoNext ?? true)
  }, [activeCanGoNext, activeName])

  const next = useCallback(() => {
    if (!canGoNext) return
    if (index >= total - 1) {
      onComplete?.(dataRef.current)
      return
    }
    setDirection('forward')
    setIndex(i => i + 1)
  }, [canGoNext, index, total, onComplete])

  const back = useCallback(() => {
    if (index === 0) {
      onCancel?.()
      return
    }
    setDirection('backward')
    setIndex(i => i - 1)
  }, [index, onCancel])

  const goTo = useCallback(
    (name: string) => {
      const target = steps.findIndex(s => s.props.name === name)
      if (target < 0) {
        throw new Error(`<MultiStep>.goTo: unknown step name "${name}".`)
      }
      if (target === index) return
      setDirection(target > index ? 'forward' : 'backward')
      setIndex(target)
    },
    [steps, index],
  )

  const set = useCallback((key: string, value: unknown) => {
    dataRef.current = { ...dataRef.current, [key]: value }
  }, [])

  // Generic-on-call site keeps the bag untyped internally without resorting
  // to `any`; the cast is a deliberate API affordance for the consumer.
  const get = useCallback(<T,>(key: string): T | undefined => {
    return dataRef.current[key] as T | undefined
  }, [])

  // Per-instance hardware-back handler — registered in effect with cleanup.
  // Refs keep the listener identity stable while reading the latest closure.
  const indexRef = useRef(index)
  const backRef = useRef(back)
  useEffect(() => {
    indexRef.current = index
    backRef.current = back
  }, [index, back])

  useEffect(() => {
    const handler = (): boolean => {
      backRef.current()
      // Always intercept while mounted; first-step back delegates to onCancel.
      return true
    }
    const sub = BackHandler.addEventListener('hardwareBackPress', handler)
    return () => sub.remove()
  }, [])

  const ctxValue = useMemo<UseMultiStep>(
    () => ({
      index,
      total,
      name: activeName,
      next,
      back,
      goTo,
      set,
      get,
      canGoNext,
      setCanGoNext,
    }),
    [index, total, activeName, next, back, goTo, set, get, canGoNext],
  )

  // Choose the Reanimated entry animation per direction (or none if
  // transition === 'none' or the OS reduced-motion pref is on).
  const entering = useMemo(() => {
    if (reducedMotion || transition === 'none') return undefined
    if (transition === 'fade') return FadeIn
    return direction === 'forward' ? SlideInRight : SlideInLeft
  }, [direction, transition, reducedMotion])

  return (
    <MultiStepContext.Provider value={ctxValue}>
      <YStack flex={1} gap="$4">
        {progress !== 'none' && (
          <YStack paddingHorizontal="$4" paddingTop="$3">
            <ProgressIndicator variant={progress} index={index} total={total} />
          </YStack>
        )}
        <YStack flex={1}>
          <Animated.View
            // The `key` forces remount per step so Reanimated's entering
            // animation re-runs on every transition.
            key={activeName}
            entering={entering}
            style={{ flex: 1 }}
          >
            {activeStep}
          </Animated.View>
        </YStack>
      </YStack>
    </MultiStepContext.Provider>
  )
}
