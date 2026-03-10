import React from 'react'

interface NotFoundProps {
  title: string
  description: string
}

export const NotFound: React.FC<NotFoundProps> = ({ title, description }) => {
  return (
    <div className='text-center py-12'>
      <h1 className='text-xl font-semibold text-slate-900 mb-2'>{title}</h1>
      <p className='text-sm text-slate-500 leading-relaxed'>{description}</p>
    </div>
  )
}
