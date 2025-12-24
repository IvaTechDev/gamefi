# Implementation Plan - Static Pages from pages.json

This plan outlines the steps to add static pages to the GameFi Hub website based on the data provided in `pages.json`.

## 1. Data Layer Updates

### `lib/types.ts`
Add the `StaticPage` interface to represent the structure of pages in `pages.json`.

```typescript
export interface StaticPage {
  slug: string
  thumbnail: string
  pubdate: string
  titles: Record<string, string>
  descriptions: Record<string, string>
  texts: Record<string, string>
}
```

### `lib/data.ts`
Add functions to retrieve page data.

```typescript
import pagesData from '../pages.json'

export function getAllPages(): StaticPage[] {
  return pagesData as StaticPage[]
}

export function getPageBySlug(slug: string): StaticPage | undefined {
  return getAllPages().find(page => page.slug === slug)
}
```

## 2. Routing and UI

### `app/[locale]/[slug]/page.tsx`
Create a new dynamic route to render the static pages.
- Use `generateStaticParams` to pre-render all pages for all locales.
- Fetch page data using `getPageBySlug`.
- Render the page content (HTML from `texts` field).
- Include breadcrumbs and SEO metadata.

## 3. Sitemap Integration

### `app/sitemap.ts`
Update the sitemap generator to include the new static pages.

```typescript
const pages = getAllPages()
// ...
pages.forEach(page => {
  sitemapEntries.push({
    url: `${baseUrl}/${locale}/${page.slug}`,
    lastModified: new Date(page.pubdate),
    changeFrequency: 'monthly',
    priority: 0.7,
  })
})
```

## 4. Navigation Updates

### Translations (`messages/*.json`)
Add labels for the new pages in the navigation sections.
- `header.nav.buy_tokens`
- `footer.buy_tokens`

### `components/Header.tsx`
- Update `navLinks` to include the new pages.
- Change `/#about` to `/about`.

### `components/Footer.tsx`
- Update links in the "Resources" or "Product" sections.
- Change `/#about` to `/about`.

## 5. Verification
- Check that `/ua/about` and `/ua/buy_tokens` (and other locales) render correctly.
- Verify that the sitemap at `/sitemap.xml` contains the new URLs.
- Ensure navigation links work as expected.
