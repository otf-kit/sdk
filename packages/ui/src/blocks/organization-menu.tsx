import React, { useState } from 'react'
import { ChevronDown, Check, Plus } from 'lucide-react'
import { cn } from '../utils/cn'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../primitives/dropdown-menu'
import { useSidebar } from '../app-shell/Sidebar'

const ORGS = [
  { id: '1', name: 'Acme Corp', slug: 'acme', plan: 'Pro' },
  { id: '2', name: 'Beta Labs', slug: 'beta-labs', plan: 'Starter' },
  { id: '3', name: 'Gamma Inc', slug: 'gamma', plan: 'Free' },
]

export interface OrgMenuProps {
  /** Controlled mode — pass to manage selection externally. If omitted, the menu manages its own state. */
  currentOrgId?: string
  /** Default selection in uncontrolled mode. Defaults to the first org. */
  defaultOrgId?: string
  onSwitch?: (orgId: string) => void
  onCreateOrg?: () => void
  className?: string
}

export function OrgMenu({
  currentOrgId,
  defaultOrgId,
  onSwitch,
  onCreateOrg,
  className,
}: OrgMenuProps) {
  const [internalId, setInternalId] = useState(defaultOrgId ?? ORGS[0]?.id ?? '1')
  const activeId = currentOrgId ?? internalId
  const current = ORGS.find(o => o.id === activeId) ?? ORGS[0]!
  const { collapsed } = useSidebar()

  function handleSwitch(orgId: string) {
    if (currentOrgId === undefined) setInternalId(orgId)
    onSwitch?.(orgId)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex items-center rounded-md py-1.5 text-sm transition-colors hover:bg-[hsl(var(--accent))] focus:outline-none',
            collapsed ? 'justify-center px-0' : 'gap-2 px-2',
            className,
          )}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[hsl(var(--primary))] text-[10px] font-bold text-[hsl(var(--primary-foreground))] shrink-0">
            {current.name[0]}
          </div>
          {!collapsed && <span className="font-medium max-w-[120px] truncate">{current.name}</span>}
          {!collapsed && <ChevronDown className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ORGS.map(org => (
          <DropdownMenuItem key={org.id} onClick={() => handleSwitch(org.id)} className="justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-[hsl(var(--muted))] text-[10px] font-bold">
                {org.name[0]}
              </div>
              <span>{org.name}</span>
            </div>
            {org.id === activeId && <Check className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onCreateOrg}>
          <Plus className="h-4 w-4" />Create organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
