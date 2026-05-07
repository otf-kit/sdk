import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../utils/cn'

interface StepDef { title: string; description?: string }

interface StepperStepProps extends StepDef {
  index: number
  current: number
  total: number
}

export function StepperStep({ index, current, total, title, description }: StepperStepProps) {
  const done = index < current
  const active = index === current
  const isLast = index === total - 1

  return (
    <div className="flex items-start gap-3 flex-1 min-w-0">
      <div className="flex flex-col items-center shrink-0">
        <div className={cn(
          'h-8 w-8 rounded-full flex items-center justify-center border-2 text-sm font-semibold transition-colors',
          done && 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
          active && 'border-[hsl(var(--primary))] text-[hsl(var(--primary))] bg-transparent',
          !done && !active && 'border-[hsl(var(--muted-foreground)/0.4)] text-[hsl(var(--muted-foreground))] bg-transparent',
        )}>
          {done ? <Check className="h-4 w-4" /> : index + 1}
        </div>
        {!isLast && <div className={cn('w-0.5 flex-1 min-h-[16px] mt-1', done ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--border))]')} />}
      </div>
      <div className="min-w-0 pb-4">
        <p className={cn('text-sm font-medium', active ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]')}>{title}</p>
        {description && <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{description}</p>}
      </div>
    </div>
  )
}

interface StepperProps {
  currentStep: number
  steps: StepDef[]
  className?: string
  /** 'horizontal' (default) | 'vertical' — vertical stacks steps as rows */
  direction?: 'horizontal' | 'vertical'
}

export function Stepper({ currentStep, steps, className, direction = 'horizontal' }: StepperProps) {
  if (direction === 'vertical' || (className && className.includes('flex-col'))) {
    return (
      <div className={cn('flex flex-col gap-0', className?.replace('flex-col', ''))}>
        {steps.map((step, i) => (
          <StepperStep key={i} {...step} index={i} current={currentStep} total={steps.length} />
        ))}
      </div>
    )
  }
  return (
    <div className={cn('flex gap-0', className)}>
      {steps.map((step, i) => (
        <div key={i} className={cn('flex items-start', i < steps.length - 1 && 'flex-1')}>
          <StepperStep {...step} index={i} current={currentStep} total={steps.length} />
          {i < steps.length - 1 && (
            <div className={cn('flex-1 h-0.5 mt-4 mx-2', i < currentStep ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--border))]')} />
          )}
        </div>
      ))}
    </div>
  )
}
