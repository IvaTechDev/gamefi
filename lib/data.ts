// lib/data.ts

import { Game, StaticPage } from './types'
import { addSlug } from './utils'
import gamesData from '../games.json'
import pagesData from '../pages.json'

/**
 * Validate game object has required fields
 */
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

/**
 * Get all games from games.json
 */
export function getAllGames(): Game[] {
  try {
    // Filter out invalid games
    const validGames = gamesData.filter(validateGame)
    
    if (validGames.length < gamesData.length) {
      console.warn(`Filtered out ${gamesData.length - validGames.length} invalid games`)
    }
    
    return validGames.map(addSlug)
  } catch (error) {
    console.error('Failed to load games:', error)
    return []
  }
}

/**
 * Get a game by its slug
 */
export function getGameBySlug(slug: string): Game | undefined {
  return getAllGames().find(game => game.slug === slug)
}

/**
 * Get games by category
 */
export function getGamesByCategory(category: string): Game[] {
  return getAllGames().filter(game => game.category.includes(category))
}

/**
 * Get games by blockchain
 */
export function getGamesByChain(chain: string): Game[] {
  return getAllGames().filter(game => game.chain === chain)
}

/**
 * Get free-to-play games
 */
export function getFreeToPlayGames(): Game[] {
  return getAllGames().filter(game => game.is_f2p)
}

/**
 * Get all static pages from pages.json
 */
export function getAllPages(): StaticPage[] {
  return pagesData as StaticPage[]
}

/**
 * Get a static page by its slug
 */
export function getPageBySlug(slug: string): StaticPage | undefined {
  return getAllPages().find(page => page.slug === slug)
}
