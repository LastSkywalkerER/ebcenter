import React from 'react'
import { AddressIcon, BuildingIcon, EmailIcon, PhoneIcon, UnpIcon, WorkingHoursIcon } from '../icons/ContactIcons'

interface ContactInfoProps {
  variant?: 'light' | 'dark'
  organizationName?: string
  organizationNameValue?: string
  address: string
  addressValue: string
  postalAddress?: string
  postalAddressValue?: string
  phone: string
  phoneValue: string
  email: string
  emailValue: string
  unp: string
  unpValue: string
  workingHours: string
  workingHoursValue: string
}

const labelClass = (v: 'light' | 'dark') =>
  v === 'dark' ? 'text-white/95' : 'text-slate-900'
const valueClass = (v: 'light' | 'dark') =>
  v === 'dark' ? 'text-white/80' : 'text-slate-500'
const iconBgClass = (v: 'light' | 'dark') =>
  v === 'dark' ? 'bg-white/20 [&_svg]:text-white' : 'bg-blue-50'

export const ContactInfo: React.FC<ContactInfoProps> = ({
  variant = 'light',
  organizationName,
  organizationNameValue,
  address,
  addressValue,
  postalAddress,
  postalAddressValue,
  phone,
  phoneValue,
  email,
  emailValue,
  unp,
  unpValue,
  workingHours,
  workingHoursValue,
}) => {
  const label = labelClass(variant)
  const value = valueClass(variant)
  const iconBg = iconBgClass(variant)
  return (
    <div className='space-y-6'>
      {organizationName != null && organizationNameValue && (
        <div className='flex items-start gap-4'>
          <div className={`p-2.5 ${iconBg} rounded-lg flex-shrink-0`}>
            <BuildingIcon />
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${label} mb-0.5`}>{organizationName}</h3>
            <p className={`text-sm ${value}`}>{organizationNameValue}</p>
          </div>
        </div>
      )}
      <div className='flex items-start gap-4'>
        <div className={`p-2.5 ${iconBg} rounded-lg flex-shrink-0`}>
          <AddressIcon />
        </div>
        <div>
          <h3 className={`text-sm font-semibold ${label} mb-0.5`}>{address}</h3>
          <p className={`text-sm ${value}`}>{addressValue}</p>
        </div>
      </div>
      {postalAddress != null && postalAddressValue && (
        <div className='flex items-start gap-4'>
          <div className={`p-2.5 ${iconBg} rounded-lg flex-shrink-0`}>
            <AddressIcon />
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${label} mb-0.5`}>{postalAddress}</h3>
            <p className={`text-sm ${value}`}>{postalAddressValue}</p>
          </div>
        </div>
      )}
      <div className='flex items-start gap-4'>
        <div className={`p-2.5 ${iconBg} rounded-lg flex-shrink-0`}>
          <PhoneIcon />
        </div>
        <div>
          <h3 className={`text-sm font-semibold ${label} mb-0.5`}>{phone}</h3>
          {variant === 'dark' ? (
            <a href={`tel:${phoneValue.replace(/\D/g, '')}`} className={`text-sm ${value} hover:text-white block`}>{phoneValue}</a>
          ) : (
            <p className={`text-sm ${value}`}>{phoneValue}</p>
          )}
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className={`p-2.5 ${iconBg} rounded-lg flex-shrink-0`}>
          <EmailIcon />
        </div>
        <div>
          <h3 className={`text-sm font-semibold ${label} mb-0.5`}>{email}</h3>
          {variant === 'dark' ? (
            <a href={`mailto:${emailValue}`} className={`text-sm ${value} hover:text-white block`}>{emailValue}</a>
          ) : (
            <p className={`text-sm ${value}`}>{emailValue}</p>
          )}
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className={`p-2.5 ${iconBg} rounded-lg flex-shrink-0`}>
          <UnpIcon />
        </div>
        <div>
          <h3 className={`text-sm font-semibold ${label} mb-0.5`}>{unp}</h3>
          <p className={`text-sm ${value}`}>{unpValue}</p>
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className={`p-2.5 ${iconBg} rounded-lg flex-shrink-0`}>
          <WorkingHoursIcon />
        </div>
        <div>
          <h3 className={`text-sm font-semibold ${label} mb-0.5`}>{workingHours}</h3>
          <p className={`text-sm ${value}`}>{workingHoursValue}</p>
        </div>
      </div>
    </div>
  )
}
