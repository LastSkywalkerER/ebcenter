import React from 'react'

export interface CourseItem {
  title: string
  duration: string
  price: string
  topics: string[]
  icon: React.ReactNode
}

export interface CourseData {
  slug: string
  title: string
  duration: string
  price: string
  topics: string[]
}
