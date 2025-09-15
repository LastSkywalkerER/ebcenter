import { serverEnv } from '@/shared/config/server-env'

const NOCO_BASE_URL = serverEnv.NOCO_BASE_URL
const NOCO_API_TOKEN = serverEnv.NOCO_API_TOKEN

interface NocoPageInfo {
  pageSize?: number
  totalRows?: number
  isFirstPage?: boolean
  isLastPage?: boolean
  page?: number
}

export class NocoDBClient {
  private baseUrl: string
  private token: string

  constructor() {
    this.baseUrl = NOCO_BASE_URL
    this.token = NOCO_API_TOKEN
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const baseUrl = this.baseUrl.endsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl
    const url = `${baseUrl}/api/v2${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'xc-token': this.token,
        ...options?.headers,
      },
    })

    console.log({ url, status: response.status })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('NocoDB API Error:', { url, status: response.status, error: errorText })
      throw new Error(`NocoDB API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getRecords<T>(
    tableId: string,
    params?: {
      where?: string
      limit?: number
      offset?: number
      sort?: string
      viewId?: string
      fields?: string
    } & Record<string, string | number | undefined>
  ): Promise<{ list: T[]; pageInfo: NocoPageInfo }> {
    const searchParams = new URLSearchParams()

    if (params?.where) searchParams.append('where', params.where)
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.offset) searchParams.append('offset', params.offset.toString())
    if (params?.sort) searchParams.append('sort', params.sort)
    if (params?.viewId) searchParams.append('viewId', params.viewId)
    if (params?.fields) searchParams.append('fields', params.fields)

    // Handle additional parameters
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (
          !['where', 'limit', 'offset', 'sort', 'viewId', 'fields'].includes(key) &&
          value !== undefined
        ) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    const endpoint = `/tables/${tableId}/records${query ? `?${query}` : ''}`

    return this.request<{ list: T[]; pageInfo: NocoPageInfo }>(endpoint)
  }

  async createRecord<T>(tableId: string, data: Record<string, unknown>): Promise<T> {
    return this.request<T>(`/tables/${tableId}/records`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async linkRecord(
    tableId: string,
    linkId: string,
    recordId: number,
    data: { Id: number }
  ): Promise<void> {
    return this.request(`/tables/${tableId}/links/${linkId}/records/${recordId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const nocodb = new NocoDBClient()
