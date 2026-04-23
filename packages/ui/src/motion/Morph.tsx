'use client'
import { motion, type HTMLMotionProps } from 'motion/react'
import React from 'react'

export interface MorphProps extends HTMLMotionProps<'div'> {
  layoutId: string
  children: React.ReactNode
}

export const Morph = React.forwardRef<HTMLDivElement, MorphProps>(
  ({ layoutId, children, ...props }, ref) => (
    <motion.div ref={ref} layoutId={layoutId} layout {...props}>
      {children}
    </motion.div>
  )
)
Morph.displayName = 'Morph'
