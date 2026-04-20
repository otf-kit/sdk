export function Hero() {
  return (
    <section className="relative bg-dot-grid overflow-hidden pt-32 pb-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/60 to-[#0a0a0a] pointer-events-none" />
      <div className="relative max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#f97316]/30 bg-[#f97316]/10 text-[#fb923c] text-sm mb-10">
          <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse inline-block" />
          Early access — Join the waitlist
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] text-white mb-6">
          The fastest way to ship{' '}
          <span className="text-orange-gradient">cross-platform</span> apps.
        </h1>

        <p className="text-lg text-[#737373] max-w-xl mx-auto mb-10 leading-relaxed">
          Production-ready Expo + Next.js templates with AI configs built in. 182 components. 5 themes. Ship in days.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="/templates"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f97316] hover:bg-[#fb923c] text-white font-medium rounded-md transition-colors text-sm"
          >
            Browse Templates →
          </a>
          <a
            href="/components"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1f1f1f] hover:border-[#333333] text-white font-medium rounded-md transition-colors text-sm"
          >
            View Components
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-[#737373] mb-14 flex-wrap">
          <span>182 components</span>
          <span className="text-[#333333]">·</span>
          <span>5 design themes</span>
          <span className="text-[#333333]">·</span>
          <span>iOS + Android + Web</span>
          <span className="text-[#333333]">·</span>
          <span>MIT</span>
        </div>

        <div className="bg-[#111111] rounded-xl border border-[#1f1f1f] p-6 text-left">
          <p className="text-xs text-[#737373] font-mono mb-4">// Component preview — real SDK component examples</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4">
              <p className="text-xs text-[#737373] font-mono mb-3">&lt;Button /&gt;</p>
              <div className="space-y-2">
                <div className="px-3 py-1.5 bg-[#f97316] rounded text-xs text-white text-center font-medium">Action</div>
                <div className="px-3 py-1.5 bg-[#1f1f1f] rounded text-xs text-[#a3a3a3] text-center">Secondary</div>
                <div className="px-3 py-1.5 bg-red-950/40 border border-red-500/20 rounded text-xs text-red-400 text-center flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                  Danger
                </div>
              </div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4">
              <p className="text-xs text-[#737373] font-mono mb-3">&lt;Card /&gt;</p>
              <div className="border border-[#1f1f1f] rounded-md p-3 space-y-2">
                <div className="h-2.5 w-24 bg-[#1f1f1f] rounded" />
                <div className="h-2 w-full bg-[#161616] rounded" />
                <div className="h-2 w-3/4 bg-[#161616] rounded" />
                <div className="border-t border-[#1f1f1f] pt-2 flex gap-2">
                  <div className="h-5 flex-1 bg-[#f97316]/20 rounded text-[10px] text-[#f97316] flex items-center justify-center">Action</div>
                </div>
              </div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4">
              <p className="text-xs text-[#737373] font-mono mb-3">&lt;DataTable /&gt;</p>
              <div className="space-y-1">
                <div className="flex gap-2 text-[10px] text-[#525252] pb-1 border-b border-[#1f1f1f]">
                  <span className="flex-1">Name</span>
                  <span>Status</span>
                </div>
                {[
                  { name: 'Item 1', status: 'Active', dot: 'bg-green-400' },
                  { name: 'Item 2', status: 'Draft', dot: 'bg-[#525252]' },
                  { name: 'Item 3', status: 'Active', dot: 'bg-green-400' },
                ].map((row) => (
                  <div key={row.name} className="flex gap-2 text-[10px] text-[#737373] py-0.5">
                    <span className="flex-1">{row.name}</span>
                    <span className="flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full inline-block ${row.dot}`} />
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
