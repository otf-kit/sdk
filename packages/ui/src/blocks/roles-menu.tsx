import React, { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../utils/cn'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../primitives/dropdown-menu'
import { Button } from '../primitives/button'

const ROLES = [
  { value: 'owner', label: 'Owner', description: 'Full control over the workspace' },
  { value: 'admin', label: 'Admin', description: 'Manage members and settings' },
  { value: 'member', label: 'Member', description: 'Can create and edit content' },
  { value: 'viewer', label: 'Viewer', description: 'Read-only access' },
]

export interface RolesMenuProps {
  value?: string
  onChange?: (role: string) => void
  className?: string
}

export function RolesMenu({ value = 'member', onChange, className }: RolesMenuProps) {
  const [role, setRole] = useState(value)
  const current = ROLES.find(r => r.value === role) ?? ROLES[0]!

  const handleChange = (v: string) => {
    setRole(v)
    onChange?.(v)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={cn('gap-1.5', className)}>
          {current.label}
          <ChevronDown className="h-3.5 w-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Change role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={role} onValueChange={handleChange}>
          {ROLES.map(r => (
            <DropdownMenuRadioItem key={r.value} value={r.value} className="items-start py-2.5">
              <div className="ml-1">
                <p className="text-sm font-medium leading-none">{r.label}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{r.description}</p>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
