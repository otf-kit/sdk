'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

type Testimonial = {
  name: string
  handle: string
  role: string
  text: string
  rating: number
  accent?: boolean
}

const testimonials: Testimonial[] = [
  { name: 'Arthur Brito',   handle: '@arthurbritom',   role: 'Frontend Engineer',     text: "I'm in love with OTF. Feels like the missing parts of shadcn/ui — every component slots in like it was always there.", rating: 5, accent: true },
  { name: 'Dmytro',         handle: '@webpnkdotdev',   role: 'Full-stack Dev',         text: 'OTF components are a game changer. The Kanban and App Shell are unreal — no other library ships these with this polish.', rating: 5 },
  { name: 'Rajiv Singh',    handle: '@rjv_im',         role: 'Indie Hacker',           text: 'Opened the kit in Cursor and it just worked. The CLAUDE.md meant my AI understood the whole codebase before I typed a single prompt.', rating: 5 },
  { name: 'Bridger Tower',  handle: '@bridgertower',   role: 'Designer & Dev',         text: 'Built different. The copy-paste DX is exactly right — drop in, restyle, ship. The SaaS kit saved me two weeks.', rating: 5 },
  { name: 'Elie Steinbock', handle: '@elie2222',       role: 'OSS Maintainer',         text: 'Open source done right. Composable, themeable, and zero runtime overhead. This is what I always wanted from a UI library.', rating: 5 },
  { name: 'Joel Hooks',     handle: '@joelhooks',      role: 'Co-founder, egghead',    text: 'The CLAUDE.md and cursor rules are the real product. I described what I wanted and Claude already knew exactly how the codebase worked.', rating: 5 },
  { name: 'Harman',         handle: '@strad3r',        role: 'Product Engineer',       text: 'The SaaS Dashboard Kit alone is worth it. Honestly didn\'t expect this level of polish for a first release.', rating: 5 },
  { name: 'Pablo Seibans',  handle: '@Pablo_Seibans',  role: 'Software Engineer',      text: 'Beautiful defaults, sensible APIs, real-world components. The CLAUDE.md in every kit is a brilliant idea.', rating: 5 },
  { name: 'Paul Ccari',     handle: '@paulclindo',     role: 'Web Developer',          text: 'Replaced three separate libraries with OTF. Bundle is smaller, design is more cohesive, and I ship twice as fast.', rating: 5 },
]

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={i < n ? 'h-3.5 w-3.5 fill-primary text-primary' : 'h-3.5 w-3.5 text-border'} strokeWidth={1.5} />
      ))}
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2)
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary font-mono text-xs font-medium">
      {initials}
    </div>
  )
}

function Card({ t }: { t: Testimonial }) {
  return (
    <div className={`group relative flex h-full flex-col gap-4 rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${t.accent ? 'border-primary/40 bg-gradient-to-br from-primary/5 via-card to-card hover:border-primary/60' : 'border-border bg-card hover:border-foreground/20'}`}>
      <Quote className={`absolute right-5 top-5 h-7 w-7 transition-colors ${t.accent ? 'text-primary/40' : 'text-border group-hover:text-muted-foreground'}`} strokeWidth={1.25} />
      <Stars n={t.rating} />
      <p className="text-sm leading-relaxed text-foreground/90">&ldquo;{t.text}&rdquo;</p>
      <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-4">
        <Avatar name={t.name} />
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{t.name}</div>
          <div className="truncate font-mono text-xs text-muted-foreground">{t.handle} · {t.role}</div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const [page, setPage]       = useState(0)
  const [perPage, setPerPage] = useState(3)

  useEffect(() => {
    const update = () => setPerPage(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const totalPages = Math.ceil(testimonials.length / perPage)
  const safePage   = Math.min(page, totalPages - 1)
  const start      = safePage * perPage
  const visible    = testimonials.slice(start, start + perPage)

  return (
    <section id="testimonials" className="relative overflow-hidden border-b border-border bg-secondary/30">
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.12]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <div className="absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Loved by developers</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">What builders are saying</h2>
            <p className="mt-3 text-muted-foreground">Trusted by engineers and indie hackers shipping faster with OTF components and kits.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={safePage === 0} aria-label="Previous testimonials"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card transition-all hover:border-foreground/30 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={safePage >= totalPages - 1} aria-label="Next testimonials"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card transition-all hover:border-foreground/30 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div key={safePage} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t, i) => (
            <div key={`${safePage}-${t.handle}`} className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <Card t={t} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)} aria-label={`Go to page ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === safePage ? 'w-8 bg-primary' : 'w-4 bg-border hover:bg-muted-foreground'}`} />
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
          {[
            { value: '1.2K',  label: 'GitHub stars' },
            { value: '180+',  label: 'Components' },
            { value: '5',     label: 'Design themes' },
            { value: '4.9/5', label: 'Avg. rating' },
          ].map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</div>
              <div className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
