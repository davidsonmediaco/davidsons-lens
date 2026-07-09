import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// --- Simple in-memory rate limiter (per process; resets on restart) ---
// Prevents a bot from hammering the endpoint to flood the inbox / burn quota.
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every(t => now - t >= WINDOW_MS)) hits.delete(k)
    }
  }
  return recent.length > MAX_PER_WINDOW
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

// Escape user input before it goes into the HTML email body.
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Collapse newlines/whitespace for header-safe subject fields.
const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim()

const LIMITS = { name: 120, email: 200, service: 80, message: 5000 }

export async function POST(req: NextRequest) {
  try {
    if (rateLimited(clientIp(req))) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Honeypot: real users never see/fill this field. Bots do — quietly drop them.
    if (typeof body.company === 'string' && body.company.trim() !== '') {
      return NextResponse.json({ success: true })
    }

    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const service = typeof body.service === 'string' ? body.service.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (
      name.length > LIMITS.name ||
      email.length > LIMITS.email ||
      service.length > LIMITS.service ||
      message.length > LIMITS.message
    ) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('Contact form: RESEND_API_KEY not configured')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
    }
    const resend = new Resend(apiKey)

    const { error: sendError } = await resend.emails.send({
      from: 'Davidsons Lens <hello@davidsonslens.com>',
      to: process.env.CONTACT_EMAIL ?? 'davidsonmediaco@gmail.com',
      replyTo: email,
      subject: oneLine(`New inquiry from ${name}${service ? ` — ${service}` : ''}`).slice(0, 180),
      text: `Name: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #0D0D0D; color: #F5F5F5;">
          <h2 style="color: #C9A84C; letter-spacing: 0.15em; text-transform: uppercase; font-size: 14px; margin-bottom: 24px;">New Inquiry — Davidsons Lens</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #A0A0A0; font-size: 13px; width: 100px;">Name</td><td style="padding: 8px 0; color: #F5F5F5;">${esc(name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #A0A0A0; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #F5F5F5;">${esc(email)}</td></tr>
            <tr><td style="padding: 8px 0; color: #A0A0A0; font-size: 13px;">Service</td><td style="padding: 8px 0; color: #F5F5F5;">${esc(service || 'Not specified')}</td></tr>
          </table>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #1A1A1A;">
            <p style="color: #A0A0A0; font-size: 13px; margin-bottom: 8px;">Message</p>
            <p style="color: #F5F5F5; line-height: 1.7; white-space: pre-wrap;">${esc(message)}</p>
          </div>
        </div>
      `,
    })

    // The Resend SDK returns API-level failures in `error` instead of throwing,
    // so check it explicitly — otherwise we'd report success on a failed send.
    if (sendError) {
      console.error('Contact form Resend error:', sendError)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
