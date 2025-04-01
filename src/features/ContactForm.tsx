'use client'

import { Turnstile } from 'next-turnstile'
import { useState } from 'react'

interface ContactFormProps {
  title: string
  name: string
  email: string
  phone: string
  message: string
  submit: string
  phonePlaceholder: string
  phoneError: string
  success: string
  error: string
  sending: string
  securityCheck: string
  securityError: string
  validation: {
    nameRequired: string
    messageRequired: string
    emailInvalid: string
  }
}

const PHONE_PATTERN = /^\+375\d{9}$/
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const ContactForm = ({
  title,
  name,
  email,
  phone,
  message,
  submit,
  phonePlaceholder,
  phoneError: phoneErrorText,
  success: successText,
  error: errorText,
  sending,
  securityCheck,
  securityError,
  validation,
}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [nameError, setNameError] = useState('')
  const [messageError, setMessageError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    setPhoneError('')
    setEmailError('')
    setNameError('')
    setMessageError('')
    setSuccessMessage('')

    if (!formData.name.trim()) {
      setNameError(validation.nameRequired)
      setStatus('error')
      return
    }

    if (!formData.message.trim()) {
      setMessageError(validation.messageRequired)
      setStatus('error')
      return
    }

    if (!PHONE_PATTERN.test(formData.phone)) {
      setPhoneError(phoneErrorText)
      setStatus('error')
      return
    }

    if (!EMAIL_PATTERN.test(formData.email)) {
      setEmailError(validation.emailInvalid)
      setStatus('error')
      return
    }

    if (!turnstileToken) {
      setErrorMessage(securityCheck)
      setStatus('error')
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || errorText)
      }

      setStatus('success')
      setSuccessMessage(successText)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTurnstileToken(null)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : errorText)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrorMessage('')
    setSuccessMessage('')

    if (name === 'phone') {
      if (!PHONE_PATTERN.test(value)) {
        setPhoneError(phoneErrorText)
      } else {
        setPhoneError('')
      }
    }

    if (name === 'email') {
      if (!EMAIL_PATTERN.test(value)) {
        setEmailError(validation.emailInvalid)
      } else {
        setEmailError('')
      }
    }

    if (name === 'name') {
      if (!value.trim()) {
        setNameError(validation.nameRequired)
      } else {
        setNameError('')
      }
    }

    if (name === 'message') {
      if (!value.trim()) {
        setMessageError(validation.messageRequired)
      } else {
        setMessageError('')
      }
    }
  }

  return (
    <div className='bg-white rounded-2xl shadow-xl p-8'>
      <h3 className='text-2xl font-bold text-gray-900 mb-6'>{title}</h3>
      <form className='space-y-6' onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>{name}</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border outline-none ${
              nameError ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
            required
          />
          {nameError && <div className='text-red-600 text-sm mt-1'>{nameError}</div>}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>{email}</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border outline-none ${
              emailError ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
            required
          />
          {emailError && <div className='text-red-600 text-sm mt-1'>{emailError}</div>}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>{phone}</label>
          <input
            type='tel'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder={phonePlaceholder}
            className={`w-full px-4 py-3 rounded-lg border outline-none ${
              phoneError ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
            required
          />
          {phoneError && <div className='text-red-600 text-sm mt-1'>{phoneError}</div>}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>{message}</label>
          <textarea
            name='message'
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 rounded-lg border outline-none ${
              messageError ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
            required
          />
          {messageError && <div className='text-red-600 text-sm mt-1'>{messageError}</div>}
        </div>
        <div className='flex justify-center'>
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
            onVerify={(token: string) => setTurnstileToken(token)}
            onError={() => setErrorMessage(securityError)}
            theme='light'
          />
        </div>
        {errorMessage && (
          <div className='text-red-600 text-sm bg-red-50 p-3 rounded-lg'>{errorMessage}</div>
        )}
        {successMessage && (
          <div className='text-green-600 text-sm bg-green-50 p-3 rounded-lg'>{successMessage}</div>
        )}
        <button
          type='submit'
          disabled={
            status === 'loading' ||
            !!phoneError ||
            !!emailError ||
            !!nameError ||
            !!messageError ||
            !turnstileToken
          }
          className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium ${
            status === 'loading' ||
            phoneError ||
            emailError ||
            nameError ||
            messageError ||
            !turnstileToken
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          {status === 'loading' ? sending : submit}
        </button>
      </form>
    </div>
  )
}
