import { GithubIcon as Github } from './icons'
import { docsLinks, componentLinks, blockLinks, patternLinks, communityLinks } from '@/data/kibo-links'

const featuredComponents = componentLinks.slice(0, 12)
const featuredBlocks     = blockLinks.slice(0, 8)
const featuredPatterns   = patternLinks.slice(0, 8)

type Group = { title: string; items: { label: string; href: string }[]; viewAll?: { label: string; href: string } }

const groups: Group[] = [
  { title: 'Docs',       items: docsLinks },
  { title: 'Components', items: featuredComponents, viewAll: { label: 'View all 180+ components', href: '/components' } },
  { title: 'Blocks',     items: featuredBlocks,     viewAll: { label: 'View all blocks', href: '/blocks' } },
  { title: 'Patterns',   items: featuredPatterns,   viewAll: { label: 'View all patterns', href: '/patterns' } },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        {/* Top: Brand + links */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <a href="/" className="flex items-center gap-2 font-mono text-sm font-semibold">
              <img src="/logo.svg" alt="OTF" className="h-7 w-7" />
              Open Template Forest
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Production-ready UI components and full-stack kits for{' '}
              <span className="font-mono text-foreground">Expo + Next.js</span>. Copy, paste, ship — with AI configs pre-wired.
            </p>
            <div className="flex flex-wrap gap-2">
              {communityLinks.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/30 px-2.5 py-1 text-xs text-foreground/85 transition-colors hover:bg-secondary">
                  {l.label === 'GitHub' && <Github className="h-3 w-3" />}
                  {l.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_hsl(140_80%_50%)]" />
              <span className="font-mono">All systems operational</span>
            </div>
          </div>

          {/* Link groups */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g) => (
              <div key={g.title}>
                <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{g.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-sm text-foreground/75 transition-colors hover:text-foreground">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
                {g.viewAll && (
                  <a href={g.viewAll.href} className="mt-4 inline-block text-xs font-medium text-primary transition-opacity hover:opacity-80">
                    {g.viewAll.label} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Watermark wordmark */}
        <div className="mt-20 select-none overflow-hidden">
          <div className="bg-gradient-to-b from-foreground/[0.08] to-transparent bg-clip-text font-mono text-[clamp(3rem,18vw,15rem)] font-bold leading-none tracking-tighter text-transparent">
            otf/ui
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p className="font-mono">© 2026 Open Template Forest — MIT Licensed (SDK)</p>
          <p>Built on Radix, Tailwind, and shadcn/ui. Not affiliated with internal.</p>
        </div>
      </div>
    </footer>
  )
}
