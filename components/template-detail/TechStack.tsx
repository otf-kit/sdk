import type { TechStackSection } from '@/lib/template-config'

export function TechStack({ data }: { data: TechStackSection }) {
  return (
    <section className="border-b border-border/60 bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{data.title}</h2>
          <p className="mt-3 text-muted-foreground">{data.description}</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <img src={s.icon} alt="" className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
