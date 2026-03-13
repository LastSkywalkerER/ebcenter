import Link from 'next/link'
import type { Locale } from '@/shared/i18n/config'
import { textWithLinks } from '@/shared/lib/textWithLinks'

export interface KnowledgeArticle {
  title: string
  slug: string
  href: string
}

interface KnowledgeSectionProps {
  tag?: string
  title: string
  paragraphs: string[]
  articlesTitle?: string
  articles: KnowledgeArticle[]
  locale?: Locale
}

const DocIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' className='shrink-0'>
    <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z' stroke='currentColor' strokeWidth='1.5'/>
    <path d='M14 2v6h6M16 13H8M16 17H8' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'/>
  </svg>
)

export function KnowledgeSection({
  tag,
  title,
  paragraphs,
  articlesTitle = 'Рекомендуемые статьи',
  articles,
  locale = 'ru',
}: KnowledgeSectionProps) {
  return (
    <section id='knowledge' className='py-[72px] bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-11 items-start'>
          {/* Left: text */}
          <div>
            {tag && (
              <span className='inline-block bg-blue-100 text-blue-600 text-[12px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-3'>
                {tag}
              </span>
            )}
            <h2 className='text-[clamp(22px,4vw,34px)] font-extrabold text-slate-900 leading-tight mb-4'>
              {title}
            </h2>
            <div className='space-y-3.5'>
              {paragraphs.map((p, i) => (
                <p key={i} className='text-[15px] text-slate-500 leading-[1.7]'>
                  {textWithLinks(p, locale)}
                </p>
              ))}
            </div>
          </div>

          {/* Right: article list */}
          <div>
            <h3 className='text-[17px] font-bold text-slate-900 mb-3.5'>{articlesTitle}</h3>
            <ul className='flex flex-col gap-2'>
              {articles.map((article, i) => (
                <li key={i}>
                  <Link
                    href={article.href}
                    className='group flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-3 text-[14px] font-medium text-slate-900 transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600'
                  >
                    <span className='text-blue-600 group-hover:text-white transition-colors'>
                      <DocIcon />
                    </span>
                    {article.title}
                  </Link>
                </li>
              ))}
              {articles.length === 0 && (
                <li className='text-sm text-slate-400 italic'>Статьи появятся здесь</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
