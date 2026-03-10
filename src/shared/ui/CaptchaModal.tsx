'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { Turnstile } from 'next-turnstile'
import { env } from '@/shared/config/env'

interface CaptchaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVerify: (token: string) => void
  onError: () => void
  title: string
  description?: string
}

export function CaptchaModal({
  open,
  onOpenChange,
  onVerify,
  onError,
  title,
  description,
}: CaptchaModalProps) {
  const handleVerify = (token: string) => {
    onVerify(token)
    onOpenChange(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className='sm:max-w-md bg-white rounded-xl border-slate-200 shadow-sm p-6 md:p-8 gap-6 [&>button]:text-slate-500 [&>button]:hover:text-slate-900 [&>button]:focus:ring-slate-200'
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className='space-y-1'>
          <DialogTitle className='text-xl font-bold text-slate-900 tracking-tight'>
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className='text-sm text-slate-600 leading-relaxed'>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className='flex justify-center py-2'>
          {open && (
            <Turnstile
              siteKey={env.TURNSTILE_SITE_KEY}
              onVerify={handleVerify}
              onError={onError}
              theme='light'
              size='normal'
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
