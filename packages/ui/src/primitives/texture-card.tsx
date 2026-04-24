import * as React from 'react'
import { cn } from '../utils/cn'

// TextureCard — 4-ring nested surface (OTF signature component)
export interface TextureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: boolean
}

export const TextureCard = React.forwardRef<HTMLDivElement, TextureCardProps>(
  ({ children, className, padding = true, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="texture-card"
      className={cn(
        'border border-border/40 rounded-[var(--radius)] p-[3px]',
        'bg-gradient-to-b from-card to-card/90',
        className
      )}
      {...props}
    >
      <div className="border border-border/20 rounded-[calc(var(--radius)-2px)] p-[2px]">
        <div className="border border-border/10 rounded-[calc(var(--radius)-4px)] p-[1px]">
          <div className={cn('bg-card rounded-[calc(var(--radius)-6px)]', padding && 'p-6')}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
)
TextureCard.displayName = 'TextureCard'

export const TextureCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1.5 mb-4', className)} {...props} />
  )
)
TextureCardHeader.displayName = 'TextureCardHeader'

export const TextureCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-semibold text-base leading-tight tracking-tight text-foreground', className)} {...props} />
  )
)
TextureCardTitle.displayName = 'TextureCardTitle'

export const TextureCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
)
TextureCardDescription.displayName = 'TextureCardDescription'
