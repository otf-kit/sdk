'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const captionVariants = cva('font-sans text-[11px] font-semibold uppercase tracking-[0.08em]', {
  variants: {
    tone: {
      default: 'text-muted-foreground',
      accent:  'text-primary',
      subtle:  'text-muted-foreground/60',
    },
  },
  defaultVariants: { tone: 'default' },
})

export interface CaptionProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof captionVariants> {}

export const Caption = React.forwardRef<HTMLSpanElement, CaptionProps>(
  ({ tone, className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="caption"
      className={cn(captionVariants({ tone }), className)}
      {...props}
    />
  )
)
Caption.displayName = 'Caption'
