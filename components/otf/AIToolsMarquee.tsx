'use client'

import { useState } from 'react'

// Slugs verified against cdn.simpleicons.org (200 = exists, 404 = missing).
// Tools without a confirmed slug use a styled letter badge as fallback.
type Tool =
  | { name: string; kind: 'icon'; slug: string }
  | { name: string; kind: 'letter'; letter: string }

const tools: Tool[] = [
  { name: 'Claude',    kind: 'icon',   slug: 'anthropic'     }, // ✓
  { name: 'Cursor',    kind: 'icon',   slug: 'cursor'        }, // ✓
  { name: 'Windsurf',  kind: 'icon',   slug: 'windsurf'      }, // ✓
  { name: 'Copilot',   kind: 'icon',   slug: 'githubcopilot' }, // ✓
  { name: 'ChatGPT',   kind: 'letter', letter: '⊛'           }, // openai 404 on simpleicons
  { name: 'Gemini',    kind: 'icon',   slug: 'googlegemini'  }, // ✓
  { name: 'Lovable',   kind: 'letter', letter: '♥'           }, // not on simpleicons
  { name: 'Bolt',      kind: 'icon',   slug: 'stackblitz'    }, // ✓ (bolt.new = stackblitz)
  { name: 'v0',        kind: 'icon',   slug: 'v0'            }, // ✓
  { name: 'Replit',    kind: 'icon',   slug: 'replit'        }, // ✓
  { name: 'Kiro',      kind: 'letter', letter: 'K'           }, // Amazon Kiro — not on simpleicons yet
  { name: 'Perplexity',kind: 'icon',   slug: 'perplexity'    }, // ✓
]

function IconImg({ slug, name }: { slug: string; name: string }) {
  const [broken, setBroken] = useState(false)
  if (broken) {
    return (
      <span className="text-[10px] leading-none text-foreground/50 font-mono">
        {name[0]}
      </span>
    )
  }
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

function ToolBadge({ tool }: { tool: Tool }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 backdrop-blur-sm select-none">
      {tool.kind === 'icon' ? (
        <IconImg slug={tool.slug} name={tool.name} />
      ) : (
        <span className="text-[11px] leading-none text-foreground/60">{tool.letter}</span>
      )}
      <span className="font-mono text-[11px] tracking-wide text-foreground/80">{tool.name}</span>
    </span>
  )
}

export function AIToolsMarquee() {
  // Duplicate list for seamless infinite loop
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
