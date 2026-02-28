import config from '@payload-config'
import type { Locale } from '@/shared/i18n/config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { RenderRichText } from '@/shared/ui/richtext/RenderRichText'

type PageProps = {
  params: Promise<{ locale: Locale; slug: string[] }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { locale, slug } = await params
  const pathSlug = slug?.join('/') ?? ''

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: pathSlug } },
    limit: 1,
    locale,
  })

  const page = result.docs[0]
  if (!page) notFound()

  const pageData = page as {
    title?: string
    content?: Parameters<typeof RenderRichText>[0]['content']
  }

  return (
    <article className='max-w-4xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>{pageData.title}</h1>
      {pageData.content ? <RenderRichText content={pageData.content} /> : null}
    </article>
  )
}
