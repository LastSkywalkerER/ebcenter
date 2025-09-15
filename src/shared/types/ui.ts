import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

// Layout component props
export interface LayoutProps {
  children: ReactNode
}

export interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: 'ru' | 'en' }>
}

// Dialog component props
export type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>

export type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>

export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>

export type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>

// Utility types for API responses
export interface ApiResponse<T> {
  list: T[]
  pageInfo?: {
    totalRows: number
    page: number
    pageSize: number
    isFirstPage: boolean
    isLastPage: boolean
  }
}

// User types
export interface AuthUser {
  id: number
  email: string
}

// Form data types
export interface LoginFormData {
  username: string
  password: string
}

// Request parameter types
export interface ActsQueryParams {
  clientId?: string
  date?: string // Format: YYYY-MM
  page?: number
  limit?: number
}

export interface ActIdsParam {
  actIds: number[]
}

// Filter and format function types
export type DateFormatter = (dateString: string) => string
export type CurrencyFormatter = (amount: number) => string

// Record filter types
export interface DateFilterData {
  startDate: string
  endDate: string
}

export interface RequestParams {
  limit?: number
  offset?: number
  sort?: string
  viewId?: string
  where?: string
  fields?: string
  [key: string]: string | number | undefined
}

// Act processing types
export interface ActSummary {
  id: number
  date: string
  dateType: string
}

export interface ActFilter {
  id: number
  date: string
  dateType: string
}
