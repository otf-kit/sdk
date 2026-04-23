'use client'
import { motion, type HTMLMotionProps, type Transition } from 'motion/react'
import React from 'react'
import { DEFAULT_TRANSITION, MOTION_PRESETS } from './presets'

export interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number
  duration?: number
  children: React.ReactNode
}

export const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  ({ delay = 0, duration, children, ...props }, ref) => {
    const transition: Transition = {
      ...DEFAULT_TRANSITION,
      duration: duration ?? DEFAULT_TRANSITION.duration,
      delay,
    }
    return (
      <motion.div
        ref={ref}
        initial={MOTION_PRESETS.fadeIn.initial}
        animate={MOTION_PRESETS.fadeIn.animate}
        exit={MOTION_PRESETS.fadeIn.exit}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
FadeIn.displayName = 'FadeIn'
