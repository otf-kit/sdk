'use client'

// Icons sourced from cdn.simpleicons.org (same pattern as Compatibility.tsx)
// For tools not yet on simpleicons we use a styled letter tile
const tools: Array<
  | { name: string; kind: 'img'; slug: string }
  | { name: string; kind: 'text'; letter: string }
> = [
  { name: 'Claude',    kind: 'img',  slug: 'anthropic'     },
  { name: 'Cursor',    kind: 'img',  slug: 'cursor'        },
  { name: 'Lovable',   kind: 'text', letter: '♥'           },
  { name: 'Bolt',      kind: 'text', letter: '⚡'           },
  { name: 'Windsurf',  kind: 'img',  slug: 'codeium'       },
  { name: 'Copilot',   kind: 'img',  slug: 'githubcopilot' },
  { name: 'ChatGPT',   kind: 'img',  slug: 'openai'        },
  { name: 'Gemini',    kind: 'img',  slug: 'googlegemini'  },
  { name: 'v0',        kind: 'text', letter: 'v₀'          },
  { name: 'Replit',    kind: 'img',  slug: 'replit'        },
]

function ToolBadge({ tool }: { tool: typeof tools[number] }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 backdrop-blur-sm">
      {tool.kind === 'img' ? (
        <img
          src={`https://cdn.simpleicons.org/${tool.slug}/ffffff`}
          alt={tool.name}
          width={13}
          height={13}
          loading="lazy"
          className="opacity-80"
        />
      ) : (
        <span className="text-[11px] leading-none text-foreground/70">{tool.letter}</span>
      )}
      <span className="font-mono text-[11px] tracking-wide text-foreground/80">{tool.name}</span>
    </span>
  )
}

export function AIToolsMarquee() {
  return (
    <div className="w-full">
      {/* label */}
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Works with every AI tool
      </p>

      {/* marquee track */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="flex w-max gap-3 marquee-track">
          {/* list duplicated for seamless loop */}
          {[...tools, ...tools].map((tool, i) => (
            <ToolBadge key={`${tool.name}-${i}`} tool={tool} />
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  )
}
