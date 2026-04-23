'use client'
import { motion, useInView, type Variants } from 'motion/react'
import React, { useRef } from 'react'
import { MOTION_PRESETS } from './presets'

export interface StaggerProps {
  staggerDelay?: number
  preset?: 'fadeIn' | 'slideUp' | 'scaleIn'
  children: React.ReactNode
  className?: string
  once?: boolean
}

export function Stagger({ staggerDelay = 0.05, preset = 'fadeIn', children, className, once = true }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once })
  const childVariants = MOTION_PRESETS[preset]

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: childVariants.initial,
    visible: childVariants.animate,
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
