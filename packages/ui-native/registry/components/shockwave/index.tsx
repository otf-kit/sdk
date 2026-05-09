import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Canvas,
  Fill,
  ImageShader,
  Shader,
  Skia,
  type SkImage,
  type Uniforms,
} from '@shopify/react-native-skia'
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'

import { SHOCKWAVE_DEFAULTS } from './conf'
import { SHOCKWAVE_SHADER_SOURCE } from './shader'
import { snapshotPair } from './utils'
import type {
  ShockwaveContextValue,
  ShockwaveProps,
  ShockwaveSlotProps,
  ShockwaveValue,
} from './types'

// Lazy shader compile. Web Skia loads asynchronously (CanvasKit WASM), so
// `Skia.RuntimeEffect` is undefined at module-load time on the web platform.
// Compile inside the component via useMemo, after the host has had a chance
// to call LoadSkiaWeb() / mount <WithSkiaWeb>.
type RuntimeEffect = ReturnType<typeof Skia.RuntimeEffect.Make>

const useShockwaveShader = (): RuntimeEffect | null => {
  const [shader, setShader] = useState<RuntimeEffect | null>(null)

  useEffect(() => {
    let cancelled = false
    let attempts = 0
    let timer: ReturnType<typeof setTimeout> | null = null
    const tryCompile = () => {
      if (cancelled) return
      try {
        if (Skia?.RuntimeEffect?.Make) {
          const compiled = Skia.RuntimeEffect.Make(SHOCKWAVE_SHADER_SOURCE)
          if (compiled) {
            setShader(compiled)
            return
          }
        }
      } catch {
        // CanvasKit not ready yet on web — retry
      }
      attempts += 1
      if (attempts < 30) {
        timer = setTimeout(tryCompile, 80)
      }
    }
    tryCompile()
    return () => {
      cancelled = true
      if (timer !== null) clearTimeout(timer)
    }
  }, [])

  return shader
}

const ShockwaveContext = createContext<ShockwaveContextValue | null>(null)

const useShockwaveContext = (): ShockwaveContextValue => {
  const ctx = useContext(ShockwaveContext)
  if (!ctx) {
    throw new Error(
      '<Shockwave.Transition.From> / <Shockwave.Transition.To> must be rendered inside <Shockwave>',
    )
  }
  return ctx
}

// Off-screen translation used to keep the inactive slot mounted (so we can
// snapshot it the moment a transition starts) without it eating taps or
// painting visibly. Bigger than any plausible viewport — pulled from the
// reacticx reference.
const OFFSCREEN_OFFSET = 100000

const From = memo<ShockwaveSlotProps>(function From({ children, style }) {
  const { fromRef, activeValue, isTransitioning } = useShockwaveContext()
  const isActive = activeValue === 'from'
  return (
    <View
      // RN's ref type wants `Ref<View>` but our useRef is typed `View | null`
      // (so the context API stays nullable). Same instance, narrower view.
      ref={fromRef as RefObject<View>}
      collapsable={false}
      pointerEvents={isActive && !isTransitioning ? 'auto' : 'none'}
      style={[
        StyleSheet.absoluteFill,
        {
          zIndex: isActive ? 2 : 1,
          transform: [{ translateX: isActive ? 0 : OFFSCREEN_OFFSET }],
        },
        style,
      ]}
    >
      {children}
    </View>
  )
})

const To = memo<ShockwaveSlotProps>(function To({ children, style }) {
  const { toRef, activeValue, isTransitioning } = useShockwaveContext()
  const isActive = activeValue === 'to'
  return (
    <View
      // See <From> for rationale.
      ref={toRef as RefObject<View>}
      collapsable={false}
      pointerEvents={isActive && !isTransitioning ? 'auto' : 'none'}
      style={[
        StyleSheet.absoluteFill,
        {
          zIndex: isActive ? 2 : 1,
          transform: [{ translateX: isActive ? 0 : OFFSCREEN_OFFSET }],
        },
        style,
      ]}
    >
      {children}
    </View>
  )
})

const Transition = { From, To } as const

const ShockwaveRoot = memo<ShockwaveProps>(function ShockwaveRoot({
  value,
  width = SHOCKWAVE_DEFAULTS.WIDTH,
  height = SHOCKWAVE_DEFAULTS.HEIGHT,
  duration = SHOCKWAVE_DEFAULTS.DURATION,
  origin,
  shockStrength = SHOCKWAVE_DEFAULTS.SHOCK_STRENGTH,
  lensingSpread = SHOCKWAVE_DEFAULTS.LENSING_SPREAD,
  style,
  children,
  onTransitionEnd,
}: ShockwaveProps) {
  const fromRef = useRef<View | null>(null)
  const toRef = useRef<View | null>(null)
  const prevValueRef = useRef<ShockwaveValue>(value)
  const shader = useShockwaveShader()

  const [activeValue, setActiveValue] = useState<ShockwaveValue>(value)
  const [snapshots, setSnapshots] = useState<{
    from: SkImage
    to: SkImage
  } | null>(null)

  const progress = useSharedValue<number>(0)

  const finishTransition = useCallback(
    (next: ShockwaveValue) => {
      setActiveValue(next)
      setSnapshots(null)
      onTransitionEnd?.(next)
    },
    [onTransitionEnd],
  )

  useEffect(() => {
    if (value === prevValueRef.current) return
    const prev = prevValueRef.current
    const next = value
    prevValueRef.current = value

    let cancelled = false
    void (async () => {
      const pair = await snapshotPair(
        fromRef as RefObject<View>,
        toRef as RefObject<View>,
        prev,
        next,
      )
      if (cancelled) return
      if (!pair) {
        setActiveValue(next)
        return
      }
      setSnapshots(pair)
      progress.value = 0
      progress.value = withTiming(
        1,
        { duration, easing: Easing.linear },
        (done) => {
          if (done) scheduleOnRN(finishTransition, next)
        },
      )
    })()

    return () => {
      cancelled = true
    }
  }, [value, duration, finishTransition, progress])

  const ox = origin?.x ?? width / 2
  const oy = origin?.y ?? height / 2

  const uniforms = useDerivedValue<Uniforms>(() => ({
    iResolution: [width, height],
    iTime: progress.value,
    iMouse: [ox, oy],
    uShockStrength: shockStrength,
    uLensingSpread: lensingSpread,
  }))

  const ctxValue = useMemo<ShockwaveContextValue>(
    () => ({
      fromRef,
      toRef,
      activeValue,
      isTransitioning: snapshots !== null,
    }),
    [activeValue, snapshots],
  )

  return (
    <View style={[styles.wrapper, { width, height }, style]}>
      <ShockwaveContext.Provider value={ctxValue}>
        {children}
      </ShockwaveContext.Provider>
      {snapshots && shader ? (
        <Canvas
          style={[StyleSheet.absoluteFill, styles.canvasOverlay]}
          pointerEvents="none"
        >
          <Fill>
            <Shader source={shader} uniforms={uniforms}>
              <ImageShader
                image={snapshots.from}
                fit="cover"
                rect={{ x: 0, y: 0, width, height }}
              />
              <ImageShader
                image={snapshots.to}
                fit="cover"
                rect={{ x: 0, y: 0, width, height }}
              />
            </Shader>
          </Fill>
        </Canvas>
      ) : null}
    </View>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  canvasOverlay: {
    zIndex: 3,
  },
})

/**
 * Shockwave — Skia-shader transition between two views.
 *
 * Wrap two children in `<Shockwave.Transition.From>` and
 * `<Shockwave.Transition.To>`, then flip `value` to play the wave.
 *
 * @example
 * ```tsx
 * const [v, setV] = useState<'from' | 'to'>('from')
 *
 * <Shockwave value={v} width={320} height={420}>
 *   <Shockwave.Transition.From>
 *     <ProductCardA />
 *   </Shockwave.Transition.From>
 *   <Shockwave.Transition.To>
 *     <ProductCardB />
 *   </Shockwave.Transition.To>
 * </Shockwave>
 *
 * <Button onPress={() => setV(v === 'from' ? 'to' : 'from')}>Swap</Button>
 * ```
 *
 * Adapted from `rit3zh/reacticx` (MIT) — same shader + slot pattern,
 * repackaged for the OTF SDK with stricter types and JSDoc.
 */
export const Shockwave = Object.assign(ShockwaveRoot, { Transition })

export type {
  ShockwaveProps,
  ShockwaveSlotProps,
  ShockwaveContextValue,
  ShockwaveOrigin,
  ShockwaveValue,
} from './types'
