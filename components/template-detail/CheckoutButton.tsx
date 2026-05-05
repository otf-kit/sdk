'use client'

import { useState } from 'react'

async function startCheckout(kitSlug: string): Promise<void> {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kit: kitSlug }),
  })
  const { url, error } = await res.json()
  if (error || !url) { alert(`Checkout error: ${error ?? 'Please try again'}`); return }
  window.location.href = url
}

interface CheckoutButtonProps {
  kitSlug: string
  label: string
  className?: string
}

export function CheckoutButton({ kitSlug, label, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await startCheckout(kitSlug)
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={className}
    >
      {loading ? 'Redirecting…' : label}
    </button>
  )
}
