'use client'

import type { ClientCreate } from '@/shared/types/admin'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useState } from 'react'

interface ClientDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ClientCreate) => Promise<void>
}

export function ClientDialog({ isOpen, onClose, onSubmit }: ClientDialogProps) {
  const [formData, setFormData] = useState<ClientCreate>({
    name: '',
    requisits: '',
    position: '',
    initials: '',
    document: '',
    contract: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await onSubmit(formData)
      setFormData({
        name: '',
        requisits: '',
        position: '',
        initials: '',
        document: '',
        contract: '',
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка создания клиента')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px] bg-white border-gray-200'>
        <DialogHeader>
          <DialogTitle className='text-gray-900'>Добавить клиента</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='client-name' className='text-gray-700'>
              Название *
            </Label>
            <Input
              id='client-name'
              type='text'
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder='Название компании'
              className='border-gray-300 text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='requisits' className='text-gray-700'>
              Реквизиты
            </Label>
            <Input
              id='requisits'
              type='text'
              value={formData.requisits}
              onChange={(e) => setFormData({ ...formData, requisits: e.target.value })}
              placeholder='ИНН, КПП, ОГРН'
              className='border-gray-300 text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='position' className='text-gray-700'>
              Должность
            </Label>
            <Input
              id='position'
              type='text'
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder='Должность руководителя'
              className='border-gray-300 text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='initials' className='text-gray-700'>
              Инициалы
            </Label>
            <Input
              id='initials'
              type='text'
              value={formData.initials}
              onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
              placeholder='Ф.И.О. руководителя'
              className='border-gray-300 text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='document' className='text-gray-700'>
              Документ
            </Label>
            <Input
              id='document'
              type='text'
              value={formData.document}
              onChange={(e) => setFormData({ ...formData, document: e.target.value })}
              placeholder='Устав, доверенность'
              className='border-gray-300 text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='contract' className='text-gray-700'>
              Договор
            </Label>
            <Input
              id='contract'
              type='text'
              value={formData.contract}
              onChange={(e) => setFormData({ ...formData, contract: e.target.value })}
              placeholder='Номер договора'
              className='border-gray-300 text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500'
            />
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
