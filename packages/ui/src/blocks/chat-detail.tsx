import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { cn } from '../utils/cn'
import { Avatar, AvatarFallback } from '../primitives/avatar'
import { Input } from '../primitives/input'
import { Button } from '../primitives/button'

interface Message { id: string; author: string; initials: string; text: string; time: string; self?: boolean }

const INITIAL_MESSAGES: Message[] = [
  { id: '1', author: 'Alice Chen', initials: 'AC', text: 'Hey team, just pushed the new design files to Figma.', time: '9:41 AM' },
  { id: '2', author: 'Bob Smith', initials: 'BS', text: "Awesome! I'll take a look and share feedback by EOD.", time: '9:43 AM' },
  { id: '3', author: 'You', initials: 'JD', text: 'Looks great, the new color palette really pops!', time: '9:45 AM', self: true },
  { id: '4', author: 'Alice Chen', initials: 'AC', text: "Thanks! Let's sync tomorrow to go through the comments.", time: '9:47 AM' },
]

function ChatBubble({ msg }: { msg: Message }) {
  return (
    <div className={cn('flex gap-2.5', msg.self && 'flex-row-reverse')}>
      <Avatar className="h-7 w-7 shrink-0 mt-0.5">
        <AvatarFallback className="text-xs">{msg.initials}</AvatarFallback>
      </Avatar>
      <div className={cn('max-w-[70%]', msg.self && 'items-end flex flex-col')}>
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-xs font-medium">{msg.author}</span>
          <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{msg.time}</span>
        </div>
        <div className={cn(
          'rounded-md px-3 py-2 text-sm',
          msg.self
            ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
            : 'bg-[hsl(var(--muted))]'
        )}>
          {msg.text}
        </div>
      </div>
    </div>
  )
}

export interface ChatDetailProps { className?: string }

export function ChatDetail({ className }: ChatDetailProps) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(m => [...m, { id: `${Date.now()}`, author: 'You', initials: 'JD', text: input.trim(), time: now, self: true }])
    setInput('')
  }

  return (
    <div className={cn('flex h-[480px] flex-col overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))]', className)}>
      <header className="flex items-center gap-3 border-b border-[hsl(var(--border))] px-4 py-3">
        <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">AC</AvatarFallback></Avatar>
        <div>
          <p className="text-sm font-semibold">Design Team</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">4 members</p>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map(m => <ChatBubble key={m.id} msg={m} />)}
      </div>
      <div className="flex items-center gap-2 border-t border-[hsl(var(--border))] p-3">
        <Input className="flex-1 h-9 text-sm" placeholder="Type a message..." value={input}
          onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
        <Button size="icon" className="h-9 w-9 shrink-0" onClick={send}><Send className="h-4 w-4" /></Button>
      </div>
    </div>
  )
}
