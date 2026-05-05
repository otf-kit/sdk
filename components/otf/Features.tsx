import { Blocks, Accessibility, Paintbrush, GitBranch, Feather, FileCode2, Globe, Code2 } from 'lucide-react'
import { Reveal } from './Reveal'

const features = [
  { Icon: Globe,        title: 'Custom domain in 90 sec', desc: 'One command wires Railway custom domain + Cloudflare DNS + free email forwarding + auto-renewing TLS. Most kit shops drop you at the README. We ship you to production.' },
  { Icon: FileCode2,    title: 'Every AI tool',    desc: 'Ships with CLAUDE.md, .cursorrules, and 20+ tested prompts. Cursor, Claude, Lovable, Bolt — your AI hits the ground running.' },
  { Icon: Blocks,       title: 'Composable',      desc: 'Built with Radix primitives. Mix, match, extend without forking the source.' },
  { Icon: Accessibility,title: 'Accessible',      desc: 'ARIA-compliant out of the box. Keyboard nav, focus rings, screen readers — all covered.' },
  { Icon: Paintbrush,   title: 'Themable',         desc: 'Tailwind v4 + CSS variables. 5 palettes: Slate, Warm, Cosmic, Terminal, and Custom.' },
  { Icon: Code2,        title: 'TypeScript-first', desc: 'Strict TS across the stack. Zero `any`, full inference, generics where they matter — your IDE catches bugs before runtime.' },
  { Icon: Feather,      title: 'Zero runtime',     desc: 'Components copied into your codebase. No package bloat, no version lock-in.' },
  { Icon: GitBranch,    title: 'Open Source',      desc: 'MIT licensed SDK. Read the code, fork it, contribute back — no strings attached.' },
]

export function Features() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal direction="up" distance={20}>
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Why OTF</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Built for builders who ship.
            </h2>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} direction="up" distance={20} delay={i * 70}>
              <div className="group flex flex-col gap-4">
                <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-[0_8px_24px_-12px_rgba(249,115,22,0.6)]">
                  <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(249,115,22,0.18), transparent 70%)' }} aria-hidden />
                  <Icon className="relative h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                </div>
                <h3 className="font-medium tracking-tight">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
