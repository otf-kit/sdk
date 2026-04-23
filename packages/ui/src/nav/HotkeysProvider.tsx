'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

/* ── Types ───────────────────────────────────────────────────────── */

export interface HotkeyDef {
  /** Key combo: e.g. 'c', '?', '⌘k', 'g d', 'Escape' */
  key: string
  /** Human-readable label shown in help sheet */
  label: string
  handler: () => void
  group?: string
}

interface HotkeysContextValue {
  hotkeys: HotkeyDef[]
  registerHotkeys: (hotkeys: HotkeyDef[]) => () => void
}

const HotkeysCtx = createContext<HotkeysContextValue>({
  hotkeys: [],
  registerHotkeys: () => () => {},
})

/* ── Helpers ─────────────────────────────────────────────────────── */

function normalizeKey(key: string): string {
  return key.toLowerCase().replace('⌘', 'meta+')
}

function matchesEvent(pattern: string, e: KeyboardEvent): boolean {
  const parts = normalizeKey(pattern).split('+').map((p) => p.trim())

  const key = parts[parts.length - 1]
  const needsMeta = parts.includes('meta')
  const needsCtrl = parts.includes('ctrl')
  const needsShift = parts.includes('shift')
  const needsAlt = parts.includes('alt')

  const eKey = e.key.toLowerCase()

  return (
    eKey === key &&
    !!e.metaKey === needsMeta &&
    !!e.ctrlKey === needsCtrl &&
    !!e.shiftKey === needsShift &&
    !!e.altKey === needsAlt
  )
}

/* ── Sequence buffer for multi-key combos like "g d" ──────────────── */
const SEQUENCE_TIMEOUT = 1000

/* ── Provider ────────────────────────────────────────────────────── */

export function HotkeysProvider({
  children,
  hotkeys: initialHotkeys = [],
}: {
  children: React.ReactNode
  hotkeys?: HotkeyDef[]
}) {
  const [hotkeys, setHotkeys] = useState<HotkeyDef[]>(initialHotkeys)
  const seqRef = useRef<string[]>([])
  const seqTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const registerHotkeys = useCallback((newHotkeys: HotkeyDef[]) => {
    setHotkeys((prev) => [...prev, ...newHotkeys])
    return () => {
      setHotkeys((prev) => prev.filter((h) => !newHotkeys.includes(h)))
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip when typing in an input/textarea/select/contenteditable
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        return
      }

      const key = e.key.toLowerCase()

      // Extend sequence buffer
      seqRef.current = [...seqRef.current, key]

      // Clear buffer after timeout
      if (seqTimerRef.current) clearTimeout(seqTimerRef.current)
      seqTimerRef.current = setTimeout(() => {
        seqRef.current = []
      }, SEQUENCE_TIMEOUT)

      // Check all registered hotkeys
      for (const def of hotkeys) {
        const pattern = def.key.trim().toLowerCase()

        // Multi-key sequence (e.g. "g d")
        if (pattern.includes(' ')) {
          const seqParts = pattern.split(' ')
          const buf = seqRef.current
          if (
            buf.length >= seqParts.length &&
            seqParts.every((p, i) => buf[buf.length - seqParts.length + i] === p)
          ) {
            e.preventDefault()
            seqRef.current = []
            def.handler()
            return
          }
        } else if (matchesEvent(def.key, e)) {
          // Single-key or modifier combo
          // Don't match plain letters if meta/ctrl is held (those are system shortcuts)
          if ((e.metaKey || e.ctrlKey) && !def.key.includes('⌘') && !def.key.includes('meta') && !def.key.includes('ctrl')) {
            continue
          }
          e.preventDefault()
          seqRef.current = []
          def.handler()
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hotkeys])

  return (
    <HotkeysCtx.Provider value={{ hotkeys, registerHotkeys }}>
      {children}
    </HotkeysCtx.Provider>
  )
}

export function useHotkeys() {
  return useContext(HotkeysCtx)
}

/* ── HelpSheet ───────────────────────────────────────────────────── */

export function HelpSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { hotkeys } = useHotkeys()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  if (!open) return null

  // Group hotkeys
  const groups: Record<string, HotkeyDef[]> = {}
  for (const hk of hotkeys) {
    const g = hk.group ?? 'General'
    if (!groups[g]) groups[g] = []
    groups[g].push(hk)
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-popover p-6 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <kbd className="font-mono rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">esc</kbd>
          </button>
        </div>
        <div className="space-y-4">
          {Object.entries(groups).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{group}</p>
              <div className="space-y-1">
                {items.map((hk, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{hk.label}</span>
                    <kbd className="font-mono rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {hk.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
