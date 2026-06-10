import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, service, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
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
      from: 'Davidsons Lens <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL ?? 'davidsonmediaco@gmail.com',
      replyTo: email,
      subject: `New inquiry from ${name}${service ? ` — ${service}` : ''}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #0D0D0D; color: #F5F5F5;">
          <h2 style="color: #C9A84C; letter-spacing: 0.15em; text-transform: uppercase; font-size: 14px; margin-bottom: 24px;">New Inquiry — Davidsons Lens</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #A0A0A0; font-size: 13px; width: 100px;">Name</td><td style="padding: 8px 0; color: #F5F5F5;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #A0A0A0; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #F5F5F5;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #A0A0A0; font-size: 13px;">Service</td><td style="padding: 8px 0; color: #F5F5F5;">${service || 'Not specified'}</td></tr>
          </table>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #1A1A1A;">
            <p style="color: #A0A0A0; font-size: 13px; margin-bottom: 8px;">Message</p>
            <p style="color: #F5F5F5; line-height: 1.7; white-space: pre-wrap;">${message}</p>
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
