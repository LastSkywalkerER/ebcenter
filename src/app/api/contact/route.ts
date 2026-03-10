import { serverEnv } from '@/shared/config/server-env'
import { sendTelegramMessage } from '@/shared/lib/telegram'
import { NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email?: string
  phone?: string
  message?: string
  turnstileToken: string
}

async function validateTurnstileToken(token: string) {
  const formData = new URLSearchParams()
  formData.append('secret', serverEnv.TURNSTILE_SECRET_KEY)
  formData.append('response', token)

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
  const result = await fetch(url, {
    body: formData,
    method: 'POST',
  })

  const outcome = await result.json()
  console.log({ outcome })
  return outcome.success
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, phone, message = '', turnstileToken } = body

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 })
    }

    const hasContact = (email && email.trim()) || (phone && phone.trim())
    if (!hasContact) {
      return NextResponse.json({ message: 'Email or phone is required' }, { status: 400 })
    }

    // Validate Turnstile token
    const isValid = await validateTurnstileToken(turnstileToken)
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid security check' }, { status: 400 })
    }

    // Format message for Telegram
    const telegramMessage = `
<b>New Contact Form Submission</b>

<b>Name:</b> ${name.trim()}
<b>Email:</b> ${email?.trim() ?? '—'}
<b>Phone:</b> ${phone?.trim() ?? '—'}
<b>Message:</b>
${typeof message === 'string' && message.trim() ? message.trim() : '—'}
    `.trim()

    console.log(telegramMessage)
    // Send message to Telegram
    await sendTelegramMessage(telegramMessage)

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
