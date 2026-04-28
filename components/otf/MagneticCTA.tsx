'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'

type Props = {
  href: string
  children: React.ReactNode
  pill?: boolean
}

export function MagneticCTA({ href, children, pill = false }: Props) {
  const wrapRef  = useRef<HTMLAnchorElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)
  const haloRef  = useRef<HTMLSpanElement>(null)
  const sheenRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrap  = wrapRef.current
    const inner = innerRef.current
    const arrow = arrowRef.current
    const halo  = haloRef.current
    if (!wrap || !inner || !arrow || !halo) return

    const ctx = gsap.context(() => {
      const wrapX   = gsap.quickTo(wrap,  'x', { duration: 0.55, ease: 'elastic.out(1, 0.6)' })
      const wrapY   = gsap.quickTo(wrap,  'y', { duration: 0.55, ease: 'elastic.out(1, 0.6)' })
      const innerX  = gsap.quickTo(inner, 'x',        { duration: 0.5,  ease: 'power3.out' })
      const innerY  = gsap.quickTo(inner, 'y',        { duration: 0.5,  ease: 'power3.out' })
      const haloX   = gsap.quickTo(halo,  'x',        { duration: 0.35, ease: 'power3.out' })
      const haloY   = gsap.quickTo(halo,  'y',        { duration: 0.35, ease: 'power3.out' })
      const arrowX  = gsap.quickTo(arrow, 'x',        { duration: 0.5,  ease: 'power3.out' })

      const onMove = (e: MouseEvent) => {
        const r  = wrap.getBoundingClientRect()
        const cx = r.left + r.width  / 2
        const cy = r.top  + r.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy

        wrapX(dx * 0.28);  wrapY(dy * 0.45)
        innerX(-dx * 0.08); innerY(-dy * 0.12)
        haloX(e.clientX - r.left); haloY(e.clientY - r.top)
        arrowX(Math.max(-3, Math.min(8, dx * 0.06)))
      }

      const onEnter = () => {
        gsap.to(wrap, { scale: 1.05, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
        gsap.to(halo, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        gsap.to(sheenRef.current, { xPercent: 200, duration: 0.9, ease: 'power2.out' })
      }

      const onLeave = () => {
        wrapX(0); wrapY(0)
        innerX(0); innerY(0); arrowX(0)
        gsap.to(wrap, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
        gsap.to(halo, { opacity: 0, duration: 0.4, ease: 'power2.out' })
        gsap.set(sheenRef.current, { xPercent: -120 })
      }

      const onDown = () => gsap.to(wrap, { scale: 0.97, duration: 0.12, ease: 'power2.out' })

      const onUp = (e: MouseEvent) => {
        gsap.to(wrap, { scale: 1.05, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
        const r = wrap.getBoundingClientRect()
        const ripple = document.createElement('span')
        ripple.className = 'pointer-events-none absolute rounded-full bg-white/40'
        Object.assign(ripple.style, {
          left: `${e.clientX - r.left}px`, top: `${e.clientY - r.top}px`,
          width: '4px', height: '4px', transform: 'translate(-50%, -50%)',
        })
        wrap.appendChild(ripple)
        gsap.to(ripple, { width: 320, height: 320, opacity: 0, duration: 0.7, ease: 'power2.out', onComplete: () => ripple.remove() })
      }

      gsap.set(sheenRef.current, { xPercent: -120 })
      gsap.set(halo, { opacity: 0 })

      wrap.addEventListener('mousemove', onMove)
      wrap.addEventListener('mouseenter', onEnter)
      wrap.addEventListener('mouseleave', onLeave)
      wrap.addEventListener('mousedown', onDown)
      wrap.addEventListener('mouseup', onUp)

      return () => {
        wrap.removeEventListener('mousemove', onMove)
        wrap.removeEventListener('mouseenter', onEnter)
        wrap.removeEventListener('mouseleave', onLeave)
        wrap.removeEventListener('mousedown', onDown)
        wrap.removeEventListener('mouseup', onUp)
      }
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <span className={`relative inline-flex ${pill ? 'rounded-full' : 'rounded-md'}`}>
      <span aria-hidden className={`magnetic-cta-pulse pointer-events-none absolute inset-0 ${pill ? 'rounded-full' : 'rounded-md'}`} />
      <span aria-hidden className={`magnetic-cta-pulse magnetic-cta-pulse--delayed pointer-events-none absolute inset-0 ${pill ? 'rounded-full' : 'rounded-md'}`} />

      <a
        ref={wrapRef}
        href={href}
        className={`group relative isolate inline-flex items-center gap-2 overflow-hidden bg-primary text-sm font-semibold text-primary-foreground shadow-[0_12px_40px_-8px_rgba(249,115,22,0.85)] outline-none ring-0 will-change-transform focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background magnetic-cta-breathe ${pill ? 'rounded-full px-7 py-3' : 'rounded-md px-7 py-3.5'}`}
        style={{ transform: 'translateZ(0)' }}
      >
        <span ref={haloRef}  aria-hidden className="pointer-events-none absolute left-0 top-0 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-2xl" />
        <span ref={sheenRef} aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 z-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <span ref={innerRef} className="relative z-10 inline-flex items-center gap-2">
          {children}
          <span ref={arrowRef} className="inline-flex">
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </span>
        </span>
      </a>

      <style>{`
        @keyframes magneticCtaPulse {
          0% { transform: scale(1); opacity: 0.55; }
          80%, 100% { transform: scale(1.35); opacity: 0; }
        }
        .magnetic-cta-pulse {
          box-shadow: 0 0 0 2px rgba(249,115,22,0.55);
          animation: magneticCtaPulse 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .magnetic-cta-pulse--delayed { animation-delay: 1.1s; }
        @keyframes magneticCtaBreathe {
          0%, 100% { box-shadow: 0 12px 40px -8px rgba(249,115,22,0.85), 0 0 0 0 rgba(249,115,22,0.4); }
          50%       { box-shadow: 0 16px 48px -6px rgba(249,115,22,0.95), 0 0 0 6px rgba(249,115,22,0.0); }
        }
        .magnetic-cta-breathe { animation: magneticCtaBreathe 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .magnetic-cta-pulse, .magnetic-cta-breathe { animation: none !important; }
        }
      `}</style>
    </span>
  )
}
