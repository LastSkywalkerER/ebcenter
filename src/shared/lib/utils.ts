import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format phone for tel: URI (strip spaces, dashes, parens) */
export function formatPhoneForTel(phone: string): string {
  return phone.replace(/[\s\-\(\)]/g, '') || phone
}
