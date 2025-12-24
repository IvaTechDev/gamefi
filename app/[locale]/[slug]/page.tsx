import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPageBySlug, getAllPages } from '@/lib/data'
import { locales } from '@/i18n'
import Breadcrumbs from '@/components/Breadcrumbs'

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const pages = getAllPages()
  const params: { locale: string; slug: string }[] = []

  locales.forEach((locale) => {
    pages.forEach((page) => {
      params.push({
        locale,
        slug: page.slug,
      })
    })
  })

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const page = getPageBySlug(slug)

  if (!page) {
    return {}
  }

  const title = page.titles[locale] || page.titles['en']
  const description = page.descriptions[locale] || page.descriptions['en']

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [page.thumbnail],
    },
  }
}

export default async function StaticPage({ params }: PageProps) {
  const { locale, slug } = await params
  const page = getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  const title = page.titles[locale] || page.titles['en']
  const content = page.texts[locale] || page.texts['en']

  const breadcrumbs = [
    { label: locale === 'ua' ? 'Головна' : locale === 'ru' ? 'Главная' : 'Home', href: '/' },
    { label: title },
  ]

  return (
    <div className="min-h-screen">
      {/* Header Background */}
      <div className="h-48 bg-gradient-to-b from-deep-space to-cosmic-void border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-bitcoin-orange/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-24">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        <article className="card-gamefi p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 gradient-text">
            {title}
          </h1>
          
          {page.thumbnail && (
            <div className="relative w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={page.thumbnail}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div 
            className="prose prose-invert prose-orange max-w-none
              prose-headings:font-heading prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-6
              prose-li:text-white/70 prose-li:mb-2
              prose-strong:text-white prose-strong:font-semibold
              prose-b:text-white prose-b:font-semibold
              prose-i:text-bitcoin-orange/90
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          
          <div className="mt-12 pt-8 border-t border-white/10 text-sm text-white/40 font-mono">
            {locale === 'ua' ? 'Опубліковано: ' : locale === 'ru' ? 'Опубликовано: ' : 'Published: '}
            {new Date(page.pubdate).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </article>
      </div>
    </div>
  )
}
