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
    <section id="waitlist" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
          Waitlist
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Be the first to ship with OTF.
        </h2>
        <p className="text-[#737373] text-lg mb-10">
          Join the waitlist and get early access pricing when the first template launches.
        </p>

        {formState === 'success' ? (
          <div className="bg-[#f97316]/10 border border-[#f97316]/30 rounded-xl p-8">
            <p className="text-white font-semibold text-lg mb-1">You&apos;re on the list!</p>
            <p className="text-[#737373]">We&apos;ll reach out when templates launch.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-8 space-y-4 text-left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#737373] mb-1.5" htmlFor="wl-name">
                  First name
                </label>
                <input
                  id="wl-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-[#111111] border border-[#1f1f1f] focus:border-[#f97316]/60 rounded-md px-4 py-3 text-sm text-white placeholder:text-[#525252] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[#737373] mb-1.5" htmlFor="wl-email">
                  Email address
                </label>
                <input
                  id="wl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#111111] border border-[#1f1f1f] focus:border-[#f97316]/60 rounded-md px-4 py-3 text-sm text-white placeholder:text-[#525252] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#737373] mb-1.5" htmlFor="wl-building">
                What are you building?
              </label>
              <select
                id="wl-building"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full bg-[#111111] border border-[#1f1f1f] focus:border-[#f97316]/60 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
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
              className="w-full bg-[#f97316] hover:bg-[#fb923c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-md transition-colors text-sm"
            >
              {formState === 'loading' ? 'Joining…' : 'Join the waitlist →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
