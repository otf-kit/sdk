'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '../utils/cn'

export interface AnimatedNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Target value to animate to */
  value: number
  /** Starting value (default 0) */
  from?: number
  /** Animation duration in ms (default 1200) */
  duration?: number
  /** Decimal places (default 0) */
  decimals?: number
  /** Prefix string e.g. "$" */
  prefix?: string
  /** Suffix string e.g. "%" or "k" */
  suffix?: string
  /** Easing function (default easeOutExpo) */
  easing?: (t: number) => number
  /** Whether to start animating immediately or wait for intersection */
  autoStart?: boolean
  /** Locale for number formatting */
  locale?: string
  /** Format with locale grouping (e.g. 1,234) */
  format?: boolean
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function formatNumber(
  value: number,
  decimals: number,
  format: boolean,
  locale?: string
): string {
  if (format) {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value)
  }
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value))
}

export const AnimatedNumber = React.forwardRef<HTMLSpanElement, AnimatedNumberProps>(
  (
    {
      value,
      from = 0,
      duration = 1200,
      decimals = 0,
      prefix = '',
      suffix = '',
      easing = easeOutExpo,
      autoStart = true,
      locale,
      format = true,
      className,
      ...props
    },
    ref
  ) => {
    const [displayed, setDisplayed] = useState(autoStart ? from : value)
    const rafRef = useRef<number | null>(null)
    const startTimeRef = useRef<number | null>(null)
    const containerRef = useRef<HTMLSpanElement | null>(null)
    const hasStarted = useRef(false)

    const runAnimation = React.useCallback(
      (startFrom: number) => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        startTimeRef.current = null
        hasStarted.current = true

        const step = (timestamp: number) => {
          if (startTimeRef.current === null) startTimeRef.current = timestamp
          const elapsed = timestamp - startTimeRef.current
          const progress = Math.min(elapsed / duration, 1)
          const easedProgress = easing(progress)
          const current = startFrom + (value - startFrom) * easedProgress
          setDisplayed(current)

          if (progress < 1) {
            rafRef.current = requestAnimationFrame(step)
          } else {
            setDisplayed(value)
            rafRef.current = null
          }
        }

        rafRef.current = requestAnimationFrame(step)
      },
      [value, duration, easing]
    )

    // Start immediately or on intersection
    useEffect(() => {
      if (!autoStart) return undefined

      if (typeof IntersectionObserver !== 'undefined') {
        const el = containerRef.current
        if (!el) return undefined
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting && !hasStarted.current) {
              runAnimation(from)
              observer.disconnect()
            }
          },
          { threshold: 0.2 }
        )
        observer.observe(el)
        return () => observer.disconnect()
      } else {
        runAnimation(from)
        return undefined
      }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // Re-animate when value changes after first mount
    useEffect(() => {
      if (!hasStarted.current) return
      runAnimation(displayed)
    }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      return () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      }
    }, [])

    const setRef = (el: HTMLSpanElement | null) => {
      containerRef.current = el
      if (typeof ref === 'function') ref(el)
      else if (ref) (ref as React.MutableRefObject<HTMLSpanElement | null>).current = el
    }

    return (
      <span
        ref={setRef}
        data-slot="animated-number"
        className={cn('tabular-nums', className)}
        aria-live="polite"
        aria-atomic="true"
        {...props}
      >
        {prefix}
        {formatNumber(displayed, decimals, format, locale)}
        {suffix}
      </span>
    )
  }
)
AnimatedNumber.displayName = 'AnimatedNumber'
