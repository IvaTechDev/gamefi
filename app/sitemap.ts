import { MetadataRoute } from 'next'
import { getAllGames, getAllPages } from '@/lib/data'
import { locales } from '@/i18n'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gamefi.ua'
  const games = getAllGames()
  const pages = getAllPages()
  
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Generate URLs for each locale
  locales.forEach(locale => {
    // Home page for each locale
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    })
    
    // Games catalog page for each locale
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/games`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    })
    
    // Individual game pages for each locale
    games.forEach(game => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/games/${game.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })
    
    // Static pages for each locale
    pages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/${page.slug}`,
        lastModified: new Date(page.pubdate),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  })
  
  return sitemapEntries
}
