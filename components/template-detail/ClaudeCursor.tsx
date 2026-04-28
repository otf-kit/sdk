import { Play } from 'lucide-react'
import type { ClaudeCursorSection } from '@/lib/template-config'

export function ClaudeCursor({ data }: { data: ClaudeCursorSection }) {
  return (
    <section className="border-b border-border/60 bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-8 text-white/90">
              <img src="https://www.reference site/img/claude.svg" alt="Claude" className="h-7 w-auto" />
              <img src="https://www.reference site/img/cursor.svg" alt="Cursor" className="h-7 w-auto" />
            </div>
            <h2 className="mt-8 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {data.title}
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              {data.description}
            </p>
            {data.description2 && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                {data.description2}
              </p>
            )}
            <a
              href={data.cta.href}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              {data.cta.label}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10">→</span>
            </a>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-[420px] overflow-hidden rounded-[2.5rem] bg-neutral-950 ring-1 ring-white/10 shadow-2xl"
              style={{ transform: 'perspective(1400px) rotateY(-12deg) rotateX(4deg)' }}
            >
              <video
                src={data.video.src}
                poster={data.video.poster}
                muted
                loop
                playsInline
                controls
                className="aspect-[9/19] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-2xl">
                  <Play className="h-6 w-6 fill-black text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
