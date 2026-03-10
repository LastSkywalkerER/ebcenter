'use client'

import { CaptchaModal } from '@/shared/ui/CaptchaModal'
import { useState } from 'react'

const PHONE_PATTERN = /^\+375\d{9}$/
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function isEmail(s: string): boolean {
  return EMAIL_PATTERN.test(s.trim())
}

function isPhone(s: string): boolean {
  return PHONE_PATTERN.test(s.trim())
}

export interface ConsultationFormProps {
  title: string
  description: string
  namePlaceholder: string
  contactPlaceholder: string
  submit: string
  success: string
  error: string
  sending: string
  securityCheck: string
  securityError: string
  nameRequired: string
  contactRequired: string
  contactInvalid: string
}

export function ConsultationForm({
  title,
  description,
  namePlaceholder,
  contactPlaceholder,
  submit,
  success: successText,
  error: errorText,
  sending,
  securityCheck,
  securityError,
  nameRequired,
  contactRequired,
  contactInvalid,
}: ConsultationFormProps) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [nameError, setNameError] = useState('')
  const [contactError, setContactError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showCaptchaModal, setShowCaptchaModal] = useState(false)

  const submitWithToken = async (turnstileToken: string) => {
    const nameTrim = name.trim()
    const contactTrim = contact.trim()
    const email = isEmail(contactTrim) ? contactTrim : ''
    const phone = isPhone(contactTrim) ? contactTrim : isEmail(contactTrim) ? '' : contactTrim

    setStatus('loading')
    setErrorMessage('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameTrim,
          email: email || undefined,
          phone: phone || undefined,
          message: '',
          turnstileToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || errorText)
      }

      setStatus('success')
      setSuccessMessage(successText)
      setName('')
      setContact('')
    } catch (err) {
      setStatus('idle')
      setErrorMessage(err instanceof Error ? err.message : errorText)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setNameError('')
    setContactError('')
    setSuccessMessage('')

    const nameTrim = name.trim()
    const contactTrim = contact.trim()

    if (!nameTrim) {
      setNameError(nameRequired)
      return
    }
    if (!contactTrim) {
      setContactError(contactRequired)
      return
    }
    if (!isEmail(contactTrim) && !isPhone(contactTrim)) {
      setContactError(contactInvalid)
      return
    }

    setShowCaptchaModal(true)
  }

  const handleCaptchaVerify = (token: string) => {
    setShowCaptchaModal(false)
    submitWithToken(token)
  }

  const inputBase =
    'px-4 py-2.5 rounded-lg border bg-white outline-none text-slate-900 placeholder:text-slate-400 text-sm transition-colors min-w-0'
  const inputNormal = `${inputBase} border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`
  const inputError = `${inputBase} border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200`

  const isDisabled = status === 'loading' || !!nameError || !!contactError

  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
        <div className='lg:max-w-md'>
          <h3 className='text-xl md:text-2xl font-bold text-slate-900 tracking-tight'>
            {title}
          </h3>
          <p className='mt-2 text-sm text-slate-600 leading-relaxed'>
            {description}
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col sm:flex-row gap-3 sm:items-stretch flex-1 lg:flex-initial lg:max-w-xl'
        >
          <div className='flex flex-col sm:flex-row gap-3 flex-1 min-w-0'>
            <input
              type='text'
              name='name'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setNameError('')
                setErrorMessage('')
                setSuccessMessage('')
              }}
              placeholder={namePlaceholder}
              className={nameError ? inputError : inputNormal}
              aria-invalid={!!nameError}
            />
            <input
              type='text'
              name='contact'
              inputMode='email'
              autoComplete='email tel'
              value={contact}
              onChange={(e) => {
                setContact(e.target.value)
                setContactError('')
                setErrorMessage('')
                setSuccessMessage('')
              }}
              placeholder={contactPlaceholder}
              className={contactError ? inputError : inputNormal}
              aria-invalid={!!contactError}
            />
          </div>
          <div className='flex flex-shrink-0'>
            <button
              type='submit'
              disabled={isDisabled}
              className={`w-full sm:w-auto shrink-0 bg-blue-600 text-white py-2.5 px-5 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm font-semibold shadow-sm whitespace-nowrap ${
                isDisabled ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              {status === 'loading' ? sending : submit}
            </button>
          </div>
        </form>
      </div>
      <CaptchaModal
        open={showCaptchaModal}
        onOpenChange={setShowCaptchaModal}
        onVerify={handleCaptchaVerify}
        onError={() => {
          setShowCaptchaModal(false)
          setErrorMessage(securityError)
        }}
        title={securityCheck}
      />
      {(nameError || contactError) && (
        <div className='mt-3 flex flex-wrap gap-x-4 gap-y-1 text-red-600 text-sm'>
          {nameError && <span>{nameError}</span>}
          {contactError && <span>{contactError}</span>}
        </div>
      )}
      {errorMessage && (
        <div className='mt-3 text-red-600 text-sm bg-red-50 border border-red-100 px-4 py-2 rounded-lg'>
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className='mt-3 text-green-700 text-sm bg-green-50 border border-green-100 px-4 py-2 rounded-lg'>
          {successMessage}
        </div>
      )}
    </div>
  )
}
