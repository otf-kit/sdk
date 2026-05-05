'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '../utils/cn'

export interface TextRevealProps {
  /** The text to reveal */
  text: string
  /** Reveal mode */
  mode?: 'words' | 'chars' | 'lines'
  /** Delay between each word/char in ms (default 50) */
  stagger?: number
  /** Individual item animation duration in ms (default 500) */
  duration?: number
  /** Whether to start on intersection (default true) */
  autoStart?: boolean
  /** Base animation delay before first unit starts (ms) */
  delay?: number
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  style?: React.CSSProperties
}

export function TextReveal({
  text,
  mode = 'words',
  stagger = 50,
  duration = 500,
  autoStart = true,
  delay = 0,
  as: Tag = 'span',
  className,
  style,
}: TextRevealProps) {
  const [revealed, setRevealed] = useState(false)
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!autoStart) return undefined

    const el = containerRef.current
    if (!el) return undefined

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setTimeout(() => setRevealed(true), delay)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    } else {
      setTimeout(() => setRevealed(true), delay)
      return undefined
    }
  }, [autoStart, delay])

  const units =
    mode === 'chars'
      ? text.split('')
      : mode === 'words'
        ? text.split(' ')
        : [text]

  return React.createElement(
    Tag,
    {
      ref: containerRef,
      'data-slot': 'text-reveal',
      className: cn('inline', className),
      'aria-label': text,
      style,
    },
    units.map((unit, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span
          aria-hidden="true"
          className="inline-block"
          style={{
            transform: revealed ? 'translateY(0)' : 'translateY(110%)',
            opacity: revealed ? 1 : 0,
            transition: `transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${i * stagger}ms, opacity ${Math.round(duration * 0.6)}ms ease ${i * stagger}ms`,
          }}
        >
          {unit}
          {mode === 'words' && i < units.length - 1 ? '\u00a0' : ''}
        </span>
      </span>
    ))
  )
}
TextReveal.displayName = 'TextReveal'
