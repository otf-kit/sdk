export function Hero() {
  return (
    <section className="relative bg-grid overflow-hidden py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/50 to-[#09090b] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Early access — join the waitlist
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#fafafa] mb-6 leading-[1.1]">
          Cross-platform{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            templates
          </span>{' '}
          for Expo + Next.js
        </h1>
        <p className="text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10 leading-relaxed">
          Ship faster with production-ready UI components and full-stack kits — all with AI configs
          for Cursor, Claude Code, and Lovable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="/templates"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
          >
            Browse Templates →
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 hover:border-zinc-500 text-[#fafafa] font-medium rounded-lg transition-colors"
          >
            Get Free SDK
          </a>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm text-[#a1a1aa]">
          <span>112 components</span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span>5 design themes</span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span>Web + Native</span>
        </div>
      </div>
    </section>
  )
}
