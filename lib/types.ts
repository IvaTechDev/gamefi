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
  short_description_en: string
  short_description_ua: string
  short_description_ru: string
  long_description: string
  long_description_en: string
  long_description_ua: string
  long_description_ru: string
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
  
  /**
   * Static page interface from pages.json
   */
  export interface StaticPage {
    slug: string
    thumbnail: string
    pubdate: string
    titles: Record<string, string>
    descriptions: Record<string, string>
    texts: Record<string, string>
  }
