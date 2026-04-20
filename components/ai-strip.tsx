const tools = [
  { name: 'Cursor', color: 'border-blue-500/40 text-blue-400' },
  { name: 'Claude Code', color: 'border-orange-500/40 text-orange-400' },
  { name: 'Antigravity', color: 'border-emerald-500/40 text-emerald-400' },
  { name: 'Lovable', color: 'border-pink-500/40 text-pink-400' },
]

export function AiStrip() {
  return (
    <section className="border-y border-zinc-800 bg-zinc-900/30 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6">
        <p className="text-[#a1a1aa] text-sm font-medium shrink-0">
          Works seamlessly with your AI tools
        </p>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {tools.map((tool) => (
            <span
              key={tool.name}
              className={`px-4 py-1.5 rounded-full border text-sm font-medium ${tool.color}`}
            >
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
