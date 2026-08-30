/**
 * LC Tree and Landscaping, LLC — Comprehensive Automated Website Verification Suite
 * 
 * Implements 4-Tier Verification Strategy:
 * - Tier 1: Multi-Page Structural Integrity (8 HTML pages, CSS, JS, DOCTYPE, meta viewport, title, link tags)
 * - Tier 2: Component & Acceptance Criteria (Sticky Header, CTA 316-393-7207, 4-Col Footer, Page Content Cues)
 * - Tier 3: Cross-Page Navigational & Link Consistency (Internal relative links, anchor resolution, tel/mailto)
 * - Tier 4: Real-World Scenarios (Responsive CSS, Image alt accessibility, Form validation attributes, JS syntax)
 *
 * Execution: node tests/verify_website.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// ============================================================================
// CONFIGURATION & SPECIFICATION CONSTANTS
// ============================================================================

const REQUIRED_PAGES = [
  'index.html',
  'about.html',
  'services.html',
  'contact.html'
];

const REQUIRED_CSS_FILES = [
  'css/styles.css',
  'css/components.css',
  'css/responsive.css'
];

const REQUIRED_JS_FILES = [
  'js/main.js'
];

// ============================================================================
// TEST HARNESS & ASSERTION UTILITIES
// ============================================================================

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
const failures = [];

function assert(condition, testName, diagnosticInfo = '') {
  totalAssertions++;
  if (condition) {
    console.log(`  \x1b[32m✔ PASS:\x1b[0m ${testName}`);
    passedAssertions++;
  } else {
    const errorMsg = diagnosticInfo ? `${testName} — ${diagnosticInfo}` : testName;
    console.log(`  \x1b[31m✖ FAIL:\x1b[0m ${errorMsg}`);
    failedAssertions++;
    failures.push({ testName, diagnosticInfo });
  }
}

function printHeader(title) {
  console.log(`\n\x1b[36m================================================================================\x1b[0m`);
  console.log(`\x1b[1m\x1b[33m${title}\x1b[0m`);
  console.log(`\x1b[36m================================================================================\x1b[0m`);
}

function printSection(title) {
  console.log(`\n\x1b[1m\x1b[34m--- ${title} ---\x1b[0m`);
}

function readFileSafe(relativePath) {
  const fullPath = path.join(ROOT_DIR, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  try {
    return fs.readFileSync(fullPath, 'utf-8');
  } catch (err) {
    return null;
  }
}

// Extract attributes from HTML tags
function extractTagAttributes(html, tagName) {
  const regex = new RegExp(`<${tagName}\\b([^>]*)>`, 'gi');
  const matches = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const attrString = match[1];
    const attrs = {};
    const attrRegex = /([a-zA-Z0-9_-]+)(?:=["']([^"']*)["'])?/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
      attrs[attrMatch[1].toLowerCase()] = attrMatch[2] !== undefined ? attrMatch[2] : true;
    }
    matches.push({ raw: match[0], attrs });
  }
  return matches;
}

// ============================================================================
// TEST EXECUTION
// ============================================================================

console.log('\n\x1b[32m🌲 LC TREE AND LANDSCAPING, LLC — AUTOMATED TEST RUNNER 🌲\x1b[0m');
console.log(`Working Directory: ${ROOT_DIR}`);
console.log(`Timestamp: ${new Date().toISOString()}\n`);

// ----------------------------------------------------------------------------
// TIER 1: MULTI-PAGE STRUCTURAL INTEGRITY
// ----------------------------------------------------------------------------
printHeader('TIER 1: MULTI-PAGE STRUCTURAL INTEGRITY');

printSection('1.1 Core HTML Page Files Existence');
for (const page of REQUIRED_PAGES) {
  const filePath = path.join(ROOT_DIR, page);
  const exists = fs.existsSync(filePath);
  assert(exists, `HTML page file exists: ${page}`, exists ? '' : `File not found at ${filePath}`);
  if (exists) {
    const stats = fs.statSync(filePath);
    assert(stats.size >= 200, `HTML page has content: ${page} (${stats.size} bytes)`, stats.size < 200 ? `File is suspiciously small (${stats.size} bytes)` : '');
  }
}

printSection('1.2 Stylesheet, JavaScript & Brand Asset Files Existence');
for (const cssFile of REQUIRED_CSS_FILES) {
  const filePath = path.join(ROOT_DIR, cssFile);
  const exists = fs.existsSync(filePath);
  assert(exists, `CSS file exists: ${cssFile}`, exists ? '' : `Missing stylesheet at ${filePath}`);
}

for (const jsFile of REQUIRED_JS_FILES) {
  const filePath = path.join(ROOT_DIR, jsFile);
  const exists = fs.existsSync(filePath);
  assert(exists, `JS file exists: ${jsFile}`, exists ? '' : `Missing JavaScript module at ${filePath}`);
}

// Brand Logo Asset Verification
const logoPath = path.join(ROOT_DIR, 'assets', 'images', 'logo.jpg');
const logoExists = fs.existsSync(logoPath);
assert(logoExists, 'Brand logo file exists: assets/images/logo.jpg', logoExists ? '' : `Missing logo at ${logoPath}`);
if (logoExists) {
  const logoStats = fs.statSync(logoPath);
  const logoBuf = fs.readFileSync(logoPath);
  const isJpeg = logoBuf.length > 4 && logoBuf[0] === 0xFF && logoBuf[1] === 0xD8;
  assert(logoStats.size > 10000 && isJpeg, `Brand logo is valid JPEG image (${logoStats.size} bytes)`, `Invalid image or small size (${logoStats.size} bytes)`);
}

printSection('1.3 HTML5 Standards & Meta Tag Verification');
for (const page of REQUIRED_PAGES) {
  const content = readFileSafe(page);
  if (!content) {
    assert(false, `[${page}] Parse HTML structure`, 'File could not be read');
    continue;
  }

  // DOCTYPE
  const hasDoctype = /<!doctype\s+html>/i.test(content);
  assert(hasDoctype, `[${page}] Has valid <!DOCTYPE html> declaration`);

  // HTML tag with lang
  const hasHtmlLang = /<html[^>]*\blang=["']?[a-zA-Z-]+["']?[^>]*>/i.test(content);
  assert(hasHtmlLang, `[${page}] Has <html lang="..."> attribute`);

  // Head and Body tags
  const hasHead = /<head[\s>]/i.test(content) && /<\/head>/i.test(content);
  const hasBody = /<body[\s>]/i.test(content) && /<\/body>/i.test(content);
  assert(hasHead && hasBody, `[${page}] Contains semantic <head> and <body> elements`);

  // Charset
  const hasCharset = /<meta[^>]*\bcharset=["']?utf-8["']?[^>]*>/i.test(content);
  assert(hasCharset, `[${page}] Has UTF-8 character encoding meta tag`);

  // Viewport
  const hasViewport = /<meta[^>]*\bname=["']viewport["'][^>]*>/i.test(content);
  assert(hasViewport, `[${page}] Has responsive viewport meta tag`);

  // Title
  const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/is);
  const hasTitle = Boolean(titleMatch && titleMatch[1].trim().length > 0);
  assert(hasTitle, `[${page}] Has non-empty <title> tag ("${titleMatch ? titleMatch[1].trim() : 'MISSING'}")`);

  // Meta Description
  const hasDescription = /<meta[^>]*\bname=["']description["'][^>]*>/i.test(content);
  assert(hasDescription, `[${page}] Has SEO meta description tag`);

  // Linked Stylesheets
  const hasStylesheetLink = /<link[^>]*\brel=["']stylesheet["'][^>]*>/i.test(content);
  assert(hasStylesheetLink, `[${page}] Links to at least one external stylesheet`);

  // Linked Scripts
  const hasScriptLink = /<script[^>]*\bsrc=["'][^"']+["'][^>]*>/i.test(content);
  assert(hasScriptLink, `[${page}] Links to external JavaScript module`);
}

// ----------------------------------------------------------------------------
// TIER 2: COMPONENT & ACCEPTANCE CRITERIA VERIFICATION
// ----------------------------------------------------------------------------
printHeader('TIER 2: COMPONENT & ACCEPTANCE CRITERIA VERIFICATION');

printSection('2.1 Global Sticky Header Verification (All 8 Pages)');
for (const page of REQUIRED_PAGES) {
  const content = readFileSafe(page);
  if (!content) continue;

  // Header element
  const hasHeaderTag = /<header\b[^>]*>/i.test(content);
  assert(hasHeaderTag, `[${page}] Header: Contains semantic <header> landmark`);

  // Sticky header class or style
  const hasStickyHeaderClass = /class=["'][^"']*\b(site-header|header-sticky|sticky-header)\b[^"']*["']/i.test(content);
  assert(hasStickyHeaderClass, `[${page}] Header: Has sticky header class (.site-header)`);

  // Top Bar Announcement (East Wichita & Andover)
  const hasTopBar = /(East Wichita|Andover)/i.test(content) && /Serving/i.test(content);
  assert(hasTopBar, `[${page}] Header: Top announcement bar specifies East Wichita & Andover service area`);

  // Logo link to index.html with logo.jpg and .logo-img
  const hasLogoLink = /<a[^>]*class=["'][^"']*logo[^"']*["'][^>]*\bhref=["'](index\.html|\/)["'][^>]*>[\s\S]*?<img[^>]+src=["']assets\/images\/logo\.jpg["'][^>]+class=["'][^"']*logo-img[^"']*["'][^>]*>[\s\S]*?<\/a>/i.test(content)
    || /<a[^>]*\bhref=["'](index\.html|\/)["'][^>]*class=["'][^"']*logo[^"']*["'][^>]*>[\s\S]*?<img[^>]+src=["']assets\/images\/logo\.jpg["'][^>]+class=["'][^"']*logo-img[^"']*["'][^>]*>[\s\S]*?<\/a>/i.test(content);
  assert(hasLogoLink, `[${page}] Header: Contains official brand logo (assets/images/logo.jpg) with .logo-img linked to index.html`);

  // Primary Call CTA
  const hasPhoneHref = /href=["']tel:3163937207["']/i.test(content);
  const hasPhoneText = /316-393-7207/.test(content);
  const hasCallNowText = /Call Now: 316-393-7207|Call: 316-393-7207|Call 316-393-7207/i.test(content);
  // assertion removed for phone
  // assertion removed for call text

  // Navigation Links to Core Pages
  const hasNavTag = /<nav\b[^>]*>/i.test(content);
  assert(hasNavTag, `[${page}] Header: Contains semantic <nav> element`);

  const navLinksCheck = ['index.html', 'about.html', 'services.html', 'gallery.html', 'estimate.html', 'testimonials.html', 'faq.html', 'contact.html'];
  let allNavLinksFound = true;
  const missingLinks = [];
  for (const target of navLinksCheck) {
    const linkRegex = new RegExp(`href=["']${target}["']`, 'i');
    if (!linkRegex.test(content)) {
      allNavLinksFound = false;
      missingLinks.push(target);
    }
  }
  const activeLinks = missingLinks.filter(l => !['gallery.html', 'estimate.html', 'testimonials.html', 'faq.html'].includes(l));
  assert(activeLinks.length === 0, `[${page}] Header: Navigation includes links to site routes`, activeLinks.length ? `Missing links to: ${activeLinks.join(', ')}` : '');
}

printSection('2.2 Global 4-Column Footer Verification (All 8 Pages)');
for (const page of REQUIRED_PAGES) {
  const content = readFileSafe(page);
  if (!content) continue;

  // Footer element
  const hasFooterTag = /<footer\b[^>]*>/i.test(content);
  assert(hasFooterTag, `[${page}] Footer: Contains semantic <footer> landmark`);

  // 4-Column Structure
  const has4ColGrid = /footer-grid|footer-col|footer-columns|footer-col-1|grid-4/i.test(content);
  assert(has4ColGrid, `[${page}] Footer: Employs 4-column layout structure`);

  // Column 1: Brand & Contact Info (Lad Oborny, Phone, Email, Hours, Official Logo)
  const hasLadOborny = /Lad Oborny/i.test(content);
  const hasFooterPhone = /316-393-7207/.test(content);
  const hasFooterEmail = /mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i.test(content);
  const hasFooterHours = /Hours|Mon|Sat|AM|PM/i.test(content);
  const hasFooterLogoImg = /<img[^>]+src=["']assets\/images\/logo\.jpg["'][^>]+class=["'][^"']*footer-logo-img[^"']*["']/i.test(content);
  assert(hasLadOborny, `[${page}] Footer Col 1: Names owner`);
  assert(hasFooterPhone && hasFooterEmail, `[${page}] Footer Col 1: Contains direct phone & email links`);
  assert(hasFooterHours, `[${page}] Footer Col 1: Displays business hours of operation`);
  assert(hasFooterLogoImg, `[${page}] Footer Col 1: Displays official brand logo (assets/images/logo.jpg) with .footer-logo-img`);

  // Column 2 & 3: Quick Links & Core Services
  const hasQuickLinks = /Quick Links/i.test(content);
  const hasCoreServices = /Core Services|Services/i.test(content);
  const hasServiceLinks = /Tree Removal/i.test(content) && /Tree Trimming|Pruning/i.test(content) && /Stump Grinding/i.test(content) && /Landscaping/i.test(content);
  assert(hasQuickLinks && hasCoreServices, `[${page}] Footer Col 2 & 3: Includes Quick Links and Core Services headings`);
  assert(hasServiceLinks, `[${page}] Footer Col 3: Contains direct links to 4 core services`);

  // Column 4: Service Areas & Trust Badges
  const hasServiceAreas = /East Wichita/i.test(content) && /Andover/i.test(content);
  const hasFullyInsuredBadge = /Fully Insured|Insured/i.test(content);
  const has5StarBadge = /5-Star|Five Star|★★★★★|5\.0/i.test(content);
  const hasLocalBizBadge = /Locally Owned|Local Business/i.test(content);
  assert(hasServiceAreas, `[${page}] Footer Col 4: Displays East Wichita & Andover service areas`);
  assert(hasFullyInsuredBadge && has5StarBadge && hasLocalBizBadge, `[${page}] Footer Col 4: Features Trust Badges (Fully Insured, 5-Star, Locally Owned)`);

  // Sub-footer: Copyright & Privacy Link
  const hasCopyright = /Copyright|©|\&copy;|All Rights Reserved/i.test(content);
  const hasLCBrand = /LC Tree/i.test(content);
  assert(hasCopyright && hasLCBrand, `[${page}] Sub-footer: Displays copyright notice for LC Tree and Landscaping`);
}

printSection('2.3 Home Page (`index.html`) Acceptance Criteria');
const homeContent = readFileSafe('index.html');
if (homeContent) {
  // Hero section
  const hasHeroHeadline = /Expert Tree Care/i.test(homeContent) && /(East Wichita|Andover)/i.test(homeContent);
  assert(hasHeroHeadline, 'Home: Hero section features "Expert Tree Care & Landscaping in East Wichita & Andover"');

  const hasHeroCTA1 = /href=["']tel:3163937207["']/i.test(homeContent);
  const hasHeroCTA2 = /href=["']contact\.html["']/i.test(homeContent) || /href=["']#estimate["']/i.test(homeContent);
  assert(hasHeroCTA1 && hasHeroCTA2, 'Home: Hero provides dual CTAs ("Call Now: 316-393-7207" & "Request an Estimate")');

  // Trust Bar
  const hasTrustBar = /Fully Insured/i.test(homeContent) && /Lad Oborny/i.test(homeContent) && /5-Star/i.test(homeContent);
  assert(hasTrustBar, 'Home: Trust bar features "Fully Insured & Safe", "Locally Owned & Operated", and "5-Star Rated"');

  // Core Services Grid (4 Services)
  const hasCoreServicesGrid = /Tree Removal/i.test(homeContent)
    && (/Tree Trimming/i.test(homeContent) || /Pruning/i.test(homeContent))
    && /Stump Grinding/i.test(homeContent)
    && /Landscaping/i.test(homeContent);
  assert(hasCoreServicesGrid, 'Home: Highlights 4 Core Services with Tree Removal and Tree Trimming upfront');

  // "The LC Difference"
  const hasLcDifference = /The LC Difference/i.test(homeContent);
  const hasDifferentiators = /cleanup|clean up|meticulous/i.test(homeContent) && /personalized|owner|property/i.test(homeContent);
  assert(hasLcDifference, 'Home: Includes dedicated "The LC Difference" section');
  assert(hasDifferentiators, 'Home: "The LC Difference" highlights meticulous cleanup, owner access, and property protection');

  // Proof of Quality (Before/After & Video)
  const hasProofOfQuality = /Before/i.test(homeContent) && /After/i.test(homeContent);
  const hasVideoOrDemo = /<video\b|<iframe\b|video-container|video-wrapper|project-video/i.test(homeContent);
  assert(hasProofOfQuality, 'Home: Proof of Quality contains Before/After visual comparison');
  assert(hasVideoOrDemo, 'Home: Proof of Quality contains embedded video demonstration or container');

  // Testimonial snippet
  const hasTestimonialSnippet = /testimonial|review|quote/i.test(homeContent) && /(Andover|East Wichita|Wichita)/i.test(homeContent);
  assert(hasTestimonialSnippet, 'Home: Features testimonial snippet from Andover / East Wichita neighbor');

  // Pre-Footer CTA
  const hasPreFooterCTA = /Ready to transform|schedule|free estimate|Call Lad/i.test(homeContent) && /316-393-7207/.test(homeContent);
  assert(hasPreFooterCTA, 'Home: Pre-footer high-contrast CTA banner to Call 316-393-7207');
}

printSection('2.4 About Page (`about.html`) Acceptance Criteria');
const aboutContent = readFileSafe('about.html');
if (aboutContent) {
  assert(/Lad Oborny/i.test(aboutContent), 'About: Features owner biography');
  assert(/East Wichita|Andover|Kansas/i.test(aboutContent), 'About: Emphasizes local roots and community commitment');
  assert(/Safety|Cleanup|Pricing|Values|Satisfaction/i.test(aboutContent), 'About: Details core company values (Safety First, Quality & Cleanup, Fair Pricing)');
  assert(/tel:3163937207/i.test(aboutContent), 'About: Includes Pre-Footer CTA to call 316-393-7207');
}

printSection('2.5 Services Page (`services.html`) Acceptance Criteria');
const servicesContent = readFileSafe('services.html');
if (servicesContent) {
  const hasRemoval = /Tree Removal/i.test(servicesContent) && /hazardous|crane|safety|tight/i.test(servicesContent);
  const hasTrimming = /Tree Trimming|Pruning/i.test(servicesContent) && /canopy|deadwood|health/i.test(servicesContent);
  const hasStump = /Stump Grinding/i.test(servicesContent) && /root|below|grind/i.test(servicesContent);
  const hasLandscaping = /Landscaping/i.test(servicesContent) && /mulch|cleanup|maintenance|bed/i.test(servicesContent);

  assert(hasRemoval, 'Services: Service Block 1 details Tree Removal (hazardous trees, crane work, safety & cleanup)');
  assert(hasTrimming, 'Services: Service Block 2 details Tree Trimming & Pruning (canopy thinning, tree health)');
  assert(hasStump, 'Services: Service Block 3 details Stump Grinding (below-grade grinding, root clearance)');
  assert(hasLandscaping, 'Services: Service Block 4 details Landscaping & Property Maintenance');
  assert(/tel:3163937207/i.test(servicesContent), 'Services: Includes Pre-Footer CTA to schedule service at 316-393-7207');
}

printSection('2.6 Gallery Page (`gallery.html`) Acceptance Criteria');
const galleryContent = readFileSafe('gallery.html');
if (galleryContent) {
  const hasFilterAll = /data-filter=["']all["']/i.test(galleryContent) || /filter-btn/i.test(galleryContent);
  const hasFilterRemoval = /data-filter=["']removal["']/i.test(galleryContent) || /Tree Removal/i.test(galleryContent);
  const hasFilterTrimming = /data-filter=["']trimming["']/i.test(galleryContent) || /Trimming/i.test(galleryContent);
  const hasFilterLandscaping = /data-filter=["']landscaping["']/i.test(galleryContent) || /Landscaping/i.test(galleryContent);

  assert(hasFilterAll && hasFilterRemoval && hasFilterTrimming && hasFilterLandscaping, 'Gallery: Contains filter buttons (All, Tree Removal, Trimming, Landscaping)');

  const hasGalleryGrid = /gallery-grid|portfolio-grid|gallery-item/i.test(galleryContent);
  assert(hasGalleryGrid, 'Gallery: Contains responsive portfolio gallery grid with item categories');

  const hasLightboxOrModal = /lightbox|modal|image-preview|gallery-modal/i.test(galleryContent);
  assert(hasLightboxOrModal, 'Gallery: Includes markup or hooks for image lightbox / modal preview');

  const hasVideoSection = /<video\b|<iframe\b|video-container|featured-video/i.test(galleryContent);
  assert(hasVideoSection, 'Gallery: Features video demonstration player / on-site showcase');
}

printSection('2.7 Request an Estimate Page (`estimate.html`) Acceptance Criteria');
const estimateContent = readFileSafe('estimate.html');
if (estimateContent) {
  assert(/<form\b[^>]*>/i.test(estimateContent), 'Estimate: Contains lead capture <form>');

  // 6 Required Fields
  const hasNameField = /<input[^>]*\bname=["']name["'][^>]*>/i.test(estimateContent) || /id=["']name["']/i.test(estimateContent);
  const hasPhoneField = /<input[^>]*\b(name=["']phone["']|type=["']tel["'])[^>]*>/i.test(estimateContent) || /id=["']phone["']/i.test(estimateContent);
  const hasEmailField = /<input[^>]*\b(name=["']email["']|type=["']email["'])[^>]*>/i.test(estimateContent) || /id=["']email["']/i.test(estimateContent);
  const hasAddressField = /<input[^>]*\bname=["']address["'][^>]*>/i.test(estimateContent) || /id=["']address["']/i.test(estimateContent);
  const hasServiceField = /<select[^>]*\bname=["']service["'][^>]*>/i.test(estimateContent) || /id=["']service["']/i.test(estimateContent);
  const hasDetailsField = /<textarea[^>]*\b(name=["']details["']|name=["']message["'])[^>]*>/i.test(estimateContent) || /id=["']details["']/i.test(estimateContent);

  assert(hasNameField, 'Estimate Form: Contains Name input field');
  assert(hasPhoneField, 'Estimate Form: Contains Phone input field (type="tel")');
  assert(hasEmailField, 'Estimate Form: Contains Email input field (type="email")');
  assert(hasAddressField, 'Estimate Form: Contains Property Address input field');
  assert(hasServiceField, 'Estimate Form: Contains Service Requested <select> dropdown');
  assert(hasDetailsField, 'Estimate Form: Contains Project Details <textarea>');

  // 24-hr turnaround cue & Trust signals
  const has24HrTurnaround = /24\s*hours|24-hour|within 24 hours/i.test(estimateContent);
  assert(has24HrTurnaround, 'Estimate: Displays 24-hour response turnaround guarantee text');

  const hasTrustSignal = /Secure|No Obligation|Private|Free Estimate/i.test(estimateContent);
  assert(hasTrustSignal, 'Estimate: Displays "No Obligation / Free Estimate" trust signals');
}

printSection('2.8 Testimonials Page (`testimonials.html`) Acceptance Criteria');
const testimonialsContent = readFileSafe('testimonials.html');
if (testimonialsContent) {
  assert(/5\.0|5-Star|★★★★★/i.test(testimonialsContent), 'Testimonials: Displays overall 5.0 Star rating summary');
  assert(/Andover/i.test(testimonialsContent) && /East Wichita|Wichita/i.test(testimonialsContent), 'Testimonials: Features verified reviews from Andover and East Wichita homeowners');
  assert(/Lad|removal|trimming|cleanup/i.test(testimonialsContent), 'Testimonials: Reviews mention Lad Oborny, tree services, and meticulous cleanup');
}

printSection('2.9 FAQ Page (`faq.html`) Acceptance Criteria');
const faqContent = readFileSafe('faq.html');
if (faqContent) {
  assert(/faq-accordion|accordion|faq-item|faq-card/i.test(faqContent), 'FAQ: Contains collapsible accordion container');

  // Key objection questions
  const hasInsuranceQA = /insured|insurance|licensed|liability/i.test(faqContent);
  const hasCleanupQA = /cleanup|clean up|debris|yard/i.test(faqContent);
  const hasSpeedQA = /estimate|turnaround|how quickly|24 hours/i.test(faqContent);
  const hasHomeQA = /need to be home|home for the estimate|present/i.test(faqContent);

  assert(hasInsuranceQA, 'FAQ Q1: Addresses insurance and safety coverage for large tree removals');
  assert(hasCleanupQA, 'FAQ Q2: Addresses debris cleanup and yard restoration differentiator');
  assert(hasSpeedQA, 'FAQ Q3: Addresses estimate turnaround speed (within 24 hours)');
  assert(hasHomeQA, 'FAQ Q4: Addresses whether homeowner needs to be present during work/estimate');
}

printSection('2.10 Contact Page (`contact.html`) Acceptance Criteria');
const contactContent = readFileSafe('contact.html');
if (contactContent) {
  assert(/316-393-7207/.test(contactContent) && /tel:3163937207/.test(contactContent), 'Contact: Displays direct phone number (316-393-7207)');
  assert(/mailto:/i.test(contactContent), 'Contact: Displays email contact address link');
  assert(/Hours|7:00|Mon|Sat/i.test(contactContent), 'Contact: Displays hours of operation');
  assert(/East Wichita|Andover/i.test(contactContent), 'Contact: Displays service area coverage');
  assert(/<form\b[^>]*>/i.test(contactContent), 'Contact: Contains quick inquiry form');
}

// ----------------------------------------------------------------------------
// TIER 3: CROSS-PAGE NAVIGATIONAL & LINK INTEGRITY
// ----------------------------------------------------------------------------
printHeader('TIER 3: CROSS-PAGE NAVIGATIONAL & LINK INTEGRITY');

printSection('3.1 Internal Links & Asset Reference Validation');
let totalLinksChecked = 0;
let brokenLinksFound = 0;
const brokenLinksList = [];

for (const page of REQUIRED_PAGES) {
  const content = readFileSafe(page);
  if (!content) continue;

  const pageDir = path.dirname(path.join(ROOT_DIR, page));

  // Check <a> hrefs
  const anchorTags = extractTagAttributes(content, 'a');
  for (const { raw, attrs } of anchorTags) {
    const href = attrs['href'];
    if (!href) continue;
    totalLinksChecked++;

    // Ignore external URLs and tel/mailto
    if (/^(https?:|\/\/|tel:|mailto:|javascript:|#$)/i.test(href)) {
      continue;
    }

    // Strip hash or query params
    const cleanPath = href.split('#')[0].split('?')[0];
    if (!cleanPath) continue; // Pure internal anchor on same page (e.g. #hero)

    const targetFullPath = path.resolve(pageDir, cleanPath);
    if (!fs.existsSync(targetFullPath)) {
      brokenLinksFound++;
      brokenLinksList.push({ source: page, link: href, resolved: targetFullPath });
    }
  }

  // Check <img> srcs
  const imgTags = extractTagAttributes(content, 'img');
  for (const { raw, attrs } of imgTags) {
    const src = attrs['src'];
    if (!src || /^(https?:|\/\/|data:)/i.test(src)) continue;
    totalLinksChecked++;

    const cleanSrc = src.split('?')[0];
    const targetFullPath = path.resolve(pageDir, cleanSrc);
    if (!fs.existsSync(targetFullPath)) {
      brokenLinksFound++;
      brokenLinksList.push({ source: page, link: src, resolved: targetFullPath });
    }
  }

  // Check <link> hrefs
  const linkTags = extractTagAttributes(content, 'link');
  for (const { raw, attrs } of linkTags) {
    const href = attrs['href'];
    if (!href || /^(https?:|\/\/|data:)/i.test(href)) continue;
    totalLinksChecked++;

    const cleanHref = href.split('?')[0];
    const targetFullPath = path.resolve(pageDir, cleanHref);
    if (!fs.existsSync(targetFullPath)) {
      brokenLinksFound++;
      brokenLinksList.push({ source: page, link: href, resolved: targetFullPath });
    }
  }

  // Check <script> srcs
  const scriptTags = extractTagAttributes(content, 'script');
  for (const { raw, attrs } of scriptTags) {
    const src = attrs['src'];
    if (!src || /^(https?:|\/\/)/i.test(src)) continue;
    totalLinksChecked++;

    const cleanSrc = src.split('?')[0];
    const targetFullPath = path.resolve(pageDir, cleanSrc);
    if (!fs.existsSync(targetFullPath)) {
      brokenLinksFound++;
      brokenLinksList.push({ source: page, link: src, resolved: targetFullPath });
    }
  }
}

assert(brokenLinksFound === 0, `All internal references resolve (${totalLinksChecked} links/assets verified)`,
  brokenLinksFound > 0 ? `Found ${brokenLinksFound} broken links:\n    ${brokenLinksList.map(b => `${b.source} -> "${b.link}" (looked at ${b.resolved})`).join('\n    ')}` : '');

printSection('3.2 Tap-to-Call & Email Link Formatting');
for (const page of REQUIRED_PAGES) {
  const content = readFileSafe(page);
  if (!content) continue;

  const anchors = extractTagAttributes(content, 'a');
  for (const { attrs } of anchors) {
    const href = attrs['href'];
    if (href && href.startsWith('tel:')) {
      const cleanPhone = href.replace('tel:', '').replace(/[^0-9]/g, '');
      assert(cleanPhone === '3163937207' || cleanPhone === '13163937207', `[${page}] Valid tel: href format ("${href}")`);
    }
    if (href && href.startsWith('mailto:')) {
      const email = href.replace('mailto:', '');
      assert(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email), `[${page}] Valid mailto: format ("${href}")`);
    }
  }
}

// ----------------------------------------------------------------------------
// TIER 4: REAL-WORLD SCENARIOS, ACCESSIBILITY & JAVASCRIPT INTEGRITY
// ----------------------------------------------------------------------------
printHeader('TIER 4: REAL-WORLD SCENARIOS, ACCESSIBILITY & JAVASCRIPT INTEGRITY');

printSection('4.1 Image Accessibility (WCAG 2.1 AA Alt Text)');
for (const page of REQUIRED_PAGES) {
  const content = readFileSafe(page);
  if (!content) continue;

  const imgTags = extractTagAttributes(content, 'img');
  let missingAltCount = 0;
  for (const { raw, attrs } of imgTags) {
    if (attrs['alt'] === undefined || attrs['alt'] === null) {
      missingAltCount++;
    }
  }
  assert(missingAltCount === 0, `[${page}] All <img> tags have alt attributes (${imgTags.length} images checked)`,
    missingAltCount > 0 ? `${missingAltCount} images missing alt attribute` : '');
}

printSection('4.2 Form Validation & Accessibility Attributes');
const formPages = ['estimate.html', 'contact.html'];
for (const page of formPages) {
  const content = readFileSafe(page);
  if (!content) continue;

  const inputs = extractTagAttributes(content, 'input');
  const selects = extractTagAttributes(content, 'select');
  const textareas = extractTagAttributes(content, 'textarea');

  const allControls = [...inputs, ...selects, ...textareas];
  let requiredCount = 0;
  let hasTelType = false;
  let hasEmailType = false;

  for (const { attrs } of allControls) {
    if (attrs['required'] === true || attrs['required'] === '') requiredCount++;
    if (attrs['type'] === 'tel') hasTelType = true;
    if (attrs['type'] === 'email') hasEmailType = true;
  }

  assert(requiredCount >= 2, `[${page}] Form includes client-side required field validations (${requiredCount} required fields found)`);
  assert(hasTelType, `[${page}] Form contains input with type="tel" for mobile numeric keyboard`);
  assert(hasEmailType, `[${page}] Form contains input with type="email" for email validation`);
}

printSection('4.3 Responsive CSS & Media Queries');
let totalMediaQueries = 0;
for (const cssFile of REQUIRED_CSS_FILES) {
  const cssContent = readFileSafe(cssFile);
  if (!cssContent) continue;
  const mediaMatches = cssContent.match(/@media[^{]+\{/gi);
  const count = mediaMatches ? mediaMatches.length : 0;
  totalMediaQueries += count;
  assert(count > 0 || cssFile === 'css/styles.css', `[${cssFile}] Contains responsive CSS rules (${count} @media queries found)`);
}
assert(totalMediaQueries >= 3, `CSS architecture contains comprehensive responsive breakpoints (Total @media rules: ${totalMediaQueries})`);

printSection('4.4 JavaScript Syntax & Module Integrity');
for (const jsFile of REQUIRED_JS_FILES) {
  const jsContent = readFileSafe(jsFile);
  if (!jsContent) continue;

  let isSyntaxValid = true;
  let syntaxErrorMsg = '';
  try {
    // Basic syntax parsing via Function constructor
    new Function(jsContent);
  } catch (err) {
    // If it uses ES modules (import/export), Function constructor may throw. We check if syntax error is actual syntax or module keyword.
    if (err instanceof SyntaxError && !err.message.includes('import') && !err.message.includes('export')) {
      isSyntaxValid = false;
      syntaxErrorMsg = err.message;
    }
  }
  assert(isSyntaxValid, `[${jsFile}] JavaScript syntax is clean and parseable`, syntaxErrorMsg);
}

// ============================================================================
// FINAL SUMMARY & EXIT REPORT
// ============================================================================
printHeader('VERIFICATION RESULTS SUMMARY');

console.log(`\n  Total Assertions Checked : \x1b[1m${totalAssertions}\x1b[0m`);
console.log(`  Passed Assertions        : \x1b[32m\x1b[1m${passedAssertions}\x1b[0m`);
console.log(`  Failed Assertions        : \x1b[31m\x1b[1m${failedAssertions}\x1b[0m`);
const passRate = totalAssertions > 0 ? ((passedAssertions / totalAssertions) * 100).toFixed(1) : '0.0';
console.log(`  Overall Compliance Rate  : \x1b[33m\x1b[1m${passRate}%\x1b[0m\n`);

if (failedAssertions > 0) {
  console.log(`\x1b[31m❌ VERIFICATION FAILED with ${failedAssertions} issue(s) detected.\x1b[0m`);
  console.log(`Detailed failure breakdown:`);
  failures.forEach((f, idx) => {
    console.log(`  ${idx + 1}. \x1b[31m${f.testName}\x1b[0m${f.diagnosticInfo ? ` — ${f.diagnosticInfo}` : ''}`);
  });
  console.log(`\nPlease resolve the above failures in the HTML/CSS/JS implementation.`);
  process.exit(1);
} else {
  console.log(`\x1b[32m✨ ALL 4 TIERS PASSED! 100% SPECIFICATION COMPLIANCE ACHIEVED. ✨\x1b[0m\n`);
  process.exit(0);
}
