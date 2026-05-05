import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'otf-storybook-onboarded-v1'

type Step = { title: string; body: string; hint?: string }

const STEPS: Step[] = [
  {
    title: 'Welcome to OTF Storybook',
    body: 'Every component in @otfdashkit/ui rendered in isolation. Browse the sidebar to explore primitives, blocks, layouts, charts, and more.',
    hint: 'Tip: the sidebar has a ⌘K / Ctrl-K search.',
  },
  {
    title: 'Zoom in / out',
    body: 'Use the magnifier icons in the top-left toolbar to zoom the preview. Useful for inspecting motion + spacing up close.',
    hint: 'Keyboard: + / - also work inside the preview iframe.',
  },
  {
    title: 'Switch themes',
    body: 'The 🎨 paintbrush in the top-right toolbar flips between Minimal Dark (default), Linear, Glass, Midnight, and Minimal Light.',
  },
  {
    title: 'Compare all themes at once',
    body: 'The 🎭 mask icon in the toolbar toggles “All themes” mode — renders the current story once in every theme side-by-side so you can spot regressions.',
  },
  {
    title: 'Re-open this guide anytime',
    body: 'The “?” floating button in the bottom-right corner replays this onboarding whenever you need a refresher.',
  },
]

export function Onboarding() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true)
    } catch {}
  }, [])

  const close = () => {
    setOpen(false)
    setStep(0)
    try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
  }

  const replay = () => {
    setStep(0)
    setOpen(true)
  }

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  return (
    <>
      {/* Floating replay button — always mounted */}
      <button
        aria-label="Show onboarding guide"
        onClick={replay}
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          border: 'none',
          cursor: 'pointer',
          fontSize: 18,
          fontWeight: 600,
          lineHeight: 1,
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          zIndex: 9998,
        }}
      >
        ?
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            zIndex: 9999,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <div
            style={{
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
              borderRadius: 12,
              border: '1px solid hsl(var(--border))',
              maxWidth: 440,
              width: '100%',
              padding: 24,
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 3,
                    flex: 1,
                    borderRadius: 2,
                    background: i <= step ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                    transition: 'background 200ms',
                  }}
                />
              ))}
            </div>

            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{current.title}</h2>
            <p style={{ marginTop: 10, marginBottom: 0, fontSize: 14, lineHeight: 1.55, color: 'hsl(var(--muted-foreground))' }}>
              {current.body}
            </p>
            {current.hint && (
              <p style={{ marginTop: 10, fontSize: 12, color: 'hsl(var(--muted-foreground))', opacity: 0.8 }}>
                {current.hint}
              </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
              <button
                onClick={close}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'hsl(var(--muted-foreground))',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                Skip
              </button>
              <div style={{ display: 'flex', gap: 8 }}>
                {step > 0 && (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 6,
                      border: '1px solid hsl(var(--border))',
                      background: 'transparent',
                      color: 'hsl(var(--foreground))',
                      cursor: 'pointer',
                      fontSize: 13,
                    }}
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => (isLast ? close() : setStep(s => s + 1))}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 6,
                    border: 'none',
                    background: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {isLast ? 'Got it' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
