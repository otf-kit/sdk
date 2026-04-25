export function CrossPlatform() {
  return (
    <section className="py-24 px-6 bg-[#050505] border-t border-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            Open Source SDK
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Drop into any React project.
          </h2>
          <p className="text-[#737373] text-lg max-w-xl mx-auto">
            Zero lock-in. Copy the components, install the package, or use the registry CLI — same design system, your codebase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: 'Install via npm',
              code: 'npm install @otf/ui @otf/tokens',
              desc: 'Full package with all 180+ components, types, and tokens.',
              badge: 'Recommended',
              badgeColor: 'bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20',
            },
            {
              label: 'Registry CLI',
              code: 'npx otf add button card dialog',
              desc: 'shadcn-style — cherry-pick only what you need.',
              badge: 'Coming soon',
              badgeColor: 'bg-[#1f1f1f] text-[#525252] border-[#333333]',
            },
            {
              label: 'Copy & Paste',
              code: '// Source on GitHub — MIT licensed',
              desc: 'Browse on GitHub and copy any component directly.',
              badge: 'Always free',
              badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20',
            },
          ].map(item => (
            <div key={item.label} className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white text-sm font-semibold">{item.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${item.badgeColor}`}>{item.badge}</span>
              </div>
              <div className="bg-[#111111] border border-[#1a1a1a] rounded-md px-3 py-2.5 mb-3 font-mono text-[11px] text-[#a3a3a3]">
                {item.code}
              </div>
              <p className="text-[#525252] text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '180+', label: 'Components' },
            { value: '5', label: 'Design themes' },
            { value: 'MIT', label: 'License' },
            { value: '0', label: 'Lock-in' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-5 text-center">
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-[#525252] text-xs uppercase tracking-widest font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
