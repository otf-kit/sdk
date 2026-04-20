const templates = [
  {
    name: 'SaaS Dashboard',
    platform: 'Web + Mobile',
    price: '$149',
    status: 'In development',
    preview: true,
  },
  {
    name: 'Marketplace',
    platform: 'Web + Mobile',
    price: '$149',
    status: 'Coming soon',
    preview: false,
  },
  {
    name: 'Fitness App',
    platform: 'Mobile-first',
    price: '$99',
    status: 'Coming soon',
    preview: false,
  },
  {
    name: 'Delivery App',
    platform: 'Mobile-first',
    price: '$99',
    status: 'Coming soon',
    preview: false,
  },
  {
    name: 'E-commerce',
    platform: 'Web + Mobile',
    price: '$149',
    status: 'Coming soon',
    preview: false,
  },
  {
    name: 'AI Wrapper',
    platform: 'Web + Mobile',
    price: '$149',
    status: 'Coming soon',
    preview: false,
  },
]

export function TemplateCatalog() {
  return (
    <section className="py-24 px-6 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-4">
            Ready-made templates,{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              ship in days
            </span>
          </h2>
          <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
            Full-stack apps with auth, payments, and AI configs pre-wired — drop in and ship.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((t) => (
            <div
              key={t.name}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#fafafa]">{t.name}</span>
                    {t.preview && (
                      <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                        Preview
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-[#a1a1aa]">{t.platform}</span>
                </div>
                <span className="font-bold text-[#fafafa]">{t.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                    t.status === 'In development'
                      ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}
                >
                  {t.status}
                </span>
              </div>
              <a
                href="#waitlist"
                className="mt-auto text-sm text-center px-4 py-2 border border-zinc-700 hover:border-zinc-500 text-[#fafafa] rounded-lg transition-colors"
              >
                Notify me
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
