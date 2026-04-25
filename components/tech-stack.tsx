const stack = [
  {
    name: 'React 19',
    desc: 'Concurrent rendering + Suspense',
    color: '#61dafb',
    initial: 'Re',
  },
  {
    name: 'Next.js 16',
    desc: 'App Router + Server Components',
    color: '#ffffff',
    initial: 'N',
  },
  {
    name: 'Vite 5',
    desc: 'Lightning fast HMR + bundling',
    color: '#646cff',
    initial: 'V',
  },
  {
    name: 'Tailwind CSS',
    desc: 'Utility-first design system',
    color: '#06b6d4',
    initial: 'Tw',
  },
  {
    name: 'Hono',
    desc: 'Lightweight edge-ready API',
    color: '#e8611a',
    initial: 'H',
  },
  {
    name: 'Drizzle ORM',
    desc: 'Type-safe SQL with Postgres',
    color: '#c5f74f',
    initial: 'Dr',
  },
  {
    name: 'Better Auth',
    desc: 'Auth without the boilerplate',
    color: '#a78bfa',
    initial: 'BA',
  },
  {
    name: 'TypeScript',
    desc: 'Strict mode throughout',
    color: '#3178c6',
    initial: 'TS',
  },
  {
    name: 'Polar.sh',
    desc: 'Payments + billing for devs',
    color: '#6366f1',
    initial: 'Po',
  },
]

export function TechStack() {
  return (
    <section className="py-24 px-6 border-t border-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            Tech Stack
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Best-in-class stack.
          </h2>
          <p className="text-[#737373] text-lg max-w-xl mx-auto">
            Every dependency chosen for developer experience, type safety, and production reliability.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {stack.map((item) => (
            <div key={item.name}
              className="group bg-[#0d0d0d] hover:bg-[#111111] border border-[#1a1a1a] hover:border-[#2a2a2a] rounded-xl p-5 flex items-center gap-4 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#111111] group-hover:bg-[#161616] border border-[#1f1f1f] flex items-center justify-center shrink-0 transition-colors">
                <span className="text-xs font-black" style={{ color: item.color }}>{item.initial}</span>
              </div>
              <div className="min-w-0">
                <div className="text-white text-sm font-semibold truncate">{item.name}</div>
                <div className="text-[#525252] text-xs truncate">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
