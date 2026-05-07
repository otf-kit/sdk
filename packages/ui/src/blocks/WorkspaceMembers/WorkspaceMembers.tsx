import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Input } from '../../primitives/input'
import { Avatar, AvatarFallback } from '../../primitives/avatar'
import { Badge } from '../../primitives/badge'
import { Button } from '../../primitives/button'

const MEMBERS = [
  { id: '1', name: 'Jane Doe', email: 'jane@acme.com', role: 'Owner', initials: 'JD' },
  { id: '2', name: 'Bob Smith', email: 'bob@acme.com', role: 'Admin', initials: 'BS' },
  { id: '3', name: 'Alice Chen', email: 'alice@acme.com', role: 'Member', initials: 'AC' },
  { id: '4', name: 'Tom Ray', email: 'tom@acme.com', role: 'Member', initials: 'TR' },
  { id: '5', name: 'Sara Kim', email: 'sara@acme.com', role: 'Viewer', initials: 'SK' },
]

const roleVariant = (role: string): 'default' | 'secondary' | 'outline' =>
  role === 'Owner' ? 'default' : role === 'Admin' ? 'secondary' : 'outline'

export interface WorkspaceMembersProps { className?: string }

export function WorkspaceMembers({ className }: WorkspaceMembersProps) {
  const [query, setQuery] = useState('')
  const [members, setMembers] = useState(MEMBERS)
  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.email.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className={cn('rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))]', className)}>
      <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
        <div>
          <h2 className="text-sm font-semibold">Members</h2>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">{members.length} members</p>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
          <Input className="h-8 pl-8 text-xs w-48" placeholder="Search members..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>
      <div className="divide-y divide-[hsl(var(--border))]">
        {filtered.map(m => (
          <div key={m.id} className="flex items-center gap-3 px-4 py-3">
            <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{m.initials}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{m.name}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">{m.email}</p>
            </div>
            <Badge variant={roleVariant(m.role)} className="text-[10px] px-1.5 py-0.5 shrink-0">{m.role}</Badge>
            {m.role !== 'Owner' && (
              <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0" onClick={() => setMembers(ms => ms.filter(x => x.id !== m.id))}>
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
