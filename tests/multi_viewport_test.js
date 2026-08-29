/**
 * LC Tree and Landscaping, LLC — Multi-Viewport Responsive Layout Tester
 * 
 * Verifies responsive breakpoint behavior and layout rules across 7 screen widths:
 * - 320px (Small Mobile)
 * - 375px (Standard Mobile)
 * - 414px (Large Mobile)
 * - 768px (Tablet Portrait)
 * - 1024px (Tablet Landscape / Small Desktop)
 * - 1440px (Standard Desktop)
 * - 1920px (Widescreen Desktop)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const VIEWPORTS = [
  { name: 'Mobile XS', width: 320, type: 'mobile' },
  { name: 'Mobile SM', width: 375, type: 'mobile' },
  { name: 'Mobile LG', width: 414, type: 'mobile' },
  { name: 'Tablet MD', width: 768, type: 'tablet' },
  { name: 'Tablet LG', width: 1024, type: 'tablet' },
  { name: 'Desktop HD', width: 1440, type: 'desktop' },
  { name: 'Desktop 2K', width: 1920, type: 'desktop' }
];

const PAGES = ['index.html', 'about.html', 'services.html', 'contact.html'];

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition, name, details = '') {
  totalAssertions++;
  if (condition) {
    console.log(`  \x1b[32m✔ PASS:\x1b[0m ${name}`);
    passedAssertions++;
  } else {
    console.log(`  \x1b[31m✖ FAIL:\x1b[0m ${name} — ${details}`);
    failedAssertions++;
  }
}

console.log('\n\x1b[34m📱 MULTI-VIEWPORT RESPONSIVE LAYOUT VERIFICATION 📱\x1b[0m');

// 1. Check Responsive CSS Rules Coverage
const responsiveCss = fs.readFileSync(path.join(ROOT_DIR, 'css/responsive.css'), 'utf-8');
const stylesCss = fs.readFileSync(path.join(ROOT_DIR, 'css/styles.css'), 'utf-8');
const componentsCss = fs.readFileSync(path.join(ROOT_DIR, 'css/components.css'), 'utf-8');

console.log(`\n\x1b[1mChecking Layout Rules for Viewport Breakpoints...\x1b[0m`);

for (const vp of VIEWPORTS) {
  console.log(`\n\x1b[36m--- Testing Viewport: ${vp.name} (${vp.width}px) [${vp.type}] ---\x1b[0m`);

  // Mobile Viewports (<= 768px)
  if (vp.width <= 768) {
    assert(responsiveCss.includes('@media (max-width: 768px)'), `[${vp.width}px] Contains @media (max-width: 768px) block`);
    assert(/@media\s*\(max-width:\s*768px\)\s*\{[\s\S]*?\.mobile-call-bar\s*\{[^}]*display:\s*block/.test(responsiveCss),
      `[${vp.width}px] Mobile persistent Call Bar is active (display: block)`);
    assert(/@media\s*\(max-width:\s*768px\)\s*\{[\s\S]*?\.footer-grid\s*\{[^}]*grid-template-columns:\s*1fr/.test(responsiveCss),
      `[${vp.width}px] Footer grid collapses to 1 column for thumb-scrolling`);
    assert(/@media\s*\(max-width:\s*768px\)\s*\{[\s\S]*?\.hero-cta-group\s*\{[^}]*flex-direction:\s*column/.test(responsiveCss),
      `[${vp.width}px] Hero CTA buttons stack vertically to fit width`);
    assert(/@media\s*\(max-width:\s*768px\)\s*\{[\s\S]*?body\s*\{[^}]*padding-bottom:\s*74px/.test(responsiveCss),
      `[${vp.width}px] Body has bottom padding (74px) so mobile call bar doesn't obstruct content`);
  }

  // Extra Small Mobile (<= 480px)
  if (vp.width <= 480) {
    assert(responsiveCss.includes('@media (max-width: 480px)'), `[${vp.width}px] Contains @media (max-width: 480px) block`);
    assert(/@media\s*\(max-width:\s*480px\)\s*\{[\s\S]*?h1\s*\{[^}]*font-size:\s*1\.85rem/.test(responsiveCss),
      `[${vp.width}px] H1 headings scale down to 1.85rem to avoid text clipping`);
    assert(/@media\s*\(max-width:\s*480px\)\s*\{[\s\S]*?\.btn\s*\{[^}]*padding:\s*0\.75rem\s+1\.25rem/.test(responsiveCss),
      `[${vp.width}px] Buttons use compact padding (0.75rem 1.25rem)`);
  }

  // Tablet and Below (<= 1024px)
  if (vp.width <= 1024) {
    assert(responsiveCss.includes('@media (max-width: 1024px)'), `[${vp.width}px] Contains @media (max-width: 1024px) block`);
    assert(/@media\s*\(max-width:\s*1024px\)\s*\{[\s\S]*?\.mobile-menu-toggle\s*\{[^}]*display:\s*flex/.test(responsiveCss),
      `[${vp.width}px] Hamburger toggle button is displayed (display: flex)`);
    assert(/@media\s*\(max-width:\s*1024px\)\s*\{[\s\S]*?\.main-nav\s*\{[^}]*position:\s*fixed/.test(responsiveCss),
      `[${vp.width}px] Main navigation converts to off-canvas slide drawer`);
    assert(/@media\s*\(max-width:\s*1024px\)\s*\{[\s\S]*?\.main-nav\s*\{[^}]*transform:\s*translateX\(100%\)/.test(responsiveCss),
      `[${vp.width}px] Drawer is closed by default off-screen (translateX(100%))`);
    assert(/@media\s*\(max-width:\s*1024px\)\s*\{[\s\S]*?\.site-header\.nav-open\s+\.main-nav\s*\{[^}]*transform:\s*translateX\(0\)/.test(responsiveCss),
      `[${vp.width}px] Drawer slides into view on .nav-open (translateX(0))`);
  }

  // Desktop Viewports (> 1024px)
  if (vp.width > 1024) {
    assert(responsiveCss.includes('@media (min-width: 1025px)'), `[${vp.width}px] Contains @media (min-width: 1025px) desktop block`);
    assert(/@media\s*\(min-width:\s*1025px\)\s*\{[\s\S]*?\.mobile-menu-toggle\s*\{[^}]*display:\s*none\s*!important/.test(responsiveCss),
      `[${vp.width}px] Mobile hamburger toggle is hidden on desktop (!important)`);
    assert(/@media\s*\(min-width:\s*1025px\)\s*\{[\s\S]*?\.mobile-call-bar\s*\{[^}]*display:\s*none\s*!important/.test(responsiveCss),
      `[${vp.width}px] Mobile persistent call bar is hidden on desktop (!important)`);
    assert(/@media\s*\(min-width:\s*1025px\)\s*\{[\s\S]*?\.nav-backdrop\s*\{[^}]*display:\s*none\s*!important/.test(responsiveCss),
      `[${vp.width}px] Nav backdrop overlay is disabled on desktop`);
  }
}

// 2. HTML Meta Viewport & Structure Across All Pages
console.log(`\n\x1b[1mChecking HTML Pages for Responsive Viewport Meta and Layout Structure...\x1b[0m`);
for (const page of PAGES) {
  const content = fs.readFileSync(path.join(ROOT_DIR, page), 'utf-8');
  assert(/<meta[^>]+name=["']viewport["'][^>]+content=["'][^"']*width=device-width[^"']*initial-scale=1\.0[^"']*["']/i.test(content)
    || /<meta[^>]+content=["'][^"']*width=device-width[^"']*initial-scale=1\.0[^"']*["'][^>]+name=["']viewport["']/i.test(content),
    `[${page}] Viewport meta tag is standard width=device-width, initial-scale=1.0`);
  
  assert(content.includes('css/responsive.css'), `[${page}] Links to css/responsive.css`);
  assert(content.includes('css/components.css'), `[${page}] Links to css/components.css`);
  assert(content.includes('css/styles.css'), `[${page}] Links to css/styles.css`);
  assert(content.includes('js/main.js'), `[${page}] Loads js/main.js`);
}

console.log(`\n\x1b[36m================================================================================\x1b[0m`);
console.log(`  Total Responsive Layout Checks : \x1b[1m${totalAssertions}\x1b[0m`);
console.log(`  Passed Assertions              : \x1b[32m\x1b[1m${passedAssertions}\x1b[0m`);
console.log(`  Failed Assertions              : \x1b[31m\x1b[1m${failedAssertions}\x1b[0m`);
console.log(`\x1b[36m================================================================================\x1b[0m\n`);

if (failedAssertions > 0) {
  process.exit(1);
} else {
  console.log(`\x1b[32m✨ MULTI-VIEWPORT RESPONSIVE LAYOUT PASSED 100%! ✨\x1b[0m\n`);
  process.exit(0);
}
