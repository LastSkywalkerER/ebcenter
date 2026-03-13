import React from 'react'
import type { Locale } from '@/shared/i18n/config'

const LINK_MAP: Record<Locale, Record<string, string>> = {
  ru: {
    Belsmeta: 'https://www.belsmeta.by/',
    НРР: 'https://belenir.com/',
  },
  en: {
    Belsmeta: 'https://www.belsmeta.by/',
    NRR: 'https://belenir.com/',
  },
}

/**
 * Renders text with specific words replaced by external links.
 * Used for SEO: Belsmeta -> belsmeta.by, НРР/NRR -> belenir.com
 */
export function textWithLinks(text: string, locale: Locale): React.ReactNode {
  const links = LINK_MAP[locale]
  const words = Object.keys(links).sort((a, b) => b.length - a.length) // Longer first to avoid partial matches

  let remaining = text
  const parts: React.ReactNode[] = []
  let key = 0

  while (remaining.length > 0) {
    let earliestIndex = remaining.length
    let matchedWord = ''
    let matchedUrl = ''

    for (const word of words) {
      const idx = remaining.indexOf(word)
      if (idx !== -1 && idx < earliestIndex) {
        earliestIndex = idx
        matchedWord = word
        matchedUrl = links[word]
      }
    }

    if (matchedWord) {
      if (earliestIndex > 0) {
        parts.push(
          <React.Fragment key={key++}>
            {remaining.slice(0, earliestIndex)}
          </React.Fragment>
        )
      }
      parts.push(
        <a
          key={key++}
          href={matchedUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 hover:text-blue-800 underline font-medium'
        >
          {matchedWord}
        </a>
      )
      remaining = remaining.slice(earliestIndex + matchedWord.length)
    } else {
      parts.push(
        <React.Fragment key={key++}>
          {remaining}
        </React.Fragment>
      )
      break
    }
  }

  return <>{parts}</>
}
