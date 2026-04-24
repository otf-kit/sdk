import React from 'react'
import { cn } from '../utils/cn'

interface ToggleButtonProps {
  value: string
  pressed?: boolean
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

export function ToggleButton({ pressed, onClick, disabled, children, className }: ToggleButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors border',
        'disabled:pointer-events-none disabled:opacity-50',
        pressed
          ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--primary))]'
          : 'bg-transparent text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]',
        className
      )}
    >
      {children}
    </button>
  )
}

interface ToggleButtonGroupSingle {
  type?: 'single'
  value: string
  onChange: (v: string) => void
}

interface ToggleButtonGroupMultiple {
  type: 'multiple'
  value: string[]
  onChange: (v: string[]) => void
}

type ToggleButtonGroupProps = (ToggleButtonGroupSingle | ToggleButtonGroupMultiple) & {
  children: React.ReactNode
  className?: string
}

export function ToggleButtonGroup(props: ToggleButtonGroupProps) {
  const { children, className } = props

  const isPressed = (val: string) =>
    props.type === 'multiple' ? (props.value as string[]).includes(val) : props.value === val

  const handleClick = (val: string) => {
    if (props.type === 'multiple') {
      const current = props.value as string[]
      props.onChange(current.includes(val) ? current.filter((v) => v !== val) : [...current, val])
    } else {
      ;(props as ToggleButtonGroupSingle).onChange(val)
    }
  }

  return (
    <div className={cn('inline-flex items-center gap-1 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)] p-0.5', className)}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        const tb = child as React.ReactElement<ToggleButtonProps>
        return React.cloneElement(tb, {
          pressed: isPressed(tb.props.value),
          onClick: () => handleClick(tb.props.value),
        })
      })}
    </div>
  )
}
