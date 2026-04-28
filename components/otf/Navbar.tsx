'use client'

import { Menu, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { GithubIcon as Github } from './icons'
import { CommandPalette } from './CommandPalette'
import { MobileNavSheet } from './MobileNavSheet'

const navLinks = [
  { label: 'Components', href: '/components' },
  { label: 'Templates',  href: '/templates', badge: '2 NEW' },
  { label: 'Pricing',    href: '/pricing' },
]

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target    = e.target as HTMLElement | null
      const isTyping  = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((v) => !v)
      } else if (e.key === '/' && !isTyping && !searchOpen) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen])

  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)

  return (
    <>
      {/* Promo bar */}
      <div className="bg-card border-b border-border flex items-center justify-center py-2 px-4 relative z-[60]">
        <a href="/templates" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-primary/15 text-primary text-[10px] font-black px-2 py-0.5 rounded-sm tracking-wider uppercase">NEW</span>
          <span className="text-foreground font-semibold">SaaS Dashboard Kit</span>
          <span className="hidden sm:inline text-muted-foreground/60">·</span>
          <span className="hidden sm:inline">Pre-loaded into Cursor, Claude, Lovable + every AI tool →</span>
          <span className="inline sm:hidden">AI-ready from day one →</span>
        </a>
      </div>

      <header
        className={`sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ${
          scrolled
            ? 'border-b border-border/80 bg-background/85 backdrop-blur-xl shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]'
            : 'border-b border-border/40 bg-background/60 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
              <img src="/logo.svg" alt="OTF" className="h-6 w-6" />
              <span>OTF</span>
            </a>
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href}
                  className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  {l.label}
                  {l.badge && (
                    <span className="text-[9px] bg-primary/15 text-primary px-1.5 py-0.5 rounded-sm font-black tracking-wider uppercase">{l.badge}</span>
                  )}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)} aria-label="Search components"
              className="group hidden h-9 items-center gap-2 rounded-md border border-border bg-secondary/40 pl-2.5 pr-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:flex md:w-56 lg:w-64">
              <Search className="h-4 w-4" />
              <span className="flex-1 text-left">Search…</span>
              <kbd className="flex h-5 items-center gap-0.5 rounded border border-border bg-background/60 px-1 font-mono text-[10px]">
                {isMac ? '⌘' : 'Ctrl'}<span>K</span>
              </kbd>
            </button>
            <button onClick={() => setSearchOpen(true)} aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:hidden">
              <Search className="h-4 w-4" />
            </button>

            <a href="https://github.com/open-template-forest" target="_blank" rel="noreferrer"
              className="hidden items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary md:flex">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>

            <a href="/templates"
              className="hidden items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 md:flex">
              Get started
            </a>

            <button className="flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
              onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileNavSheet open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
