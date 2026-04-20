export function CrossPlatform() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            Cross-platform
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            One codebase. Every platform.
          </h2>
          <p className="text-[#737373] text-lg max-w-2xl">
            Write once, deploy to iOS, Android, and web — same design tokens, same component API.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161616] border-b border-[#1f1f1f]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#1f1f1f]" />
                <span className="w-3 h-3 rounded-full bg-[#1f1f1f]" />
                <span className="w-3 h-3 rounded-full bg-[#1f1f1f]" />
              </div>
              <span className="text-xs text-[#737373] font-mono ml-2">Web (Next.js 16)</span>
            </div>
            <div className="p-5 flex gap-3">
              <div className="w-32 shrink-0 space-y-1">
                <div className="h-6 bg-[#161616] rounded flex items-center px-2">
                  <span className="text-[10px] text-[#525252] font-mono">Sidebar</span>
                </div>
                {['Dashboard', 'Analytics', 'Settings', 'Users'].map(item => (
                  <div key={item} className="h-5 bg-[#0a0a0a] rounded flex items-center px-2">
                    <span className="text-[10px] text-[#525252]">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-[#161616] rounded" />
                <div className="grid grid-cols-3 gap-1.5">
                  {['MRR', 'Users', 'Churn'].map(stat => (
                    <div key={stat} className="bg-[#0a0a0a] border border-[#1f1f1f] rounded p-2 text-center">
                      <div className="text-[10px] font-mono text-[#f97316]">{stat}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded p-2">
                  <div className="text-[10px] font-mono text-[#525252] mb-1.5">DataTable</div>
                  <div className="space-y-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-1.5 bg-[#1f1f1f] rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 pb-4">
              <code className="text-[10px] font-mono text-[#525252]">@otf/ui (Radix + Tailwind)</code>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-[#1f1f1f]">
              <span className="text-xs text-[#737373] font-mono">Mobile (Expo 54)</span>
              <div className="w-12 h-1 bg-[#1f1f1f] rounded-full" />
            </div>
            <div className="p-5 flex justify-center">
              <div className="w-48 border border-[#333333] rounded-[24px] p-3 space-y-2.5 bg-[#0a0a0a]">
                <div className="h-5 bg-[#161616] rounded-full flex items-center justify-between px-3">
                  <span className="text-[10px] text-[#525252]">9:41</span>
                  <span className="text-[10px] text-[#525252]">●●●</span>
                </div>
                <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-2.5">
                  <div className="text-[10px] font-mono text-[#f97316] mb-1.5">ProfileHeader</div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#f97316]/20 border border-[#f97316]/30" />
                    <div className="space-y-1">
                      <div className="h-1.5 w-14 bg-[#1f1f1f] rounded" />
                      <div className="h-1 w-10 bg-[#1f1f1f] rounded" />
                    </div>
                  </div>
                </div>
                <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-2.5">
                  <div className="text-[10px] font-mono text-[#525252] mb-1.5">Content</div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-[#1f1f1f] rounded" />
                    <div className="h-1.5 w-2/3 bg-[#1f1f1f] rounded" />
                  </div>
                </div>
                <div className="bg-[#161616] rounded-xl p-2 flex justify-around">
                  {['Home', 'Search', 'Profile'].map(tab => (
                    <span key={tab} className="text-[10px] text-[#525252]">{tab}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-5 pb-4">
              <code className="text-[10px] font-mono text-[#525252]">@otf/ui-native (Tamagui)</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
