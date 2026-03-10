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
        <div className='p-2.5 bg-blue-50 rounded-lg flex-shrink-0'>
          <AddressIcon />
        </div>
        <div>
          <h3 className='text-sm font-semibold text-slate-900 mb-0.5'>{address}</h3>
          <p className='text-sm text-slate-500'>{addressValue}</p>
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className='p-2.5 bg-blue-50 rounded-lg flex-shrink-0'>
          <PhoneIcon />
        </div>
        <div>
          <h3 className='text-sm font-semibold text-slate-900 mb-0.5'>{phone}</h3>
          <p className='text-sm text-slate-500'>{phoneValue}</p>
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className='p-2.5 bg-blue-50 rounded-lg flex-shrink-0'>
          <EmailIcon />
        </div>
        <div>
          <h3 className='text-sm font-semibold text-slate-900 mb-0.5'>{email}</h3>
          <p className='text-sm text-slate-500'>{emailValue}</p>
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className='p-2.5 bg-blue-50 rounded-lg flex-shrink-0'>
          <UnpIcon />
        </div>
        <div>
          <h3 className='text-sm font-semibold text-slate-900 mb-0.5'>{unp}</h3>
          <p className='text-sm text-slate-500'>{unpValue}</p>
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className='p-2.5 bg-blue-50 rounded-lg flex-shrink-0'>
          <WorkingHoursIcon />
        </div>
        <div>
          <h3 className='text-sm font-semibold text-slate-900 mb-0.5'>{workingHours}</h3>
          <p className='text-sm text-slate-500'>{workingHoursValue}</p>
        </div>
      </div>
    </div>
  )
}
