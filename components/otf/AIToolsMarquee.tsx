'use client'

import { useState } from 'react'

// ── Inline SVG icons (official brand assets, monochrome white) ────────────────

/** OpenAI Codex icon — fill="currentColor" */
function CodexIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true">
      <path clipRule="evenodd" d="M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z" />
    </svg>
  )
}

/** Lovable — official L-bracket mask path, monochrome white */
function LovableIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 121 122" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.0687 0C55.9888 0 72.1373 16.1551 72.1373 36.0835V49.7975H84.141C104.061 49.7975 120.21 65.9526 120.21 85.8809C120.21 105.809 104.061 121.964 84.141 121.964H0V36.0835C0 16.1551 16.1485 0 36.0687 0Z"
        fill="white"
        fillOpacity="0.75"
      />
    </svg>
  )
}

// ── Simpleicons CDN slugs (verified 200 on cdn.simpleicons.org 2026-04-29) ─────

type Tool =
  | { name: string; kind: 'icon'; slug: string }
  | { name: string; kind: 'img'; src: string }
  | { name: string; kind: 'codex' }
  | { name: string; kind: 'lovable' }
  | { name: string; kind: 'letter'; letter: string }

const tools: Tool[] = [
  { name: 'Claude',     kind: 'icon',    slug: 'anthropic'     }, // ✓
  { name: 'Cursor',     kind: 'icon',    slug: 'cursor'        }, // ✓
  { name: 'Lovable',    kind: 'lovable'                        }, // official SVG
  { name: 'Bolt',       kind: 'icon',    slug: 'stackblitz'    }, // ✓ bolt.new = StackBlitz
  { name: 'Windsurf',   kind: 'icon',    slug: 'windsurf'      }, // ✓
  { name: 'Copilot',    kind: 'icon',    slug: 'githubcopilot' }, // ✓
  { name: 'ChatGPT',    kind: 'codex'                          }, // official OpenAI Codex SVG
  { name: 'Gemini',     kind: 'icon',    slug: 'googlegemini'  }, // ✓
  { name: 'v0',         kind: 'icon',    slug: 'v0'            }, // ✓
  { name: 'Replit',     kind: 'icon',    slug: 'replit'        }, // ✓
  { name: 'Kiro',       kind: 'img',     src: '/img/kiro.svg'  }, // official brand SVG
  { name: 'Perplexity', kind: 'icon',    slug: 'perplexity'    }, // ✓
]

// ── Individual icon renderers ─────────────────────────────────────────────────

function SimpleIcon({ slug, name }: { slug: string; name: string }) {
  const [broken, setBroken] = useState(false)
  if (broken) return <span className="font-mono text-[10px] text-foreground/50">{name[0]}</span>
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/ffffff`}
      alt={name}
      width={13}
      height={13}
      loading="lazy"
      className="opacity-75"
      onError={() => setBroken(true)}
    />
  )
}

function ImgIcon({ src, name }: { src: string; name: string }) {
  const [broken, setBroken] = useState(false)
  if (broken) return <span className="font-mono text-[10px] text-foreground/50">{name[0]}</span>
  return (
    <img
      src={src}
      alt={name}
      width={14}
      height={14}
      loading="lazy"
      className="opacity-80"
      style={{ objectFit: 'contain' }}
      onError={() => setBroken(true)}
    />
  )
}

function ToolBadge({ tool }: { tool: Tool }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 backdrop-blur-sm select-none">
      <span className="flex h-[13px] w-[13px] shrink-0 items-center justify-center">
        {tool.kind === 'icon'    && <SimpleIcon slug={tool.slug} name={tool.name} />}
        {tool.kind === 'img'     && <ImgIcon src={tool.src} name={tool.name} />}
        {tool.kind === 'codex'   && <span className="text-white/75"><CodexIcon /></span>}
        {tool.kind === 'lovable' && <LovableIcon />}
        {tool.kind === 'letter'  && (
          <span className="font-mono text-[10px] leading-none text-foreground/60">{tool.letter}</span>
        )}
      </span>
      <span className="font-mono text-[11px] tracking-wide text-foreground/80">{tool.name}</span>
    </span>
  )
}

// ── Marquee ───────────────────────────────────────────────────────────────────

export function AIToolsMarquee() {
  const doubled = [...tools, ...tools]

  return (
    <div className="w-full">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Works with every AI tool
      </p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div className="flex w-max gap-2.5 marquee-track">
          {doubled.map((tool, i) => (
            <ToolBadge key={`${tool.name}-${i}`} tool={tool} />
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 32s linear infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  )
}
