import Link from 'next/link'

const links = {
  sdk: [
    { label: 'Components', href: '/components' },
    { label: 'Themes', href: '/components#themes' },
    { label: 'Tokens', href: '/components#tokens' },
    { label: 'GitHub', href: 'https://github.com/open-template-forest', external: true },
  ],
  templates: [
    { label: 'Browse Templates', href: '/templates' },
    { label: 'SaaS Dashboard Kit', href: '/templates' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Join Waitlist', href: '/#waitlist' },
  ],
  company: [
    { label: 'Changelog', href: '/changelog' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'License (MIT)', href: 'https://github.com/open-template-forest/blob/main/LICENSE', external: true },
    { label: 'Contributing', href: 'https://github.com/open-template-forest', external: true },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[#111111] bg-[#050505] px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <img src="/logo.svg" alt="OTF" className="w-8 h-8 group-hover:scale-105 transition-transform duration-200" />
              <span className="font-black text-white text-[17px] tracking-tight leading-none">OTF</span>
            </Link>
            <p className="text-sm text-[#525252] mb-4 leading-relaxed">
              Open-source React component library + full-stack templates. AI configs pre-wired for Cursor, Claude, and Lovable.
            </p>
            {/* Status dot */}
            <div className="flex items-center gap-2 text-xs text-[#525252]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              All systems operational
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">SDK</h4>
            <ul className="space-y-2.5">
              {links.sdk.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-sm text-[#525252] hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Templates</h4>
            <ul className="space-y-2.5">
              {links.templates.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[#525252] hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2.5">
              {links.company.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-sm text-[#525252] hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Built with row */}
        <div className="border-t border-[#111111] pt-8 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-[#333333] text-xs font-medium uppercase tracking-widest">
            <span>Built with</span>
            {['React', 'Next.js', 'Tailwind', 'Hono', 'Drizzle', 'Better Auth', 'Polar'].map((tech, i) => (
              <span key={tech} className="flex items-center gap-6">
                {i > 0 && <span className="w-0.5 h-0.5 rounded-full bg-[#333333]" />}
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#333333]">
          <span>© 2026 OTF · MIT License · Not affiliated with any VC-backed company</span>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-[#525252] transition-colors">Privacy</a>
            <a href="https://github.com/open-template-forest" target="_blank" rel="noopener noreferrer" className="hover:text-[#525252] transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
