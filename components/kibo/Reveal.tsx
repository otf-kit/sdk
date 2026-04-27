'use client'

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

type RevealProps = {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  distance?: number
  className?: string
  as?: keyof React.JSX.IntrinsicElements
  once?: boolean
  threshold?: number
}

const offset = (dir: Direction, d: number) => {
  switch (dir) {
    case 'up':    return `translate3d(0, ${d}px, 0)`
    case 'down':  return `translate3d(0, -${d}px, 0)`
    case 'left':  return `translate3d(${d}px, 0, 0)`
    case 'right': return `translate3d(-${d}px, 0, 0)`
    default:      return 'translate3d(0,0,0)'
  }
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  distance = 24,
  className,
  as: Tag = 'div',
  once = true,
  threshold = 0.12,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setShown(false)
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [once, threshold])

  const style: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? 'translate3d(0,0,0)' : offset(direction, distance),
    filter: shown ? 'blur(0)' : 'blur(6px)',
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms ease ${delay}ms`,
    willChange: 'opacity, transform, filter',
  }

  return (
    // @ts-expect-error — polymorphic tag
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}
