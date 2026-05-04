import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

// Kit catalogue — maps slug → Stripe price env var + display info
const KITS: Record<string, { priceEnvKey: string; name: string; slug: string }> = {
  'saas-dashboard': {
    priceEnvKey: 'STRIPE_PRICE_SAAS_DASHBOARD',
    name: 'SaaS Dashboard Kit',
    slug: 'saas-dashboard',
  },
  'fitness-kit': {
    priceEnvKey: 'STRIPE_PRICE_FITNESS_KIT',
    name: 'OTF Fitness Kit',
    slug: 'fitness-kit',
  },
  'starter-bundle': {
    priceEnvKey: 'STRIPE_PRICE_STARTER_BUNDLE',
    name: 'OTF Starter Bundle',
    slug: 'starter-bundle',
  },
}

const schema = z.object({
  kit: z.string().min(1),
})

export async function POST(req: NextRequest) {
  // ── Validate input ──────────────────────────────────────────────────────
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid kit slug' }, { status: 400 })
  }

  const { kit: kitSlug } = parsed.data
  const kitInfo = KITS[kitSlug]
  if (!kitInfo) {
    return NextResponse.json({ error: `Unknown kit: ${kitSlug}` }, { status: 404 })
  }

  // ── Stripe setup ─────────────────────────────────────────────────────────
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const priceId = process.env[kitInfo.priceEnvKey]
  if (!priceId) {
    return NextResponse.json({ error: `Price not configured for ${kitSlug}` }, { status: 500 })
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2025-03-31.basil' })

  // ── Determine base URL for redirects ─────────────────────────────────────
  const origin = req.headers.get('origin') ??
    (process.env.NEXT_PUBLIC_APP_URL ?? 'https://otf.dev')

  // ── Create Checkout session ───────────────────────────────────────────────
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/templates/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/templates?cancelled=1`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      metadata: {
        kit: kitInfo.slug,
        kitName: kitInfo.name,
      },
      custom_text: {
        submit: { message: 'You get lifetime access + 1 year of updates. 14-day refund guarantee.' },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout] Stripe error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
