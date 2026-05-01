'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '../utils/cn'
import { Button } from '../primitives/button'

// ── IntroDisclosure ──────────────────────────────────────────────────────────
// A first-run "welcome" modal. Multi-step carousel with progress dots, Skip /
// Back / Next, and a localStorage-backed "don't show again" key so it only
// fires once per user. Closes on Escape or backdrop click.
//
// Each step is { title, description, media } where `media` can be any node —
// image, illustration, animation, even a <video>.

export interface IntroStep {
  title: string
  description: string
  media?: React.ReactNode
}

export interface IntroDisclosureProps {
  /** The steps to walk through, in order. */
  steps: IntroStep[]
  /** Controlled open prop. If omitted, falls back to localStorage on mount. */
  open?: boolean
  /** Called when the user dismisses (skip / done / backdrop / escape). */
  onOpenChange?: (open: boolean) => void
  /** localStorage key. Once seen, the component stays closed for that key.
   *  Set to `undefined` to disable persistence (always opens). */
  storageKey?: string
  /** Optional extra label e.g. "What's new in 2.0". */
  eyebrow?: string
  /** Skip button label. Default "Skip". */
  skipLabel?: string
  /** Final-step CTA label. Default "Get started". */
  finishLabel?: string
}

export function IntroDisclosure({
  steps,
  open: controlledOpen,
  onOpenChange,
  storageKey = 'otf:intro-seen',
  eyebrow,
  skipLabel = 'Skip',
  finishLabel = 'Get started',
}: IntroDisclosureProps) {
  const isControlled = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = useState<boolean>(false)
  const [step, setStep] = useState(0)

  // Hydrate uncontrolled state from localStorage once on the client.
  useEffect(() => {
    if (isControlled) return
    if (typeof window === 'undefined') return
    if (!storageKey) {
      setInternalOpen(true)
      return
    }
    const seen = window.localStorage.getItem(storageKey)
    setInternalOpen(seen !== '1')
  }, [isControlled, storageKey])

  const isOpen = isControlled ? controlledOpen! : internalOpen
  const total = steps.length
  const isLast = step === total - 1

  const close = useCallback(() => {
    if (!isControlled) {
      setInternalOpen(false)
      if (storageKey && typeof window !== 'undefined') window.localStorage.setItem(storageKey, '1')
    }
    onOpenChange?.(false)
  }, [isControlled, onOpenChange, storageKey])

  const next = useCallback(() => {
    if (isLast) close()
    else setStep((s) => s + 1)
  }, [isLast, close])

  const prev = useCallback(() => setStep((s) => Math.max(0, s - 1)), [])

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close, next, prev])

  const current = useMemo(() => steps[Math.min(step, total - 1)], [steps, step, total])

  if (!isOpen || total === 0 || !current) return null

  return (
    <div
      data-slot="intro-disclosure"
      role="dialog"
      aria-modal="true"
      aria-labelledby="otf-intro-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={close}
      />

      {/* Card */}
      <div
        data-slot="intro-disclosure-card"
        className={cn(
          'relative w-full max-w-md overflow-hidden rounded-xl border shadow-2xl',
          'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]',
          'animate-in fade-in zoom-in-95 duration-200',
        )}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className={cn(
            'absolute right-3 top-3 z-10 grid h-7 w-7 place-items-center rounded-md',
            'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]',
            'transition-colors',
          )}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Media */}
        {current.media && (
          <div
            data-slot="intro-disclosure-media"
            className="relative aspect-[16/10] w-full overflow-hidden border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.5)]"
            key={`media-${step}`}
          >
            {current.media}
          </div>
        )}

        {/* Body */}
        <div data-slot="intro-disclosure-body" className="px-6 pt-6 pb-5" key={`body-${step}`}>
          {eyebrow && (
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--primary))] mb-2">
              {eyebrow}
            </p>
          )}
          <h2 id="otf-intro-title" className="text-xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
            {current.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
            {current.description}
          </p>
        </div>

        {/* Footer */}
        <div
          data-slot="intro-disclosure-footer"
          className="flex items-center justify-between gap-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)] px-6 py-3"
        >
          {/* Progress dots */}
          <div className="flex items-center gap-1.5" aria-hidden>
            {steps.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === step
                    ? 'w-6 bg-[hsl(var(--primary))]'
                    : i < step
                      ? 'w-1.5 bg-[hsl(var(--primary)/0.5)]'
                      : 'w-1.5 bg-[hsl(var(--border))]',
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {step === 0 ? (
              <Button variant="ghost" size="sm" onClick={close}>
                {skipLabel}
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={prev} aria-label="Previous step">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            )}
            <Button size="sm" onClick={next}>
              {isLast ? finishLabel : (
                <>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

IntroDisclosure.displayName = 'IntroDisclosure'
