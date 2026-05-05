import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium font-sans',
    'transition-colors duration-[var(--duration-fast,100ms)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70',
        outline:
          'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground active:bg-accent/70',
        ghost:
          'hover:bg-accent hover:text-accent-foreground active:bg-accent/70',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80',
        link:
          'text-primary underline-offset-4 hover:underline',
        /** Gradient stack — premium variant */
        gradient: [
          'bg-gradient-to-b from-primary to-[hsl(var(--primary)/0.8)]',
          'text-primary-foreground',
          'shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset,0_-1px_0_0_rgba(0,0,0,0.25)_inset]',
          'hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.7)]',
          'active:from-[hsl(var(--primary)/0.8)] active:to-[hsl(var(--primary)/0.6)]',
        ].join(' '),
        /** Texture — nested ring surface as a button */
        texture: [
          'relative border border-border/40',
          'bg-gradient-to-b from-card to-[hsl(var(--card)/0.9)]',
          'text-foreground',
          'shadow-[0_0_0_1px_hsl(var(--border)/0.2)_inset]',
          'hover:border-border/60 hover:bg-accent',
          'active:shadow-none',
        ].join(' '),
      },
      size: {
        sm:      'h-8 px-3 text-xs rounded-md',
        default: 'h-9 px-4 py-2',
        lg:      'h-11 px-6 text-base',
        xl:      'h-12 px-8 text-base',
        icon:    'h-9 w-9 p-0',
        'icon-sm': 'h-7 w-7 p-0 text-xs',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label: string
  size?: 'sm' | 'default' | 'lg'
  variant?: VariantProps<typeof buttonVariants>['variant']
  asChild?: boolean
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, size = 'default', variant = 'ghost', className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const sizeClass = size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-10 w-10' : 'h-9 w-9'
    return (
      <Comp
        ref={ref}
        aria-label={label}
        data-slot="icon-button"
        className={cn(
          buttonVariants({ variant }),
          sizeClass,
          'p-0 shrink-0',
          className
        )}
        {...props}
      >
        {icon}
      </Comp>
    )
  }
)
IconButton.displayName = 'IconButton'

export { buttonVariants }
