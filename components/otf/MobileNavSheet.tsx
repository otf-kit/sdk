'use client'

import { useEffect, useState } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import { GithubIcon as Github } from './icons'
import { componentLinks, blockLinks, patternLinks, docsLinks } from '@/data/kibo-links'

type Props = { open: boolean; onClose: () => void }

const tabs = [
  { id: 'docs',       label: 'Docs',       items: docsLinks },
  { id: 'components', label: 'Components', items: componentLinks },
  { id: 'blocks',     label: 'Blocks',     items: blockLinks },
  { id: 'patterns',   label: 'Patterns',   items: patternLinks },
] as const

export function MobileNavSheet({ open, onClose }: Props) {
  const [tab, setTab] = useState<typeof tabs[number]['id']>('components')

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const active = tabs.find((t) => t.id === tab)!

  return (
    <div className="fixed inset-0 z-[90] md:hidden">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} style={{ animation: 'fadeIn 0.2s ease-out' }} aria-hidden />
      <div role="dialog" aria-modal="true" className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl border-t border-border bg-card shadow-2xl" style={{ animation: 'sheetUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <a href="/" onClick={onClose} className="flex items-center gap-2 font-mono text-sm font-semibold">
            <img src="/logo.svg" alt="OTF" className="h-6 w-6" />
            OTF
          </a>
          <button onClick={onClose} aria-label="Close menu" className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-border px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => {
            const isActive = t.id === tab
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${isActive ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'}`}>
                {t.label}
                <span className={`ml-1.5 font-mono text-[10px] ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground/60'}`}>{t.items.length}</span>
              </button>
            )
          })}
        </div>

        <div key={active.id} className="flex-1 overflow-y-auto px-2 py-2 [scrollbar-width:thin]" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          {active.items.map((item) => (
            <a key={item.href} href={item.href} onClick={onClose}
              className="group flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-foreground/85 transition-colors hover:bg-secondary">
              <span>{item.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/0 transition-all group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
            </a>
          ))}
        </div>

        <div className="flex gap-2 border-t border-border bg-secondary/30 p-3">
          <a href="https://github.com/open-template-forest" target="_blank" rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2.5 text-sm font-medium">
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a href="/templates" onClick={onClose}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground">
            Get started
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes sheetUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
