import React from 'react'
import { ChevronDown, User, Settings, CreditCard, LogOut } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Avatar, AvatarFallback } from '../../primitives/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../primitives/dropdown-menu'

export interface UserMenuProps {
  name?: string
  email?: string
  initials?: string
  onProfile?: () => void
  onSettings?: () => void
  onBilling?: () => void
  onSignOut?: () => void
  className?: string
}

export function UserMenu({
  name = 'Jane Doe',
  email = 'jane@acme.com',
  initials = 'JD',
  onProfile,
  onSettings,
  onBilling,
  onSignOut,
  className,
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-[hsl(var(--accent))] focus:outline-none', className)}>
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <span className="font-medium max-w-[120px] truncate">{name}</span>
          <ChevronDown className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onProfile}><User className="h-4 w-4" />Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={onSettings}><Settings className="h-4 w-4" />Account Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={onBilling}><CreditCard className="h-4 w-4" />Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="text-[hsl(var(--destructive))] focus:text-[hsl(var(--destructive))]">
          <LogOut className="h-4 w-4" />Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
