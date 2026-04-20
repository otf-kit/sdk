import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  building: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { name, email, building } = parsed.data

  try {
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'OTF Waitlist <waitlist@notifications.otf.dev>',
          to: ['dave@otf-kit.dev'],
          subject: `New waitlist signup: ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nBuilding: ${building ?? 'not specified'}`,
        }),
      })
    }
  } catch {
    // non-fatal
  }

  return NextResponse.json({ ok: true })
}
