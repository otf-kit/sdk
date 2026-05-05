import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Generic notification fan-out endpoint. Supports both POST (Bearer auth, JSON
// body) and GET (token + text in query string) → forwards to the configured
// channel. GET path exists because Anthropic's cron environments can use
// WebFetch but not arbitrary curl/headers; that's a real constraint, not a
// preference. Token-in-URL is acceptable here because (a) the secret is
// rotatable, (b) the only capability it grants is sending notifications to
// Dave's Telegram, and (c) traffic is HTTPS-encrypted in transit.
//
// Today: Telegram only. Discord/Slack/email stubs land here as we wire them.
// Used by:
//   - Cron-driven marketing routines (see claude.ai/code/routines)
//   - Deploy scripts (post-deploy ping)
//   - Changelog blasts (future)
//
// Security: shared secret in NOTIFY_SECRET. Anyone with the secret can send,
// so treat it like an API key. Do not embed in client code.

const schema = z.object({
  text: z.string().min(1).max(4000),
  channel: z.enum(['telegram']).optional().default('telegram'),
})

async function dispatch(text: string, channel: 'telegram') {
  if (channel === 'telegram') {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (!token || !chatId) {
      return { status: 500 as const, body: { error: 'Telegram not configured' } }
    }

    // Telegram caps a single sendMessage at 4096 chars. We hard-cap at 4000
    // in zod above; if you need more, chunk client-side.
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    })

    const tgJson = await tgRes.json().catch(() => ({}))
    if (!tgRes.ok || !tgJson.ok) {
      return { status: 502 as const, body: { error: 'Telegram delivery failed', telegram: tgJson } }
    }

    return { status: 200 as const, body: { ok: true, channel, message_id: tgJson.result?.message_id } }
  }
  return { status: 400 as const, body: { error: `Unsupported channel: ${channel}` } }
}

// Decode URL-safe base64 (RFC 4648 §5). Agents reliably produce this; the
// alternative — having them URL-encode multi-line markdown by hand — fails
// on newlines, &, #, etc. and we end up with truncated messages.
function decodeUrlSafeB64(input: string): string | null {
  try {
    const padded = input.replace(/-/g, '+').replace(/_/g, '/')
    const padding = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
    return Buffer.from(padded + padding, 'base64').toString('utf-8')
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const expected = process.env.NOTIFY_SECRET
  if (!expected) {
    return NextResponse.json({ error: 'Notify endpoint not configured' }, { status: 500 })
  }

  const url = new URL(req.url)
  const token = url.searchParams.get('token')
  if (!token || token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Prefer ?b64=<url-safe-base64> (lossless, no escaping pain). Fall back to
  // ?text=<url-encoded> for short messages and backward compat.
  const b64 = url.searchParams.get('b64')
  let text: string | null = null
  if (b64) {
    text = decodeUrlSafeB64(b64)
    if (text === null) {
      return NextResponse.json({ error: 'Invalid base64 in ?b64' }, { status: 400 })
    }
  } else {
    text = url.searchParams.get('text')
  }

  const channelParam = url.searchParams.get('channel') ?? 'telegram'

  const parsed = schema.safeParse({ text, channel: channelParam })
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query', issues: parsed.error.flatten() }, { status: 400 })
  }

  const { status, body } = await dispatch(parsed.data.text, parsed.data.channel)
  return NextResponse.json(body, { status })
}

export async function POST(req: NextRequest) {
  // ── Auth ─────────────────────────────────────────────────────────────────
  const expected = process.env.NOTIFY_SECRET
  if (!expected) {
    return NextResponse.json({ error: 'Notify endpoint not configured' }, { status: 500 })
  }
  const got = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!got || got !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── Parse ────────────────────────────────────────────────────────────────
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid body', issues: parsed.error.flatten() }, { status: 400 })
  }

  const { status, body: respBody } = await dispatch(parsed.data.text, parsed.data.channel)
  return NextResponse.json(respBody, { status })
}
