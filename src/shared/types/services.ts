import React from 'react'

export interface ServiceItem {
  title: string
  description: string
  slug: string
}

export interface ServiceDetails {
  title: string
  description: string
  content: string[]
}

export interface TariffItem {
  name: string
  price: string
  description: string
  features: string[]
}

export interface ServiceTariffs {
  title: string
  description: string
  items: TariffItem[]
}

export interface ServiceWithTariffs extends ServiceItem {
  hasTariffs: boolean
  icon: React.ReactNode
}
