import { Layers, Globe, Palette, Code2, Moon, Smartphone } from 'lucide-react'

const stack = [
  {
    icon: Smartphone,
    name: 'Expo SDK 54',
    description: 'Latest Expo with file-based routing',
  },
  {
    icon: Globe,
    name: 'Next.js 16',
    description: 'App Router, Server Components, RSC',
  },
  {
    icon: Palette,
    name: 'Tamagui + Radix',
    description: 'Cross-platform UI primitives',
  },
  {
    icon: Code2,
    name: 'TypeScript',
    description: 'Full source, strict types throughout',
  },
  {
    icon: Moon,
    name: 'Light/Dark Themes',
    description: '5 design themes, token-driven',
  },
  {
    icon: Layers,
    name: 'iOS + Android + Web',
    description: 'One codebase, every platform',
  },
]

export function TechStack() {
  return (
    <section className="py-24 px-6 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-4">
            Built on the{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              best stack
            </span>
          </h2>
          <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
            Modern, battle-tested technologies chosen for developer experience and scalability.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.name}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex items-start gap-4"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#fafafa] mb-1">{item.name}</h3>
                  <p className="text-sm text-[#a1a1aa]">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
