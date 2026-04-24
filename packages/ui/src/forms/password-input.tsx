import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input, type InputProps } from '../primitives/input'
import { cn } from '../utils/cn'

export interface PasswordInputProps extends InputProps {
  strength?: boolean
}

function getStrength(value: string): { level: 'weak' | 'medium' | 'strong'; width: string; color: string } {
  const has = (re: RegExp) => re.test(value)
  const score = [value.length >= 8, has(/[A-Z]/), has(/[0-9]/), has(/[^A-Za-z0-9]/)].filter(Boolean).length
  if (score <= 1) return { level: 'weak', width: 'w-1/3', color: 'bg-[hsl(var(--destructive))]' }
  if (score <= 3) return { level: 'medium', width: 'w-2/3', color: 'bg-yellow-500' }
  return { level: 'strong', width: 'w-full', color: 'bg-green-500' }
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, strength, ...props }, ref) => {
    const [show, setShow] = useState(false)
    const value = String(props.value ?? '')
    const str = getStrength(value)

    return (
      <div className="flex flex-col gap-1.5">
        <div className="relative">
          <Input
            ref={ref}
            type={show ? 'text' : 'password'}
            className={cn('pr-9', className)}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
            tabIndex={-1}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {strength && value.length > 0 && (
          <div className="space-y-1">
            <div className="h-1 w-full rounded-full bg-[hsl(var(--muted))]">
              <div className={cn('h-full rounded-full transition-all', str.width, str.color)} />
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] capitalize">{str.level}</p>
          </div>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'
