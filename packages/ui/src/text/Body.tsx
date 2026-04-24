'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const bodyVariants = cva('font-sans', {
  variants: {
    size: {
      lg: 'text-lg leading-relaxed',
      md: 'text-base leading-relaxed',
      sm: 'text-sm leading-relaxed',
      xs: 'text-xs leading-normal',
    },
    tone: {
      default: 'text-foreground',
      muted:   'text-muted-foreground',
      subtle:  'text-muted-foreground/75',
    },
    weight: {
      normal:   'font-normal',
      medium:   'font-medium',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: { size: 'md', tone: 'default', weight: 'normal' },
})

type BodyTag = 'p' | 'span' | 'div'

export interface BodyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof bodyVariants> {
  as?: BodyTag
}

export const Body = React.forwardRef<HTMLElement, BodyProps>(
  ({ as: Tag = 'p', size, tone, weight, className, ...props }, ref) => {
    return React.createElement(Tag, {
      ref,
      'data-slot': 'body',
      className: cn(bodyVariants({ size, tone, weight }), className),
      ...props,
    })
  }
)
Body.displayName = 'Body'
