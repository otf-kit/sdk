import React from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '../utils/cn'
import { Button } from '../primitives/button'
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../primitives/select'
import { Input } from '../primitives/input'

export interface FilterDef {
  key: string
  label: string
  type: 'text' | 'select' | 'date' | 'number'
  options?: { label: string; value: string }[]
}

export interface FilterValue {
  key: string
  operator: string
  value: string
}

const textOps = ['contains', 'equals', 'starts with']
const numOps = ['=', '>', '<', '>=', '<=']

function AddFilterPopover({ filters, onAdd }: { filters: FilterDef[]; onAdd: (v: FilterValue) => void }) {
  const [open, setOpen] = React.useState(false)
  const [key, setKey] = React.useState('')
  const [op, setOp] = React.useState('')
  const [val, setVal] = React.useState('')

  const def = filters.find((f) => f.key === key)
  const ops = def?.type === 'number' ? numOps : textOps

  const handleAdd = () => {
    if (!key || !val) return
    onAdd({ key, operator: op || ops[0], value: val })
    setKey(''); setOp(''); setVal('')
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1 text-xs"><Plus className="h-3.5 w-3.5" />Add Filter</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3 space-y-2">
        <Select value={key} onValueChange={setKey}>
          <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Field" /></SelectTrigger>
          <SelectContent>{filters.map((f) => <SelectItem key={f.key} value={f.key}>{f.label}</SelectItem>)}</SelectContent>
        </Select>
        {key && (
          <Select value={op || ops[0]} onValueChange={setOp}>
            <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>{ops.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
          </Select>
        )}
        {key && def?.type === 'select' ? (
          <Select value={val} onValueChange={setVal}>
            <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Value" /></SelectTrigger>
            <SelectContent>{def.options?.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
          </Select>
        ) : key && (
          <Input type={def?.type === 'number' ? 'number' : def?.type === 'date' ? 'date' : 'text'} className="h-8 text-xs" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Value" />
        )}
        <Button size="sm" className="w-full h-7 text-xs" onClick={handleAdd} disabled={!key || !val}>Apply</Button>
      </PopoverContent>
    </Popover>
  )
}

export function FilterBadge({ filter, def, onRemove }: { filter: FilterValue; def?: FilterDef; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--foreground))]">
      <span className="text-[hsl(var(--muted-foreground))]">{def?.label ?? filter.key}</span>
      <span>{filter.operator}</span>
      <span className="font-semibold">{filter.value}</span>
      <button onClick={onRemove} className="ml-0.5 rounded-full hover:text-[hsl(var(--destructive))]"><X className="h-3 w-3" /></button>
    </span>
  )
}

export function FilterItem({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1">{children}</div>
}

interface FiltersProps {
  filters: FilterDef[]
  value: FilterValue[]
  onChange: (v: FilterValue[]) => void
  className?: string
}

export function Filters({ filters, value, onChange, className }: FiltersProps) {
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {value.map((fv, i) => (
        <FilterBadge key={i} filter={fv} def={filters.find((f) => f.key === fv.key)} onRemove={() => remove(i)} />
      ))}
      <AddFilterPopover filters={filters} onAdd={(fv) => onChange([...value, fv])} />
    </div>
  )
}
