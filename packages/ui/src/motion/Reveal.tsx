'use client'
import { motion, useInView, type Transition } from 'motion/react'
import React, { useRef } from 'react'
import { type MotionPreset, MOTION_PRESETS, DEFAULT_TRANSITION } from './presets'

export interface RevealProps {
  preset?: MotionPreset
  delay?: number
  once?: boolean
  children: React.ReactNode
  className?: string
}

export function Reveal({ preset = 'fadeIn', delay = 0, once = true, children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once })
  const variants = MOTION_PRESETS[preset]
  const transition: Transition = { ...DEFAULT_TRANSITION, delay }

  return (
    <motion.div
      ref={ref}
      initial={variants.initial}
      animate={isInView ? variants.animate : variants.initial}
      exit={variants.exit}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}
