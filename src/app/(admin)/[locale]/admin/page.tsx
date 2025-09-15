'use client'

import { ActDialog } from '@/features/admin/components/ActDialog'
import { ActsTable } from '@/features/admin/components/ActsTable'
import { ClientDialog } from '@/features/admin/components/ClientDialog'
import { Filters } from '@/features/admin/components/Filters'
import type { Act, ActCreate, Client, ClientCreate } from '@/shared/types/admin'
import { Button } from '@/shared/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function AdminPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const { t } = useTranslation()
  const [user, setUser] = useState<{ id: number; email: string } | null>(null)
  const [clients, setClients] = useState<Client[]>([])
  const [acts, setActs] = useState<Act[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState('all')
  const [selectedDate, setSelectedDate] = useState('') // Формат YYYY-MM
  const [selectedActs, setSelectedActs] = useState<number[]>([])
  const [clientDialogOpen, setClientDialogOpen] = useState(false)
  const [actDialogOpen, setActDialogOpen] = useState(false)

  const loadActs = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (selectedClient !== 'all') params.append('clientId', selectedClient)
      if (selectedDate) params.append('date', selectedDate)

      const response = await fetch(`/api/acts?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to load acts')
      const data = await response.json()
      setActs(data.list || [])
      setSelectedActs([])
    } catch (error) {
      console.error('Load acts error:', error)
    }
  }, [selectedClient, selectedDate])

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (!response.ok) {
        router.push(`/${locale}/login`)
        return
      }
      const data = await response.json()
      setUser(data.user)
    } catch (error) {
      console.error('Auth check error:', error)
      router.push(`/${locale}/login`)
    }
  }, [router, locale])

  const loadClients = useCallback(async () => {
    try {
      const response = await fetch('/api/clients')
      if (!response.ok) throw new Error('Failed to load clients')
      const data = await response.json()
      setClients(data.list || [])
    } catch (error) {
      console.error('Load clients error:', error)
    }
  }, [])

  const loadData = useCallback(async () => {
    try {
      await Promise.all([loadClients(), loadActs()])
    } catch (error) {
      console.error('Load data error:', error)
    } finally {
      setLoading(false)
    }
  }, [loadClients, loadActs])

  useEffect(() => {
    const init = async () => {
      await checkAuth()
      await loadData()
    }
    init()
  }, [checkAuth, loadData])

  useEffect(() => {
    loadActs()
  }, [loadActs])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push(`/${locale}/login`)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleCreateClient = async (data: ClientCreate) => {
    const response = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create client')
    }

    await loadClients()
  }

  const handleCreateAct = async (data: ActCreate) => {
    const response = await fetch('/api/acts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create act')
    }

    await loadActs()
  }

  const handleSelectAct = (actId: number) => {
    setSelectedActs((prev) =>
      prev.includes(actId) ? prev.filter((id) => id !== actId) : [...prev, actId]
    )
  }

  const handleSelectAll = () => {
    setSelectedActs(selectedActs.length === acts.length ? [] : acts.map((act) => act.Id))
  }

  const handleDownloadReports = async () => {
    if (selectedActs.length === 0) return

    try {
      // Передаем только ID выбранных актов
      const actIds = JSON.stringify(selectedActs)
      const downloadUrl = `/api/n8n/download?actIds=${encodeURIComponent(actIds)}`

      // Открываем ссылку в новом окне для загрузки файла
      window.open(downloadUrl, '_blank')
    } catch (error) {
      console.error('Download error:', error)
      alert(t('admin.acts.downloadError', 'Error downloading reports'))
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='flex items-center space-x-2'>
          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600'></div>
          <span className='text-gray-600'>{t('admin.loading', 'Loading...')}</span>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-4'>
            <h1 className='text-2xl font-bold text-gray-900'>{t('admin.title', 'Admin Panel')}</h1>
            <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4'>
              <span className='text-sm text-gray-600'>
                {t('admin.welcome', 'Welcome')},{' '}
                <span className='font-medium text-gray-900'>{user?.email}</span>
              </span>
              <Button
                onClick={handleLogout}
                variant='outline'
                size='sm'
                className='w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 bg-white'
              >
                {t('admin.logout', 'Logout')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 bg-white'>
        <Filters
          clients={clients}
          selectedClient={selectedClient}
          selectedDate={selectedDate}
          onClientChange={setSelectedClient}
          onDateChange={setSelectedDate}
          onAddClient={() => setClientDialogOpen(true)}
          onAddAct={() => setActDialogOpen(true)}
          onDownloadReports={handleDownloadReports}
          selectedActsCount={selectedActs.length}
        />

        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='px-4 sm:px-6 py-4 border-b border-gray-200'>
            <h2 className='text-lg font-medium text-gray-900'>{t('admin.acts.title', 'Acts')}</h2>
          </div>
          <ActsTable
            acts={acts}
            selectedActs={selectedActs}
            onSelectAct={handleSelectAct}
            onSelectAll={handleSelectAll}
            loading={false}
          />
        </div>
      </div>

      <ClientDialog
        isOpen={clientDialogOpen}
        onClose={() => setClientDialogOpen(false)}
        onSubmit={handleCreateClient}
      />

      <ActDialog
        isOpen={actDialogOpen}
        onClose={() => setActDialogOpen(false)}
        onSubmit={handleCreateAct}
        clients={clients}
      />
    </div>
  )
}
