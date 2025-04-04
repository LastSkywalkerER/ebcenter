import React from 'react'

interface NotFoundProps {
  title: string
  description: string
}

export const NotFound: React.FC<NotFoundProps> = ({ title, description }) => {
  return (
    <div className='text-center py-12'>
      <h1 className='text-2xl font-semibold text-gray-900 mb-2'>{title}</h1>
      <p className='text-sm text-gray-600'>{description}</p>
    </div>
  )
}
