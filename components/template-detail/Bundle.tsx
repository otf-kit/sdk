import type { BundleSection } from '@/lib/template-config'

export function Bundle({ data }: { data: BundleSection }) {
  return (
    <section className="border-b border-border/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-foreground text-background">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{data.title}</h2>
              <p className="mt-3 text-background/70">{data.description}</p>
              <div className="mt-6 flex items-end gap-3">
                <span className="text-5xl font-bold">{data.price}</span>
                <span className="pb-1 text-xl text-background/50 line-through">{data.oldPrice}</span>
              </div>
              <ul className="mt-6 grid gap-2.5">
                {data.perks.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[10px] text-white">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href={data.cta.href}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:opacity-90"
              >
                {data.cta.label}
              </a>
            </div>
            <div>
              <img src={data.image} alt="Bundle" className="w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
