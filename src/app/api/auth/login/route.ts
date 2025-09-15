import { serverEnv } from '@/shared/config/server-env'
import { generateToken } from '@/shared/lib/auth'
import { nocodb } from '@/shared/lib/nocodb'
import type { User } from '@/shared/types/admin'
import { LoginSchema } from '@/shared/types/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = LoginSchema.parse(body)

    const response = await nocodb.getRecords<User>(serverEnv.NOCO_USERS_TABLE_ID, {
      where: `(email,eq,${username})`,
      limit: 1,
      viewId: serverEnv.NOCO_USERS_VIEW_ID,
    })

    const user = response.list[0]
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Проверяем пароль (хранится в открытом виде)
    if (password !== user.password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = generateToken(user)

    const response_obj = NextResponse.json({
      success: true,
      user: { id: user.Id, email: user.email },
    })

    response_obj.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 24 * 60 * 60,
    })

    return response_obj
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
