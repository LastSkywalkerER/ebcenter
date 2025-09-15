'use client'

import type { Act } from '@/shared/types/admin'
import { Checkbox } from '@/shared/ui/checkbox'

interface ActsTableProps {
  acts: Act[]
  selectedActs: number[]
  onSelectAct: (actId: number) => void
  onSelectAll: () => void
  loading: boolean
}

export function ActsTable({
  acts,
  selectedActs,
  onSelectAct,
  onSelectAll,
  loading,
}: ActsTableProps) {
  if (loading) {
    return (
      <div className='flex justify-center py-8'>
        <div className='flex items-center space-x-2'>
          <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600'></div>
          <span className='text-gray-600'>Загрузка...</span>
        </div>
      </div>
    )
  }

  if (acts.length === 0) {
    return (
      <div className='text-center py-12 text-gray-600'>
        <div className='text-lg font-medium mb-2 text-gray-900'>Акты не найдены</div>
        <div className='text-sm'>Попробуйте изменить фильтры или добавить новый акт</div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    }).format(amount)
  }

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full'>
        <thead>
          <tr className='border-b border-gray-200 bg-gray-50'>
            <th className='px-4 sm:px-6 py-3 text-left w-12'>
              <Checkbox
                checked={selectedActs.length === acts.length && acts.length > 0}
                onCheckedChange={onSelectAll}
                className='border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white'
              />
            </th>
            <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Номер
            </th>
            <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell'>
              Дата
            </th>
            <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Кол-во
            </th>
            <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Цена
            </th>
            <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Итого
            </th>
            <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell'>
              Клиент
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          {acts.map((act) => (
            <tr key={act.Id} className='hover:bg-gray-50 transition-colors'>
              <td className='px-4 sm:px-6 py-4'>
                <Checkbox
                  checked={selectedActs.includes(act.Id)}
                  onCheckedChange={() => onSelectAct(act.Id)}
                  className='border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white'
                />
              </td>
              <td className='px-4 sm:px-6 py-4 text-sm font-medium text-gray-900'>#{act.number}</td>
              <td className='px-4 sm:px-6 py-4 text-sm text-gray-600 hidden sm:table-cell'>
                {formatDate(act.date)}
              </td>
              <td className='px-4 sm:px-6 py-4 text-sm text-gray-900'>{act.amount}</td>
              <td className='px-4 sm:px-6 py-4 text-sm text-gray-900'>
                {formatCurrency(act.price)}
              </td>
              <td className='px-4 sm:px-6 py-4 text-sm font-medium text-gray-900'>
                {formatCurrency(act.total || act.amount * act.price)}
              </td>
              <td className='px-4 sm:px-6 py-4 text-sm text-gray-600 hidden lg:table-cell'>
                {act.clients_link?.name || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
