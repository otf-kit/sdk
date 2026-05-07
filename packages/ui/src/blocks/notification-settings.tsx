import React, { useState } from 'react'
import { cn } from '../utils/cn'
import { Switch } from '../primitives/switch'
import { Separator } from '../primitives/separator'

const NOTIFICATIONS = [
  { id: 'comments', label: 'Comments', description: 'Get notified when someone comments on your post', default: true },
  { id: 'mentions', label: 'Mentions', description: 'Get notified when you are mentioned', default: true },
  { id: 'followers', label: 'New followers', description: 'Get notified when someone follows you', default: false },
  { id: 'updates', label: 'Product updates', description: 'Receive emails about new features and improvements', default: true },
  { id: 'digest', label: 'Weekly digest', description: 'A summary of activity from the past week', default: false },
  { id: 'security', label: 'Security alerts', description: 'Important alerts about your account security', default: true },
]

interface NotifRow {
  id: string
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function NotifRow({ label, description, checked, onChange }: NotifRow) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}

export interface NotificationSettingsProps { className?: string }

export function NotificationSettings({ className }: NotificationSettingsProps) {
  const [states, setStates] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATIONS.map(n => [n.id, n.default]))
  )

  return (
    <div className={cn('rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6', className)}>
      <div className="mb-4">
        <h2 className="text-base font-semibold">Email Notifications</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">Choose what you want to be notified about.</p>
      </div>
      <Separator />
      <div className="divide-y divide-[hsl(var(--border))]">
        {NOTIFICATIONS.map(n => (
          <NotifRow
            key={n.id}
            {...n}
            checked={states[n.id] ?? false}
            onChange={val => setStates(s => ({ ...s, [n.id]: val }))}
          />
        ))}
      </div>
    </div>
  )
}
