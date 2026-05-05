import { Globe, FileCode2, BadgeCheck } from 'lucide-react'

export function DifferentiatorStrip() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          — The unfair-advantage stack
        </p>
        <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Most kit shops drop you at the README.<br />
          <span className="text-primary">We ship you to production.</span>
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {/* Card 1 — AI configs */}
        <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-border/80">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-[0_8px_24px_-12px_rgba(249,115,22,0.6)]">
            <FileCode2 className="h-5 w-5 text-primary" strokeWidth={1.75} />
          </div>
          <h3 className="mt-5 font-semibold tracking-tight text-foreground">CLAUDE.md in every kit</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Cursor, Claude, Lovable, Bolt — your AI hits the ground running. 20+ tested prompts per kit.
          </p>
          {/* AI tool logos */}
          <div className="mt-4 flex items-center gap-2 opacity-70">
            {['Cursor', 'Claude', 'Lovable', 'Bolt'].map((t) => (
              <span key={t} className="rounded border border-border bg-secondary/40 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </article>

        {/* Card 2 — Custom domain in 90 sec — featured center */}
        <article className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-6 transition-all hover:border-primary/50">
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgba(249,115,22,0.10), transparent 60%)' }}
            aria-hidden
          />
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 shadow-sm transition-all group-hover:-translate-y-0.5">
              <Globe className="h-5 w-5 text-primary" strokeWidth={1.75} />
            </div>
            <div className="mt-5 flex items-center gap-2">
              <h3 className="font-semibold tracking-tight text-foreground">Custom domain in 90 sec</h3>
              <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary">
                New
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              One command wires Railway custom domain + Cloudflare DNS + free email forwarding + auto-renewing TLS.
            </p>
            {/* Terminal block — the actual command */}
            <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-background/60 px-3 py-2.5 font-mono text-[11px] leading-relaxed text-foreground/85">
              <code>
                <span className="text-muted-foreground">$ </span>
                bash scripts/setup-custom-domain.sh \<br />
                <span className="text-muted-foreground">  </span>
                --domain mykit.com
              </code>
            </pre>
          </div>
        </article>

        {/* Card 3 — One-time payment */}
        <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-border/80">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-[0_8px_24px_-12px_rgba(249,115,22,0.6)]">
            <BadgeCheck className="h-5 w-5 text-primary" strokeWidth={1.75} />
          </div>
          <h3 className="mt-5 font-semibold tracking-tight text-foreground">One-time payment</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            $149 once. 12 months of free updates. No subscriptions. No per-seat fees. 14-day refund, no questions asked.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="text-2xl font-black text-foreground">$149</div>
            <div className="text-sm text-muted-foreground/60 line-through">$29/mo subs</div>
          </div>
        </article>
      </div>
    </section>
  )
}
