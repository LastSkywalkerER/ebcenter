'use client'

import type { Client } from '@/shared/types/admin'
import { Button } from '@/shared/ui/button'
import { DatePicker } from '@/shared/ui/date-picker'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useTranslation } from 'react-i18next'

interface FiltersProps {
  clients: Client[]
  selectedClient: string
  selectedDate: string
  onClientChange: (clientId: string) => void
  onDateChange: (date: string) => void
  onAddClient: () => void
  onAddAct: () => void
  onDownloadReports: () => void
  selectedActsCount: number
}

export function Filters({
  clients,
  selectedClient,
  selectedDate,
  onClientChange,
  onDateChange,
  onAddClient,
  onAddAct,
  onDownloadReports,
  selectedActsCount,
}: FiltersProps) {
  const { t } = useTranslation()
  return (
    <div className='bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
        <div className='space-y-2'>
          <Label htmlFor='client-select' className='text-gray-700'>
            {t('admin.filters.client', 'Client')}
          </Label>
          <Select value={selectedClient} onValueChange={onClientChange}>
            <SelectTrigger
              id='client-select'
              className='border-gray-300 text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500'
            >
              <SelectValue placeholder={t('admin.filters.selectClient', 'Select client')} />
            </SelectTrigger>
            <SelectContent className='bg-white border-gray-200'>
              <SelectItem value='all' className='text-gray-900 hover:bg-gray-50'>
                {t('admin.filters.allClients', 'All clients')}
              </SelectItem>
              {clients.map((client) => (
                <SelectItem
                  key={client.Id}
                  value={client.Id.toString()}
                  className='text-gray-900 hover:bg-gray-50'
                >
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='date-picker' className='text-gray-700'>
            {t('admin.filters.period', 'Period (year-month)')}
          </Label>
          <DatePicker
            id='date-picker'
            value={selectedDate}
            onChange={onDateChange}
            placeholder={t('admin.filters.allPeriods', 'All periods')}
            className='w-full'
          />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 sm:items-end'>
          <Button
            onClick={onAddClient}
            variant='secondary'
            className='flex-1 sm:flex-none bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
          >
            {t('admin.filters.addClient', 'Add client')}
          </Button>
          <Button
            onClick={onAddAct}
            className='flex-1 sm:flex-none bg-blue-600 text-white hover:bg-blue-700'
          >
            {t('admin.filters.addAct', 'Add act')}
          </Button>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200'>
        <span className='text-sm text-gray-600'>
          {t('admin.acts.selectedCount', 'Selected acts')}:{' '}
          <span className='font-medium text-gray-900'>{selectedActsCount}</span>
        </span>
        <Button
          onClick={onDownloadReports}
          disabled={selectedActsCount === 0}
          className={`w-full sm:w-auto ${
            selectedActsCount > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {t('admin.acts.downloadReports', 'Download reports')} ({selectedActsCount})
        </Button>
      </div>
    </div>
  )
}
