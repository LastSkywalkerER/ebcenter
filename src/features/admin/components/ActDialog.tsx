'use client'

import type { ActCreate, Client } from '@/shared/types/admin'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useState } from 'react'

interface ActDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ActCreate) => Promise<void>
  clients: Client[]
}

export function ActDialog({ isOpen, onClose, onSubmit, clients }: ActDialogProps) {
  const [formData, setFormData] = useState<ActCreate>({
    clientId: 0,
    number: 1,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    amount: 0,
    price: 0,
  })
  const [loading, setLoading] = useState(false)
  const [loadingNumber, setLoadingNumber] = useState(false)
  const [error, setError] = useState('')

  // Функция для получения следующего номера акта для клиента
  const getNextActNumber = async (clientId: number) => {
    if (clientId === 0) return 1

    try {
      // Получаем все акты для данного клиента
      const response = await fetch(`/api/acts?clientId=${clientId}`)
      if (!response.ok) {
        console.warn(`Failed to fetch acts for client ${clientId}:`, response.status)
        // Если сервер недоступен, возвращаем 1 как fallback
        return 1
      }

      const data = await response.json()
      const acts = data.list || []

      if (acts.length === 0) {
        console.log(`Client ${clientId}: no existing acts, starting with number 1`)
        return 1
      }

      // Находим максимальный номер акта для данного клиента
      const numbers = acts
        .map((act: { number?: number }) => act.number || 0)
        .filter((num: number) => num > 0)
      if (numbers.length === 0) {
        console.log(`Client ${clientId}: no valid numbers found, starting with number 1`)
        return 1
      }

      const maxNumber = Math.max(...numbers)
      const nextNumber = maxNumber + 1
      console.log(
        `Client ${clientId}: found ${acts.length} acts, max number: ${maxNumber}, next: ${nextNumber}`
      )
      return nextNumber
    } catch (error) {
      console.error('Error getting next act number:', error)
      // При ошибке возвращаем 1
      return 1
    }
  }

  // Обновляем номер акта при изменении клиента
  const handleClientChange = async (clientIdStr: string) => {
    const clientId = parseInt(clientIdStr)
    setFormData((prev) => ({ ...prev, clientId }))

    if (clientId > 0) {
      setLoadingNumber(true)
      try {
        const nextNumber = await getNextActNumber(clientId)
        setFormData((prev) => ({ ...prev, number: nextNumber }))
      } catch (error) {
        console.error('Error updating act number:', error)
        setFormData((prev) => ({ ...prev, number: 1 }))
      } finally {
        setLoadingNumber(false)
      }
    } else {
      setFormData((prev) => ({ ...prev, number: 1 }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await onSubmit(formData)
      setFormData({
        clientId: 0,
        number: 1,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        amount: 0,
        price: 0,
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка создания акта')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px] bg-white border-gray-200'>
        <DialogHeader>
          <DialogTitle className='text-gray-900'>Добавить акт</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='client-select' className='text-gray-700'>
              Клиент *
            </Label>
            <Select
              value={formData.clientId.toString()}
              onValueChange={handleClientChange}
              required
            >
              <SelectTrigger
                id='client-select'
                className='border-gray-300 text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500'
              >
                <SelectValue placeholder='Выберите клиента' />
              </SelectTrigger>
              <SelectContent className='bg-white border-gray-200'>
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
            <Label htmlFor='act-number' className='text-gray-700'>
              Номер акта *
            </Label>
            <div className='relative'>
              <Input
                id='act-number'
                type='number'
                required
                min={1}
                disabled={loadingNumber}
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: parseInt(e.target.value) })}
                className={`border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 ${loadingNumber ? 'bg-gray-100' : 'bg-white'}`}
              />
              {loadingNumber && (
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600'></div>
                </div>
              )}
            </div>
            <p className='text-xs text-gray-600'>Автоматически +1 от последнего акта клиента</p>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='year' className='text-gray-700'>
                Год *
              </Label>
              <Input
                id='year'
                type='number'
                required
                min={2020}
                max={2030}
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className='border-gray-300 text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='month' className='text-gray-700'>
                Месяц *
              </Label>
              <Select
                value={formData.month.toString()}
                onValueChange={(value) => setFormData({ ...formData, month: parseInt(value) })}
                required
              >
                <SelectTrigger
                  id='month'
                  className='border-gray-300 text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500'
                >
                  <SelectValue placeholder='Выберите месяц' />
                </SelectTrigger>
                <SelectContent className='bg-white border-gray-200'>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <SelectItem
                      key={month}
                      value={month.toString()}
                      className='text-gray-900 hover:bg-gray-50'
                    >
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='amount' className='text-gray-700'>
              Количество *
            </Label>
            <Input
              id='amount'
              type='number'
              required
              min={0.01}
              step={0.01}
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              className='border-gray-300 text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='price' className='text-gray-700'>
              Цена *
            </Label>
            <Input
              id='price'
              type='number'
              required
              min={0.01}
              step={0.01}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className='border-gray-300 text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div className='bg-gray-50 p-4 rounded-md border border-gray-200'>
            <div className='text-sm font-medium text-gray-900'>
              Итого:{' '}
              <span className='text-lg'>{(formData.amount * formData.price).toFixed(2)} ₽</span>
            </div>
          </div>

          {error && (
            <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200'>
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              className='border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 bg-white'
            >
              Отмена
            </Button>
            <Button
              type='submit'
              disabled={loading}
              className='bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400'
            >
              {loading ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
