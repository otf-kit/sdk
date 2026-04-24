'use client'

import React from 'react'
import { cn } from '../utils/cn'
import { useSidebar } from './Sidebar'

export interface BillingStatusProps {
  plan: string
  /** e.g. "3 of 5 seats" or "12 days left" */
  usage?: string
  /** 0-100 progress percentage */
  progress?: number
  onUpgrade?: () => void
  className?: string
}

export function BillingStatus({ plan, usage, progress, onUpgrade, className }: BillingStatusProps) {
  const { collapsed } = useSidebar()

  if (collapsed) return null

  return (
    <div
      data-slot="billing-status"
      className={cn(
        'rounded-md border border-border bg-card/50 p-2.5 mx-1',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {plan}
        </span>
        {onUpgrade && (
          <button
            type="button"
            onClick={onUpgrade}
            className={cn(
              'text-[10px] font-medium text-primary hover:text-primary/80',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm'
            )}
          >
            Upgrade
          </button>
        )}
      </div>
      {usage && (
        <p className="mt-1 text-xs text-muted-foreground leading-tight">{usage}</p>
      )}
      {typeof progress === 'number' && (
        <div className="mt-1.5 h-1 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300',
              progress >= 90 ? 'bg-destructive' : 'bg-primary'
            )}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  )
}
