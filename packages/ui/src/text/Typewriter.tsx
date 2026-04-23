'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '../utils/cn'

export interface TypewriterProps {
  /** Array of strings to cycle through */
  words: string[]
  /** Typing speed in ms per character (default 60) */
  typeSpeed?: number
  /** Deleting speed in ms per character (default 30) */
  deleteSpeed?: number
  /** Pause after finishing a word in ms (default 1800) */
  pauseAfter?: number
  /** Whether to loop (default true) */
  loop?: boolean
  /** Show cursor (default true) */
  cursor?: boolean
  /** Custom cursor character (default '|') */
  cursorChar?: string
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3'
  className?: string
  style?: React.CSSProperties
}

type Phase = 'typing' | 'pausing' | 'deleting'

export function Typewriter({
  words,
  typeSpeed = 60,
  deleteSpeed = 30,
  pauseAfter = 1800,
  loop = true,
  cursor = true,
  cursorChar = '|',
  as: Tag = 'span',
  className,
  style,
}: TypewriterProps) {
  const [display, setDisplay] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')
  const [wordIdx, setWordIdx] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cursor internal
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  // Typing machine
  useEffect(() => {
    if (!words.length) return undefined
    const word = words[wordIdx] ?? ''

    if (phase === 'typing') {
      if (display.length < word.length) {
        timerRef.current = setTimeout(
          () => setDisplay(word.slice(0, display.length + 1)),
          typeSpeed
        )
      } else {
        timerRef.current = setTimeout(() => setPhase('pausing'), pauseAfter)
      }
    } else if (phase === 'pausing') {
      setPhase('deleting')
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        timerRef.current = setTimeout(
          () => setDisplay(display.slice(0, -1)),
          deleteSpeed
        )
      } else {
        const nextIdx = (wordIdx + 1) % words.length
        if (!loop && nextIdx === 0) return undefined
        setWordIdx(nextIdx)
        setPhase('typing')
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [display, phase, wordIdx, words, typeSpeed, deleteSpeed, pauseAfter, loop])

  return React.createElement(
    Tag,
    {
      'data-slot': 'typewriter',
      className: cn('inline', className),
      'aria-label': words[wordIdx],
      style,
    },
    <span aria-hidden="true">{display}</span>,
    cursor && (
      <span
        aria-hidden="true"
        className="inline-block w-[1px] ml-[1px] align-middle"
        style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}
      >
        {cursorChar}
      </span>
    )
  )
}
Typewriter.displayName = 'Typewriter'
