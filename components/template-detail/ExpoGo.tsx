import type { ExpoGoSection } from '@/lib/template-config'

export function ExpoGo({ data }: { data: ExpoGoSection }) {
  return (
    <section className="border-b border-border/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{data.sdk54.title}</h3>
            <p className="mt-3 text-muted-foreground">{data.sdk54.description}</p>
            <div className="mt-8 flex items-center gap-6">
              <div className="rounded-2xl border border-border bg-background p-3">
                <img src={data.sdk54.qr} alt="Expo Go QR code — Fitness Kit" className="h-32 w-32" />
              </div>
              <a
                href={data.sdk54.cta.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
              >
                {data.sdk54.cta.label}
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{data.sdk53.title}</h3>
            <p className="mt-3 text-muted-foreground">{data.sdk53.description}</p>
            <div className="mt-8">
              <div className="inline-block rounded-2xl border border-border bg-background p-3">
                <img src={data.sdk53.qr} alt="Expo Go QR code — OTF Native UI Showcase" className="h-32 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
