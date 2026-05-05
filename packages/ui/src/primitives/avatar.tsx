import React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../utils/cn'

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn('aspect-square h-full w-full object-cover', className)} {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn('flex h-full w-full items-center justify-center rounded-full bg-[hsl(var(--muted))] text-sm font-medium text-[hsl(var(--muted-foreground))]', className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// ── AvatarGroup ──────────────────────────────────────────────────────────────
// Stacked, overlapping avatars with an optional "+N" overflow tile.
// Children are <Avatar> elements; we wrap each one with a ring + size override
// so consumers don't have to repeat the same className on every child.

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars rendered before collapsing into a "+N" tile. Default 4. */
  max?: number
  /** Pixel size of each avatar tile. Default 32. */
  size?: number
  /** Pixel overlap between adjacent avatars. Default size / 3. */
  spacing?: number
  /** Custom node for the overflow tile. Falls back to "+{remaining}". */
  renderOverflow?: (remaining: number) => React.ReactNode
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 4, size = 32, spacing, renderOverflow, children, ...props }, ref) => {
    const items = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement[]
    const overlap = spacing ?? Math.round(size / 3)
    const visible = items.slice(0, max)
    const remaining = Math.max(0, items.length - max)

    return (
      <div ref={ref} className={cn('flex items-center', className)} data-slot="avatar-group" {...props}>
        {visible.map((child, i) =>
          React.cloneElement(child, {
            key: child.key ?? i,
            style: {
              width: size,
              height: size,
              marginLeft: i === 0 ? 0 : -overlap,
              ...(child.props.style ?? {}),
            },
            className: cn(
              'ring-2 ring-[hsl(var(--background))] relative',
              `z-[${10 + i}]`,
              child.props.className,
            ),
          }),
        )}
        {remaining > 0 && (
          <div
            data-slot="avatar-group-overflow"
            className={cn(
              'flex items-center justify-center rounded-full ring-2 ring-[hsl(var(--background))] relative',
              'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] font-medium',
            )}
            style={{
              width: size,
              height: size,
              marginLeft: -overlap,
              fontSize: Math.max(10, Math.round(size * 0.34)),
              zIndex: 10 + visible.length,
            }}
          >
            {renderOverflow ? renderOverflow(remaining) : `+${remaining}`}
          </div>
        )}
      </div>
    )
  },
)
AvatarGroup.displayName = 'AvatarGroup'
