# 🎮 GameFI Website - Simplified Plan

## 📚 Documentation Structure

This plan is complemented by additional technical documentation:

- **[Technical Specification](technical-specification.md)** - Detailed technical specification (SEO, constants, algorithms, types, error handling)
- **[Design System](design.md)** - Design system and UI guidelines
- **[Games Data](games.json)** - Game database in JSON format

## Goal
Create an interactive GameFI website with a game catalog with minimal complexity and maximum performance.

## 🎯 Technology Stack (Simplified)

### Frontend
- **Next.js 15** with App Router (Static Export)
- **Tailwind CSS** - for styling
- **TypeScript** - basic typing
- **Framer Motion** (optional) - for simple animations

### Data
- **Static JSON** - game data from `games.json`
- **Client-side filtering** - filtering on the client side
- **No backend** - fully static website

### Deployment
- **Cloudflare Pages** - single platform
- **Static export** - `next export` for maximum speed
- **No server functions** - pure static site

## 📁 Project Structure (Simplified)

```
gamefi/
├── app/
│   ├── page.tsx              # Homepage
│   ├── games/
│   │   ├── page.tsx          # Game catalog with filters
│   │   └── [slug]/page.tsx   # Individual game page (Static Params)
│   ├── layout.tsx            # Root layout
│   ├── not-found.tsx         # 404 page
│   ├── sitemap.ts            # Dynamic sitemap generation
│   └── robots.ts             # robots.txt configuration
├── components/
│   ├── GameCard.tsx          # Game card component
│   ├── GameGrid.tsx          # Game grid layout
│   ├── GameGridSkeleton.tsx  # Loading skeleton
│   ├── FilterPanel.tsx       # Filter panel with multiple options
│   ├── SearchBar.tsx         # Search with debounce
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Footer with links
│   ├── Breadcrumbs.tsx       # Breadcrumb navigation
│   ├── EmptyState.tsx        # Empty/error states
│   └── StatsTicket.tsx       # Homepage statistics
├── lib/
│   ├── data.ts               # Data loading and filtering
│   ├── types.ts              # TypeScript interfaces (extended)
│   ├── constants.ts          # Constants, enums, configuration
│   └── utils.ts              # Utility functions (filter, search, format)
├── public/
│   ├── images/               # Optimized images
│   ├── favicon.ico           # Favicon
│   ├── og-image.png          # Open Graph image
│   ├── twitter-image.png     # Twitter Card image
│   └── site.webmanifest      # PWA manifest
├── plan/
│   ├── plan.md               # This file - project plan
│   ├── technical-specification.md  # Detailed technical specs
│   ├── design.md             # Design system
│   └── games.json            # Games database
├── games.json                # Static game data (symlink/copy)
└── next.config.js            # Static export settings
```

> **📖 Implementation details:** See [`technical-specification.md`](technical-specification.md) for complete information about component structure, data types and utilities.

## 🎨 Components (Simplified)

### 1. GameCard
- Simple component with props
- Hover effects with Tailwind
- No complex state
- Link to game page

### 2. GameGrid
- Accepts filtered data
- Responsive grid with Tailwind
- No virtual scrolling (for simplicity)

### 3. FilterPanel
- Client-side state with useState
- Filters: categories, blockchains, platforms
- No URL sync (for simplicity)

### 4. SearchBar
- Simple input with onChange
- Debounce with useDebounce hook
- In-memory filtering

## ☁️ Deployment on Cloudflare Pages

### 1. Project Setup
```bash
# package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next export",
    "deploy": "npm run build && npm run export"
  }
}
```

### 2. Next.js Config
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export
  images: {
    unoptimized: true, // Disable Image optimization for static
  },
  // For GameFI design
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
```

### 3. Cloudflare Pages Setup
```bash
# wrangler.toml (not needed for Pages)
# Just connect GitHub repository to Cloudflare Pages
```

### 4. Build Settings in Cloudflare
- **Build command**: `npm run build && npm run export`
- **Build output directory**: `out`
- **Node.js version**: 20.x

## 🚀 Functionality (Simplified)

### Homepage
- Hero section with design from [`design.md`](design.md)
- Featured games (6 cards, selection logic in [`technical-specification.md`](technical-specification.md#featured-games-selection))
- Stats ticker with 4 key metrics (see `STATS` in [`constants.ts`](technical-specification.md#libconstantsts))
- CTA section to browse catalog

### Game Catalog (/games)
- **Grid of all games** - Responsive grid layout (1→2→3 columns)
- **Search** - Client-side with debounce (300ms), weighted relevance scoring
- **Filters** - Multiple filters with AND/OR logic:
  - Categories (OR within, AND between)
  - Blockchains (OR)
  - Platforms (OR)
  - Free-to-Play toggle
  - Minimum DAU slider
- **Sort options** - By popularity (DAU), name, featured status
- **Empty states** - "No results" with suggestions to clear filters
- **Loading states** - Skeleton loaders during initial load

> **🔎 Algorithms:** Detailed filtering and search logic described in [`technical-specification.md`](technical-specification.md#business-logic--algorithms)

### Game Page (/games/[slug])
- **Static generation** - All game pages pre-generated via `generateStaticParams`
- **Breadcrumbs** - Home > Catalog > [Game Name]
- **Game header** - Logo, name, ticker, categories
- **Detailed info** - Blockchain, platforms, DAU, F2P status, long description
- **External CTA** - "Play Game" button opening official website
- **Related games** - 3 games selected by similarity algorithm (category, chain, platform overlap)
- **SEO** - Dynamic metadata with Open Graph and Twitter Cards

> **🧮 Related Games Algorithm:** See [`technical-specification.md`](technical-specification.md#related-games-algorithm)

### Navigation Structure
- **Header** - Logo, nav links (Home, Catalog, About), CTA button, mobile menu
- **Footer** - Link groups (Product, Resources, Legal), social icons, copyright
- **404 Page** - Custom not-found page with CTAs

> **🧭 Navigation details:** Complete structure in [`technical-specification.md`](technical-specification.md#navigation--layout-structure)

## 📊 Data Layer

### Data Source
- **Static JSON** - [`games.json`](games.json) with 20 games
- **Client-side processing** - Filtering and searching on the client
- **No backend** - Fully static site

### Data Format & Types
```typescript
// lib/types.ts - Base interface
interface Game {
  name: string
  ticker: string
  category: string[]
  est_dau: string
  chain: string
  platforms: string[]
  is_f2p: boolean
  short_description: string
  long_description: string
  url: string
  logo: string
  slug?: string // Generated from name
}
```

> **📐 Extended typing:** See [`technical-specification.md`](technical-specification.md#type-definitions) for complete set of interfaces: `FilterState`, `GameCardProps`, `SearchBarProps`, `SortOption`, etc.

### Constants & Configuration
The following constants are defined in `lib/constants.ts`:

- **`CATEGORIES`** - 30+ game categories (RPG, TCG, Metaverse, etc.)
- **`BLOCKCHAINS`** - 14 supported networks (Ethereum, Ronin, TON, etc.)
- **`PLATFORMS`** - 7 platforms (Web, PC, Mobile, consoles)
- **`FEATURED_GAME_SLUGS`** - List of slugs for featured games on homepage
- **`STATS`** - Statistics for homepage ticker (20+ games, 5.5M+ users, etc.)
- **`SOCIAL_LINKS`** - Social media links
- **`NAV_LINKS`** / **`FOOTER_LINKS`** - Navigation links
- **`CATEGORY_ICONS`** - Mapping of categories to Lucide icons

> **📦 Complete list of constants:** See [`technical-specification.md`](technical-specification.md#constants--enums)

### Data Loading & Processing
```typescript
// lib/data.ts
import gamesData from '../games.json'
import { addSlug, validateGame } from './utils'

export function getAllGames(): Game[] {
  try {
    const validGames = gamesData.filter(validateGame)
    return validGames.map(addSlug)
  } catch (error) {
    console.error('Failed to load games:', error)
    return []
  }
}

export function getGameBySlug(slug: string): Game | undefined {
  return getAllGames().find(game => game.slug === slug)
}

export function getGamesByCategory(category: string): Game[] {
  return getAllGames().filter(game => game.category.includes(category))
}
```

### Utility Functions
Main functions in `lib/utils.ts`:

- **`filterGames()`** - Filtering with AND/OR logic
- **`searchGames()`** - Search with weighted scoring
- **`getFeaturedGames()`** - Selection of featured games
- **`getRelatedGames()`** - Finding similar games
- **`parseDAU()`** - Parsing "3,000,000+" → number
- **`formatNumber()`** - Formatting 1500000 → "1.5M"
- **`generateSlug()`** - Generating URL slug from name
- **`debounce()`** - Debounce for search input
- **`truncateText()`** - Truncation with ellipsis

> **🛠 Complete function specification:** See [`technical-specification.md`](technical-specification.md#utility-functions)

## 🎨 Design Implementation

### Tailwind Config
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bitcoin-orange': '#F7931A',
        'digital-gold': '#FFD600',
        'cosmic-void': '#030304',
        'deep-space': '#0F1115',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

### Global Styles
```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-cosmic-void text-white font-body;
  }
}

@layer components {
  .glow-orange {
    @apply shadow-lg shadow-orange-500/20;
  }
  
  .card-gamefi {
    @apply bg-deep-space/50 border border-white/10 rounded-2xl backdrop-blur-sm;
  }
}
```

## 📱 Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Mobile-first approach
- Grid: 1 column → 2 columns → 3 columns
- Filters: Drawer on mobile
- Search: Full width on mobile

## 🎯 Performance Optimization

### Static Generation
- All pages pre-generated
- No server-side rendering
- Instant page loads

### Image Optimization
- Optimize images before deploy
- WebP format
- Sizes: 200x200 for logos, 800x600 for heroes

### Bundle Size
- Tree-shaking with Next.js
- Code splitting by routes
- Optimized fonts

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] Create GitHub repository
- [ ] Install dependencies: `npm install`
- [ ] Verify build: `npm run build`
- [ ] Test locally: `npm run dev`
- [ ] Optimize images (WebP format, compress)
- [ ] Generate favicon package (all sizes)
- [ ] Create OG images (1200x630px for homepage, catalog, default)

### SEO Setup
- [ ] Configure metadata in all pages (homepage, catalog, game pages)
- [ ] Verify sitemap generation: `/sitemap.xml`
- [ ] Verify robots.txt: `/robots.txt`
- [ ] Add favicon and app icons to `/public`
- [ ] Test meta tags with [OpenGraph.xyz](https://www.opengraph.xyz/)
- [ ] Verify Twitter Card with [Card Validator](https://cards-dev.twitter.com/validator)

> **🎯 SEO configuration:** Complete meta-tag structure in [`technical-specification.md`](technical-specification.md#seo-configuration)

### Cloudflare Pages
- [ ] Connect to Cloudflare Pages via GitHub
- [ ] Build command: `npm run build`
- [ ] Build output directory: `out`
- [ ] Node.js version: `20.x`
- [ ] Set environment variables (if needed)
- [ ] Configure custom domain (optional)

### Quality Assurance
- [ ] Test all links (internal and external)
- [ ] Check responsive design (mobile, tablet, desktop)
- [ ] Test filter and search functionality
- [ ] Verify all game pages load correctly
- [ ] Test empty states and error handling
- [ ] Check performance with Lighthouse (target: 90+ score)
- [ ] Test keyboard navigation and accessibility
- [ ] Check browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Verify loading states and skeletons
- [ ] Test 404 page

### Post-deployment
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor analytics (if configured)
- [ ] Check for broken images
- [ ] Test from different devices
- [ ] Share on social media (test OG preview)

## 📈 Future Improvements (Not in current plan)

### Phase 2 (Post-Launch)
- [ ] User accounts and authentication
- [ ] Favorites and watchlist functionality
- [ ] User reviews and ratings
- [ ] Backend API for dynamic data
- [ ] Real-time DAU updates
- [ ] Advanced analytics dashboard

### Phase 3 (Web3 Features)
- [ ] Web3 wallet integration (MetaMask, WalletConnect)
- [ ] On-chain verification of game stats
- [ ] User-owned profiles as NFTs
- [ ] Token-gated premium features

### Phase 4 (Content Management)
- [ ] Admin panel for game management
- [ ] CMS for adding/editing games
- [ ] Automated game data scraping
- [ ] Community-submitted games (moderation)

## 🎉 Ready for Implementation

This comprehensive plan, together with [`technical-specification.md`](technical-specification.md), provides everything needed to build a production-ready GameFI catalog website:

✅ **Complete documentation** - Plan, design system, technical specification
✅ **Minimal complexity** - Static site without backend
✅ **Maximum performance** - Static generation, optimized images
✅ **Zero hosting costs** - Cloudflare Pages free hosting
✅ **Unique design** - "Crypto" aesthetic from [`design.md`](design.md)
✅ **SEO optimized** - Complete meta-tag configuration, sitemap, OG
✅ **Type-safe** - Extended TypeScript typing
✅ **Well-tested logic** - Documented algorithms for filtering, search, selection
✅ **Error handling** - All edge cases and empty states covered
✅ **Accessible** - Keyboard navigation, screen readers, WCAG compliance

**Estimated timeline:** 1-2 weeks for full implementation by following this documentation.

---

## 📖 Documentation Index

1. **[plan.md](plan.md)** (this file) - General project plan and overview
2. **[technical-specification.md](technical-specification.md)** - Detailed technical implementation guide
3. **[design.md](design.md)** - Complete design system and UI patterns
4. **[games.json](games.json)** - Game database (20 games)

Start implementation by reviewing all documents in order, then begin with project setup and structure.
