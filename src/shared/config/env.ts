/**
 * Public environment variables configuration
 * These variables are available on both client and server side
 */

export const env = {
  // Turnstile CAPTCHA
  TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',

  // Base URL
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '',

  // Plausible Analytics domain (optional, falls back to BASE_URL hostname)
  PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
} as const

/**
 * Validate that all required public environment variables are set
 */
export function validatePublicEnv(): void {
  const requiredVars = [
    { key: 'NEXT_PUBLIC_TURNSTILE_SITE_KEY', value: env.TURNSTILE_SITE_KEY },
    { key: 'NEXT_PUBLIC_BASE_URL', value: env.BASE_URL },
  ]

  const missingVars = requiredVars.filter(({ value }) => !value)

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required public environment variables: ${missingVars
        .map(({ key }) => key)
        .join(', ')}`
    )
  }
}
