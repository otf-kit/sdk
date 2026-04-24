'use client'
import { motion, useScroll, useTransform, type HTMLMotionProps } from 'motion/react'
import React, { useRef } from 'react'

export interface ParallaxProps extends HTMLMotionProps<'div'> {
  /** Parallax offset in pixels — positive = moves up slower, negative = moves down slower */
  offset?: number
  /** Custom scroll container ref (defaults to viewport) */
  scrollRef?: React.RefObject<HTMLElement | null>
  children: React.ReactNode
}

export const Parallax = React.forwardRef<HTMLDivElement, ParallaxProps>(
  ({ offset = 50, scrollRef, children, style, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null)
    const resolvedRef = (ref as React.RefObject<HTMLDivElement>) ?? innerRef

    const { scrollYProgress } = useScroll({
      target: resolvedRef,
      container: scrollRef ?? undefined,
      offset: ['start end', 'end start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

    return (
      <motion.div
        ref={resolvedRef}
        style={{ y, ...style }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
Parallax.displayName = 'Parallax'
