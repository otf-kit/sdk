'use client'
import { motion, type HTMLMotionProps, type Transition } from 'motion/react'
import React from 'react'
import { DEFAULT_TRANSITION, MOTION_PRESETS, type MotionPreset } from './presets'

export interface SlideInProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  children: React.ReactNode
}

const DIRECTION_PRESET_MAP: Record<'up' | 'down' | 'left' | 'right', MotionPreset> = {
  up: 'slideUp',
  down: 'slideDown',
  left: 'slideLeft',
  right: 'slideRight',
}

export const SlideIn = React.forwardRef<HTMLDivElement, SlideInProps>(
  ({ direction = 'up', delay = 0, duration, children, ...props }, ref) => {
    const preset = MOTION_PRESETS[DIRECTION_PRESET_MAP[direction]]
    const transition: Transition = {
      ...DEFAULT_TRANSITION,
      duration: duration ?? DEFAULT_TRANSITION.duration,
      delay,
    }
    return (
      <motion.div
        ref={ref}
        initial={preset.initial}
        animate={preset.animate}
        exit={preset.exit}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
SlideIn.displayName = 'SlideIn'
