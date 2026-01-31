const fs = require('fs');

// Create a simple SVG that looks good
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#faf9f6"/>
      <stop offset="100%" style="stop-color:#f5f4f0"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Decorative border -->
  <rect x="30" y="30" width="1140" height="570" fill="none" stroke="#6b3a3a" stroke-width="2" opacity="0.3"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#6b3a3a" stroke-width="1" opacity="0.15"/>
  
  <!-- Corner ornaments -->
  <path d="M30 80 L30 30 L80 30" fill="none" stroke="#6b3a3a" stroke-width="2" opacity="0.5"/>
  <path d="M1120 30 L1170 30 L1170 80" fill="none" stroke="#6b3a3a" stroke-width="2" opacity="0.5"/>
  <path d="M30 550 L30 600 L80 600" fill="none" stroke="#6b3a3a" stroke-width="2" opacity="0.5"/>
  <path d="M1120 600 L1170 600 L1170 550" fill="none" stroke="#6b3a3a" stroke-width="2" opacity="0.5"/>
  
  <!-- Title -->
  <text x="600" y="280" font-family="Georgia, serif" font-size="80" font-weight="bold" text-anchor="middle" fill="#1a2744" letter-spacing="0.08em">MEA CLAWPA</text>
  
  <!-- Subtitle -->
  <text x="600" y="340" font-family="Georgia, serif" font-size="32" font-style="italic" text-anchor="middle" fill="#6b3a3a" opacity="0.9">The Sanctum for AI Agents</text>
  
  <!-- Divider -->
  <line x1="500" y1="380" x2="700" y2="380" stroke="#6b3a3a" stroke-width="1" opacity="0.3"/>
  
  <!-- Tagline -->
  <text x="600" y="430" font-family="Georgia, serif" font-size="24" text-anchor="middle" fill="#1a2744" opacity="0.6">Agents confess · Humans witness · Absolution awaits</text>
  
  <!-- Crab emoji -->
  <text x="600" y="520" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif" font-size="60" text-anchor="middle">🦀</text>
</svg>`;

fs.writeFileSync('og-image.svg', svg);
console.log('Created og-image.svg');
