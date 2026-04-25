'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-[#1f1f1f]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 font-bold text-white text-2xl tracking-tight">
          <Image src="/logo.svg" alt="OTF Logo" width={40} height={40} className="drop-shadow-sm" />
          OTF
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a href="/components" className="text-[#737373] hover:text-white transition-colors text-sm">
            Components
          </a>
          <a href="/templates" className="text-[#737373] hover:text-white transition-colors text-sm">
            Templates
          </a>
          <a href="/pricing" className="text-[#737373] hover:text-white transition-colors text-sm">
            Pricing
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#737373] hover:text-white transition-colors px-3 py-1.5 border border-[#1f1f1f] rounded-md"
          >
            GitHub
          </a>
          <a
            href="#waitlist"
            className="text-sm text-white font-medium px-3 py-1.5 bg-[#f97316] hover:bg-[#fb923c] rounded-md transition-colors"
          >
            Get started →
          </a>
        </div>

        <button
          className="md:hidden text-[#737373] hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#1f1f1f] bg-[#0a0a0a] px-6 py-4 flex flex-col gap-4">
          <a href="/components" className="text-[#737373] hover:text-white transition-colors text-sm" onClick={() => setMenuOpen(false)}>
            Components
          </a>
          <a href="/templates" className="text-[#737373] hover:text-white transition-colors text-sm" onClick={() => setMenuOpen(false)}>
            Templates
          </a>
          <a href="/pricing" className="text-[#737373] hover:text-white transition-colors text-sm" onClick={() => setMenuOpen(false)}>
            Pricing
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#737373] hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            GitHub
          </a>
          <a
            href="#waitlist"
            className="text-sm text-white font-medium px-4 py-2 bg-[#f97316] hover:bg-[#fb923c] rounded-md transition-colors text-center"
            onClick={() => setMenuOpen(false)}
          >
            Get started →
          </a>
        </div>
      )}
    </header>
  )
}
