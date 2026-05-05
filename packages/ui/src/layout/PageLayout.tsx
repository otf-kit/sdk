import React from 'react'
import { cn } from '../utils/cn'

/** Full-viewport flex column layout */
export const PageLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="page-layout"
    className={cn('flex min-h-screen flex-col bg-background text-foreground', className)}
    {...props}
  />
))
PageLayout.displayName = 'PageLayout'

export interface PageHeaderProps {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  back?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

/** Page header: title + optional description + actions row */
export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, description, actions, back, children }, ref) => (
    <div
      ref={ref}
      data-slot="page-header"
      className={cn('flex flex-col gap-1 pb-6', className)}
    >
      {back && <div className="mb-2">{back}</div>}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          {title && (
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
      {children}
    </div>
  )
)
PageHeader.displayName = 'PageHeader'
