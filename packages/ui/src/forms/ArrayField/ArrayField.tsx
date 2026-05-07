import React from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '../../primitives/button'
import { cn } from '../../utils/cn'

export interface ArrayFieldProps<T> {
  value: T[]
  onChange: (v: T[]) => void
  renderItem: (item: T, index: number, remove: () => void) => React.ReactNode
  addLabel?: string
  maxItems?: number
  defaultItem: T
  className?: string
}

export function ArrayField<T>({
  value,
  onChange,
  renderItem,
  addLabel = 'Add item',
  maxItems,
  defaultItem,
  className,
}: ArrayFieldProps<T>) {
  function add() {
    if (maxItems && value.length >= maxItems) return
    onChange([...value, defaultItem])
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  const atMax = maxItems !== undefined && value.length >= maxItems

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {value.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex-1 min-w-0">{renderItem(item, i, () => remove(i))}</div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="mt-2 shrink-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" size="sm" onClick={add} disabled={atMax}>
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
        {maxItems && (
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{value.length}/{maxItems}</span>
        )}
      </div>
    </div>
  )
}
