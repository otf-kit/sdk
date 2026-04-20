import { Smartphone, Globe, Layers, Type, Moon, Code2 } from 'lucide-react'

const stack = [
  { icon: Smartphone, name: 'Expo SDK 54', desc: 'iOS + Android + Web' },
  { icon: Globe, name: 'Next.js 16', desc: 'App Router + RSC' },
  { icon: Layers, name: 'Tamagui + Radix', desc: 'Cross-platform primitives' },
  { icon: Type, name: 'TypeScript', desc: 'Strict mode throughout' },
  { icon: Moon, name: '5 Design Themes', desc: 'Light · Dark · Custom' },
  { icon: Code2, name: 'AI-ready', desc: 'Cursor + Claude Code configs' },
]

export function TechStack() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            Tech Stack
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Built on the best stack.
          </h2>
          <p className="text-[#737373] text-lg max-w-xl">
            Modern, battle-tested technologies chosen for developer experience and scalability.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.name}
                className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#f97316]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.name}</h3>
                  <p className="text-sm text-[#737373]">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
