import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Button } from '../primitives/button'
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/popover'
import { cn } from '../utils/cn'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function CalendarGrid({ year, month, selected, onSelect }: {
  year: number; month: number; selected?: Date; onSelect: (d: Date) => void
}) {
  const today = new Date()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfWeek(year, month)
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1)

  return (
    <div className="grid grid-cols-7 gap-0.5">
      {DAYS.map(d => <div key={d} className="py-1 text-center text-xs font-medium text-[hsl(var(--muted-foreground))]">{d}</div>)}
      {cells.map((day, i) => {
        if (!day) return <div key={i} />
        const date = new Date(year, month, day)
        const isToday = isSameDay(date, today)
        const isSelected = selected && isSameDay(date, selected)
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(date)}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors',
              isSelected && 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
              !isSelected && isToday && 'border border-[hsl(var(--primary))] text-[hsl(var(--primary))]',
              !isSelected && !isToday && 'hover:bg-[hsl(var(--accent))]'
            )}
          >
            {day}
          </button>
        )
      })}
    </div>
  )
}

export function DatePicker({ value, onChange, placeholder = 'Pick a date', disabled, className }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const now = value ?? new Date()
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() })

  function navigate(delta: number) {
    setView(v => {
      const date = new Date(v.year, v.month + delta)
      return { year: date.getFullYear(), month: date.getMonth() }
    })
  }

  function handleSelect(date: Date) {
    onChange?.(date)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn('w-full justify-start font-normal', !value && 'text-[hsl(var(--muted-foreground))]', className)}
        >
          <Calendar className="mr-2 h-4 w-4 shrink-0" />
          {value ? value.toLocaleDateString() : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="flex items-center justify-between mb-2">
          <button type="button" onClick={() => navigate(-1)} className="rounded p-1 hover:bg-[hsl(var(--accent))]">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium">{MONTHS[view.month]} {view.year}</span>
          <button type="button" onClick={() => navigate(1)} className="rounded p-1 hover:bg-[hsl(var(--accent))]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <CalendarGrid year={view.year} month={view.month} selected={value} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  )
}
