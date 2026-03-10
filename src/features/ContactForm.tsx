'use client'

import { env } from '@/shared/config/env'
import { Turnstile } from 'next-turnstile'
import { useState, useEffect } from 'react'

interface ContactFormProps {
  title: string
  name: string
  contactPlaceholder: string
  message: string
  submit: string
  success: string
  error: string
  sending: string
  securityCheck: string
  securityError: string
  validation: {
    nameRequired: string
    messageRequired: string
  }
  contactRequired: string
  contactInvalid: string
  /** Pre-fill message (e.g. "Хочу записаться на курс ...") */
  initialMessage?: string
}

const PHONE_PATTERN = /^\+375\d{9}$/
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function isEmail(s: string): boolean {
  return EMAIL_PATTERN.test(s.trim())
}

function isPhone(s: string): boolean {
  return PHONE_PATTERN.test(s.trim())
}

export const ContactForm = ({
  title,
  name,
  contactPlaceholder,
  message,
  submit,
  success: successText,
  error: errorText,
  sending,
  securityCheck,
  securityError,
  validation,
  contactRequired,
  contactInvalid,
  initialMessage = '',
}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: initialMessage,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [contactError, setContactError] = useState('')
  const [nameError, setNameError] = useState('')
  const [messageError, setMessageError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  // Sync message field when initialMessage changes (e.g. after client-side nav with ?course=)
  useEffect(() => {
    setFormData((prev) => ({ ...prev, message: initialMessage ?? '' }))
  }, [initialMessage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    setContactError('')
    setNameError('')
    setMessageError('')
    setSuccessMessage('')

    const nameTrim = formData.name.trim()
    const contactTrim = formData.contact.trim()
    const messageTrim = formData.message.trim()

    if (!nameTrim) {
      setNameError(validation.nameRequired)
      setStatus('idle')
      return
    }
    if (!messageTrim) {
      setMessageError(validation.messageRequired)
      setStatus('idle')
      return
    }
    if (!contactTrim) {
      setContactError(contactRequired)
      setStatus('idle')
      return
    }
    if (!isEmail(contactTrim) && !isPhone(contactTrim)) {
      setContactError(contactInvalid)
      setStatus('idle')
      return
    }
    if (!turnstileToken) {
      setErrorMessage(securityCheck)
      setStatus('idle')
      return
    }

    const email = isEmail(contactTrim) ? contactTrim : ''
    const phone = isPhone(contactTrim) ? contactTrim : contactTrim

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameTrim,
          email: email || undefined,
          phone: phone || undefined,
          message: messageTrim,
          turnstileToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || errorText)
      }

      setStatus('success')
      setSuccessMessage(successText)
      setFormData({ name: '', contact: '', message: initialMessage })
      setTurnstileToken(null)
    } catch (err) {
      setStatus('idle')
      setErrorMessage(err instanceof Error ? err.message : errorText)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name: fieldName, value } = e.target
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
    setErrorMessage('')
    setSuccessMessage('')
    if (fieldName === 'name') setNameError('')
    if (fieldName === 'contact') setContactError('')
    if (fieldName === 'message') setMessageError('')
  }

  const inputBase =
    'w-full px-4 py-2.5 rounded-lg border bg-slate-50 outline-none text-slate-900 placeholder:text-slate-400 text-sm transition-colors'
  const inputNormal = `${inputBase} border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white`
  const inputError = `${inputBase} border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200`

  const isDisabled =
    status === 'loading' ||
    !!contactError ||
    !!nameError ||
    !!messageError ||
    !turnstileToken

  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-8 md:p-10'>
      <h3 className='text-2xl font-bold text-slate-900 mb-8 tracking-tight'>{title}</h3>
      <form className='space-y-6' onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-1.5'>{name}</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className={nameError ? inputError : inputNormal}
            aria-invalid={!!nameError}
          />
          {nameError && <div className='text-red-600 text-sm mt-1'>{nameError}</div>}
        </div>
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-1.5'>{contactPlaceholder}</label>
          <input
            type='text'
            name='contact'
            inputMode='email'
            autoComplete='email tel'
            value={formData.contact}
            onChange={handleChange}
            placeholder={contactPlaceholder}
            className={contactError ? inputError : inputNormal}
            aria-invalid={!!contactError}
          />
          {contactError && <div className='text-red-600 text-sm mt-1'>{contactError}</div>}
        </div>
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-1.5'>{message}</label>
          <textarea
            name='message'
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={messageError ? inputError : inputNormal}
            required
            aria-invalid={!!messageError}
          />
          {messageError && <div className='text-red-600 text-sm mt-1'>{messageError}</div>}
        </div>
        <div className='flex justify-center'>
          <Turnstile
            siteKey={env.TURNSTILE_SITE_KEY}
            onVerify={(token: string) => setTurnstileToken(token)}
            onError={() => setErrorMessage(securityError)}
            theme='light'
          />
        </div>
        {errorMessage && (
          <div className='text-red-600 text-sm bg-red-50 border border-red-100 px-4 py-3 rounded-lg'>{errorMessage}</div>
        )}
        {successMessage && (
          <div className='text-green-700 text-sm bg-green-50 border border-green-100 px-4 py-3 rounded-lg'>{successMessage}</div>
        )}
        <button
          type='submit'
          disabled={isDisabled}
          className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm font-semibold shadow-sm ${
            isDisabled ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          {status === 'loading' ? sending : submit}
        </button>
      </form>
    </div>
  )
}
