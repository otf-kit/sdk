import React from 'react'
import { cn } from '../utils/cn'

export interface TextureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Add default padding to inner content area */
  padding?: boolean
  /** Extra gradient variation */
  variant?: 'default' | 'elevated' | 'subtle'
}

const gradientMap = {
  default:  'bg-gradient-to-b from-card to-[hsl(var(--card)/0.9)]',
  elevated: 'bg-gradient-to-b from-[hsl(var(--card)/1.05)] to-card shadow-lg',
  subtle:   'bg-card',
}

/**
 * TextureCard — 4-ring nested border surface.
 * Ports the premium TextureCard pattern (clean-room).
 * Each concentric div has a half-alpha border + decreasing radius,
 * creating beveled depth without shadows.
 */
export const TextureCard = React.forwardRef<HTMLDivElement, TextureCardProps>(
  ({ children, className, padding = true, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      data-slot="texture-card"
      className={cn(
        'border border-border/40 rounded-[var(--radius)]',
        'p-[3px]',
        gradientMap[variant],
        className
      )}
      {...props}
    >
      {/* Ring 2 */}
      <div className="border border-border/20 rounded-[var(--radius-inner)] p-[2px]">
        {/* Ring 3 */}
        <div className="border border-border/10 rounded-[var(--radius-innermost)] p-[1px]">
          {/* Content */}
          <div
            data-slot="texture-card-content"
            className={cn(
              'bg-card rounded-[calc(var(--radius)-6px)]',
              padding && 'p-6'
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
)
TextureCard.displayName = 'TextureCard'

export interface TextureCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export const TextureCardHeader = React.forwardRef<HTMLDivElement, TextureCardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="texture-card-header"
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
)
TextureCardHeader.displayName = 'TextureCardHeader'

export interface TextureCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export const TextureCardTitle = React.forwardRef<HTMLHeadingElement, TextureCardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      data-slot="texture-card-title"
      className={cn('text-base font-semibold leading-none tracking-tight text-foreground', className)}
      {...props}
    />
  )
)
TextureCardTitle.displayName = 'TextureCardTitle'

export interface TextureCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export const TextureCardDescription = React.forwardRef<HTMLParagraphElement, TextureCardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="texture-card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
TextureCardDescription.displayName = 'TextureCardDescription'
