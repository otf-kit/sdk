'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../primitives/command'
import { Badge } from '../primitives/badge'
import { cn } from '../utils/cn'

export type TagsProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  /** Controlled value. */
  value?: string[]
  /** Uncontrolled initial value. */
  defaultValue?: string[]
  /** Fires whenever the tag list changes. */
  onValueChange?: (tags: string[]) => void
  /** Optional autocomplete pool. */
  suggestions?: string[]
  placeholder?: string
  /** Cap the total tags. When reached, the input is disabled. */
  maxTags?: number
  /** Return false or an error string to reject a tag. */
  validate?: (tag: string) => boolean | string
  /** Allow duplicate tags. Default false. */
  allowDuplicates?: boolean
  disabled?: boolean
}

/**
 * Multi-select tag input with optional autocomplete.
 * Enter / Comma / Tab commits the current input, Backspace on empty input removes the last tag.
 */
export const Tags = React.forwardRef<HTMLDivElement, TagsProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      suggestions,
      placeholder = 'Add a tag…',
      maxTags,
      validate,
      allowDuplicates = false,
      disabled = false,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internal, setInternal] = React.useState<string[]>(defaultValue ?? [])
    const tags = isControlled ? (valueProp as string[]) : internal

    const [input, setInput] = React.useState('')
    const [error, setError] = React.useState<string | null>(null)
    const [focused, setFocused] = React.useState(false)
    const [activeIndex, setActiveIndex] = React.useState(0)

    const inputRef = React.useRef<HTMLInputElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

    const atMax = maxTags !== undefined && tags.length >= maxTags
    const inputDisabled = disabled || atMax

    const commit = React.useCallback(
      (next: string[]) => {
        if (!isControlled) setInternal(next)
        onValueChange?.(next)
      },
      [isControlled, onValueChange],
    )

    const addTag = React.useCallback(
      (raw: string) => {
        const tag = raw.trim()
        if (!tag) return false
        if (atMax) return false
        if (!allowDuplicates && tags.includes(tag)) {
          setError('Tag already added')
          return false
        }
        if (validate) {
          const result = validate(tag)
          if (result === false) {
            setError('Invalid tag')
            return false
          }
          if (typeof result === 'string') {
            setError(result)
            return false
          }
        }
        commit([...tags, tag])
        setError(null)
        return true
      },
      [tags, allowDuplicates, validate, atMax, commit],
    )

    const removeTag = React.useCallback(
      (index: number) => {
        commit(tags.filter((_, i) => i !== index))
        setError(null)
      },
      [tags, commit],
    )

    // Suggestion filtering
    const filteredSuggestions = React.useMemo(() => {
      if (!suggestions || !input.trim()) return []
      const q = input.trim().toLowerCase()
      return suggestions
        .filter((s) => s.toLowerCase().includes(q))
        .filter((s) => allowDuplicates || !tags.includes(s))
        .slice(0, 8)
    }, [suggestions, input, tags, allowDuplicates])

    const showPopover = focused && !inputDisabled && filteredSuggestions.length > 0

    React.useEffect(() => {
      if (activeIndex >= filteredSuggestions.length) setActiveIndex(0)
    }, [filteredSuggestions.length, activeIndex])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
        if (showPopover && e.key !== 'Tab') {
          e.preventDefault()
          const picked = filteredSuggestions[activeIndex]
          if (picked && addTag(picked)) setInput('')
          return
        }
        if (input.trim()) {
          e.preventDefault()
          if (addTag(input)) setInput('')
        }
      } else if (e.key === 'Backspace' && !input && tags.length > 0) {
        e.preventDefault()
        removeTag(tags.length - 1)
      } else if (e.key === 'ArrowDown' && showPopover) {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % filteredSuggestions.length)
      } else if (e.key === 'ArrowUp' && showPopover) {
        e.preventDefault()
        setActiveIndex(
          (i) => (i - 1 + filteredSuggestions.length) % filteredSuggestions.length,
        )
      } else if (e.key === 'Escape' && showPopover) {
        e.preventDefault()
        setFocused(false)
        inputRef.current?.blur()
      }
    }

    const handleContainerClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
      onClick?.(e)
      if (!disabled) inputRef.current?.focus()
    }

    return (
      <div className={cn('relative w-full', className)}>
        <div
          ref={containerRef}
          onClick={handleContainerClick}
          data-slot="tags"
          data-disabled={disabled || undefined}
          className={cn(
            'flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-2 py-1.5 text-sm shadow-sm transition-colors',
            'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring',
            disabled && 'cursor-not-allowed opacity-50',
            error && 'border-destructive focus-within:ring-destructive',
          )}
          {...props}
        >
          {tags.map((tag, i) => (
            <Badge
              key={`${tag}-${i}`}
              variant="secondary"
              className="gap-1 px-2 py-0.5 font-medium"
            >
              <span className="leading-none">{tag}</span>
              {!disabled && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation()
                    removeTag(i)
                  }}
                  className={cn(
                    'inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-muted-foreground transition-colors',
                    'hover:bg-foreground/10 hover:text-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  )}
                  aria-label={`Remove ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={input}
            disabled={inputDisabled}
            placeholder={tags.length === 0 ? placeholder : undefined}
            onChange={(e) => {
              setInput(e.target.value)
              if (error) setError(null)
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              // Delay to allow click on suggestion
              window.setTimeout(() => setFocused(false), 120)
            }}
            className={cn(
              'flex-1 min-w-[80px] bg-transparent py-0.5 text-sm outline-none',
              'placeholder:text-muted-foreground',
              'disabled:cursor-not-allowed',
            )}
            aria-label="Add tag"
            aria-invalid={error ? true : undefined}
          />
        </div>

        {error && (
          <p className="mt-1 text-xs text-destructive" role="alert">
            {error}
          </p>
        )}

        {showPopover && (
          <div
            className={cn(
              'absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md',
            )}
          >
            <Command shouldFilter={false}>
              <CommandList className="max-h-56">
                <CommandEmpty>No matches.</CommandEmpty>
                <CommandGroup>
                  {filteredSuggestions.map((s, i) => (
                    <CommandItem
                      key={s}
                      value={s}
                      data-selected={i === activeIndex || undefined}
                      onMouseEnter={() => setActiveIndex(i)}
                      onSelect={() => {
                        if (addTag(s)) {
                          setInput('')
                          inputRef.current?.focus()
                        }
                      }}
                    >
                      {s}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    )
  },
)
Tags.displayName = 'Tags'
