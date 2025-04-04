import { ServiceDetails } from '@/shared/types/services'
import { CheckIcon } from '@/shared/ui/icons/ServiceIcons'
import React from 'react'

interface ServiceContentProps {
  serviceDetails: ServiceDetails
}

export const ServiceContent: React.FC<ServiceContentProps> = ({ serviceDetails }) => {
  return (
    <>
      <div className='mb-12'>
        <h1 className='text-2xl font-semibold text-gray-900 mb-2'>{serviceDetails.title}</h1>
        <p className='text-gray-600 text-sm'>{serviceDetails.description}</p>
      </div>

      <div className='space-y-4'>
        {serviceDetails.content.map((item, index) => (
          <div key={index} className='flex items-start'>
            <CheckIcon />
            <p className='text-gray-600'>{item}</p>
          </div>
        ))}
      </div>
    </>
  )
}
