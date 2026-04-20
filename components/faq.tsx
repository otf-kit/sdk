const faqs = [
  {
    question: "What's included in the free SDK?",
    answer:
      'All 182 UI components, design tokens, 5 themes (light/dark + 3 branded), full TypeScript source code, and MIT license. No limits, no sign-up required — just clone from GitHub.',
  },
  {
    question: 'How do templates differ from the SDK?',
    answer:
      'Templates are full-stack apps: frontend + backend + auth + payments, all pre-wired and production-ready. The SDK is just the component library. Think of the SDK as building blocks and templates as complete buildings.',
  },
  {
    question: 'Can I use OTF templates for client work?',
    answer:
      'Yes — a single-license template can be used for one client project. The Team license covers unlimited client projects across 5 seats.',
  },
  {
    question: 'What AI tools are supported?',
    answer:
      'Cursor, Claude Code (via CLAUDE.md), Lovable, and Antigravity. Every template ships with working AI configs so your AI coding assistant knows the codebase from day one.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "Yes — 14-day full refund if the template doesn't work as described. No questions asked.",
  },
  {
    question: 'When will templates be available?',
    answer:
      'The first template — SaaS Dashboard — is currently in development. Join the waitlist to get notified and secure early-access pricing.',
  },
]

export function Faq() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            FAQ
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Frequently asked questions
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-white font-medium hover:text-[#fb923c] transition-colors select-none text-sm">
                {faq.question}
                <span className="ml-4 shrink-0 text-[#737373] group-open:rotate-45 transition-transform duration-200 text-xl leading-none">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-[#737373] leading-relaxed text-sm">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
