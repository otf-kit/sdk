import React, { createContext, useContext, useState } from 'react'
import { Button } from '../primitives/button'
import { cn } from '../utils/cn'

interface StepFormContextValue {
  currentStep: number
  totalSteps: number
  steps: string[]
  next: () => void
  prev: () => void
  isFirst: boolean
  isLast: boolean
}

const StepFormContext = createContext<StepFormContextValue | null>(null)

function useStepForm() {
  const ctx = useContext(StepFormContext)
  if (!ctx) throw new Error('useStepForm must be used within StepForm')
  return ctx
}

export interface StepFormProps {
  steps: string[]
  onSubmit: () => void
  children: React.ReactNode
  className?: string
}

export function StepForm({ steps, onSubmit, children, className }: StepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = steps.length

  const ctx: StepFormContextValue = {
    currentStep,
    totalSteps,
    steps,
    next: () => setCurrentStep(s => Math.min(s + 1, totalSteps - 1)),
    prev: () => setCurrentStep(s => Math.max(s - 1, 0)),
    isFirst: currentStep === 0,
    isLast: currentStep === totalSteps - 1,
  }

  const childArray = React.Children.toArray(children)
  const currentChild = childArray[currentStep]

  return (
    <StepFormContext.Provider value={ctx}>
      <div className={cn('flex flex-col gap-6', className)}>
        <StepIndicator steps={steps} currentStep={currentStep} />
        <div>{currentChild}</div>
        <StepFormNavigation onSubmit={onSubmit} />
      </div>
    </StepFormContext.Provider>
  )
}

function StepIndicator({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((label, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div className={cn('h-px flex-1 bg-[hsl(var(--border))]', i <= currentStep && 'bg-[hsl(var(--primary))]')} />}
          <div className="flex flex-col items-center gap-1">
            <div className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium border transition-colors',
              i < currentStep && 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
              i === currentStep && 'border-[hsl(var(--primary))] text-[hsl(var(--primary))]',
              i > currentStep && 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]'
            )}>{i + 1}</div>
            <span className="hidden text-[10px] text-[hsl(var(--muted-foreground))] sm:block">{label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export interface StepFormStepProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function StepFormStep({ title, description, children }: StepFormStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">{title}</h3>
        {description && <p className="text-sm text-[hsl(var(--muted-foreground))]">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export interface StepFormNavigationProps {
  onSubmit?: () => void
  submitLabel?: string
}

export function StepFormNavigation({ onSubmit, submitLabel = 'Submit' }: StepFormNavigationProps) {
  const { prev, next, isFirst, isLast } = useStepForm()
  return (
    <div className="flex justify-between">
      <Button type="button" variant="outline" onClick={prev} disabled={isFirst}>Previous</Button>
      {isLast
        ? <Button type="button" onClick={onSubmit}>{submitLabel}</Button>
        : <Button type="button" onClick={next}>Next</Button>
      }
    </div>
  )
}
