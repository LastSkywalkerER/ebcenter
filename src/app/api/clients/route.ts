import { getAuthUser } from '@/shared/lib/auth'
import { nocodb } from '@/shared/lib/nocodb'
import type { Client } from '@/shared/types/admin'
import { ClientCreateSchema } from '@/shared/types/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const response = await nocodb.getRecords<Client>(process.env.NOCO_CLIENTS_TABLE_ID!, {
      viewId: process.env.NOCO_CLIENTS_VIEW_ID!,
      sort: 'name',
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('Get clients error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    const clientData = ClientCreateSchema.parse(body)

    const client = await nocodb.createRecord<Client>(process.env.NOCO_CLIENTS_TABLE_ID!, clientData)

    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }

    console.error('Create client error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
