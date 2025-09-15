type ApiResponse<T = unknown> = {
  data?: T
  error?: string
  status: number
}

export class ApiClient {
  private baseUrl = ''

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (response.status === 401) {
      // Автоматический logout при 401 ошибке
      console.log('401 error detected, logging out...')
      try {
        await fetch('/api/auth/logout', { method: 'POST' })
        // Редирект на login в клиентском коде
        if (typeof window !== 'undefined') {
          window.location.href = `/${window.location.pathname.split('/')[1] || 'en'}/login`
        }
      } catch (logoutError) {
        console.error('Logout error:', logoutError)
      }
      return { error: 'Not authenticated', status: 401 }
    }

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch((): { error: string } => ({ error: 'Unknown error' }))
      return { error: errorData.error || 'Request failed', status: response.status }
    }

    const data = await response.json()
    return { data, status: response.status }
  }

  async get<T = unknown>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url)
      return this.handleResponse<T>(response)
    } catch (error) {
      console.error('API GET error:', error)
      return { error: 'Network error', status: 500 }
    }
  }

  async post<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      })
      return this.handleResponse<T>(response)
    } catch (error) {
      console.error('API POST error:', error)
      return { error: 'Network error', status: 500 }
    }
  }
}

export const apiClient = new ApiClient()
