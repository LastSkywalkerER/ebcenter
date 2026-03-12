import type { Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'

export const getServiceUrl = (locale: Locale, slug: string) =>
  `${getLocalePath(locale, '/services')}#${slug}`
