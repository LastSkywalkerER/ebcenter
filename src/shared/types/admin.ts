import { z } from 'zod'

export interface User {
  Id: number
  User?: string
  email: string
  password: string
}

export interface Client {
  Id: number
  name: string
  requisits?: string
  position?: string
  initials?: string
  document?: string
  contract?: string
  CreatedAt: string
  UpdatedAt: string
}

export interface Act {
  Id: number
  number: number
  date: string
  amount: number
  price: number
  total?: number
  CreatedAt?: string
  UpdatedAt?: string
  Client?: Client[]
  clients_link?: Client
}

export const ClientCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  requisits: z.string().optional(),
  position: z.string().optional(),
  initials: z.string().optional(),
  document: z.string().optional(),
  contract: z.string().optional(),
})

export const ActCreateSchema = z.object({
  clientId: z.number().min(1, 'Client is required'),
  number: z.number().min(1, 'Number must be greater than 0'),
  year: z.number().min(2020).max(2030),
  month: z.number().min(1).max(12),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
})

export const LoginSchema = z.object({
  username: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
})

export type ClientCreate = z.infer<typeof ClientCreateSchema>
export type ActCreate = z.infer<typeof ActCreateSchema>
export type LoginRequest = z.infer<typeof LoginSchema>

export interface NocoResponse<T> {
  list: T[]
  pageInfo: {
    totalRows?: number
    page?: number
    pageSize?: number
    isFirstPage?: boolean
    isLastPage?: boolean
  }
}
