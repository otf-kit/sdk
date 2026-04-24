'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const headingVariants = cva('font-heading tracking-tight text-foreground', {
  variants: {
    size: {
      display: 'text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-bold',
      xl:      'text-4xl md:text-5xl leading-tight font-bold',
      lg:      'text-3xl md:text-4xl leading-tight font-semibold',
      md:      'text-2xl leading-snug font-semibold',
      sm:      'text-xl leading-snug font-semibold',
      xs:      'text-lg leading-snug font-semibold',
    },
    tone: {
      default: 'text-foreground',
      muted:   'text-muted-foreground',
      accent:  'text-primary',
    },
  },
  defaultVariants: { size: 'lg', tone: 'default' },
})

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingTag
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = 'h2', size, tone, className, ...props }, ref) => {
    return React.createElement(Tag, {
      ref,
      'data-slot': 'heading',
      className: cn(headingVariants({ size, tone }), className),
      ...props,
    })
  }
)
Heading.displayName = 'Heading'
