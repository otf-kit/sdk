import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { cn } from '../utils/cn'
import { Button } from '../primitives/button'

interface TourContextValue {
  currentStep: number
  totalSteps: number
  isActive: boolean
  start: () => void
  stop: () => void
  next: () => void
  prev: () => void
  goTo: (step: number) => void
}

const TourContext = createContext<TourContextValue | null>(null)

export function useTour(): TourContextValue {
  const ctx = useContext(TourContext)
  if (!ctx) throw new Error('useTour must be used within <Tour>')
  return ctx
}

export interface TourProps {
  totalSteps: number
  children: React.ReactNode
}

export function Tour({ totalSteps, children }: TourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const stop = useCallback(() => setIsActive(false), [])
  const start = useCallback(() => { setCurrentStep(0); setIsActive(true) }, [])
  const next = useCallback(() => setCurrentStep(s => Math.min(s + 1, totalSteps - 1)), [totalSteps])
  const prev = useCallback(() => setCurrentStep(s => Math.max(s - 1, 0)), [])
  const goTo = useCallback((step: number) => setCurrentStep(Math.max(0, Math.min(step, totalSteps - 1))), [totalSteps])

  useEffect(() => {
    if (!isActive) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') stop()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isActive, stop, next, prev])

  return (
    <TourContext.Provider value={{ currentStep, totalSteps, isActive, start, stop, next, prev, goTo }}>
      {children}
    </TourContext.Provider>
  )
}

const placementClasses: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

export interface TourStepProps {
  step: number
  title: string
  description: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactNode
}

export function TourStep({ step, title, description, placement = 'bottom', children }: TourStepProps) {
  const { currentStep, isActive, stop, next, prev, totalSteps } = useTour()
  const active = isActive && currentStep === step
  const isLast = step === totalSteps - 1

  return (
    <span className="relative inline-block">
      {active && (
        <span
          className="fixed inset-0 z-40 pointer-events-none"
          style={{ boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)' }}
        />
      )}
      <span className={cn('relative', active && 'z-50 ring-2 ring-[hsl(var(--primary))] ring-offset-2 rounded-md')}>
        {children}
      </span>
      {active && (
        <div className={cn('absolute z-50 w-64 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-lg', placementClasses[placement])}>
          <p className="font-semibold text-sm mb-1">{title}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">{description}</p>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{step + 1} / {totalSteps}</span>
            <div className="flex gap-1.5">
              {step > 0 && <Button size="sm" variant="outline" onClick={prev}>Back</Button>}
              {isLast
                ? <Button size="sm" onClick={stop}>Done</Button>
                : <Button size="sm" onClick={next}>Next</Button>
              }
            </div>
          </div>
        </div>
      )}
    </span>
  )
}
