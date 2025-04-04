import React from 'react'
import { AddressIcon, EmailIcon, PhoneIcon, UnpIcon, WorkingHoursIcon } from '../icons/ContactIcons'

interface ContactInfoProps {
  address: string
  addressValue: string
  phone: string
  phoneValue: string
  email: string
  emailValue: string
  unp: string
  unpValue: string
  workingHours: string
  workingHoursValue: string
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  address,
  addressValue,
  phone,
  phoneValue,
  email,
  emailValue,
  unp,
  unpValue,
  workingHours,
  workingHoursValue,
}) => {
  return (
    <div className='space-y-6'>
      <div className='flex items-start gap-4'>
        <div className='p-3 bg-blue-50 rounded-lg'>
          <AddressIcon />
        </div>
        <div>
          <h3 className='font-semibold text-gray-900 mb-1'>{address}</h3>
          <p className='text-gray-600'>{addressValue}</p>
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className='p-3 bg-blue-50 rounded-lg'>
          <PhoneIcon />
        </div>
        <div>
          <h3 className='font-semibold text-gray-900 mb-1'>{phone}</h3>
          <p className='text-gray-600'>{phoneValue}</p>
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className='p-3 bg-blue-50 rounded-lg'>
          <EmailIcon />
        </div>
        <div>
          <h3 className='font-semibold text-gray-900 mb-1'>{email}</h3>
          <p className='text-gray-600'>{emailValue}</p>
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className='p-3 bg-blue-50 rounded-lg'>
          <UnpIcon />
        </div>
        <div>
          <h3 className='font-semibold text-gray-900 mb-1'>{unp}</h3>
          <p className='text-gray-600'>{unpValue}</p>
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className='p-3 bg-blue-50 rounded-lg'>
          <WorkingHoursIcon />
        </div>
        <div>
          <h3 className='font-semibold text-gray-900 mb-1'>{workingHours}</h3>
          <p className='text-gray-600'>{workingHoursValue}</p>
        </div>
      </div>
    </div>
  )
}
