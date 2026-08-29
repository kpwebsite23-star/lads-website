import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PAGES = [
  'index.html',
  'about.html',
  'services.html',
  'gallery.html',
  'estimate.html',
  'testimonials.html',
  'faq.html',
  'contact.html'
];

let checks = 0;
let errors = [];

function check(cond, msg) {
  checks++;
  if (cond) {
    console.log(`  ✔ PASS: ${msg}`);
  } else {
    console.error(`  ✖ FAIL: ${msg}`);
    errors.push(msg);
  }
}

console.log('================================================================================');
console.log('MOBILE & RESPONSIVE INTERACTION DEEP AUDIT');
console.log('================================================================================\n');

// 1. Mobile Menu Elements across all pages
console.log('--- 1. Mobile Hamburger Menu Markup & ARIA ---');
PAGES.forEach(page => {
  const html = fs.readFileSync(path.join(ROOT_DIR, page), 'utf8');
  check(html.includes('class="site-header'), `[${page}] Contains .site-header`);
  check(/<button\b[^>]*class=["'][^"']*mobile-menu-toggle[^"']*["'][^>]*>/i.test(html), `[${page}] Contains .mobile-menu-toggle button`);
  check(/aria-expanded=["']false["']/i.test(html), `[${page}] Hamburger button has initial aria-expanded="false"`);
  check(/aria-controls=["']main-nav["']/i.test(html), `[${page}] Hamburger button has aria-controls="main-nav"`);
  check(/aria-label=["'][^"']*menu[^"']*["']/i.test(html), `[${page}] Hamburger button has accessible aria-label`);
  check(/<nav\b[^>]*id=["']main-nav["']/i.test(html), `[${page}] Nav landmark has id="main-nav"`);
});

// 2. Tap-to-Call Phone Links Formatting
console.log('\n--- 2. Tap-to-Call Link Protocol & Formatting ---');
let totalTelCount = 0;
PAGES.forEach(page => {
  const html = fs.readFileSync(path.join(ROOT_DIR, page), 'utf8');
  const telMatches = html.match(/href=["']tel:([^"']+)["']/gi) || [];
  totalTelCount += telMatches.length;

  check(telMatches.length >= 2, `[${page}] Page contains >=2 phone CTA links (found ${telMatches.length})`);
  telMatches.forEach(t => {
    const rawNum = t.replace(/^href=["']tel:/i, '').replace(/["']$/, '');
    check(rawNum === '3163937207', `[${page}] Phone href is exactly "tel:3163937207" (found tel:${rawNum})`);
  });
});

// 3. Email Mailto Formatting
console.log('\n--- 3. Email Mailto Protocol & Address Validation ---');
let totalMailtoCount = 0;
PAGES.forEach(page => {
  const html = fs.readFileSync(path.join(ROOT_DIR, page), 'utf8');
  const mailtoMatches = html.match(/href=["']mailto:([^"']+)["']/gi) || [];
  totalMailtoCount += mailtoMatches.length;

  check(mailtoMatches.length >= 1, `[${page}] Page contains mailto link (found ${mailtoMatches.length})`);
  mailtoMatches.forEach(m => {
    const email = m.replace(/^href=["']mailto:/i, '').replace(/["']$/, '');
    check(email === 'info@lctreeks.com', `[${page}] Email href is exactly "mailto:info@lctreeks.com" (found mailto:${email})`);
  });
});

// 4. Responsive CSS Media Queries Analysis
console.log('\n--- 4. Responsive CSS Media Query Coverage ---');
const responsiveCss = fs.readFileSync(path.join(ROOT_DIR, 'css', 'responsive.css'), 'utf8');
const componentsCss = fs.readFileSync(path.join(ROOT_DIR, 'css', 'components.css'), 'utf8');

check(responsiveCss.includes('@media (max-width: 1024px)') || responsiveCss.includes('@media (max-width: 1023px)'), 'responsive.css defines tablet/mobile breakpoint (<=1024px)');
check(responsiveCss.includes('@media (max-width: 768px)') || responsiveCss.includes('@media (max-width: 767px)'), 'responsive.css defines smartphone breakpoint (<=768px)');
check(responsiveCss.includes('@media (max-width: 480px)') || responsiveCss.includes('@media (max-width: 576px)'), 'responsive.css defines small mobile breakpoint');
check(responsiveCss.includes('.nav-open'), 'responsive.css contains styles for .nav-open state');
check(responsiveCss.includes('.nav-backdrop'), 'responsive.css contains styles for .nav-backdrop');

// 5. JavaScript Mobile Menu Implementation Logic
console.log('\n--- 5. JavaScript Mobile Menu Engine Verification ---');
const mainJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'main.js'), 'utf8');
check(mainJs.includes('initMobileNav'), 'main.js defines initMobileNav()');
check(mainJs.includes('.nav-backdrop'), 'main.js dynamically creates and handles .nav-backdrop');
check(mainJs.includes('aria-expanded'), 'main.js toggles aria-expanded attribute on mobile toggle');
check(mainJs.includes('Escape'), 'main.js handles Escape key to dismiss mobile drawer');
check(mainJs.includes('resize'), 'main.js handles viewport resize to auto-close drawer on desktop');

console.log('\n================================================================================');
console.log(`Total Checks: ${checks} | Passed: ${checks - errors.length} | Failed: ${errors.length}`);
if (errors.length === 0) {
  console.log('✔ SUCCESS: All Mobile & Responsive interactions verified with 100% compliance.');
  process.exit(0);
} else {
  console.log('✖ FAILURES FOUND:', errors);
  process.exit(1);
}
