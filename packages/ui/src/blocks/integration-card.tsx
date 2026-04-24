import React, { useState } from 'react'
import { cn } from '../utils/cn'
import { Badge } from '../primitives/badge'
import { Button } from '../primitives/button'

export interface IntegrationCardProps {
  icon?: React.ReactNode
  name?: string
  description?: string
  connected?: boolean
  className?: string
}

export function IntegrationCard({
  icon,
  name = 'Slack',
  description = 'Send notifications and updates to your Slack workspace.',
  connected = false,
  className,
}: IntegrationCardProps) {
  const [isConnected, setIsConnected] = useState(connected)

  return (
    <div className={cn('flex items-center gap-4 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4', className)}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
        {icon ?? <span className="text-base font-bold">{name[0]}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{name}</p>
          <Badge
            variant={isConnected ? 'default' : 'outline'}
            className="text-[10px] px-1.5 py-0.5 shrink-0"
          >
            {isConnected ? 'Connected' : 'Not connected'}
          </Badge>
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 truncate">{description}</p>
      </div>
      <Button
        size="sm"
        variant={isConnected ? 'outline' : 'default'}
        className="shrink-0"
        onClick={() => setIsConnected(v => !v)}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </Button>
    </div>
  )
}
