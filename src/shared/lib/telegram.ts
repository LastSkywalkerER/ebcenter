import { serverEnv } from '@/shared/config/server-env'

export async function sendTelegramMessage(message: string) {
  const botToken = serverEnv.TELEGRAM_BOT_TOKEN
  const chatId = serverEnv.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    throw new Error('Telegram configuration is missing')
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    })

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending Telegram message:', error)
    throw error
  }
}
