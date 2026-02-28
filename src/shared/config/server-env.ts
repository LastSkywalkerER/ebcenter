/**
 * Server-only environment variables configuration
 * These variables are available only on the server side
 */

export const serverEnv = {
  // Turnstile
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY || '',

  // Telegram
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || '',
} as const

/**
 * Validate that all required server environment variables are set
 */
export function validateServerEnv(): void {
  const requiredVars = [
    { key: 'TURNSTILE_SECRET_KEY', value: serverEnv.TURNSTILE_SECRET_KEY },
    { key: 'TELEGRAM_BOT_TOKEN', value: serverEnv.TELEGRAM_BOT_TOKEN },
    { key: 'TELEGRAM_CHAT_ID', value: serverEnv.TELEGRAM_CHAT_ID },
  ]

  const missingVars = requiredVars.filter(({ value }) => !value)

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required server environment variables: ${missingVars
        .map(({ key }) => key)
        .join(', ')}`
    )
  }
}
