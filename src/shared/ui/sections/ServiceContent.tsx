import { ServiceDetails } from '@/shared/types/services'
import { CheckIcon } from '@/shared/ui/icons/ServiceIcons'
import React from 'react'

interface ServiceContentProps {
  serviceDetails: ServiceDetails
}

export const ServiceContent: React.FC<ServiceContentProps> = ({ serviceDetails }) => {
  return (
    <div className='space-y-3'>
      {serviceDetails.content.map((item, index) => (
        <div key={index} className='flex items-start gap-3 py-3 border-b border-slate-100 last:border-0'>
          <div className='text-blue-500 mt-0.5 flex-shrink-0'>
            <CheckIcon />
          </div>
          <p className='text-sm text-slate-700 leading-relaxed'>{item}</p>
        </div>
      ))}
    </div>
  )
}
