import { CodeIcon, LayoutIcon, SmartphoneIcon, LayersIcon, ZapIcon, PuzzleIcon } from 'lucide-react'

const features = [
  {
    title: '182 Components',
    description: 'Fully typed, accessible, and themeable UI components for React and React Native.',
    icon: PuzzleIcon,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20'
  },
  {
    title: 'Cross-Platform',
    description: 'Build once, deploy everywhere. 100% parity between Next.js and Expo apps.',
    icon: SmartphoneIcon,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20'
  },
  {
    title: 'AI Native',
    description: 'Every component ships with tested LLM prompts and strict system instructions.',
    icon: ZapIcon,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20'
  },
  {
    title: 'Copy & Paste',
    description: 'Use the shadcn-style CLI or just copy the code directly into your project.',
    icon: CodeIcon,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20'
  },
  {
    title: 'Full Stack Kits',
    description: 'Start with production-ready templates including auth, database, and payments.',
    icon: LayersIcon,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20'
  },
  {
    title: 'Layout Systems',
    description: 'Dashboard sidebars, mobile tab bars, and responsive grids ready to go.',
    icon: LayoutIcon,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20'
  }
]

export function ComponentTeaser() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a] border-t border-[#1f1f1f]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Everything you need to build <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">world-class</span> apps
          </h2>
          <p className="text-[#737373] text-lg max-w-2xl mx-auto">
            Stop wasting weeks on boilerplate. OTF provides a complete design system,
            component library, and production templates for modern teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div 
                key={i} 
                className="group relative bg-[#111111] border border-[#1f1f1f] hover:border-[#333333] rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.05)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-2xl pointer-events-none" />
                
                <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.border} border flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[#a3a3a3] leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f97316]/10 blur-[100px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex flex-col md:flex-row items-center relative z-10">
            <div className="p-10 flex-1">
              <h3 className="text-2xl font-bold text-white mb-4">Command line tools</h3>
              <p className="text-[#a3a3a3] mb-6 leading-relaxed">
                Add components to your project with a single command. The CLI automatically handles dependencies and configures your project.
              </p>
              <div className="bg-[#0a0a0a] border border-[#333333] rounded-lg p-4 font-mono text-sm shadow-inner overflow-x-auto">
                <div className="flex gap-2 items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="text-[#a3a3a3]">
                  <span className="text-[#f97316]">pnpm</span> dlx @otf/cli init
                </div>
                <div className="text-[#a3a3a3] mt-1">
                  <span className="text-[#f97316]">pnpm</span> dlx @otf/cli add data-table card button
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
