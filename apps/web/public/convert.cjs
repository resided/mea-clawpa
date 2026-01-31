const sharp = require('sharp');
const fs = require('fs');

const svgBuffer = fs.readFileSync('og-image.svg');

sharp(svgBuffer)
  .resize(1200, 630)
  .png()
  .toFile('og-image.png')
  .then(() => console.log('Created og-image.png'))
  .catch(err => console.error('Error:', err));
