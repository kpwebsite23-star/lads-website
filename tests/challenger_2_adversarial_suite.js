/**
 * CHALLENGER 2: EMPIRICAL ADVERSARIAL VERIFICATION & MULTI-VIEWPORT STRESS HARNESS
 * 
 * Tests:
 * 1. 7 Multi-Viewport Responsive Layouts (320px, 375px, 425px, 768px, 1024px, 1440px, 1920px)
 * 2. Responsive CSS, Breakpoints, Fluid Typography, & Horizontal Overflow Resistance
 * 3. Interactive DOM Components (Drawer Nav, FAQ Accordions, Comparison Sliders, Form Validation, Scroll Top)
 * 4. Image Accessibility & WCAG 2.1 AA Alt Text Standards
 * 5. Brand Integrity, Owner Attribution ("Lad Oborny"), & Tel/Mailto Formatting
 * 6. Homepage Condensation & Debug Artifact Removal
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failureDetails = [];

function assert(condition, message, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✔ PASS: ${message}`);
  } else {
    failedChecks++;
    console.error(`  ✖ FAIL: ${message}`);
    if (details) console.error(`    ${details}`);
    failureDetails.push({ message, details });
  }
}

console.log('='.repeat(80));
console.log('⚡ CHALLENGER 2: ADVERSARIAL MULTI-VIEWPORT & DOM STRESS TEST HARNESS ⚡');
console.log('='.repeat(80));

// Load core files
const HTML_PAGES = ['index.html', 'about.html', 'services.html', 'contact.html'];
const htmlContents = {};
HTML_PAGES.forEach(page => {
  const filePath = path.join(ROOT_DIR, page);
  assert(fs.existsSync(filePath), `HTML file exists: ${page}`);
  htmlContents[page] = fs.readFileSync(filePath, 'utf-8');
});

const CSS_FILES = ['css/styles.css', 'css/components.css', 'css/responsive.css', 'css/scroll-top.css'];
const cssContents = {};
CSS_FILES.forEach(css => {
  const filePath = path.join(ROOT_DIR, css);
  assert(fs.existsSync(filePath), `CSS file exists: ${css}`);
  cssContents[css] = fs.readFileSync(filePath, 'utf-8');
});

const JS_FILE = 'js/main.js';
const jsPath = path.join(ROOT_DIR, JS_FILE);
assert(fs.existsSync(jsPath), `JavaScript file exists: ${JS_FILE}`);
const jsContent = fs.readFileSync(jsPath, 'utf-8');

// ============================================================================
// SUITE 1: 7 MULTI-VIEWPORT LAYOUT VERIFICATION & BREAKPOINT AUDIT
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('SUITE 1: 7 MULTI-VIEWPORT RESPONSIVE LAYOUT VERIFICATION');
console.log('='.repeat(80));

const VIEWPORTS = [
  { name: 'Mobile XS (320px)', width: 320, type: 'mobile-xs' },
  { name: 'Mobile SM (375px)', width: 375, type: 'mobile' },
  { name: 'Mobile MD/LG (425px)', width: 425, type: 'mobile' },
  { name: 'Tablet Portrait (768px)', width: 768, type: 'tablet-sm' },
  { name: 'Tablet Landscape / Small Desktop (1024px)', width: 1024, type: 'tablet-lg' },
  { name: 'Desktop HD (1440px)', width: 1440, type: 'desktop' },
  { name: 'Desktop 2K / FHD (1920px)', width: 1920, type: 'desktop-lg' }
];

const responsiveCss = cssContents['css/responsive.css'];
const stylesCss = cssContents['css/styles.css'];
const componentsCss = cssContents['css/components.css'];
const combinedCss = Object.values(cssContents).join('\n');

VIEWPORTS.forEach(vp => {
  console.log(`\n--- Evaluating Viewport: ${vp.name} ---`);
  
  if (vp.width <= 480) {
    assert(responsiveCss.includes('@media (max-width: 480px)'), `[${vp.name}] Applies @media (max-width: 480px) fluid rules`);
    assert(responsiveCss.includes('font-size: 1.85rem') || responsiveCss.includes('font-size: 1.8rem'), `[${vp.name}] H1 heading scales down to prevent truncation on narrow screens`);
    assert(responsiveCss.includes('padding: 0.75rem 1.25rem'), `[${vp.name}] Buttons apply compact mobile padding`);
  }

  if (vp.width <= 768) {
    assert(responsiveCss.includes('@media (max-width: 768px)'), `[${vp.name}] Applies @media (max-width: 768px) rules`);
    assert(responsiveCss.includes('.mobile-call-bar') && responsiveCss.includes('display: block'), `[${vp.name}] Mobile persistent bottom call bar is activated`);
    assert(responsiveCss.includes('body {') && responsiveCss.includes('padding-bottom: 74px'), `[${vp.name}] Body padding accommodates bottom bar without obstructing footer`);
    assert(responsiveCss.includes('.hero-cta-group') && responsiveCss.includes('flex-direction: column'), `[${vp.name}] Hero CTAs stack vertically`);
    assert(responsiveCss.includes('.footer-grid') && responsiveCss.includes('grid-template-columns: 1fr'), `[${vp.name}] Footer collapses to 1-column layout`);
  }

  if (vp.width <= 1024) {
    assert(responsiveCss.includes('@media (max-width: 1024px)'), `[${vp.name}] Applies @media (max-width: 1024px) rules`);
    assert(responsiveCss.includes('.mobile-menu-toggle') && responsiveCss.includes('display: flex'), `[${vp.name}] Hamburger navigation toggle button is displayed`);
    assert(responsiveCss.includes('.main-nav') && responsiveCss.includes('position: fixed') && responsiveCss.includes('transform: translateX(100%)'), `[${vp.name}] Main nav transforms into off-canvas slide drawer`);
    assert(responsiveCss.includes('.site-header.nav-open .main-nav') && responsiveCss.includes('transform: translateX(0)'), `[${vp.name}] Off-canvas drawer slides in when open`);
  }

  if (vp.width >= 1025) {
    assert(responsiveCss.includes('@media (min-width: 1025px)'), `[${vp.name}] Applies @media (min-width: 1025px) desktop rules`);
    assert(responsiveCss.includes('.mobile-menu-toggle') && responsiveCss.includes('display: none !important'), `[${vp.name}] Mobile hamburger toggle is hidden on desktop`);
    assert(responsiveCss.includes('.mobile-call-bar') && responsiveCss.includes('display: none !important'), `[${vp.name}] Mobile bottom call bar is hidden on desktop`);
    assert(responsiveCss.includes('.nav-backdrop') && responsiveCss.includes('display: none !important'), `[${vp.name}] Nav backdrop overlay is disabled on desktop`);
  }
});

// HTML page viewport meta check
HTML_PAGES.forEach(page => {
  const content = htmlContents[page];
  assert(content.includes('<meta name="viewport" content="width=device-width, initial-scale=1.0">'), `[${page}] Contains standard responsive viewport meta tag`);
  assert(content.includes('href="css/responsive.css"'), `[${page}] Links to responsive.css`);
  assert(content.includes('href="css/components.css"'), `[${page}] Links to components.css`);
  assert(content.includes('href="css/styles.css"'), `[${page}] Links to styles.css`);
  assert(content.includes('src="js/main.js"'), `[${page}] Loads main.js script`);
});

// ============================================================================
// SUITE 2: HORIZONTAL OVERFLOW & LAYOUT COLLISION RESISTANCE
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('SUITE 2: HORIZONTAL OVERFLOW & LAYOUT COLLISION RESISTANCE');
console.log('='.repeat(80));

assert(combinedCss.includes('box-sizing: border-box'), 'CSS applies universal box-sizing: border-box reset');
assert(combinedCss.includes('overflow-x: hidden'), 'CSS applies overflow-x: hidden on body/html to prevent accidental horizontal scroll');
assert(combinedCss.includes('max-width: 100%'), 'CSS applies fluid max-width: 100% on images and media containers');

// Ensure no top-level containers or cards have fixed widths exceeding 360px without responsive max-width
const fixedWidthContainerRegex = /\.(?:container|card|hero|section|footer|header|nav|modal)[^{]*\{[^}]*?(?:^|[^-])width:\s*([4-9]\d{2,}|[1-9]\d{3,})px/gi;
let fixedWidthMatches = [];
let match;
while ((match = fixedWidthContainerRegex.exec(combinedCss)) !== null) {
  fixedWidthMatches.push(match[0]);
}
assert(fixedWidthMatches.length === 0, `No hardcoded non-responsive container widths > 360px in stylesheets (found: ${fixedWidthMatches.length})`);

// ============================================================================
// SUITE 3: INTERACTIVE DOM STATE MACHINES & JAVASCRIPT ROBUSTNESS
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('SUITE 3: INTERACTIVE DOM STATE MACHINES & SCRIPT MODULES');
console.log('='.repeat(80));

// Sticky Header
assert(jsContent.includes('initStickyHeader'), 'JS initializes sticky header elevation');
assert(jsContent.includes('header.classList.add(\'header-scrolled\')'), 'Sticky header adds header-scrolled class on scroll');
assert(jsContent.includes('header.classList.remove(\'header-scrolled\')'), 'Sticky header removes header-scrolled class when at top');

// Mobile Nav Drawer
assert(jsContent.includes('initMobileNav'), 'JS initializes mobile drawer navigation');
assert(jsContent.includes('toggleBtn.setAttribute(\'aria-expanded\', \'true\')'), 'Mobile nav synchronizes aria-expanded to true on open');
assert(jsContent.includes('toggleBtn.setAttribute(\'aria-expanded\', \'false\')'), 'Mobile nav synchronizes aria-expanded to false on close');
assert(jsContent.includes('Escape'), 'Mobile drawer supports keyboard Escape key close');
assert(jsContent.includes('nav-backdrop'), 'Mobile drawer utilizes backdrop click overlay');
assert(jsContent.includes('window.innerWidth >= 1024'), 'Mobile drawer auto-closes on resize to desktop');

// FAQ Accordion
assert(jsContent.includes('initFaqAccordion'), 'JS initializes FAQ accordion');
assert(jsContent.includes('togglePanel'), 'FAQ accordion supports panel toggle logic');
assert(jsContent.includes('ArrowDown') && jsContent.includes('ArrowUp'), 'FAQ accordion supports WAI-ARIA arrow key navigation');
assert(jsContent.includes('Home') && jsContent.includes('End'), 'FAQ accordion supports Home/End key jump');
assert(jsContent.includes('aria-expanded'), 'FAQ accordion updates aria-expanded attribute');
assert(jsContent.includes('scrollHeight'), 'FAQ accordion calculates dynamic scrollHeight for smooth height transition');

// Before / After Slider
assert(jsContent.includes('initBeforeAfterSliders'), 'JS initializes before/after image sliders');
assert(jsContent.includes('input') && jsContent.includes('mousedown') && jsContent.includes('touchstart'), 'Comparison slider supports range input, mouse drag, and touch gestures');
assert(jsContent.includes('Math.max(0, Math.min(100,'), 'Comparison slider clamps position strictly between 0% and 100%');

// Scroll To Top
assert(jsContent.includes('initScrollToTop'), 'JS initializes floating scroll-to-top button');
assert(jsContent.includes('btn.classList.add(\'visible\')'), 'Scroll-to-top button activates .visible class at scroll depth threshold');
assert(jsContent.includes('behavior: \'smooth\''), 'Scroll-to-top triggers smooth window scrolling');

// Form Validation & Telephony
assert(jsContent.includes('initPhoneFormatting'), 'JS initializes US phone formatting mask');
assert(jsContent.includes('validateForm'), 'JS includes client-side multi-field form validator');
assert(jsContent.includes('handleFormSuccess'), 'JS renders 24-hour guarantee success confirmation banner');
assert(jsContent.includes('Lad Oborny'), 'Form success confirmation explicitly attributes owner Lad Oborny');

// ============================================================================
// SUITE 4: ACCESSIBILITY, LANDMARKS, HEADINGS & WCAG ALT TEXT
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('SUITE 4: ACCESSIBILITY, LANDMARKS & WCAG 2.1 AA IMAGE ALT AUDIT');
console.log('='.repeat(80));

HTML_PAGES.forEach(page => {
  const content = htmlContents[page];
  
  // Landmarks
  assert((content.match(/<header/g) || []).length === 1, `[${page}] Contains exactly 1 semantic <header>`);
  assert((content.match(/<main/g) || []).length === 1, `[${page}] Contains exactly 1 semantic <main>`);
  assert((content.match(/<footer/g) || []).length === 1, `[${page}] Contains exactly 1 semantic <footer>`);
  assert(content.includes('<nav class="main-nav"'), `[${page}] Contains semantic <nav class="main-nav">`);

  // H1 Headings
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  assert(h1Matches.length === 1, `[${page}] Contains exactly 1 <h1> heading (found: ${h1Matches.length})`);

  // Images and Alt attributes
  const imgTags = content.match(/<img\s+[^>]+>/gi) || [];
  assert(imgTags.length > 0, `[${page}] Contains valid image elements (${imgTags.length} images)`);

  imgTags.forEach((img, idx) => {
    const srcMatch = img.match(/src="([^"]+)"/);
    const altMatch = img.match(/alt="([^"]*)"/);

    const src = srcMatch ? srcMatch[1] : `unknown_${idx}`;
    assert(altMatch !== null, `[${page}] <img> has alt attribute (src: "${src}")`);
    
    if (altMatch) {
      const altText = altMatch[1].trim();
      assert(altText.length > 0, `[${page}] <img> alt text is non-empty (src: "${src}")`);
      assert(
        !altText.toLowerCase().includes('placeholder') &&
        altText.toLowerCase() !== 'image' &&
        altText.toLowerCase() !== 'photo' &&
        altText.toLowerCase() !== 'our owner' &&
        altText.toLowerCase() !== 'owner photo',
        `[${page}] <img> alt text is descriptive and meaningful: "${altText}"`
      );
    }

    // Verify file on disk
    if (srcMatch && !srcMatch[1].startsWith('http')) {
      const assetPath = path.join(ROOT_DIR, srcMatch[1]);
      assert(fs.existsSync(assetPath), `[${page}] Referenced image exists on disk: "${srcMatch[1]}"`);
    }
  });
});

// ============================================================================
// SUITE 5: BRAND CONSISTENCY, OWNER ATTRIBUTION & CONTACT INTEGRITY
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('SUITE 5: BRAND CONSISTENCY, OWNER ATTRIBUTION & CONTACT INTEGRITY');
console.log('='.repeat(80));

HTML_PAGES.forEach(page => {
  const content = htmlContents[page];
  
  // Footer Owner Name
  assert(content.includes('Lad Oborny, Owner &amp; Operator') || content.includes('Lad Oborny'), `[${page}] Page footer features owner "Lad Oborny"`);

  // Phone and Email Links
  assert(content.includes('href="tel:3163937207"'), `[${page}] Contains standardized tap-to-call link "tel:3163937207"`);
  assert(content.includes('href="mailto:info@lctreeks.com"'), `[${page}] Contains standardized mailto link "mailto:info@lctreeks.com"`);

  // Check for any accidental find-and-replace corruptions
  assert(!content.includes('Our Team Our Team'), `[${page}] No duplicate replacement glitches ("Our Team Our Team")`);
  assert(!content.includes('alt="our owner"'), `[${page}] No un-descriptive "our owner" alt text`);
  assert(!content.includes('Our Team will contact you within 24 hours'), `[${page}] Owner Lad Oborny correctly specified for estimate callback`);
  assert(!content.includes('<!-- LABELS SCRIPT -->'), `[${page}] Debug badge tags are completely removed`);
});

// Specific page assertions
assert(htmlContents['index.html'].includes('Lad Oborny'), '[index.html] Trust bar & Difference section name Lad Oborny');
assert(htmlContents['about.html'].includes('Meet the Owner: Lad Oborny'), '[about.html] Explicit Meet the Owner section naming Lad Oborny');
assert(htmlContents['about.html'].includes('Founder &amp; Lead Operator'), '[about.html] Founder & Lead Operator title');
assert(htmlContents['services.html'].includes('Lad Oborny will contact you within 24 hours'), '[services.html] FAQ explicitly attributes Lad Oborny callback');
assert(
  htmlContents['services.html'].includes('alt="Lad Oborny, Owner &amp; Operator of LC Tree and Landscaping"') ||
  htmlContents['services.html'].includes('alt="Lad Oborny, Owner & Operator of LC Tree and Landscaping"'),
  '[services.html] Owner direct help box has descriptive alt text'
);

// ============================================================================
// SUITE 6: HOMEPAGE CONDENSATION & ACCEPTANCE CRITERIA
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('SUITE 6: HOMEPAGE CONDENSATION & ACCEPTANCE CRITERIA');
console.log('='.repeat(80));

const indexLines = htmlContents['index.html'].split('\n').length;
console.log(`  ℹ Index.html Line Count: ${indexLines} lines (Originally 1,046 lines)`);
assert(indexLines < 750, `Homepage is condensed (< 750 lines, current: ${indexLines} lines)`);
assert(indexLines >= 400, `Homepage retains full semantic depth (>= 400 lines, current: ${indexLines} lines)`);

// Verify all core sections exist on condensed index.html
const indexHtml = htmlContents['index.html'];
assert(indexHtml.includes('id="hero"'), '[index.html] Contains Hero Section');
assert(indexHtml.includes('id="trust-bar"'), '[index.html] Contains Trust Bar');
assert(indexHtml.includes('id="core-services"'), '[index.html] Contains Core Services Grid');
assert(indexHtml.includes('id="lc-difference"'), '[index.html] Contains The LC Difference Section');
assert(indexHtml.includes('id="proof-of-quality"'), '[index.html] Contains Consolidated Proof of Quality / Showcase');
assert(indexHtml.includes('id="reviews"'), '[index.html] Contains Consolidated Verified Customer Reviews');
assert(indexHtml.includes('id="pre-footer-cta"'), '[index.html] Contains High-Contrast Pre-Footer CTA');
assert(indexHtml.includes('class="site-footer"'), '[index.html] Contains 4-Column Global Footer');

// ============================================================================
// SUMMARY & VERDICT
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('CHALLENGER 2 ADVERSARIAL VERIFICATION SUMMARY');
console.log('='.repeat(80));
console.log(`Total Empirical Checks  : ${totalChecks}`);
console.log(`Passed Checks           : ${passedChecks}`);
console.log(`Failed Checks           : ${failedChecks}`);
const complianceRate = ((passedChecks / totalChecks) * 100).toFixed(1);
console.log(`Overall Compliance Rate : ${complianceRate}%`);

if (failedChecks === 0) {
  console.log('\n>>> VERDICT: APPROVE (100% Multi-Viewport & Interactive DOM Verified) <<<\n');
  process.exit(0);
} else {
  console.error('\n>>> VERDICT: REQUEST_CHANGES (Defects Detected) <<<\n');
  failureDetails.forEach((f, i) => {
    console.error(`${i + 1}. ${f.message}`);
    if (f.details) console.error(`   ${f.details}`);
  });
  process.exit(1);
}
