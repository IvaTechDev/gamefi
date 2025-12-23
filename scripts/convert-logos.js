const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Read games.json
const gamesData = JSON.parse(fs.readFileSync('games.json', 'utf8'));

// Images directory
const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Function to convert image to WebP
async function convertToWebP(inputPath, outputPath, size = 512) {
  try {
    await sharp(inputPath)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 90 })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
    return false;
  }
}

// Main function
async function convertLogos() {
  console.log('Starting logo conversion to WebP 512x512...\n');

  const results = {
    success: [],
    failed: []
  };

  // Get all image files in public/images
  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(file => 
    !file.endsWith('.webp') && 
    !file.includes('-temp') &&
    /\.(png|jpg|jpeg|gif|webp)$/i.test(file)
  );

  console.log(`Found ${imageFiles.length} images to convert\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(imagesDir, `${baseName}.webp`);

    console.log(`🔄 Converting: ${file} → ${baseName}.webp`);

    try {
      const converted = await convertToWebP(inputPath, outputPath, 512);

      if (converted) {
        // Delete original file
        fs.unlinkSync(inputPath);
        console.log(`   ✅ Success - deleted original`);
        results.success.push({ file, converted: `${baseName}.webp` });
      } else {
        throw new Error('Conversion failed');
      }
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      results.failed.push({ file, error: error.message });
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Success: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log('='.repeat(60));

  if (results.failed.length > 0) {
    console.log('\nFailed conversions:');
    results.failed.forEach(item => {
      console.log(`  - ${item.file}: ${item.error}`);
    });
  }

  console.log('\n✅ All logos converted to WebP 512x512!');
}

// Run the script
convertLogos().catch(console.error);
