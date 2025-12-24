# Multilingual Sitemap Implementation Specification

## Executive Summary

This document provides detailed implementation specifications for updating the sitemap generation to support multilingual URLs across English (en), Ukrainian (ua), and Russian (ru) locales.

## Configuration Updates

### 1. Fix i18n Default Locale Consistency

**File:** [`i18n/request.ts`](../i18n/request.ts:5)

**Current Code:**
```typescript
export const defaultLocale = 'en'
```

**Updated Code:**
```typescript
export const defaultLocale = 'ua'
```

**Rationale:** Align with [`i18n.ts`](../i18n.ts:8) which sets Ukrainian as the default locale.

---

## Sitemap Implementation

### 2. Update Sitemap Generation

**File:** [`app/sitemap.ts`](../app/sitemap.ts:1)

**Current Implementation Issues:**
- Only generates base URLs without locale prefixes
- Missing locale-specific home pages
- Missing locale-specific catalog pages
- Game pages don't include locale in URL

**New Implementation:**

```typescript
import { MetadataRoute } from 'next'
import { getAllGames } from '@/lib/data'
import { locales } from '@/i18n'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gamefi.ua'
  const games = getAllGames()
  
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
  })
  
  return sitemapEntries
}
```

---

## URL Structure Specification

### Complete URL Mapping

#### Home Pages (3 URLs)
| Locale | URL | Priority | Change Frequency |
|--------|-----|----------|------------------|
| en | `https://gamefi.ua/en` | 1.0 | daily |
| ua | `https://gamefi.ua/ua` | 1.0 | daily |
| ru | `https://gamefi.ua/ru` | 1.0 | daily |

#### Catalog Pages (3 URLs)
| Locale | URL | Priority | Change Frequency |
|--------|-----|----------|------------------|
| en | `https://gamefi.ua/en/games` | 0.9 | daily |
| ua | `https://gamefi.ua/ua/games` | 0.9 | daily |
| ru | `https://gamefi.ua/ru/games` | 0.9 | daily |

#### Game Detail Pages (N × 3 URLs)
For each game slug (e.g., `hamster-kombat`):
| Locale | URL Pattern | Priority | Change Frequency |
|--------|-------------|----------|------------------|
| en | `https://gamefi.ua/en/games/{slug}` | 0.8 | weekly |
| ua | `https://gamefi.ua/ua/games/{slug}` | 0.8 | weekly |
| ru | `https://gamefi.ua/ru/games/{slug}` | 0.8 | weekly |

### Total URL Count Calculation
```
Total URLs = (Number of games × 3 locales) + 6 static pages

Example with 20 games:
- Home pages: 3
- Catalog pages: 3
- Game pages: 20 × 3 = 60
- Total: 66 URLs
```

---

## Priority Guidelines

### Priority Scale (0.0 to 1.0)

**1.0 - Highest Priority**
- Home pages for all locales
- Most important entry points
- Updated frequently with featured games

**0.9 - Very High Priority**
- Games catalog pages
- Primary navigation destinations
- Updated when new games added

**0.8 - High Priority**
- Individual game detail pages
- Content pages with user engagement
- Updated weekly or when game info changes

### Change Frequency Rationale

**Daily**
- Home pages: Featured games rotate, stats update
- Catalog pages: New games added, game positions change

**Weekly**
- Game detail pages: Stats update (DAU, etc.)
- Content relatively stable but needs regular refresh

---

## Implementation Details

### Required Imports

```typescript
import { MetadataRoute } from 'next'  // Next.js sitemap type
import { getAllGames } from '@/lib/data'  // Game data access
import { locales } from '@/i18n'  // Locale configuration
```

### Type Safety

The implementation uses `MetadataRoute.Sitemap` type which ensures:
- URL is string
- lastModified is Date
- changeFrequency is valid value: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
- priority is number between 0 and 1

### Static Generation

```typescript
export const dynamic = 'force-static'
```

This ensures the sitemap is generated at build time and served as static XML.

---

## Testing Protocol

### 1. Local Development Test

```bash
# Start development server
npm run dev

# Access sitemap in browser
open http://localhost:3000/sitemap.xml
```

**Expected Results:**
- XML document loads successfully
- Contains all locale home pages (3)
- Contains all locale catalog pages (3)
- Contains all game pages for all locales

### 2. Build Test

```bash
# Build the application
npm run build

# Start production server
npm start

# Verify sitemap
curl http://localhost:3000/sitemap.xml
```

**Expected Results:**
- Build completes without errors
- Sitemap generates at build time
- All URLs are properly formatted

### 3. XML Validation

Use online tools:
- https://www.xml-sitemaps.com/validate-xml-sitemap.html
- https://www.xmlvalidation.com/

**Expected Results:**
- Valid XML syntax
- Compliant with sitemap protocol
- No malformed URLs

### 4. URL Count Verification

```bash
# Count URLs in sitemap
curl http://localhost:3000/sitemap.xml | grep -c "<url>"
```

**Expected Count:**
```
(number_of_games × 3) + 6

Example with 20 games: 66 URLs
```

### 5. Spot Check URLs

Manually verify sample URLs:
- `/en` - English home page
- `/ua` - Ukrainian home page (default)
- `/ru` - Russian home page
- `/en/games` - English catalog
- `/ua/games/hamster-kombat` - Ukrainian game page
- `/ru/games/pixels` - Russian game page

**Expected Results:**
- All URLs return 200 status
- Content is in correct language
- No 404 errors

---

## Validation Checklist

### Pre-Implementation
- [x] Configuration inconsistency identified
- [x] URL structure defined
- [x] Priority scheme established
- [x] Implementation code written

### Post-Implementation
- [ ] Code changes applied to files
- [ ] No TypeScript compilation errors
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] All locale home pages present
- [ ] All locale catalog pages present
- [ ] All game pages for all locales present
- [ ] URL count matches expected formula
- [ ] XML syntax is valid
- [ ] Priorities are correct (1.0, 0.9, 0.8)
- [ ] Change frequencies are appropriate
- [ ] lastModified dates are present

### Production Validation
- [ ] Sitemap deployed successfully
- [ ] Robots.txt references correct sitemap
- [ ] Google Search Console can access sitemap
- [ ] No crawl errors reported
- [ ] All locale pages being indexed

---

## SEO Impact Analysis

### Positive Impacts

1. **Improved Discoverability**
   - Search engines can find all language versions
   - Each locale indexed separately
   - Better regional search rankings

2. **Complete Coverage**
   - No missing pages from index
   - All games accessible in all languages
   - Consistent URL structure

3. **Priority Signaling**
   - Search engines understand page importance
   - Crawl budget optimized
   - Important pages crawled more frequently

4. **Update Cadence**
   - Change frequency guides re-crawl schedule
   - Fresh content prioritized
   - Stable content crawled less often

### Metrics to Monitor

1. **Index Coverage**
   - Total indexed pages per locale
   - Should approach 100% coverage

2. **Crawl Stats**
   - Pages crawled per day
   - Crawl errors (should be 0)

3. **Search Performance**
   - Impressions per locale
   - Click-through rates by language

4. **URL Discovery**
   - How search engines find pages
   - Sitemap vs other methods

---

## Integration Points

### Existing Features

1. **Robots.txt** ([`app/robots.ts`](../app/robots.ts:21))
   - Already references sitemap
   - No changes needed
   - Works with new structure

2. **Metadata Alternates** ([`app/[locale]/layout.tsx`](../app/[locale]/layout.tsx:63-70))
   - Already defines language alternates
   - Complements sitemap structure
   - Helps search engines understand language relationships

3. **Middleware** ([`middleware.ts`](../middleware.ts:7))
   - Uses `localePrefix: 'always'`
   - Ensures URLs match sitemap format
   - Handles locale routing automatically

4. **Route Generation** ([`app/[locale]/layout.tsx`](../app/[locale]/layout.tsx:74-79))
   - `generateStaticParams` defines locales
   - Ensures all locale routes are built
   - Matches sitemap locale structure

### No Breaking Changes

- Existing URLs remain valid
- All routes continue to work
- No impact on user navigation
- Only improves SEO visibility

---

## Rollback Plan

If issues arise after deployment:

### Quick Rollback

**Option 1: Revert to Previous Version**
```bash
git revert <commit-hash>
git push
```

**Option 2: Temporary Fix**
Restore old [`sitemap.ts`](../app/sitemap.ts:1) content from git history.

### Common Issues & Solutions

**Issue: Too many URLs**
- Solution: Implement sitemap index if >50,000 URLs
- Current: ~66 URLs, well within limit

**Issue: Invalid XML**
- Solution: Check for special characters in URLs
- Verify: Game slugs are URL-safe

**Issue: Wrong URLs**
- Solution: Verify locale array is correct
- Check: Middleware configuration matches

**Issue: 404 Errors**
- Solution: Ensure routes are properly generated
- Verify: `generateStaticParams` in layouts

---

## Maintenance Guidelines

### When Adding New Games

1. No sitemap code changes needed
2. Sitemap regenerates automatically on build
3. New game appears in all locales

### When Adding New Locales

1. Add locale to [`i18n.ts`](../i18n.ts:5) and [`i18n/request.ts`](../i18n/request.ts:4)
2. Create message file in `messages/` directory
3. Add to `generateStaticParams` in [`app/[locale]/layout.tsx`](../app/[locale]/layout.tsx:74-79)
4. Sitemap automatically includes new locale
5. Update robots.txt if needed

### Regular Monitoring

**Weekly:**
- Check Google Search Console for crawl errors
- Verify sitemap is accessible
- Monitor index coverage

**Monthly:**
- Review indexed pages per locale
- Check for any missing pages
- Verify priorities are still appropriate

**Quarterly:**
- Reassess change frequencies
- Adjust priorities if needed
- Optimize based on analytics

---

## Performance Considerations

### Build Time Impact

**Minimal Impact:**
- Sitemap generation is fast
- Linear O(n) complexity where n = number of games
- No external API calls
- All data from local JSON

**Estimated Build Time:**
- 20 games: <1 second
- 100 games: ~1 second
- 1000 games: ~5 seconds

### File Size

**Current Estimate:**
- ~500 bytes per URL entry
- 66 URLs × 500 bytes = ~33KB
- Well within 50MB limit

**Scalability:**
- Can handle up to ~100,000 URLs before hitting 50MB limit
- Current design supports ~16,000 games (16,000 × 3 + 6 URLs)

---

## Deployment Steps

1. **Update Code**
   - Modify [`i18n/request.ts`](../i18n/request.ts:5)
   - Modify [`app/sitemap.ts`](../app/sitemap.ts:1)

2. **Local Testing**
   - Run development server
   - Verify sitemap.xml output
   - Test sample URLs

3. **Build Verification**
   - Run production build
   - Check for TypeScript errors
   - Verify static generation

4. **Commit Changes**
   ```bash
   git add app/sitemap.ts i18n/request.ts
   git commit -m "feat: add multilingual sitemap support for en, ua, ru locales"
   ```

5. **Deploy**
   - Push to repository
   - Cloudflare Pages auto-deploys
   - Monitor deployment logs

6. **Post-Deployment Verification**
   - Access production sitemap
   - Submit to Google Search Console
   - Monitor for crawl errors

---

## Success Criteria

### Immediate (Day 1)
- ✅ Sitemap accessible at `/sitemap.xml`
- ✅ All URLs return 200 status
- ✅ XML is valid
- ✅ Correct URL count

### Short-term (Week 1)
- ✅ Google Search Console accepts sitemap
- ✅ No crawl errors
- ✅ Pages being discovered

### Medium-term (Month 1)
- ✅ All locale pages indexed
- ✅ Index coverage >95%
- ✅ Regional search visibility improved

### Long-term (Quarter 1)
- ✅ Organic traffic from all locales
- ✅ Improved search rankings per locale
- ✅ Consistent crawl patterns

---

## References

### Documentation
- [Next.js Sitemap Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Google Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

### Internal Files
- [`app/sitemap.ts`](../app/sitemap.ts:1) - Sitemap implementation
- [`app/robots.ts`](../app/robots.ts:1) - Robots.txt configuration
- [`i18n.ts`](../i18n.ts:1) - i18n configuration
- [`i18n/request.ts`](../i18n/request.ts:1) - i18n request handler
- [`middleware.ts`](../middleware.ts:1) - Locale routing
- [`app/[locale]/layout.tsx`](../app/[locale]/layout.tsx:1) - Locale layout

### Tools
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [Google Search Console](https://search.google.com/search-console)
- [Sitemaps.org Validator](https://www.sitemaps.org/protocol.html)
