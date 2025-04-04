import { TariffItem } from '@/shared/types/services'
import { CheckIcon } from '@/shared/ui/icons/ServiceIcons'
import React from 'react'

interface TariffCardProps {
  tariff: TariffItem
  isLast: boolean
}

export const TariffCard: React.FC<TariffCardProps> = ({ tariff, isLast }) => {
  return (
    <div className={`border-b border-gray-200 ${isLast ? 'last:border-b-0 pb-0' : 'pb-6'}`}>
      <div className='flex flex-col md:flex-row md:items-start md:justify-between mb-4'>
        <div className='flex-1'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-medium text-gray-900'>{tariff.name}</h2>
            <span className='text-lg font-medium text-gray-900'>{tariff.price}</span>
          </div>
          <p className='text-sm text-gray-600'>{tariff.description}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {tariff.features.map((feature, featureIndex) => (
          <div key={featureIndex} className='flex items-center text-sm text-gray-600'>
            <CheckIcon />
            {feature}
          </div>
        ))}
      </div>
    </div>
  )
}
