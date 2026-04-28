import type { HeroSection, MockupShape } from '@/lib/template-config'

export function Hero({ data, shape }: { data: HeroSection; shape: MockupShape }) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
              {data.eyebrow}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {data.title}{' '}
              {data.titleAccent && (
                <span className="text-muted-foreground">{data.titleAccent}</span>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {data.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={data.primaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:opacity-90"
              >
                {data.primaryCta.label}
              </a>
              {data.secondaryCta && (
                <a
                  href={data.secondaryCta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:bg-muted"
                >
                  {data.secondaryCta.label}
                </a>
              )}
              <div className="flex items-center gap-3">
                {data.badges.map((b) => (
                  <div
                    key={b.alt}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card"
                    title={b.alt}
                  >
                    <img src={b.src} alt={b.alt} className="h-5 w-5 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-[hsl(var(--accent)/0.25)] via-transparent to-[hsl(var(--accent)/0.1)] blur-2xl" />
            {shape === 'phone' ? (
              <div className="relative mx-auto aspect-[9/19] w-full max-w-[340px] overflow-hidden rounded-[2.5rem] bg-black shadow-2xl ring-1 ring-white/10">
                {data.media.type === 'video' ? (
                  <video
                    src={data.media.src}
                    poster={data.media.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img src={data.media.src} alt={data.media.alt} className="h-full w-full object-cover" />
                )}
              </div>
            ) : (
              <div className="relative mx-auto w-full overflow-hidden rounded-2xl bg-neutral-950 shadow-2xl ring-1 ring-white/10">
                {data.media.type === 'image' ? (
                  <img src={data.media.src} alt={data.media.alt} className="w-full" />
                ) : (
                  <video
                    src={data.media.src}
                    poster={data.media.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
