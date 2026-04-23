import React from 'react'
import { cn } from '../utils/cn'

/**
 * PageContainer — responsive max-width ladder.
 * Mirrors reference's `PageContainer` (`src/interface/layout/PageContainer.tsx`).
 */
export const PageContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="page-container"
    className={cn(
      'px-4 w-full min-w-[320px] mx-auto',
      'md:max-w-[760px] lg:max-w-[900px] xl:max-w-[1160px]',
      className
    )}
    {...props}
  />
))
PageContainer.displayName = 'PageContainer'

export const PageMain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="page-main"
    role="main"
    className={cn(
      'px-4 w-full min-w-[320px] mx-auto',
      'md:max-w-[760px] lg:max-w-[900px] xl:max-w-[1160px]',
      className
    )}
    {...props}
  />
))
PageMain.displayName = 'PageMain'
