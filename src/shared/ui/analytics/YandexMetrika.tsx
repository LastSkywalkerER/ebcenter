'use client'

import Script from 'next/script'

const YANDEX_ID = 107694202

declare global {
  interface Window {
    ym?: (id: number, action: string, opts?: Record<string, unknown>) => void
  }
}

export function YandexMetrika() {
  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        src="https://mc.yandex.ru/metrika/tag.js"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.ym) {
            window.ym(YANDEX_ID, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: 'dataLayer',
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true,
            })
          }
        }}
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_ID}`}
            style={{ position: 'absolute', left: -9999 }}
            alt=""
          />
        </div>
      </noscript>
    </>
  )
}
