import React from 'react'
import { cn } from '../utils/cn'

type Direction = 'row' | 'col' | 'row-reverse' | 'col-reverse'
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

const dirMap: Record<Direction, string> = {
  row: 'flex-row', col: 'flex-col',
  'row-reverse': 'flex-row-reverse', 'col-reverse': 'flex-col-reverse',
}
const alignMap: Record<Align, string> = {
  start: 'items-start', center: 'items-center', end: 'items-end',
  stretch: 'items-stretch', baseline: 'items-baseline',
}
const justifyMap: Record<Justify, string> = {
  start: 'justify-start', center: 'justify-center', end: 'justify-end',
  between: 'justify-between', around: 'justify-around', evenly: 'justify-evenly',
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number
  direction?: Direction
  align?: Align
  justify?: Justify
  wrap?: boolean
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap, direction = 'col', align, justify, wrap, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex',
        dirMap[direction],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && 'flex-wrap',
        className
      )}
      style={{ ...(gap !== undefined ? { gap: `${gap * 4}px` } : {}), ...style }}
      {...props}
    />
  )
)
Stack.displayName = 'Stack'

export const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="row" {...props} />
)
HStack.displayName = 'HStack'

export const VStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="col" {...props} />
)
VStack.displayName = 'VStack'
