'use client'

import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'

import { MONTHS_RU } from '@/shared/constants/months'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'

interface DatePickerProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  id?: string
}

export function DatePicker({
  value = '',
  onChange,
  placeholder = 'Выберите дату',
  className,
  id,
}: DatePickerProps) {
  const [selectedMonth, setSelectedMonth] = React.useState<number>()
  const [selectedYear, setSelectedYear] = React.useState<number>()
  const [currentYear, setCurrentYear] = React.useState<number>(new Date().getFullYear())

  // Convert string value to month/year
  React.useEffect(() => {
    if (value) {
      try {
        const [year, month] = value.split('-').map(Number)
        setSelectedYear(year)
        setSelectedMonth(month)
        setCurrentYear(year)
      } catch (error) {
        console.error('Date error:', error)
        console.warn('Invalid date format:', value)
        setSelectedMonth(undefined)
        setSelectedYear(undefined)
      }
    } else {
      setSelectedMonth(undefined)
      setSelectedYear(undefined)
    }
  }, [value])

  const handleMonthSelect = (month: number) => {
    // Если уже выбранный месяц и год, то отменяем выбор
    if (selectedMonth === month && selectedYear === currentYear) {
      setSelectedMonth(undefined)
      setSelectedYear(undefined)
      onChange?.('')
    } else {
      setSelectedMonth(month)
      setSelectedYear(currentYear)
      const formattedDate = `${currentYear}-${month.toString().padStart(2, '0')}`
      onChange?.(formattedDate)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedMonth(undefined)
    setSelectedYear(undefined)
    onChange?.('')
  }

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentYear((prev) => (direction === 'prev' ? prev - 1 : prev + 1))
  }

  const getDisplayText = () => {
    if (selectedMonth && selectedYear) {
      return `${MONTHS_RU[selectedMonth - 1]} ${selectedYear}`
    }
    return placeholder
  }

  return (
    <div className='relative'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant='outline'
            className={cn(
              'w-full justify-start text-left font-normal border-gray-300 text-gray-900 bg-white hover:bg-gray-50 hover:text-gray-900 focus:ring-blue-500 focus:border-blue-500',
              !selectedMonth && 'text-gray-500',
              selectedMonth && selectedYear && 'pr-8', // Add padding for clear button
              className
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            <span>{getDisplayText()}</span>
          </Button>
        </PopoverTrigger>
        {selectedMonth && selectedYear && (
          <button
            onClick={handleClear}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded px-1 transition-colors z-10'
            type='button'
            aria-label='Clear date'
          >
            ×
          </button>
        )}
        <PopoverContent className='w-80 p-4 bg-white border-gray-200 shadow-lg' align='start'>
          <div className='space-y-4'>
            {/* Year Navigation */}
            <div className='flex items-center justify-between'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => navigateYear('prev')}
                className='h-8 w-8 p-0 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-gray-300'
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <div className='font-medium text-gray-900'>{currentYear}</div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => navigateYear('next')}
                className='h-8 w-8 p-0 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-gray-300'
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>

            {/* Months Grid */}
            <div className='grid grid-cols-3 gap-2'>
              {MONTHS_RU.map((month, index) => {
                const monthNumber = index + 1
                const isSelected = selectedMonth === monthNumber && selectedYear === currentYear
                return (
                  <Button
                    key={month}
                    variant='outline'
                    size='sm'
                    onClick={() => handleMonthSelect(monthNumber)}
                    className={cn(
                      'h-10 text-sm font-normal bg-white border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-gray-900',
                      isSelected &&
                        'bg-blue-600 text-white hover:bg-blue-700 hover:text-white border-blue-600'
                    )}
                  >
                    {month}
                  </Button>
                )
              })}
            </div>

            {/* Clear Button */}
            {selectedMonth && selectedYear && (
              <div className='pt-2 border-t border-gray-200'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setSelectedMonth(undefined)
                    setSelectedYear(undefined)
                    onChange?.('')
                  }}
                  className='w-full h-8 text-sm bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border-gray-300'
                >
                  Очистить
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
