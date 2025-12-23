// lib/utils.ts

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Game, FilterState } from './types'
import { RELATED_GAMES_COUNT, FEATURED_GAME_SLUGS } from './constants'

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

/**
 * Calculate search score for relevance sorting
 */
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

/**
 * Search games with weighted relevance scoring
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

/**
 * Get featured games for homepage
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

/**
 * Calculate relevance score between two games
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
  count: number = RELATED_GAMES_COUNT
): Game[] {
  // Calculate scores for all games except current
  const scoredGames = allGames
    .filter(game => game.slug !== currentGame.slug)
    .map(game => ({
      game,
      score: calculateRelevanceScore(currentGame, game),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
  
  return scoredGames.map(sg => sg.game)
}

/**
 * Truncate text to specified length
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
