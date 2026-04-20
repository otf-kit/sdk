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
    <section id="waitlist" className="py-24 px-6 bg-zinc-950/50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-4">
          Be first to know when{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            templates drop
          </span>
        </h2>
        <p className="text-[#a1a1aa] text-lg mb-10">
          Join the waitlist and get early access pricing when the first template launches.
        </p>
        {formState === 'success' ? (
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-8">
            <div className="text-2xl mb-2">🎉</div>
            <p className="text-[#fafafa] font-semibold text-lg">You&apos;re on the list!</p>
            <p className="text-[#a1a1aa] mt-1">We&apos;ll reach out when templates launch.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 space-y-4 text-left"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#a1a1aa] mb-1.5" htmlFor="wl-name">
                  Name
                </label>
                <input
                  id="wl-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-[#fafafa] placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a1a1aa] mb-1.5" htmlFor="wl-email">
                  Email
                </label>
                <input
                  id="wl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-[#fafafa] placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#a1a1aa] mb-1.5" htmlFor="wl-building">
                What are you building?
              </label>
              <select
                id="wl-building"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-[#fafafa] focus:outline-none focus:border-indigo-500 transition-colors"
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
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              {formState === 'loading' ? 'Joining…' : 'Join the waitlist'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
