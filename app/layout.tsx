import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'GameFI Catalog | Discover Top Play-to-Earn Blockchain Games',
  description: 'Explore the ultimate catalog of Play-to-Earn blockchain games. Find the best GameFI projects, compare DAU, blockchains, and platforms. Your gateway to Web3 gaming.',
  keywords: 'GameFI, Play-to-Earn, P2E, blockchain games, crypto games, Web3 gaming, NFT games, metaverse',
  authors: [{ name: 'GameFI Catalog' }],
  creator: 'GameFI Catalog',
  publisher: 'GameFI Catalog',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gamefi-catalog.pages.dev',
    siteName: 'GameFI Catalog',
    title: 'GameFI Catalog | Discover Top Play-to-Earn Blockchain Games',
    description: 'Explore the ultimate catalog of Play-to-Earn blockchain games. Find the best GameFI projects, compare DAU, blockchains, and platforms.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GameFI Catalog - Play-to-Earn Games',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GameFI Catalog | Discover Top Play-to-Earn Blockchain Games',
    description: 'Explore the ultimate catalog of Play-to-Earn blockchain games. Find the best GameFI projects.',
    images: ['/twitter-image.png'],
    creator: '@gamefi_catalog',
  },
  alternates: {
    canonical: 'https://gamefi-catalog.pages.dev',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
