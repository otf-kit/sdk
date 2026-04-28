"use client"
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Carousel, MockupShape } from '@/lib/template-config'

export function ScreenCarousel({ data, shape }: { data: Carousel; shape: MockupShape }) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollerRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const isPhone = shape === 'phone'

  return (
    <section className="border-b border-border/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{data.title}</h2>
            <p className="mt-3 text-muted-foreground">{data.description}</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition hover:bg-muted"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition hover:bg-muted"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {data.screens.map((s) => (
            <figure
              key={s.src}
              className={`group relative shrink-0 snap-start ${
                isPhone ? 'w-[220px] sm:w-[260px]' : 'w-[560px] sm:w-[680px] lg:w-[820px]'
              }`}
            >
              <div
                className={`overflow-hidden bg-black shadow-xl ring-1 ring-white/10 transition group-hover:scale-[1.02] ${
                  isPhone ? 'rounded-[1.75rem]' : 'rounded-2xl'
                }`}
              >
                <img
                  src={s.src}
                  alt={s.label}
                  loading="lazy"
                  className={`w-full object-cover ${isPhone ? 'aspect-[9/19]' : ''}`}
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                {s.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
