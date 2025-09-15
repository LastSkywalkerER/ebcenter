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

  // NocoDB
  NOCO_BASE_URL: process.env.NOCO_BASE_URL || '',
  NOCO_API_TOKEN: process.env.NOCO_API_TOKEN || '',
  NOCO_CLIENTS_TABLE_ID: process.env.NOCO_CLIENTS_TABLE_ID || '',
  NOCO_CLIENTS_VIEW_ID: process.env.NOCO_CLIENTS_VIEW_ID || '',
  NOCO_ACTS_TABLE_ID: process.env.NOCO_ACTS_TABLE_ID || '',
  NOCO_ACTS_VIEW_ID: process.env.NOCO_ACTS_VIEW_ID || '',
  NOCO_ACTS_CLIENT_LINK_ID: process.env.NOCO_ACTS_CLIENT_LINK_ID || '',
  NOCO_USERS_TABLE_ID: process.env.NOCO_USERS_TABLE_ID || '',
  NOCO_USERS_VIEW_ID: process.env.NOCO_USERS_VIEW_ID || '',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || '',

  // N8N
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL || '',
} as const

/**
 * Validate that all required server environment variables are set
 */
export function validateServerEnv(): void {
  const requiredVars = [
    { key: 'TURNSTILE_SECRET_KEY', value: serverEnv.TURNSTILE_SECRET_KEY },
    { key: 'TELEGRAM_BOT_TOKEN', value: serverEnv.TELEGRAM_BOT_TOKEN },
    { key: 'TELEGRAM_CHAT_ID', value: serverEnv.TELEGRAM_CHAT_ID },
    { key: 'NOCO_BASE_URL', value: serverEnv.NOCO_BASE_URL },
    { key: 'NOCO_API_TOKEN', value: serverEnv.NOCO_API_TOKEN },
    { key: 'NOCO_CLIENTS_TABLE_ID', value: serverEnv.NOCO_CLIENTS_TABLE_ID },
    { key: 'NOCO_CLIENTS_VIEW_ID', value: serverEnv.NOCO_CLIENTS_VIEW_ID },
    { key: 'NOCO_ACTS_TABLE_ID', value: serverEnv.NOCO_ACTS_TABLE_ID },
    { key: 'NOCO_ACTS_VIEW_ID', value: serverEnv.NOCO_ACTS_VIEW_ID },
    { key: 'NOCO_ACTS_CLIENT_LINK_ID', value: serverEnv.NOCO_ACTS_CLIENT_LINK_ID },
    { key: 'NOCO_USERS_TABLE_ID', value: serverEnv.NOCO_USERS_TABLE_ID },
    { key: 'NOCO_USERS_VIEW_ID', value: serverEnv.NOCO_USERS_VIEW_ID },
    { key: 'JWT_SECRET', value: serverEnv.JWT_SECRET },
    { key: 'N8N_WEBHOOK_URL', value: serverEnv.N8N_WEBHOOK_URL },
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
