import type { ComponentsSection as ComponentsData } from '@/lib/template-config'
import { CheckoutButton } from './CheckoutButton'

export function ComponentsSection({ data, kitSlug }: { data: ComponentsData; kitSlug?: string }) {
  return (
    <section className="border-b border-border/60 bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{data.title}</h2>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {data.items.map((i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[10px] text-white">
                    ✓
                  </span>
                  {i}
                </li>
              ))}
            </ul>
            {kitSlug && data.cta.href === '#checkout' ? (
              <CheckoutButton
                kitSlug={kitSlug}
                label={data.cta.label}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            ) : (
              <a
                href={data.cta.href}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:opacity-90"
              >
                {data.cta.label}
              </a>
            )}
          </div>
          <div className="relative">
            <img src={data.image} alt="Template components" className="w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
