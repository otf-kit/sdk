const links = {
  sdk: [
    { label: 'Components', href: '/components' },
    { label: 'Themes', href: '/components#themes' },
    { label: 'Tokens', href: '/components#tokens' },
    { label: 'GitHub', href: 'https://github.com' },
  ],
  templates: [
    { label: 'Browse', href: '/templates' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Waitlist', href: '/#waitlist' },
  ],
  company: [
    { label: 'Docs', href: '/docs' },
    { label: 'Contributing', href: '/contributing' },
    { label: 'License (MIT)', href: '/license' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/50 px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-bold text-[#fafafa] text-lg mb-2">OTF</div>
            <p className="text-sm text-[#a1a1aa] mb-3 leading-relaxed">
              Cross-platform templates for Expo + Next.js with AI-native developer configs.
            </p>
            <p className="text-xs text-zinc-600">Not affiliated with internal.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#fafafa] mb-4">SDK</h4>
            <ul className="space-y-2">
              {links.sdk.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#fafafa] mb-4">Templates</h4>
            <ul className="space-y-2">
              {links.templates.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#fafafa] mb-4">Company</h4>
            <ul className="space-y-2">
              {links.company.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
          <span>© 2026 Dave Soni • MIT License</span>
          <a href="/privacy" className="hover:text-[#a1a1aa] transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
