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
    <section className="py-24 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            — FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Frequently asked questions
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className={`border rounded-xl overflow-hidden transition-colors ${
                open === i
                  ? 'border-primary/20 bg-card'
                  : 'border-border bg-background hover:border-border/60'
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 cursor-pointer text-left select-none"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`text-sm font-medium transition-colors ${open === i ? 'text-foreground' : 'text-foreground/70'}`}>
                  {faq.question}
                </span>
                <span className={`ml-4 shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all text-xs font-bold ${
                  open === i
                    ? 'border-primary/40 text-primary bg-primary/10 rotate-45'
                    : 'border-border text-muted-foreground'
                }`}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-muted-foreground leading-relaxed text-sm border-t border-border pt-4">
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
