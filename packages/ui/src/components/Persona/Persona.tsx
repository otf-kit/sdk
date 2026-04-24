import React from 'react'
import { cn } from '../utils/cn'
import { Avatar, AvatarFallback, AvatarImage } from '../primitives/avatar'

const sizeMap = {
  sm: { avatar: 'h-7 w-7', name: 'text-sm', subtitle: 'text-xs' },
  md: { avatar: 'h-9 w-9', name: 'text-sm font-medium', subtitle: 'text-xs' },
  lg: { avatar: 'h-12 w-12', name: 'text-base font-medium', subtitle: 'text-sm' },
}

interface PersonaProps {
  name: string
  subtitle?: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  badge?: React.ReactNode
  className?: string
}

export function Persona({ name, subtitle, src, size = 'md', badge, className }: PersonaProps) {
  const s = sizeMap[size]
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative shrink-0">
        <Avatar className={s.avatar}>
          {src && <AvatarImage src={src} alt={name} />}
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        {badge && <div className="absolute -bottom-0.5 -right-0.5">{badge}</div>}
      </div>
      <div className="min-w-0">
        <p className={cn('truncate text-[hsl(var(--foreground))]', s.name)}>{name}</p>
        {subtitle && <p className={cn('truncate text-[hsl(var(--muted-foreground))]', s.subtitle)}>{subtitle}</p>}
      </div>
    </div>
  )
}
