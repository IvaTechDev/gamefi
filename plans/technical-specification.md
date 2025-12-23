# 🔧 GameFI Technical Specification

This document contains detailed technical specification of the GameFI catalog project, covering all critical gaps in documentation.

---

## 📋 Table of Contents

1. [SEO Configuration](#seo-configuration)
2. [Constants & Enums](#constants--enums)
3. [Type Definitions](#type-definitions)
4. [Business Logic & Algorithms](#business-logic--algorithms)
5. [Navigation & Layout Structure](#navigation--layout-structure)
6. [Error Handling & Edge Cases](#error-handling--edge-cases)
7. [Utility Functions](#utility-functions)

---

## 🎯 SEO Configuration

### Meta Tags Structure

#### Homepage Meta Tags
```typescript
// app/page.tsx
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
```

#### Game Catalog Page Meta Tags
```typescript
// app/games/page.tsx
export const metadata: Metadata = {
  title: 'Game Catalog | Browse All Play-to-Earn Blockchain Games',
  description: 'Browse 20+ top Play-to-Earn blockchain games. Filter by category, chain, platform. Find your next GameFI adventure with our comprehensive catalog.',
  keywords: 'game catalog, P2E games, blockchain games list, crypto games directory, GameFI catalog',
  openGraph: {
    type: 'website',
    url: 'https://gamefi-catalog.pages.dev/games',
    title: 'Game Catalog | Browse All Play-to-Earn Blockchain Games',
    description: 'Browse 20+ top Play-to-Earn blockchain games. Filter by category, chain, platform.',
    images: ['/og-catalog.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Game Catalog | Browse All Play-to-Earn Blockchain Games',
    description: 'Browse 20+ top Play-to-Earn blockchain games.',
    images: ['/twitter-catalog.png'],
  },
  alternates: {
    canonical: 'https://gamefi-catalog.pages.dev/games',
  },
}
```

#### Individual Game Page Meta Tags (Dynamic)
```typescript
// app/games/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const game = getGameBySlug(params.slug)
  
  if (!game) {
    return {
      title: 'Game Not Found | GameFI Catalog',
      description: 'The requested game could not be found in our catalog.',
    }
  }

  return {
    title: `${game.name} (${game.ticker}) | GameFI Catalog`,
    description: game.short_description,
    keywords: `${game.name}, ${game.ticker}, ${game.category.join(', ')}, ${game.chain}, Play-to-Earn`,
    openGraph: {
      type: 'website',
      url: `https://gamefi-catalog.pages.dev/games/${params.slug}`,
      title: `${game.name} (${game.ticker}) | Play-to-Earn Game on ${game.chain}`,
      description: game.short_description,
      images: [
        {
          url: game.logo || '/default-game-og.png',
          width: 800,
          height: 600,
          alt: `${game.name} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.name} (${game.ticker})`,
      description: game.short_description,
      images: [game.logo || '/default-game-twitter.png'],
    },
    alternates: {
      canonical: `https://gamefi-catalog.pages.dev/games/${params.slug}`,
    },
  }
}
```

### Sitemap Configuration

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllGames } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gamefi-catalog.pages.dev'
  const games = getAllGames()
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]
  
  // Dynamic game pages
  const gamePages: MetadataRoute.Sitemap = games.map((game) => ({
    url: `${baseUrl}/games/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  return [...staticPages, ...gamePages]
}
```

### robots.txt Configuration

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://gamefi-catalog.pages.dev'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

### Favicon and App Icons

Place in `public/` folder:

```
public/
├── favicon.ico                 # 32x32px
├── favicon-16x16.png           # 16x16px
├── favicon-32x32.png           # 32x32px
├── apple-touch-icon.png        # 180x180px
├── android-chrome-192x192.png  # 192x192px
├── android-chrome-512x512.png  # 512x512px
├── og-image.png                # 1200x630px (Open Graph)
├── twitter-image.png           # 1200x600px (Twitter Card)
└── site.webmanifest
```

#### site.webmanifest
```json
{
  "name": "GameFI Catalog",
  "short_name": "GameFI",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#F7931A",
  "background_color": "#030304",
  "display": "standalone"
}
```

#### Favicon Meta Tags (in layout.tsx)
```tsx
// app/layout.tsx
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}
```

---

## 📦 Constants & Enums

### lib/constants.ts

```typescript
// lib/constants.ts

/**
 * Available game categories
 * Used for filtering and display
 */
export const CATEGORIES = [
  'Action RPG',
  'Auto-Battler',
  'Battle Royale',
  'Collectible',
  'DeFi',
  'Extraction Shooter',
  'Fantasy Sports',
  'Farming',
  'Fitness',
  'FPS',
  'Fully On-Chain',
  'Idle',
  'Lifestyle',
  'Metaverse',
  'Mining',
  'MMO',
  'MMORPG',
  'Move-to-Earn',
  'Multiplayer',
  'Open World',
  'RPG',
  'Sci-Fi',
  'Shooter',
  'Simulation',
  'Social',
  'Space Sim',
  'Strategy',
  'Tap-to-Earn',
  'TCG',
  'Turn-Based',
  'UGC',
] as const

/**
 * Supported blockchain networks
 * Sorted alphabetically for display
 */
export const BLOCKCHAINS = [
  'Avalanche',
  'Base',
  'Ethereum',
  'Hive',
  'Immutable X',
  'NEAR',
  'Open Loot',
  'Polygon',
  'Proof of Play (Apex)',
  'Ronin',
  'SKALE',
  'Solana',
  'TON',
  'WAX',
] as const

/**
 * Available gaming platforms
 * Used for filtering games by accessibility
 */
export const PLATFORMS = [
  'Web',
  'PC',
  'Mac',
  'Mobile',
  'Mobile (Telegram)',
  'PS5',
  'Xbox',
] as const

/**
 * Featured game slugs for homepage
 * These games will be displayed prominently on the homepage
 * Update this list to change featured games
 */
export const FEATURED_GAME_SLUGS = [
  'hamster-kombat',    // Most popular Telegram game
  'pixels',            // Top social farming game
  'off-the-grid',      // AAA Battle Royale showcase
  'illuvium',          // Visual showcase
  'axie-infinity',     // Original P2E pioneer
  'gods-unchained',    // TCG representation
] as const

/**
 * Homepage statistics ticker data
 * Static values for visual appeal and trust building
 */
export const STATS = [
  {
    label: 'Games Listed',
    value: '20+',
    icon: 'Gamepad2',
    description: 'Curated Play-to-Earn games',
  },
  {
    label: 'Total Daily Users',
    value: '5.5M+',
    icon: 'Users',
    description: 'Active players worldwide',
  },
  {
    label: 'Blockchains',
    value: '14+',
    icon: 'Network',
    description: 'Supported networks',
  },
  {
    label: 'Free-to-Play',
    value: '85%',
    icon: 'Wallet',
    description: 'No entry cost required',
  },
] as const

/**
 * Maximum number of games to show per page in catalog
 * Used for pagination/load-more functionality
 */
export const GAMES_PER_PAGE = 12

/**
 * Number of related games to show on game detail page
 */
export const RELATED_GAMES_COUNT = 3

/**
 * Debounce delay for search input (milliseconds)
 */
export const SEARCH_DEBOUNCE_MS = 300

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/gamefi_catalog',
  discord: 'https://discord.gg/gamefi',
  telegram: 'https://t.me/gamefi_catalog',
  github: 'https://github.com/yourusername/gamefi-catalog',
} as const

/**
 * Navigation links for header
 */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/games' },
  { label: 'About', href: '/#about' },
] as const

/**
 * Footer link groups
 */
export const FOOTER_LINKS = {
  product: [
    { label: 'Game Catalog', href: '/games' },
    { label: 'Featured Games', href: '/#featured' },
    { label: 'Categories', href: '/games#categories' },
  ],
  resources: [
    { label: 'About GameFI', href: '/#about' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'FAQ', href: '/#faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
} as const

/**
 * Category icons mapping
 * Maps category names to Lucide icon names
 */
export const CATEGORY_ICONS: Record<string, string> = {
  'Action RPG': 'Swords',
  'Auto-Battler': 'Zap',
  'Battle Royale': 'Target',
  'Collectible': 'Package',
  'DeFi': 'TrendingUp',
  'Extraction Shooter': 'Crosshair',
  'Fantasy Sports': 'Trophy',
  'Farming': 'Sprout',
  'Fitness': 'Activity',
  'FPS': 'Crosshair',
  'Fully On-Chain': 'Link',
  'Idle': 'Clock',
  'Lifestyle': 'Heart',
  'Metaverse': 'Globe',
  'Mining': 'Pickaxe',
  'MMO': 'Users',
  'MMORPG': 'Users',
  'Move-to-Earn': 'Footprints',
  'Multiplayer': 'Users',
  'Open World': 'Map',
  'RPG': 'Sword',
  'Sci-Fi': 'Rocket',
  'Shooter': 'Target',
  'Simulation': 'Settings',
  'Social': 'MessageCircle',
  'Space Sim': 'Rocket',
  'Strategy': 'Brain',
  'Tap-to-Earn': 'MousePointer',
  'TCG': 'Layers',
  'Turn-Based': 'RefreshCw',
  'UGC': 'Paintbrush',
} as const
```

---

## 📐 Type Definitions

### lib/types.ts (Extended)

```typescript
// lib/types.ts

import { CATEGORIES, BLOCKCHAINS, PLATFORMS } from './constants'

/**
 * Base Game interface from games.json
 */
export interface Game {
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

/**
 * Extended game interface with computed properties
 */
export interface GameWithMetadata extends Game {
  slug: string // Required after processing
  dau_numeric: number // Parsed DAU for sorting
  formattedDAU: string // Formatted for display
}

/**
 * Filter state for game catalog
 * Tracks all active filters
 */
export interface FilterState {
  categories: string[]
  blockchains: string[]
  platforms: string[]
  isFreeToPlay: boolean | null // null = all, true = F2P only, false = paid only
  minDAU: number // Minimum daily active users (numeric)
  searchQuery: string
}

/**
 * Sort options for game catalog
 */
export type SortOption = 
  | 'dau-desc'        // Most popular (highest DAU)
  | 'dau-asc'         // Least popular (lowest DAU)
  | 'name-asc'        // Alphabetical A-Z
  | 'name-desc'       // Alphabetical Z-A
  | 'newest'          // Recently added (if timestamp available)
  | 'featured'        // Featured priority

/**
 * Pagination state
 */
export interface PaginationState {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
}

/**
 * Game card component props
 */
export interface GameCardProps {
  game: Game
  featured?: boolean
  priority?: boolean // For image loading priority
  showFullDescription?: boolean
}

/**
 * Game grid component props
 */
export interface GameGridProps {
  games: Game[]
  loading?: boolean
  emptyMessage?: string
}

/**
 * Search bar component props
 */
export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounceMs?: number
}

/**
 * Filter panel component props
 */
export interface FilterPanelProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  totalResults: number
  isOpen?: boolean // For mobile drawer
  onClose?: () => void
}

/**
 * Stats ticker item
 */
export interface StatItem {
  label: string
  value: string
  icon: string // Lucide icon name
  description?: string
}

/**
 * Navigation link
 */
export interface NavLink {
  label: string
  href: string
  external?: boolean
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string
  href?: string // Undefined for current page
}

/**
 * Related games algorithm result
 */
export interface RelatedGamesResult {
  games: Game[]
  matchReasons: string[] // Why these games were selected
}

/**
 * API response types (for future use)
 */
export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}

/**
 * Type guards
 */
export function isGame(obj: any): obj is Game {
  return (
    typeof obj === 'object' &&
    typeof obj.name === 'string' &&
    typeof obj.ticker === 'string' &&
    Array.isArray(obj.category) &&
    typeof obj.chain === 'string'
  )
}

/**
 * Category type
 */
export type Category = typeof CATEGORIES[number]

/**
 * Blockchain type
 */
export type Blockchain = typeof BLOCKCHAINS[number]

/**
 * Platform type
 */
export type Platform = typeof PLATFORMS[number]

/**
 * Empty state types
 */
export type EmptyStateType = 
  | 'no-games'           // No games in database
  | 'no-results'         // Search/filter returned nothing
  | 'no-featured'        // No featured games available
  | 'game-not-found'     // Specific game doesn't exist

/**
 * Loading state types
 */
export type LoadingStateType =
  | 'initial'            // First load
  | 'search'             // Searching/filtering
  | 'pagination'         // Loading more results
  | 'related'            // Loading related games
```

---

## 🧮 Business Logic & Algorithms

### Featured Games Selection

**Selection Criteria:**

1. **Manual curation** - priority use of `FEATURED_GAME_SLUGS` array
2. **Category diversity** - representatives from different genres
3. **Popularity** - high DAU
4. **Visual appeal** - quality logos
5. **F2P status** - preference for free-to-play games
6. **Blockchain representation** - different networks

**Algorithm:**

```typescript
// lib/utils.ts

/**
 * Get featured games for homepage
 * Uses manual selection from FEATURED_GAME_SLUGS with fallback logic
 */
export function getFeaturedGames(allGames: Game[], count: number = 6): Game[] {
  const featured: Game[] = []
  
  // Step 1: Try to get manually curated games
  for (const slug of FEATURED_GAME_SLUGS) {
    const game = allGames.find(g => g.slug === slug)
    if (game && featured.length < count) {
      featured.push(game)
    }
  }
  
  // Step 2: If we need more games, use fallback logic
  if (featured.length < count) {
    const featuredSlugs = new Set(featured.map(g => g.slug))
    
    // Get games not yet featured, sorted by DAU
    const candidates = allGames
      .filter(g => !featuredSlugs.has(g.slug))
      .sort((a, b) => parseDAU(b.est_dau) - parseDAU(a.est_dau))
    
    // Add top games ensuring category diversity
    const usedCategories = new Set(featured.flatMap(g => g.category))
    
    for (const game of candidates) {
      if (featured.length >= count) break
      
      // Prefer games with new categories
      const hasNewCategory = game.category.some(cat => !usedCategories.has(cat))
      
      if (hasNewCategory || featured.length >= count - 2) {
        featured.push(game)
        game.category.forEach(cat => usedCategories.add(cat))
      }
    }
    
    // If still need more, just add by popularity
    for (const game of candidates) {
      if (featured.length >= count) break
      if (!featured.includes(game)) {
        featured.push(game)
      }
    }
  }
  
  return featured.slice(0, count)
}
```

### Related Games Algorithm

**Selection Principles:**

1. **Category match** - games with shared genres (weight: 3)
2. **Same blockchain** - games on the same network (weight: 2)
3. **Platform match** - available on same devices (weight: 1)
4. **Similar F2P status** - similar business model (weight: 1)
5. **Exclude current game** - don't show the game itself

**Relevance Score Algorithm:**

```typescript
/**
 * Calculate relevance score between two games
 * Higher score = more related
 */
function calculateRelevanceScore(gameA: Game, gameB: Game): number {
  let score = 0
  
  // Category match (weight: 3)
  const categoryOverlap = gameA.category.filter(cat => 
    gameB.category.includes(cat)
  ).length
  score += categoryOverlap * 3
  
  // Same blockchain (weight: 2)
  if (gameA.chain === gameB.chain) {
    score += 2
  }
  
  // Platform overlap (weight: 1 per match)
  const platformOverlap = gameA.platforms.filter(plat => 
    gameB.platforms.includes(plat)
  ).length
  score += platformOverlap
  
  // Same F2P status (weight: 1)
  if (gameA.is_f2p === gameB.is_f2p) {
    score += 1
  }
  
  return score
}

/**
 * Get related games for a specific game
 */
export function getRelatedGames(
  currentGame: Game,
  allGames: Game[],
  count: number = 3
): RelatedGamesResult {
  // Calculate scores for all games except current
  const scoredGames = allGames
    .filter(game => game.slug !== currentGame.slug)
    .map(game => ({
      game,
      score: calculateRelevanceScore(currentGame, game),
      matchReasons: getMatchReasons(currentGame, game),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
  
  return {
    games: scoredGames.map(sg => sg.game),
    matchReasons: scoredGames.flatMap(sg => sg.matchReasons),
  }
}

function getMatchReasons(gameA: Game, gameB: Game): string[] {
  const reasons: string[] = []
  
  const sharedCategories = gameA.category.filter(cat => 
    gameB.category.includes(cat)
  )
  if (sharedCategories.length > 0) {
    reasons.push(`Similar genre: ${sharedCategories.join(', ')}`)
  }
  
  if (gameA.chain === gameB.chain) {
    reasons.push(`On ${gameA.chain} blockchain`)
  }
  
  return reasons
}
```

### Filtering Logic

**Filter Combination Logic:**

- **AND logic between categories** - game must match ALL selected filters of different types
- **OR logic within type** - game can match ANY of the selected values of one type
- **Example:** Categories: [RPG OR Strategy] AND Blockchain: [Ethereum OR Polygon] AND Platform: [PC]

**Filtering Algorithm:**

```typescript
/**
 * Filter games based on filter state
 * Combines multiple filter criteria with AND logic between types, OR within types
 */
export function filterGames(games: Game[], filters: FilterState): Game[] {
  return games.filter(game => {
    // 1. Search query (searches in name, description, ticker)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      const searchableText = [
        game.name,
        game.ticker,
        game.short_description,
        ...game.category,
        game.chain,
      ].join(' ').toLowerCase()
      
      if (!searchableText.includes(query)) {
        return false
      }
    }
    
    // 2. Categories filter (OR logic - game must have at least one selected category)
    if (filters.categories.length > 0) {
      const hasMatchingCategory = game.category.some(cat =>
        filters.categories.includes(cat)
      )
      if (!hasMatchingCategory) {
        return false
      }
    }
    
    // 3. Blockchains filter (OR logic)
    if (filters.blockchains.length > 0) {
      if (!filters.blockchains.includes(game.chain)) {
        return false
      }
    }
    
    // 4. Platforms filter (OR logic - game must support at least one selected platform)
    if (filters.platforms.length > 0) {
      const hasMatchingPlatform = game.platforms.some(plat =>
        filters.platforms.includes(plat)
      )
      if (!hasMatchingPlatform) {
        return false
      }
    }
    
    // 5. Free-to-Play filter
    if (filters.isFreeToPlay !== null) {
      if (game.is_f2p !== filters.isFreeToPlay) {
        return false
      }
    }
    
    // 6. Minimum DAU filter
    if (filters.minDAU > 0) {
      const gameDAU = parseDAU(game.est_dau)
      if (gameDAU < filters.minDAU) {
        return false
      }
    }
    
    return true
  })
}
```

### Search Algorithm

**Search Fields (by priority):**

1. **Game name** (weight: 3)
2. **Ticker** (weight: 3)
3. **Categories** (weight: 2)
4. **Blockchain** (weight: 2)
5. **Short description** (weight: 1)

**Search Algorithm with Priorities:**

```typescript
/**
 * Search games with weighted relevance scoring
 * Returns games sorted by relevance
 */
export function searchGames(games: Game[], query: string): Game[] {
  if (!query.trim()) {
    return games
  }
  
  const normalizedQuery = query.toLowerCase().trim()
  
  // Score each game
  const scoredGames = games.map(game => ({
    game,
    score: calculateSearchScore(game, normalizedQuery),
  }))
  
  // Filter and sort by score
  return scoredGames
    .filter(sg => sg.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(sg => sg.game)
}

function calculateSearchScore(game: Game, query: string): number {
  let score = 0
  
  // Name match (weight: 3)
  if (game.name.toLowerCase().includes(query)) {
    score += 3
    // Exact match bonus
    if (game.name.toLowerCase() === query) {
      score += 5
    }
    // Starts with bonus
    if (game.name.toLowerCase().startsWith(query)) {
      score += 2
    }
  }
  
  // Ticker match (weight: 3)
  if (game.ticker.toLowerCase().includes(query)) {
    score += 3
  }
  
  // Category match (weight: 2)
  const categoryMatch = game.category.some(cat => 
    cat.toLowerCase().includes(query)
  )
  if (categoryMatch) {
    score += 2
  }
  
  // Blockchain match (weight: 2)
  if (game.chain.toLowerCase().includes(query)) {
    score += 2
  }
  
  // Description match (weight: 1)
  if (game.short_description.toLowerCase().includes(query)) {
    score += 1
  }
  
  return score
}
```

---

## 🧭 Navigation & Layout Structure

### Header Structure

```typescript
// components/Header.tsx

interface HeaderProps {
  transparent?: boolean // For homepage hero overlay
}

/**
 * Header Component Structure:
 * 
 * Desktop (>= 768px):
 * [Logo] [Nav Links: Home, Catalog, About] [CTA Button: View Catalog]
 * 
 * Mobile (< 768px):
 * [Logo] [Mobile Menu Button]
 * 
 * Features:
 * - Sticky positioning with backdrop blur
 * - Smooth scroll to anchor links
 * - Active link highlighting
 * - Mobile hamburger menu with animation
 */

const HEADER_STRUCTURE = {
  logo: {
    text: 'GameFI',
    href: '/',
    icon: 'Gamepad2', // Lucide icon
  },
  navigation: NAV_LINKS,
  cta: {
    text: 'View Catalog',
    href: '/games',
    variant: 'primary',
  },
  mobileMenu: {
    icon: 'Menu',
    closeIcon: 'X',
    position: 'right', // Slides from right
  },
}
```

**Header Styles:**
- Background: `bg-cosmic-void/80 backdrop-blur-md` (glass effect)
- Border: `border-b border-white/10`
- Height: `h-16` (64px)
- Padding: `px-4 md:px-8`
- Position: `sticky top-0 z-50`

### Footer Structure

```typescript
// components/Footer.tsx

/**
 * Footer Component Structure:
 * 
 * Desktop Layout:
 * +-----------------------------------------------------------------------+
 * | [Logo + Tagline]  [Product Links]  [Resources]  [Legal]  [Socials]   |
 * |                                                                       |
 * | [Copyright © 2024]                                      [Back to Top] |
 * +-----------------------------------------------------------------------+
 * 
 * Mobile Layout (Stacked):
 * +------------------------+
 * | [Logo + Tagline]       |
 * | [Product Links]        |
 * | [Resources]            |
 * | [Legal]                |
 * | [Socials]              |
 * | [Copyright]            |
 * | [Back to Top]          |
 * +------------------------+
 */

const FOOTER_STRUCTURE = {
  brand: {
    logo: 'GameFI',
    tagline: 'Discover the best Play-to-Earn blockchain games',
    icon: 'Gamepad2',
  },
  linkGroups: FOOTER_LINKS,
  social: SOCIAL_LINKS,
  legal: {
    copyright: '© 2024 GameFI Catalog. All rights reserved.',
    disclaimer: 'Not financial advice. Always DYOR.',
  },
  backToTop: {
    text: 'Back to Top',
    icon: 'ChevronUp',
  },
}
```

**Footer Styles:**
- Background: `bg-deep-space`
- Border: `border-t border-white/10`
- Padding: `py-16 px-4 md:px-8`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8`

### Breadcrumbs Structure

```typescript
// components/Breadcrumbs.tsx

/**
 * Breadcrumbs for game detail page
 * 
 * Pattern: Home > Catalog > [Game Name]
 * 
 * Examples:
 * - Home > Catalog > Hamster Kombat
 * - Home > Catalog > Axie Infinity
 */

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

// Usage on game page:
const gameBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/games' },
  { label: game.name }, // Current page, no href
]
```

**Breadcrumb Styles:**
- Separator: `/` (forward slash) or `ChevronRight` icon
- Colors: Links = `text-white/60 hover:text-white`, Current = `text-white`
- Font: `font-mono text-sm`
- Spacing: `gap-2`

### 404 Page Structure

```typescript
// app/not-found.tsx

/**
 * 404 Not Found Page
 * 
 * Content:
 * - Large "404" text with gradient
 * - Heading: "Game Not Found"
 * - Message: "The page you're looking for doesn't exist in our metaverse."
 * - CTA Buttons: [Back to Home] [Browse Catalog]
 * - Decorative 3D illustration/animation
 */

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <p className="text-9xl font-heading font-bold bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">
          404
        </p>
        <h1 className="text-4xl font-heading font-bold">
          Game Not Found
        </h1>
        <p className="text-white/60 max-w-md mx-auto">
          The page you're looking for doesn't exist in our metaverse. 
          Perhaps it was moved or deleted.
        </p>
        <div className="flex gap-4 justify-center">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/games" variant="secondary">
            Browse Catalog
          </Button>
        </div>
      </div>
    </div>
  )
}
```

---

## 🚨 Error Handling & Edge Cases

### Empty States

#### 1. No Games Found (Database Empty)

**Scenario:** `games.json` is empty or fails to load

**UI Component:**
```tsx
// components/EmptyState.tsx - type: 'no-games'

<EmptyState
  icon="Database"
  title="No Games Available"
  message="We're currently building our catalog. Check back soon for the best Play-to-Earn games."
  action={{
    label: 'Refresh Page',
    onClick: () => window.location.reload(),
  }}
/>
```

#### 2. No Search Results

**Scenario:** User search/filter returns 0 games

**UI Component:**
```tsx
// components/EmptyState.tsx - type: 'no-results'

<EmptyState
  icon="Search"
  title="No Games Match Your Filters"
  message="Try adjusting your search criteria or clearing some filters to see more results."
  action={{
    label: 'Clear All Filters',
    onClick: () => resetFilters(),
  }}
/>
```

**Additional Context Display:**
- Show active filters count: "3 filters active"
- Show search query: `Searching for: "${query}"`
- Suggest: "Try: Removing category filters, Expanding blockchain options"

#### 3. No Featured Games

**Scenario:** Featured games slugs don't match any games

**Fallback Strategy:**
```typescript
// In getFeaturedGames():
// 1. Try manual slugs
// 2. Fall back to highest DAU games
// 3. If < 3 games total, show what's available
// 4. If 0 games, show empty state

// Minimum featured games to show: 3
// If less, show "Coming Soon" placeholder cards
```

#### 4. Game Not Found (404)

**Scenario:** `/games/invalid-slug`

**UI:** Use Next.js `not-found.tsx` (see Navigation section)

**Metadata:** Return 404-specific metadata without crashing

### Loading States

#### 1. Initial Page Load

```tsx
// components/GameGridSkeleton.tsx

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="card-gamefi animate-pulse">
      <div className="h-48 bg-white/5 rounded-lg" />
      <div className="space-y-2 p-4">
        <div className="h-6 bg-white/5 rounded w-3/4" />
        <div className="h-4 bg-white/5 rounded w-1/2" />
      </div>
    </div>
  ))}
</div>
```

**Duration:** Show until data loads (typically < 500ms with static JSON)

#### 2. Search/Filter Debounce

```tsx
// Show subtle loading indicator during debounce
<div className="flex items-center gap-2 text-sm text-white/40">
  <Loader2 className="w-4 h-4 animate-spin" />
  <span>Searching...</span>
</div>
```

**Position:** Top-right of catalog, or overlay on game grid

**Duration:** Only during `SEARCH_DEBOUNCE_MS` (300ms)

#### 3. Image Loading

**Strategy:**
- Use Next.js `Image` component with `placeholder="blur"`
- Generate blur data URLs for game logos
- Fallback to solid color while loading

```tsx
<Image
  src={game.logo}
  alt={game.name}
  width={200}
  height={200}
  className="rounded-lg"
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..." // Low quality placeholder
  onError={(e) => {
    // Fallback to default image
    e.currentTarget.src = '/default-game-logo.png'
  }}
/>
```

### Error States

#### 1. Missing/Broken Images

**Fallback Strategy:**

```tsx
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  // Replace with default logo
  e.currentTarget.src = '/default-game-logo.png'
  
  // Add error class for styling
  e.currentTarget.classList.add('image-error')
  
  // Optional: Log to analytics
  console.warn(`Failed to load image: ${game.logo}`)
}
```

**Default Logo Design:**
- Solid `bg-white/10` rectangle
- Centered `Gamepad2` icon in bitcoin orange
- Game name initials as text overlay

#### 2. Invalid Data Format

**Validation:**

```typescript
// lib/data.ts

export function validateGame(game: any): game is Game {
  const requiredFields = [
    'name',
    'ticker',
    'category',
    'chain',
    'platforms',
    'short_description',
  ]
  
  for (const field of requiredFields) {
    if (!(field in game)) {
      console.error(`Game missing required field: ${field}`, game)
      return false
    }
  }
  
  if (!Array.isArray(game.category) || game.category.length === 0) {
    console.error('Game must have at least one category', game)
    return false
  }
  
  return true
}

export function getAllGames(): Game[] {
  try {
    const rawGames = JSON.parse(gamesData)
    
    // Filter out invalid games
    const validGames = rawGames.filter(validateGame)
    
    if (validGames.length < rawGames.length) {
      console.warn(`Filtered out ${rawGames.length - validGames.length} invalid games`)
    }
    
    return validGames.map(addSlug)
  } catch (error) {
    console.error('Failed to parse games.json:', error)
    return []
  }
}
```

#### 3. External Link Failures

**Strategy:**
- All game URLs open in new tab: `target="_blank" rel="noopener noreferrer"`
- Show tooltip: "Opens in new tab"
- No error handling needed (browser handles broken links)

#### 4. Parsing DAU Errors

**Scenario:** `est_dau` in unexpected format

```typescript
export function parseDAU(dauString: string): number {
  try {
    // Remove commas and plus signs
    const cleaned = dauString.replace(/[,+]/g, '')
    
    // Handle 'M' for millions, 'K' for thousands
    if (cleaned.endsWith('M')) {
      return parseFloat(cleaned) * 1_000_000
    } else if (cleaned.endsWith('K')) {
      return parseFloat(cleaned) * 1_000
    }
    
    // Try direct parse
    const parsed = parseFloat(cleaned)
    
    if (isNaN(parsed)) {
      console.warn(`Invalid DAU format: ${dauString}`)
      return 0
    }
    
    return parsed
  } catch (error) {
    console.error(`Failed to parse DAU: ${dauString}`, error)
    return 0
  }
}
```

### Edge Cases

#### 1. Very Long Game Names

**Max Length:** 50 characters
**Truncation:**

```tsx
<h3 className="text-xl font-heading truncate" title={game.name}>
  {game.name.length > 50 ? game.name.substring(0, 47) + '...' : game.name}
</h3>
```

#### 2. Games with No Logo

See "Missing/Broken Images" above

#### 3. Single Category/Blockchain

**Scenario:** User filters down to 1 option
**Behavior:** Allow, but show "Only showing X category" message

#### 4. Mobile Safari Compatibility

**Considerations:**
- Test backdrop-blur support (fallback: solid background)
- Test grid layout on older iOS versions
- Ensure touch targets minimum 44x44px
- Test filter drawer swipe gestures

#### 5. Very Small Screens (< 320px)

**Strategy:**
- Set absolute minimum width: `min-w-[320px]`
- Single column layout for all components
- Slightly reduce font sizes
- Stack buttons vertically

---

## 🛠 Utility Functions

### lib/utils.ts

```typescript
// lib/utils.ts

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Game, FilterState } from './types'
import { RELATED_GAMES_COUNT } from './constants'

/**
 * Utility for merging Tailwind classes
 * Combines clsx and tailwind-merge for proper class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parse DAU string to numeric value
 * Handles formats like "3,000,000+", "600,000+", "5M+", etc.
 * 
 * @param dauString - DAU value from games.json
 * @returns Numeric DAU value
 */
export function parseDAU(dauString: string): number {
  try {
    const cleaned = dauString.replace(/[,+]/g, '').trim()
    
    if (cleaned.endsWith('M')) {
      return parseFloat(cleaned.slice(0, -1)) * 1_000_000
    }
    
    if (cleaned.endsWith('K')) {
      return parseFloat(cleaned.slice(0, -1)) * 1_000
    }
    
    const parsed = parseFloat(cleaned)
    return isNaN(parsed) ? 0 : parsed
  } catch {
    return 0
  }
}

/**
 * Format number for display with K/M suffixes
 * 
 * @example
 * formatNumber(1500) // "1.5K"
 * formatNumber(2500000) // "2.5M"
 * formatNumber(850) // "850"
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  
  return num.toString()
}

/**
 * Generate slug from game name
 * 
 * @example
 * generateSlug("Hamster Kombat") // "hamster-kombat"
 * generateSlug("Off The Grid") // "off-the-grid"
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Remove consecutive hyphens
}

/**
 * Add slug to game object
 */
export function addSlug(game: Game): Game {
  return {
    ...game,
    slug: game.slug || generateSlug(game.name),
  }
}

/**
 * Filter games based on filter state
 * See "Business Logic & Algorithms" section for detailed logic
 */
export function filterGames(games: Game[], filters: FilterState): Game[] {
  // Implementation shown in Business Logic section
  // ...
}

/**
 * Search games with weighted relevance
 * See "Business Logic & Algorithms" section for detailed logic
 */
export function searchGames(games: Game[], query: string): Game[] {
  // Implementation shown in Business Logic section
  // ...
}

/**
 * Get featured games for homepage
 * See "Business Logic & Algorithms" section for detailed logic
 */
export function getFeaturedGames(allGames: Game[], count: number = 6): Game[] {
  // Implementation shown in Business Logic section
  // ...
}

/**
 * Get related games based on similarity
 * See "Business Logic & Algorithms" section for detailed logic
 */
export function getRelatedGames(
  currentGame: Game,
  allGames: Game[],
  count: number = RELATED_GAMES_COUNT
): Game[] {
  // Implementation shown in Business Logic section
  // ...
}

/**
 * Truncate text to specified length
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum character length
 * @param suffix - String to append if truncated (default: "...")
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (text.length <= maxLength) {
    return text
  }
  
  return text.substring(0, maxLength - suffix.length) + suffix
}

/**
 * Debounce function for search input
 * 
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(later, wait)
  }
}

/**
 * Check if value is in valid range
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Get unique values from array
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

/**
 * Group games by property
 * 
 * @example
 * groupBy(games, 'chain') // { "Ethereum": [...], "Polygon": [...] }
 */
export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key])
    
    if (!acc[groupKey]) {
      acc[groupKey] = []
    }
    
    acc[groupKey].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

/**
 * Shuffle array (for random featured games if needed)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

/**
 * Check if filters are empty (all default values)
 */
export function areFiltersEmpty(filters: FilterState): boolean {
  return (
    filters.categories.length === 0 &&
    filters.blockchains.length === 0 &&
    filters.platforms.length === 0 &&
    filters.isFreeToPlay === null &&
    filters.minDAU === 0 &&
    filters.searchQuery === ''
  )
}

/**
 * Get active filter count
 */
export function getActiveFilterCount(filters: FilterState): number {
  let count = 0
  
  count += filters.categories.length
  count += filters.blockchains.length
  count += filters.platforms.length
  
  if (filters.isFreeToPlay !== null) count++
  if (filters.minDAU > 0) count++
  if (filters.searchQuery !== '') count++
  
  return count
}

/**
 * Scroll to top smoothly
 */
export function scrollToTop(behavior: ScrollBehavior = 'smooth'): void {
  window.scrollTo({ top: 0, behavior })
}

/**
 * Scroll to element by ID
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId)
  
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
```

---

## 📝 Implementation Notes

### Data Flow

```
games.json → getAllGames() → [Filters] → [Sort] → [Display]
                    ↓
              addSlug()
              parseDAU()
              validate()
```

### Component Hierarchy

```
App
├── Layout
│   ├── Header
│   └── Footer
├── Homepage '/'
│   ├── Hero Section
│   ├── Stats Ticker
│   ├── Featured Games (GameGrid)
│   └── CTA Section
├── Catalog '/games'
│   ├── SearchBar
│   ├── FilterPanel
│   └── GameGrid
│       └── GameCard (x N)
└── Game Detail '/games/[slug]'
    ├── Breadcrumbs
    ├── Game Header
    ├── Game Info
    ├── External Link Button
    └── Related Games (GameGrid)
```

### Performance Considerations

- **Static Generation:** All game pages pre-generated at build time
- **Image Optimization:** Use WebP format, optimize before deploy
- **Bundle Size:** Tree-shake unused Lucide icons, keep total < 100KB
- **Client-side Filtering:** Fast with < 100 games, consider pagination for 500+
- **Debounce Search:** 300ms prevents excessive re-renders

### Accessibility

- **Keyboard Navigation:** All interactive elements accessible via Tab
- **Screen Readers:** Proper ARIA labels, semantic HTML
- **Focus Indicators:** Visible focus rings on all interactive elements
- **Color Contrast:** WCAG AAA compliance for text
- **Motion:** Respect `prefers-reduced-motion`

---

## 🎉 Summary

This technical specification covers:

✅ **SEO** - Complete configuration of meta tags, Open Graph, Twitter Cards, sitemap, robots.txt  
✅ **Constants** - All constants for categories, blockchains, platforms, statistics  
✅ **Types** - Extended TypeScript interfaces for all components  
✅ **Algorithms** - Detailed logic for featured/related games, filtering, search  
✅ **Navigation** - Complete structure for Header, Footer, Breadcrumbs, 404  
✅ **Error Handling** - All empty states, loading states, fallbacks  
✅ **Utilities** - Complete set of utility functions with documentation  

Use this document as the **source of truth** when implementing the project.
