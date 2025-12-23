const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Read games.json
const gamesData = JSON.parse(fs.readFileSync('games.json', 'utf8'));

// Create public/images directory if it doesn't exist
const imagesDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Function to generate slug from game name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Main function
async function downloadLogos() {
  console.log('Starting logo download...\n');

  const results = {
    success: [],
    failed: [],
    skipped: []
  };

  for (const game of gamesData) {
    const slug = generateSlug(game.name);
    const logoUrl = game.logo;

    // Skip if already has local path
    if (logoUrl.startsWith('/images/')) {
      console.log(`⏭️  Skipping ${game.name} - already has local path`);
      results.skipped.push({ name: game.name, reason: 'Local path exists' });
      continue;
    }

    console.log(`\n📥 Processing: ${game.name}`);
    console.log(`   URL: ${logoUrl}`);

    const outputPath = path.join(imagesDir, `${slug}.webp`);

    try {
      // Download image
      console.log(`   Downloading...`);
      await downloadImage(logoUrl, outputPath);

      // Update games.json with new path
      game.logo = `/images/${slug}.webp`;

      console.log(`   ✅ Success: ${slug}.webp`);
      results.success.push({ name: game.name, file: `${slug}.webp` });
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      results.failed.push({ name: game.name, error: error.message });
    }
  }

  // Write updated games.json
  fs.writeFileSync('games.json', JSON.stringify(gamesData, null, 2));
  console.log('\n✅ Updated games.json with new logo paths');

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Success: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`⏭️  Skipped: ${results.skipped.length}`);
  console.log('='.repeat(60));

  if (results.failed.length > 0) {
    console.log('\nFailed downloads:');
    results.failed.forEach(item => {
      console.log(`  - ${item.name}: ${item.error}`);
    });
  }

  if (results.skipped.length > 0) {
    console.log('\nSkipped (already have local paths):');
    results.skipped.forEach(item => {
      console.log(`  - ${item.name}`);
    });
  }

  console.log('\n⚠️  Note: Images are downloaded in original format.');
  console.log('   To convert to WebP 512x512, run:');
  console.log('   npm run convert-logos');
}

// Run the script
downloadLogos().catch(console.error);
