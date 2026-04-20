const components = [
  {
    name: 'Button',
    platform: 'Both',
    category: 'Primitives',
    snippet: '<Button variant="primary">Click me</Button>',
  },
  {
    name: 'DataTable',
    platform: 'Web',
    category: 'Components',
    snippet: '<DataTable columns={cols} data={rows} />',
  },
  {
    name: 'Dialog',
    platform: 'Both',
    category: 'Primitives',
    snippet: '<Dialog open={open} onClose={setOpen} />',
  },
  {
    name: 'Kanban',
    platform: 'Web',
    category: 'Advanced',
    snippet: '<Kanban columns={cols} cards={cards} />',
  },
  {
    name: 'PaywallScreen',
    platform: 'Native',
    category: 'Patterns',
    snippet: '<PaywallScreen plans={plans} onSelect={fn} />',
  },
  {
    name: 'OnboardingCarousel',
    platform: 'Native',
    category: 'Patterns',
    snippet: '<OnboardingCarousel steps={steps} />',
  },
]

const platformColors: Record<string, string> = {
  Web: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Native: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Both: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

export function ComponentTeaser() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-4">
            Production-ready components,{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              zero config
            </span>
          </h2>
          <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
            Every component ships with TypeScript types, dark mode, and AI-friendly docs.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {components.map((c) => (
            <div
              key={c.name}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-semibold text-[#fafafa]">{c.name}</span>
                <div className="flex gap-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded border ${platformColors[c.platform]}`}
                  >
                    {c.platform}
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#a1a1aa] mb-3 block">{c.category}</span>
              <pre className="text-xs font-mono text-indigo-300 bg-zinc-950/50 rounded p-3 overflow-x-auto whitespace-pre-wrap break-all">
                {c.snippet}
              </pre>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href="/components"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Browse all 182 components →
          </a>
        </div>
      </div>
    </section>
  )
}
