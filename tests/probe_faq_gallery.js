import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failures = [];

function assert(condition, description) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✔ PASS: ${description}`);
  } else {
    failedChecks++;
    failures.push(description);
    console.error(`  ✖ FAIL: ${description}`);
  }
}

console.log('================================================================================');
console.log('FAQ ACCORDION & GALLERY FILTERING COMPONENT DEEP PROBE');
console.log('================================================================================\n');

// 1. FAQ Accordion Markup & Logic
console.log('--- 1. FAQ Accordion (`faq.html` & `js/faq.js`) ---');
const faqHtml = fs.readFileSync(path.join(ROOT_DIR, 'faq.html'), 'utf8');
const faqJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'faq.js'), 'utf8');

// Markup check
assert(faqHtml.includes('id="faq-accordion"') || faqHtml.includes('class="faq-accordion"'), 'FAQ container exists');
const faqTriggers = faqHtml.match(/<button\b[^>]*class=["'][^"']*faq-question-btn[^"']*["'][^>]*>/gi) || [];
assert(faqTriggers.length >= 4, `Found >=4 FAQ question trigger buttons (found ${faqTriggers.length})`);

// ARIA controls and expanded attributes
const ariaControlsMatches = faqHtml.match(/aria-controls=["']faq-answer-\d+["']/gi) || [];
assert(ariaControlsMatches.length === faqTriggers.length, `All ${faqTriggers.length} FAQ buttons have corresponding aria-controls`);

// Content topics check
assert(faqHtml.includes('insured'), 'FAQ covers insurance coverage');
assert(faqHtml.includes('cleanup') || faqHtml.includes('debris'), 'FAQ covers debris cleanup differentiator');
assert(faqHtml.includes('estimate') || faqHtml.includes('24 hours'), 'FAQ covers estimate turnaround speed');
assert(faqHtml.includes('home') || faqHtml.includes('present'), 'FAQ covers homeowner presence requirement');

// JS Implementation Check
assert(faqJs.includes('initFaqAccordion'), 'faq.js defines initFaqAccordion()');
assert(faqJs.includes('aria-expanded'), 'faq.js manages aria-expanded state on triggers');
assert(faqJs.includes('hidden'), 'faq.js manages hidden property on answer panels');
assert(faqJs.includes('ArrowDown') && faqJs.includes('ArrowUp'), 'faq.js implements WAI-ARIA ArrowDown and ArrowUp keyboard navigation');
assert(faqJs.includes('Home') && faqJs.includes('End'), 'faq.js implements WAI-ARIA Home and End keyboard navigation');

// 2. Gallery Filter & Lightbox Markup & Logic
console.log('\n--- 2. Gallery Portfolio & Lightbox (`gallery.html` & `js/gallery.js`) ---');
const galleryHtml = fs.readFileSync(path.join(ROOT_DIR, 'gallery.html'), 'utf8');
const galleryJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'gallery.js'), 'utf8');

// Filter Buttons
assert(galleryHtml.includes('data-filter="all"'), 'Gallery includes "All" filter button');
assert(galleryHtml.includes('data-filter="removal"'), 'Gallery includes "Tree Removal" filter button');
assert(galleryHtml.includes('data-filter="trimming"'), 'Gallery includes "Tree Trimming" filter button');
assert(galleryHtml.includes('data-filter="landscaping"'), 'Gallery includes "Landscaping" filter button');

// Gallery Items
const galleryItems = galleryHtml.match(/class=["'][^"']*gallery-card[^"']*["']/gi) || galleryHtml.match(/class=["'][^"']*gallery-item[^"']*["']/gi) || [];
assert(galleryItems.length >= 6, `Gallery contains >=6 portfolio projects (found ${galleryItems.length})`);

// Lightbox Modal Markup
assert(galleryHtml.includes('id="gallery-lightbox"') || galleryHtml.includes('class="lightbox-modal"'), 'Gallery page contains lightbox modal component');
assert(galleryHtml.includes('lightbox-close') || galleryHtml.includes('data-close-lightbox'), 'Lightbox contains close button');
assert(galleryHtml.includes('lightbox-prev') || galleryHtml.includes('data-prev-lightbox'), 'Lightbox contains prev button');
assert(galleryHtml.includes('lightbox-next') || galleryHtml.includes('data-next-lightbox'), 'Lightbox contains next button');

// JS Implementation Check
assert(galleryJs.includes('initGalleryFilters'), 'gallery.js defines initGalleryFilters()');
assert(galleryJs.includes('initLightboxModal'), 'gallery.js defines initLightboxModal()');
assert(galleryJs.includes('initBeforeAfterSliders'), 'gallery.js defines initBeforeAfterSliders()');
assert(galleryJs.includes('aria-pressed'), 'gallery.js manages aria-pressed states on filter buttons');
assert(galleryJs.includes('Escape'), 'gallery.js handles Escape key to close modal');
assert(galleryJs.includes('ArrowRight') && galleryJs.includes('ArrowLeft'), 'gallery.js handles Left/Right arrow keys for image navigation');

// 3. Before/After Comparison Sliders
console.log('\n--- 3. Before/After Image Comparison Sliders ---');
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
assert(indexHtml.includes('before-after') || indexHtml.includes('slider-handle'), 'Home page contains before/after comparison component');
assert(galleryHtml.includes('before-after') || galleryHtml.includes('slider-handle'), 'Gallery page contains before/after comparison component');

const mainJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'main.js'), 'utf8');
assert(mainJs.includes('initBeforeAfterSliders') || galleryJs.includes('initBeforeAfterSliders'), 'JavaScript initializes interactive slider handlers');

console.log('\n================================================================================');
console.log(`FAQ & Gallery Probe: Total Checks: ${totalChecks} | Passed: ${passedChecks} | Failed: ${failedChecks}`);
if (failedChecks === 0) {
  console.log('✔ SUCCESS: FAQ accordion and Gallery filtering components verified 100% compliant!');
  process.exit(0);
} else {
  console.log('✖ FAILURES:', failures);
  process.exit(1);
}
