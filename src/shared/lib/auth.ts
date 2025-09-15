import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import type { User } from '../types/admin'

const JWT_SECRET = process.env.JWT_SECRET!

export function generateToken(user: User): string {
  console.log('Generating token for user:', user.email)
  console.log('JWT_SECRET exists:', !!JWT_SECRET)

  const token = jwt.sign({ id: user.Id, email: user.email }, JWT_SECRET, { expiresIn: '24h' })

  console.log('Generated token length:', token.length)
  return token
}

export function verifyToken(token: string): { id: number; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; email: string }
  } catch {
    return null
  }
}

export function isValidToken(token: string): boolean {
  try {
    console.log('Validating token, length:', token.length)
    console.log('JWT_SECRET exists for validation:', !!JWT_SECRET)

    const decoded = jwt.verify(token, JWT_SECRET)
    console.log('Token validation successful:', !!decoded)
    return true
  } catch (error) {
    console.log(
      'Token validation failed:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    return false
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function getAuthUser(): Promise<{ id: number; email: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return null
  }

  return verifyToken(token)
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours
  })
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}
