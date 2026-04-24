import React from 'react'
import { cn } from '../utils/cn'
import { Avatar, AvatarFallback } from '../primitives/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '../primitives/card'

interface Message {
  id: string
  name: string
  initials: string
  preview: string
  time: string
  unread?: boolean
}

const MESSAGES: Message[] = [
  { id: '1', name: 'Alice Chen', initials: 'AC', preview: 'Just pushed the new design files to Figma.', time: '9:41 AM', unread: true },
  { id: '2', name: 'Bob Smith', initials: 'BS', preview: "I'll take a look and share feedback by EOD.", time: '9:43 AM', unread: true },
  { id: '3', name: 'Tom Ray', initials: 'TR', preview: 'Can we reschedule the standup to 10am?', time: 'Yesterday' },
  { id: '4', name: 'Sara Kim', initials: 'SK', preview: 'Shipped the new auth flow. Ready for QA.', time: 'Yesterday' },
  { id: '5', name: 'Mike Liu', initials: 'ML', preview: 'The latest metrics look promising 📈', time: 'Mon' },
]

function MessageRow({ msg }: { msg: Message }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-[hsl(var(--accent))] cursor-pointer transition-colors">
      <div className="relative shrink-0">
        <Avatar className="h-9 w-9"><AvatarFallback className="text-xs">{msg.initials}</AvatarFallback></Avatar>
        {msg.unread && <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[hsl(var(--primary))] ring-2 ring-[hsl(var(--card))]" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className={cn('text-sm truncate', msg.unread ? 'font-semibold' : 'font-medium')}>{msg.name}</p>
          <span className="text-xs text-[hsl(var(--muted-foreground))] shrink-0">{msg.time}</span>
        </div>
        <p className={cn('text-xs mt-0.5 truncate', msg.unread ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]')}>
          {msg.preview}
        </p>
      </div>
    </div>
  )
}

export interface MessagesCardProps { className?: string }

export function MessagesCard({ className }: MessagesCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="px-4 py-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold flex items-center justify-between">
          Messages
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] font-medium">2 new</span>
        </CardTitle>
      </CardHeader>
      <div className="divide-y divide-[hsl(var(--border))]">
        {MESSAGES.map(m => <MessageRow key={m.id} msg={m} />)}
      </div>
    </Card>
  )
}
