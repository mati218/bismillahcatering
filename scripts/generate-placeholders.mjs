/**
 * Generates SVG placeholder images for the gallery and services
 * Run: node scripts/generate-placeholders.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function createSVG(width, height, label, bg1, bg2) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg1}"/>
      <stop offset="100%" style="stop-color:${bg2}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <text x="${width/2}" y="${height/2}" font-family="serif" font-size="${Math.min(width,height)*0.08}px"
    fill="rgba(255,255,255,0.8)" text-anchor="middle" dominant-baseline="middle">${label}</text>
  <text x="${width/2}" y="${height/2 + Math.min(width,height)*0.12}" font-family="serif" font-size="${Math.min(width,height)*0.05}px"
    fill="rgba(246,201,69,0.9)" text-anchor="middle" dominant-baseline="middle">Bismillah Catering</text>
</svg>`;
}

const palettes = [
  ['#1a0a00', '#3d1f00'], ['#0a1a00', '#1f3d00'], ['#00081a', '#001f3d'],
  ['#1a001a', '#3d003d'], ['#1a1a00', '#3d3d00'], ['#001a1a', '#003d3d'],
  ['#1a0000', '#3d0000'], ['#000a1a', '#00203d'], ['#0a0a1a', '#1a1a3d'],
  ['#1a0a0a', '#3d1a1a'],
];

// Gallery images
const galleryFiles = [
  'wedding-1', 'mehndi-1', 'barat-1', 'walima-1',
  'birthday-1', 'birthday-2', 'corporate-1', 'corporate-2',
  'farmhouse-1', 'farmhouse-2', 'decor-1', 'decor-2',
  'food-1', 'food-2', 'buffet-1', 'buffet-2',
  'bbq-1', 'bbq-2', 'live-1', 'live-2',
  'private-1', 'engagement-1',
];

galleryFiles.forEach((name, i) => {
  const [bg1, bg2] = palettes[i % palettes.length];
  const label = name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const svg = createSVG(800, 600, label, bg1, bg2);
  fs.writeFileSync(path.join(root, 'public', 'gallery', `${name}.jpg`), svg);
});

// Hero bg
fs.writeFileSync(
  path.join(root, 'public', 'images', 'hero-bg.jpg'),
  createSVG(1920, 1080, 'Premium Events', '#1a0900', '#3d1800')
);

// OG image
fs.writeFileSync(
  path.join(root, 'public', 'og-image.jpg'),
  createSVG(1200, 630, 'Bismillah Catering', '#1a0900', '#3d1800')
);

// Testimonials
for (let i = 1; i <= 6; i++) {
  const [bg1, bg2] = palettes[i % palettes.length];
  fs.writeFileSync(
    path.join(root, 'public', 'images', 'testimonials', `t${i}.jpg`),
    createSVG(200, 200, `Client ${i}`, bg1, bg2)
  );
}

// Services
const serviceNames = [
  'wedding', 'catering', 'decoration', 'farmhouse', 'corporate', 'birthday',
  'stage', 'mehndi', 'barat', 'walima', 'outdoor', 'bbq',
  'aqeeqah', 'engagement', 'nikkah', 'buffet',
];
serviceNames.forEach((name, i) => {
  const [bg1, bg2] = palettes[i % palettes.length];
  fs.writeFileSync(
    path.join(root, 'public', 'images', 'services', `${name}.jpg`),
    createSVG(600, 400, name.replace(/\b\w/g, c => c.toUpperCase()), bg1, bg2)
  );
});

console.log('✅ Placeholder images generated successfully!');
