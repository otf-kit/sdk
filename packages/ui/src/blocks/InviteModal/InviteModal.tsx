import React, { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Input } from '../../primitives/input'
import { Button } from '../../primitives/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../primitives/select'
import { Avatar, AvatarFallback } from '../../primitives/avatar'
import { Badge } from '../../primitives/badge'

const PENDING = [
  { email: 'alex@startup.io', role: 'Member' },
  { email: 'sam@startup.io', role: 'Viewer' },
]

export interface InviteModalProps { className?: string }

export function InviteModal({ className }: InviteModalProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Member')
  const [pending, setPending] = useState(PENDING)

  const invite = () => {
    if (!email.trim()) return
    setPending(p => [...p, { email: email.trim(), role }])
    setEmail('')
  }

  return (
    <div className={cn('flex flex-col gap-4 p-6', className)}>
      <div>
        <h2 className="text-base font-semibold">Invite People</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">Invite team members to collaborate.</p>
      </div>
      <div className="flex gap-2">
        <Input
          className="flex-1 h-9 text-sm"
          placeholder="colleague@company.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && invite()}
        />
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="h-9 w-28 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            {['Admin', 'Member', 'Viewer'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button size="sm" className="h-9" onClick={invite}>Send</Button>
      </div>
      {pending.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Pending invites</p>
          <div className="divide-y divide-[hsl(var(--border))] rounded-md border border-[hsl(var(--border))]">
            {pending.map((p, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2">
                <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{p.email.charAt(0).toUpperCase()}</AvatarFallback></Avatar>
                <span className="flex-1 text-sm truncate">{p.email}</span>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 shrink-0">{p.role}</Badge>
                <button onClick={() => setPending(ps => ps.filter((_, j) => j !== i))}>
                  <X className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
