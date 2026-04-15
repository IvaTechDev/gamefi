import { Metadata } from 'next'
import HomePageClient from './../HomePageClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    alternates: {
      canonical: `https://gamefi.ua/${locale}/`,
    },
    openGraph: {
      type: 'website',
      url: `https://gamefi.ua/${locale}/`,
      images: ['/og-image.png'],
    },
  }
}

export default async function HomePage() {
  return <HomePageClient />
}
