'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

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
    <section id="faq" className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— FAQ</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Quick answers on the SDK, templates, licensing, and supported AI tools.
            </p>
          </div>
          <a
            href="mailto:support@otf.dev"
            className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Still stuck? Email support
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div className="max-w-3xl mx-auto">
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
      </div>
    </section>
  )
}
