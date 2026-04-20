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
    <footer className="border-t border-[#1f1f1f] bg-[#0a0a0a] px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 font-bold text-white text-lg mb-2">
              OTF
              <span className="w-2 h-2 rounded-full bg-[#f97316] inline-block" />
            </div>
            <p className="text-sm text-[#737373] mb-3 leading-relaxed">
              Cross-platform templates for Expo + Next.js with AI-native developer configs. Built with Inter.
            </p>
            <p className="text-xs text-[#525252]">Not affiliated with internal.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">SDK</h4>
            <ul className="space-y-2">
              {links.sdk.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[#737373] hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Templates</h4>
            <ul className="space-y-2">
              {links.templates.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[#737373] hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {links.company.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[#737373] hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#1f1f1f] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#525252]">
          <span>© 2026 Dave Soni • MIT License</span>
          <a href="/privacy" className="hover:text-[#737373] transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
