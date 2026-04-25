export function AiStrip() {
  const tools = [
    { name: 'Cursor', color: '#00D4FF' },
    { name: 'Claude', color: '#D97706' },
    { name: 'Lovable', color: '#EC4899' },
    { name: 'v0', color: '#FFFFFF' },
    { name: 'Windsurf', color: '#6366F1' },
    { name: 'Copilot', color: '#0078D4' },
  ]

  return (
    <section className="border-y border-[#1f1f1f] bg-[#0d0d0d] py-5 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap">
        <span className="text-[#525252] text-xs font-bold uppercase tracking-widest mr-2">AI configs for</span>
        {tools.map((tool) => (
          <div key={tool.name}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#1f1f1f] bg-[#111111] hover:border-[#333333] transition-colors">
            <div className="w-2 h-2 rounded-full" style={{ background: tool.color }} />
            <span className="text-[#a3a3a3] text-xs font-semibold">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
