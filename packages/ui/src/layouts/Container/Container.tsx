import React from 'react'
import { cn } from '../utils/cn'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

const sizeMap: Record<ContainerSize, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize
  noPadding?: boolean
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', noPadding = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mx-auto w-full',
        sizeMap[size],
        !noPadding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    />
  )
)
Container.displayName = 'Container'
