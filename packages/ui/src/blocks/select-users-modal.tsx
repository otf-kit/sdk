import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '../utils/cn'
import { Input } from '../primitives/input'
import { Button } from '../primitives/button'
import { Checkbox } from '../primitives/checkbox'
import { Avatar, AvatarFallback } from '../primitives/avatar'

const USERS = [
  { id: '1', name: 'Jane Doe', email: 'jane@acme.com', initials: 'JD' },
  { id: '2', name: 'Bob Smith', email: 'bob@acme.com', initials: 'BS' },
  { id: '3', name: 'Alice Chen', email: 'alice@acme.com', initials: 'AC' },
  { id: '4', name: 'Tom Ray', email: 'tom@acme.com', initials: 'TR' },
  { id: '5', name: 'Sara Kim', email: 'sara@acme.com', initials: 'SK' },
  { id: '6', name: 'Mike Liu', email: 'mike@acme.com', initials: 'ML' },
]

export interface SelectUsersModalProps {
  onConfirm?: (ids: string[]) => void
  className?: string
}

export function SelectUsersModal({ onConfirm, className }: SelectUsersModalProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = USERS.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  )

  const toggle = (id: string) =>
    setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="p-4 border-b border-[hsl(var(--border))]">
        <h2 className="text-sm font-semibold mb-3">Select Users</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
          <Input className="pl-8 h-8 text-sm" placeholder="Search users..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>
      <div className="overflow-auto max-h-64 divide-y divide-[hsl(var(--border))]">
        {filtered.map(u => (
          <label key={u.id} className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-[hsl(var(--accent))] transition-colors">
            <Checkbox checked={selected.has(u.id)} onCheckedChange={() => toggle(u.id)} />
            <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{u.initials}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{u.name}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">{u.email}</p>
            </div>
          </label>
        ))}
      </div>
      <div className="flex items-center justify-between p-4 border-t border-[hsl(var(--border))]">
        <span className="text-sm text-[hsl(var(--muted-foreground))]">{selected.size} selected</span>
        <Button size="sm" disabled={selected.size === 0} onClick={() => onConfirm?.(Array.from(selected))}>
          Confirm
        </Button>
      </div>
    </div>
  )
}
