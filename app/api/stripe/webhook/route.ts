import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { randomBytes } from 'crypto'

// ── Disable Next.js body parsing — Stripe needs the raw bytes for sig verification
export const runtime = 'nodejs'

// ── License key generator ─────────────────────────────────────────────────────
function generateLicenseKey(): string {
  const part = () => randomBytes(3).toString('hex').toUpperCase()
  return `OTF-${part()}-${part()}-${part()}-${part()}`
}

// ── Kit download + docs links ─────────────────────────────────────────────────
const KIT_LINKS: Record<string, { docs: string; demo: string }> = {
  'saas-dashboard': {
    docs: 'https://github.com/open-template-forest/saas-dashboard-kit',
    demo: 'https://saas-dashboard-production-ae3f.up.railway.app',
  },
  'fitness-kit': {
    docs: 'https://github.com/open-template-forest/fitness-kit',
    demo: 'https://fitness-kit-production.up.railway.app',
  },
  'starter-bundle': {
    docs: 'https://github.com/open-template-forest',
    demo: 'https://fitness-kit-production.up.railway.app',
  },
}

// ── Kit-specific "What's included" blurbs ────────────────────────────────────
const KIT_INCLUDES: Record<string, string> = {
  'saas-dashboard':
    '✓ Full source code (Vite 5 + React 19 + Hono + Drizzle + Better Auth)<br>\n          ✓ 11 screens, all wired to real Postgres data<br>\n          ✓ AI configs for Cursor, Claude Code, and Lovable<br>\n          ✓ 1 year of updates<br>\n          ✓ 14-day refund guarantee',
  'fitness-kit':
    '✓ Full source code (Expo SDK 54 + React Native + Hono + Drizzle)<br>\n          ✓ 25+ screens — workout tracking, nutrition, progress charts<br>\n          ✓ iOS, Android &amp; web export in one codebase<br>\n          ✓ AI configs for Cursor, Claude Code, and Bolt<br>\n          ✓ 1 year of updates<br>\n          ✓ 14-day refund guarantee',
  'starter-bundle':
    '✓ All current kits — Fitness Kit + SaaS Dashboard Kit<br>\n          ✓ All future kits included (new kits drop monthly)<br>\n          ✓ AI configs for Cursor, Claude Code, Lovable &amp; Bolt<br>\n          ✓ Priority support + Slack channel access<br>\n          ✓ All future updates<br>\n          ✓ 14-day refund guarantee',
}

const DEFAULT_INCLUDES =
  '✓ Full source code<br>\n          ✓ AI configs for Cursor, Claude Code, and Lovable<br>\n          ✓ 1 year of updates<br>\n          ✓ 14-day refund guarantee'

// ── Send license delivery email via Resend ────────────────────────────────────
async function sendLicenseEmail({
  to, kitName, kitSlug, licenseKey, sessionId,
}: {
  to: string
  kitName: string
  kitSlug: string
  licenseKey: string
  sessionId: string
}) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.warn('[webhook] RESEND_API_KEY not set — skipping license email')
    return
  }

  const links = KIT_LINKS[kitSlug] ?? { docs: 'https://otf.dev', demo: 'https://otf.dev' }
  const includes = KIT_INCLUDES[kitSlug] ?? DEFAULT_INCLUDES

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="background:#0a0a0a;color:#f0ede9;font-family:'Inter',system-ui,sans-serif;padding:0;margin:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:40px auto;padding:0 20px;">
    <tr><td>
      <!-- Logo -->
      <div style="margin-bottom:32px;">
        <div style="width:36px;height:36px;background:#f97316;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;">
          <span style="color:white;font-weight:900;font-size:14px;">O</span>
        </div>
      </div>

      <!-- Heading -->
      <h1 style="font-size:24px;font-weight:700;margin:0 0 8px;color:#ffffff;">
        Your license is ready 🎉
      </h1>
      <p style="color:#9e9e9e;font-size:15px;margin:0 0 32px;line-height:1.6;">
        Thanks for purchasing <strong style="color:#f0ede9;">${kitName}</strong>. Here's everything you need to get started.
      </p>

      <!-- License key -->
      <div style="background:#111111;border:1px solid #1f1f1f;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
        <div style="font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;font-family:monospace;">License key</div>
        <div style="font-family:monospace;font-size:18px;font-weight:700;color:#f97316;letter-spacing:0.05em;">${licenseKey}</div>
        <div style="margin-top:8px;font-size:12px;color:#525252;">Per-developer · Commercial use included · No expiry</div>
      </div>

      <!-- CTAs -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
        <tr>
          <td width="48%" style="padding-right:6px;">
            <a href="${links.docs}" style="display:block;text-align:center;background:#f97316;color:white;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;font-size:14px;">
              Access repository →
            </a>
          </td>
          <td width="48%" style="padding-left:6px;">
            <a href="${links.demo}" style="display:block;text-align:center;background:#1a1a1a;color:#f0ede9;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;font-size:14px;border:1px solid #2a2a2a;">
              View live demo
            </a>
          </td>
        </tr>
      </table>

      <!-- What's included -->
      <div style="margin-bottom:24px;">
        <div style="font-size:13px;font-weight:600;color:#f0ede9;margin-bottom:12px;">What's included</div>
        <div style="font-size:13px;color:#737373;line-height:1.8;">
          ${includes}
        </div>
      </div>

      <!-- Getting started -->
      <div style="background:#0d0d0d;border:1px solid #1a1a1a;border-radius:10px;padding:16px 20px;margin-bottom:32px;">
        <div style="font-size:12px;color:#525252;font-family:monospace;margin-bottom:6px;">Quick start</div>
        <div style="font-family:monospace;font-size:13px;color:#f97316;">git clone [repo-url]</div>
        <div style="font-family:monospace;font-size:13px;color:#f97316;">bun install && bun dev</div>
      </div>

      <!-- Footer -->
      <p style="font-size:12px;color:#333333;border-top:1px solid #1a1a1a;padding-top:20px;">
        Order ID: <span style="font-family:monospace;">${sessionId}</span><br>
        Questions? Reply to this email or open an issue on GitHub.<br><br>
        <a href="https://otf.dev" style="color:#525252;">otf.dev</a>
      </p>
    </td></tr>
  </table>
</body>
</html>
  `.trim()

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'OTF <licenses@notifications.otf.dev>',
      to: [to],
      bcc: ['dave@otf-kit.dev'], // Keep a copy
      subject: `Your ${kitName} license — OTF`,
      html,
    }),
  })
}

// ── Webhook handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const stripeKey      = process.env.STRIPE_SECRET_KEY
  const webhookSecret  = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripeKey || !webhookSecret) {
    console.error('[webhook] Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  const stripe    = new Stripe(stripeKey, { apiVersion: '2025-03-31.basil' })
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  // Raw body required for signature verification
  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // ── Handle checkout.session.completed ──────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const email    = session.customer_details?.email
    const kitSlug  = session.metadata?.kit
    const kitName  = session.metadata?.kitName ?? 'OTF Kit'

    if (!email || !kitSlug) {
      console.warn('[webhook] Missing email or kit metadata on session', session.id)
      return NextResponse.json({ ok: true }) // Don't return error — Stripe will retry
    }

    const licenseKey = generateLicenseKey()

    console.log(`[webhook] Delivering license ${licenseKey} for ${kitSlug} to ${email}`)

    try {
      await sendLicenseEmail({
        to: email,
        kitName,
        kitSlug,
        licenseKey,
        sessionId: session.id,
      })
      console.log(`[webhook] License email sent to ${email}`)
    } catch (err) {
      console.error('[webhook] Failed to send license email:', err)
      // Return 200 anyway so Stripe doesn't retry — log for manual follow-up
    }
  }

  return NextResponse.json({ ok: true })
}
