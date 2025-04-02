import serviceData from './services.json'

export const serviceSlugs: Record<string, string> = serviceData

export type ServiceSlug = (typeof serviceSlugs)[keyof typeof serviceSlugs]

export const getServiceUrl = (locale: string, slug: ServiceSlug) => `/${locale}/services/${slug}`
