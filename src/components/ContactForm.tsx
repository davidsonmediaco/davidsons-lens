'use client'

import { useState } from 'react'
import CTAButton from '@/components/CTAButton'

const services = [
  'Photo',
  'Video',
  'Social Media Management',
  'Consulting',
  'Other',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-[#1A1A1A] border border-white/10 text-[#F5F5F5] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors duration-200 placeholder-[#A0A0A0]'

  if (status === 'success') {
    return (
      <div className="py-16 text-center">
        <div className="w-12 h-px bg-[#C9A84C] mx-auto mb-8" />
        <h2
          className="text-3xl text-white mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Message Sent
        </h2>
        <p
          className="text-[#A0A0A0] text-lg"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          I&apos;ll be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-[0.15em] uppercase text-[#A0A0A0] mb-2">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs tracking-[0.15em] uppercase text-[#A0A0A0] mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-[0.15em] uppercase text-[#A0A0A0] mb-2">
          Service
        </label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          <option value="">Select a service…</option>
          {services.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs tracking-[0.15em] uppercase text-[#A0A0A0] mb-2">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={7}
          placeholder="Tell me about your project…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">
          Something went wrong. Please try again or email directly at davidsonmediaco@gmail.com.
        </p>
      )}

      <CTAButton
        type="submit"
        label={status === 'sending' ? 'Sending…' : 'Send It'}
        disabled={status === 'sending'}
      />
    </form>
  )
}
