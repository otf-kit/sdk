'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function Waitlist() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [building, setBuilding] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, building }),
      })
      if (res.ok) {
        setFormState('success')
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <section id="waitlist" className="py-24 px-6 border-t border-[#111111] bg-[#050505]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            Early Access
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Be the first to ship with OTF.
          </h2>
          <p className="text-[#737373] text-lg">
            Join the waitlist for early access pricing, sneak previews, and a Slack invite when new kits drop.
          </p>
        </div>

        {formState === 'success' ? (
          /* TextureCard success state */
          <div className="border border-[#f97316]/30 rounded-xl p-[3px] bg-gradient-to-b from-[#f97316]/10 to-transparent">
            <div className="border border-[#f97316]/15 rounded-[9px] p-[2px]">
              <div className="border border-[#f97316]/8 rounded-[7px] p-[1px]">
                <div className="bg-[#0d0d0d] rounded-[5px] p-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#f97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <p className="text-white font-bold text-xl mb-2">You&apos;re on the list!</p>
                  <p className="text-[#737373]">We&apos;ll reach out when new kits launch. Keep building.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-8 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#737373] mb-1.5 font-medium uppercase tracking-wider" htmlFor="wl-name">
                  First name
                </label>
                <input
                  id="wl-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-[#111111] border border-[#1f1f1f] focus:border-[#f97316]/60 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-[#333333] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-[#737373] mb-1.5 font-medium uppercase tracking-wider" htmlFor="wl-email">
                  Email address
                </label>
                <input
                  id="wl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#111111] border border-[#1f1f1f] focus:border-[#f97316]/60 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-[#333333] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#737373] mb-1.5 font-medium uppercase tracking-wider" htmlFor="wl-building">
                What are you building?
              </label>
              <select
                id="wl-building"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full bg-[#111111] border border-[#1f1f1f] focus:border-[#f97316]/60 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
              >
                <option value="">Select one…</option>
                <option value="saas">SaaS</option>
                <option value="mobile">Mobile App</option>
                <option value="marketplace">Marketplace</option>
                <option value="ecommerce">E-commerce</option>
                <option value="ai">AI App</option>
                <option value="other">Other</option>
              </select>
            </div>
            {formState === 'error' && (
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
            <button
              type="submit"
              disabled={formState === 'loading'}
              className="w-full bg-[#f97316] hover:bg-[#fb923c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-md transition-colors text-sm uppercase tracking-wide"
            >
              {formState === 'loading' ? 'Joining…' : 'Join the waitlist →'}
            </button>
            <p className="text-center text-[#333333] text-xs">No spam. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  )
}
