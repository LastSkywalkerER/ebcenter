import { serverEnv } from '@/shared/config/server-env'
import { getAuthUser } from '@/shared/lib/auth'
import type { ActIdsParam } from '@/shared/types/ui'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const actIds = searchParams.get('actIds')

    if (!actIds) {
      return NextResponse.json({ error: 'actIds parameter is required' }, { status: 400 })
    }

    // Парсим массив ID актов
    let parsedActIds: ActIdsParam['actIds']
    try {
      parsedActIds = JSON.parse(actIds)
      if (!Array.isArray(parsedActIds) || parsedActIds.length === 0) {
        throw new Error('Invalid actIds format')
      }
    } catch (error) {
      console.error('Invalid actIds format:', error)
      return NextResponse.json(
        { error: 'Invalid actIds format. Expected JSON array of numbers.' },
        { status: 400 }
      )
    }

    // Строим URL для n8n webhook с передачей ID актов через query параметры
    const n8nBaseUrl = `${serverEnv.N8N_WEBHOOK_URL}/ebc-download-acts`
    const queryParams = new URLSearchParams()

    // Передаем каждый ID акта как отдельный параметр actIds[]
    parsedActIds.forEach((id) => {
      queryParams.append('actIds[]', id.toString())
    })

    const n8nUrl = `${n8nBaseUrl}?${queryParams.toString()}`

    // Перенаправляем пользователя на n8n webhook для загрузки файла
    return NextResponse.redirect(n8nUrl)
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
