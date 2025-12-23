// scripts/add-multilingual-fields.js
const fs = require('fs')

// Read the current games.json
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'))

// Add multilingual fields to each game
const updatedGames = games.map(game => {
  return {
    ...game,
    short_description_en: game.short_description,
    short_description_ua: game.short_description, // Placeholder - should be translated
    short_description_ru: game.short_description, // Placeholder - should be translated
    long_description_en: game.long_description,
    long_description_ua: game.long_description, // Placeholder - should be translated
    long_description_ru: game.long_description, // Placeholder - should be translated
  }
})

// Write the updated games back to games.json
fs.writeFileSync('games.json', JSON.stringify(updatedGames, null, 2))

console.log('Added multilingual fields to games.json')
console.log('Note: Ukrainian and Russian translations are placeholders and need to be translated')