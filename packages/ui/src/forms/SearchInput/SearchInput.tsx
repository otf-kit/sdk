import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../utils/cn'
import { type InputProps } from '../primitives/input'

export interface SearchInputProps extends Omit<InputProps, 'onChange'> {
  shortcut?: string
  onClear?: () => void
  onChange?: (value: string) => void
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, shortcut, onClear, onChange, value: valueProp, defaultValue, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const isControlled = valueProp !== undefined
    const value = isControlled ? String(valueProp) : String(internalValue)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (!isControlled) setInternalValue(e.target.value)
      onChange?.(e.target.value)
    }

    function handleClear() {
      if (!isControlled) setInternalValue('')
      onChange?.('')
      onClear?.()
    }

    return (
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        <input
          ref={ref}
          value={value}
          onChange={handleChange}
          className={cn(
            'flex h-9 w-full rounded-md border border-[hsl(var(--input))] bg-transparent pl-8 pr-8 text-sm shadow-sm transition-colors',
            'placeholder:text-[hsl(var(--muted-foreground))]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        <div className="absolute right-2.5 flex items-center">
          {value ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          ) : shortcut ? (
            <kbd className="pointer-events-none rounded border border-[hsl(var(--border))] px-1.5 py-0.5 text-[10px] text-[hsl(var(--muted-foreground))]">
              {shortcut}
            </kbd>
          ) : null}
        </div>
      </div>
    )
  }
)
SearchInput.displayName = 'SearchInput'
