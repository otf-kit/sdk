'use client'

import { useState } from 'react'

const faqs = [
  {
    question: "What's included in the free SDK?",
    answer:
      'All 180+ UI components, design tokens, 5 themes (light/dark + 3 branded), full TypeScript source code, and MIT license. No limits, no sign-up required — just clone from GitHub.',
  },
  {
    question: 'How do templates differ from the SDK?',
    answer:
      'Templates are full-stack apps: frontend + backend + auth + payments, all pre-wired and production-ready. The SDK is just the component library. Think of the SDK as building blocks and templates as complete buildings.',
  },
  {
    question: 'Can I use OTF templates for client work?',
    answer:
      'Yes — a single-license template can be used for one client project. The Team bundle covers unlimited client projects across 5 seats.',
  },
  {
    question: 'What AI tools are supported?',
    answer:
      'Cursor, Claude Code (via CLAUDE.md), Lovable, and Windsurf. Every template ships with working AI configs so your AI coding assistant understands the codebase from day one.',
  },
  {
    question: 'What stack do the templates use?',
    answer:
      'Web-first: Vite 5 + React 19 + Hono for the API + Drizzle ORM + Postgres. Better Auth for authentication. Polar.sh for payments. All TypeScript, zero lock-in.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "Yes — 14-day full refund if the template doesn't work as described. No questions asked.",
  },
  {
    question: 'When is the SaaS Dashboard Kit available?',
    answer:
      'It shipped on 2026-04-25. You can see the live demo at saas-dashboard-production-ae3f.up.railway.app and purchase it at $149 on the templates page.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 border-t border-[#111111]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            FAQ
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Frequently asked questions
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className={`border rounded-xl overflow-hidden transition-colors ${
                open === i ? 'border-[#f97316]/20 bg-[#0d0d0d]' : 'border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#2a2a2a]'
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 cursor-pointer text-left select-none"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`text-sm font-medium transition-colors ${open === i ? 'text-white' : 'text-[#a3a3a3]'}`}>
                  {faq.question}
                </span>
                <span className={`ml-4 shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all text-xs font-bold ${
                  open === i
                    ? 'border-[#f97316]/40 text-[#f97316] bg-[#f97316]/10 rotate-45'
                    : 'border-[#333333] text-[#525252]'
                }`}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-[#737373] leading-relaxed text-sm border-t border-[#1a1a1a] pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
