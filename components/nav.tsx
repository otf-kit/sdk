'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Promo banner — premium pattern */}
      <div className="bg-[#111111] border-b border-[#1f1f1f] flex items-center justify-center py-2 px-4 relative z-[60]">
        <a href="/templates" className="text-xs font-medium text-[#a3a3a3] hover:text-white transition-colors flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#f97316]/15 text-[#f97316] text-[10px] font-black px-2 py-0.5 rounded-sm tracking-wider uppercase">NEW</span>
          <span className="text-white font-semibold">SaaS Dashboard Kit</span>
          <span className="hidden sm:inline text-[#525252]">·</span>
          <span className="hidden sm:inline">Full-stack starter with auth, payments, and AI configs pre-wired →</span>
          <span className="inline sm:hidden">Ship in days →</span>
        </a>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-[#0a0a0a]/90 border-b border-[#1f1f1f]' : 'bg-[#0a0a0a] border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-black text-white text-lg tracking-tight shrink-0">
            <div className="w-7 h-7 rounded-md bg-[#f97316] flex items-center justify-center">
              <span className="text-white text-xs font-black leading-none">O</span>
            </div>
            <span>OTF</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '/components', label: 'Components' },
              { href: '/templates', label: 'Templates', badge: '2 NEW' },
              { href: '/pricing', label: 'Pricing' },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[#737373] hover:text-white transition-colors text-sm font-medium rounded-md hover:bg-[#111111]">
                {item.label}
                {item.badge && (
                  <span className="text-[9px] bg-[#f97316]/15 text-[#f97316] px-1.5 py-0.5 rounded-sm font-black tracking-wider uppercase">{item.badge}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://github.com/open-template-forest" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#737373] hover:text-white transition-colors text-sm px-3 py-1.5 rounded-md hover:bg-[#111111]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span className="font-mono text-xs">1.2k</span>
            </a>
            <Link href="/templates"
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#f97316] hover:bg-[#fb923c] text-white text-sm font-bold rounded-md transition-colors">
              Get started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-[#737373] hover:text-white transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4l12 12M16 4L4 16"/>
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h14M3 10h14M3 14h14"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#1f1f1f] bg-[#0a0a0a] px-6 py-4 flex flex-col gap-1">
            {[
              { href: '/components', label: 'Components' },
              { href: '/templates', label: 'Templates' },
              { href: '/pricing', label: 'Pricing' },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className="text-[#737373] hover:text-white transition-colors text-sm py-2.5 px-2 rounded-md hover:bg-[#111111]"
                onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="pt-2 mt-1 border-t border-[#1f1f1f]">
              <Link href="/templates"
                className="block text-sm text-white font-bold px-4 py-2.5 bg-[#f97316] hover:bg-[#fb923c] rounded-md transition-colors text-center"
                onClick={() => setMenuOpen(false)}>
                Get started →
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
