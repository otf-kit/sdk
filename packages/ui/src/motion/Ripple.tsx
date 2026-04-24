'use client'
import { motion, type HTMLMotionProps, type Transition } from 'motion/react'
import React, { useState, useCallback } from 'react'

export interface RippleProps extends Omit<HTMLMotionProps<'div'>, 'onPointerDown'> {
  /** Ripple color — defaults to current text color at 20% opacity */
  color?: string
  /** Duration in seconds */
  duration?: number
  children: React.ReactNode
}

interface RippleInstance {
  key: number
  x: number
  y: number
  size: number
}

let rippleCounter = 0

export const Ripple = React.forwardRef<HTMLDivElement, RippleProps>(
  ({ color = 'currentColor', duration = 0.6, children, style, ...props }, ref) => {
    const [ripples, setRipples] = useState<RippleInstance[]>([])

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const size = Math.max(rect.width, rect.height) * 2
        const key = ++rippleCounter
        setRipples((prev) => [...prev, { key, x, y, size }])
      },
      []
    )

    const removeRipple = useCallback((key: number) => {
      setRipples((prev) => prev.filter((r) => r.key !== key))
    }, [])

    const rippleTransition: Transition = {
      duration,
      ease: [0.16, 1, 0.3, 1],
    }

    return (
      <motion.div
        ref={ref}
        onPointerDown={handlePointerDown}
        style={{ position: 'relative', overflow: 'hidden', ...style }}
        {...props}
      >
        {children}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.key}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={rippleTransition}
            onAnimationComplete={() => removeRipple(ripple.key)}
            style={{
              position: 'absolute',
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              borderRadius: '50%',
              backgroundColor: color,
              pointerEvents: 'none',
            }}
          />
        ))}
      </motion.div>
    )
  }
)
Ripple.displayName = 'Ripple'
