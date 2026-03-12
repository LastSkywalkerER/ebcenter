const STORAGE_KEY = 'contactFormMessage'

/**
 * Store message for contact form (used when navigating from another page).
 */
export function setContactFormMessage(message: string): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, message)
  } catch {
    // ignore
  }
}

/**
 * Read and clear stored message for contact form.
 */
export function consumeContactFormMessage(): string | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    const msg = sessionStorage.getItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    return msg ?? undefined
  } catch {
    return undefined
  }
}

/**
 * Scroll to #contacts section and optionally set message for the form.
 * If not on home page, navigates to home#contacts with message stored in sessionStorage.
 */
export function scrollToContacts(
  message?: string,
  locale?: string,
  homePath?: string
): void {
  if (typeof window === 'undefined') return
  if (message) setContactFormMessage(message)

  const pathname = window.location.pathname
  const isHome = pathname === '/' || pathname === '/ru' || pathname === '/en'

  if (isHome) {
    const el = document.getElementById('contacts')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    const target = homePath ?? ((locale && locale !== 'ru' ? `/${locale}` : '') || '/')
    window.location.href = `${target}#contacts`
  }
}
