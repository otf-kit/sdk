'use client'
import { motion, type HTMLMotionProps, type Transition } from 'motion/react'
import React from 'react'
import { DEFAULT_TRANSITION, MOTION_PRESETS } from './presets'

export interface ScaleInProps extends HTMLMotionProps<'div'> {
  delay?: number
  duration?: number
  children: React.ReactNode
}

export const ScaleIn = React.forwardRef<HTMLDivElement, ScaleInProps>(
  ({ delay = 0, duration, children, ...props }, ref) => {
    const transition: Transition = {
      ...DEFAULT_TRANSITION,
      duration: duration ?? DEFAULT_TRANSITION.duration,
      delay,
    }
    return (
      <motion.div
        ref={ref}
        initial={MOTION_PRESETS.scaleIn.initial}
        animate={MOTION_PRESETS.scaleIn.animate}
        exit={MOTION_PRESETS.scaleIn.exit}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
ScaleIn.displayName = 'ScaleIn'
