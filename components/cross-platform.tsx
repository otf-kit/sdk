export function CrossPlatform() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-4">
            One codebase.{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Every platform.
            </span>
          </h2>
          <p className="text-[#a1a1aa] text-lg max-w-2xl mx-auto">
            Write once, deploy to iOS, Android, and web — same design tokens, same component API.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border-b border-zinc-800">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-zinc-600" />
                <span className="w-3 h-3 rounded-full bg-zinc-600" />
                <span className="w-3 h-3 rounded-full bg-zinc-600" />
              </div>
              <span className="text-xs text-[#a1a1aa] ml-2">Web — Next.js</span>
            </div>
            <div className="p-6 space-y-3">
              <div className="h-8 bg-zinc-800 rounded flex items-center px-3 gap-2">
                <span className="w-3 h-3 rounded bg-indigo-500/40" />
                <span className="text-xs text-[#a1a1aa]">SaaS Dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['Stat', 'Stat', 'Stat'].map((c, i) => (
                  <div key={i} className="bg-zinc-800 rounded p-3 text-center">
                    <div className="text-xs font-mono text-indigo-400">&lt;{c} /&gt;</div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-800 rounded p-3">
                <div className="text-xs font-mono text-[#a1a1aa] mb-2">DataTable</div>
                <div className="space-y-1.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-2 bg-zinc-700 rounded" />
                  ))}
                </div>
              </div>
              <div className="bg-zinc-800 rounded p-3">
                <div className="text-xs font-mono text-[#a1a1aa]">Kanban</div>
              </div>
            </div>
          </div>
          <div
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 border-b border-zinc-800">
              <span className="text-xs text-[#a1a1aa]">Mobile — Expo</span>
              <div className="w-16 h-1 bg-zinc-700 rounded-full" />
            </div>
            <div className="p-6 flex justify-center">
              <div className="w-52 border-2 border-zinc-700 rounded-[28px] p-3 space-y-3">
                <div className="h-6 bg-zinc-800 rounded-full flex items-center px-3">
                  <span className="text-xs text-[#a1a1aa]">OTF App</span>
                </div>
                <div className="bg-zinc-800 rounded-xl p-3">
                  <div className="text-xs font-mono text-indigo-400 mb-2">&lt;ProfileHeader /&gt;</div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/30" />
                    <div className="space-y-1">
                      <div className="h-2 w-16 bg-zinc-700 rounded" />
                      <div className="h-1.5 w-10 bg-zinc-700 rounded" />
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-800 rounded-xl p-3">
                  <div className="text-xs font-mono text-violet-400 mb-2">&lt;TabBar /&gt;</div>
                  <div className="flex justify-around">
                    {['Home', 'Search', 'Profile'].map((tab) => (
                      <span key={tab} className="text-xs text-[#a1a1aa]">{tab}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-zinc-800 rounded-xl p-3">
                  <div className="text-xs font-mono text-emerald-400">&lt;OnboardingCarousel /&gt;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
