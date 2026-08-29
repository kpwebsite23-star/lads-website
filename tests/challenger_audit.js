/**
 * Challenger 2 Adversarial Stress-Testing & Deep Audit Suite
 * LC Tree and Landscaping, LLC Website Project
 */

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

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, description, page = '') {
  totalTests++;
  const label = page ? `[${page}] ${description}` : description;
  if (condition) {
    passedTests++;
    console.log(`  ✔ PASS: ${label}`);
  } else {
    failedTests++;
    failures.push(label);
    console.error(`  ✖ FAIL: ${label}`);
  }
}

console.log('================================================================================');
console.log('CHALLENGER 2: ADVERSARIAL STRESS-TESTING & DEEP AUDIT');
console.log('================================================================================\n');

// -----------------------------------------------------------------------------
// 1. SEMANTIC DOM STRUCTURE & HEADING HIERARCHY
// -----------------------------------------------------------------------------
console.log('--- 1. SEMANTIC DOM STRUCTURE & HEADING HIERARCHY ---');

PAGES.forEach(page => {
  const filePath = path.join(ROOT_DIR, page);
  const html = fs.readFileSync(filePath, 'utf8');

  // Check <main>
  const mainMatches = html.match(/<main\b[^>]*>/gi) || [];
  assert(mainMatches.length === 1, `Exactly one <main> element (found ${mainMatches.length})`, page);

  // Check <header class="site-header">
  const headerMatches = html.match(/<header\b[^>]*>/gi) || [];
  const siteHeaderMatches = html.match(/<header\b[^>]*class=["'][^"']*site-header[^"']*["'][^>]*>/gi) || [];
  assert(headerMatches.length === 1 && siteHeaderMatches.length === 1, `Exactly one <header class="site-header"> (found ${headerMatches.length} headers, ${siteHeaderMatches.length} site-headers)`, page);

  // Check <footer class="site-footer">
  const footerMatches = html.match(/<footer\b[^>]*>/gi) || [];
  const siteFooterMatches = html.match(/<footer\b[^>]*class=["'][^"']*site-footer[^"']*["'][^>]*>/gi) || [];
  assert(footerMatches.length === 1 && siteFooterMatches.length === 1, `Exactly one <footer class="site-footer"> (found ${footerMatches.length} footers, ${siteFooterMatches.length} site-footers)`, page);

  // Heading hierarchy
  const headings = [];
  const headingRegex = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1], 10),
      text: match[2].replace(/<[^>]+>/g, '').trim()
    });
  }

  const h1List = headings.filter(h => h.level === 1);
  assert(h1List.length === 1, `Exactly one <h1> element per page (found ${h1List.length}: "${h1List.map(h => h.text).join(', ')}")`, page);
  assert(headings.length > 0 && headings[0].level === 1, `First heading on page is <h1>`, page);

  let skippedLevels = 0;
  for (let i = 1; i < headings.length; i++) {
    const prev = headings[i - 1].level;
    const curr = headings[i].level;
    if (curr > prev + 1) {
      skippedLevels++;
      console.error(`    [HEADING VIOLATION] H${prev} -> H${curr}: "${headings[i].text}"`);
    }
  }
  assert(skippedLevels === 0, `No skipped heading levels in hierarchy (skipped: ${skippedLevels})`, page);
});

// -----------------------------------------------------------------------------
// 2. IMAGE ASSETS EXISTENCE & NON-EMPTY ALT TEXT
// -----------------------------------------------------------------------------
console.log('\n--- 2. IMAGE ASSETS ON DISK & ALT TEXT AUDIT ---');

let totalImagesFound = 0;
PAGES.forEach(page => {
  const filePath = path.join(ROOT_DIR, page);
  const html = fs.readFileSync(filePath, 'utf8');

  const imgRegex = /<img\b([^>]*)>/gi;
  let imgMatch;
  let pageImgCount = 0;

  while ((imgMatch = imgRegex.exec(html)) !== null) {
    totalImagesFound++;
    pageImgCount++;
    const attrs = imgMatch[1];

    // Extract src
    const srcMatch = attrs.match(/\bsrc=["']([^"']+)["']/i);
    const src = srcMatch ? srcMatch[1] : null;
    assert(!!src, `Image tag #${pageImgCount} has src attribute`, page);

    if (src) {
      // Check file exists
      const cleanSrc = src.split('?')[0].split('#')[0];
      const assetPath = path.resolve(ROOT_DIR, cleanSrc);
      const exists = fs.existsSync(assetPath);
      assert(exists, `Image asset exists on disk (${src})`, page);

      if (exists) {
        const stats = fs.statSync(assetPath);
        assert(stats.size > 0, `Image asset has non-zero file size (${src}, ${stats.size} bytes)`, page);
      }
    }

    // Extract alt
    const altMatch = attrs.match(/\balt=["']([^"']*)["']/i);
    const hasAlt = !!altMatch;
    const altText = altMatch ? altMatch[1].trim() : '';
    assert(hasAlt, `Image tag #${pageImgCount} has alt attribute (${src})`, page);
    assert(altText.length > 0, `Image tag #${pageImgCount} has non-empty meaningful alt text ("${altText}")`, page);
  }
});
assert(totalImagesFound >= 50, `Found expected total number of images across site (found ${totalImagesFound})`);

// -----------------------------------------------------------------------------
// 3. TELEPHONE LINKS & ANCHOR TEXT INTEGRITY
// -----------------------------------------------------------------------------
console.log('\n--- 3. TELEPHONE LINKS & ANCHOR TEXT INTEGRITY ---');

let totalTelLinks = 0;
PAGES.forEach(page => {
  const filePath = path.join(ROOT_DIR, page);
  const html = fs.readFileSync(filePath, 'utf8');

  const telLinkRegex = /<a\b([^>]*href=["']tel:([^"']+)["'][^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  let pageTelCount = 0;

  while ((match = telLinkRegex.exec(html)) !== null) {
    totalTelLinks++;
    pageTelCount++;
    const fullTag = match[0];
    const attrs = match[1];
    const rawTel = match[2].trim();
    const anchorInner = match[3].replace(/<[^>]+>/g, '').trim();

    // Verify tel target
    const validTelTarget = (rawTel === '3163937207' || rawTel === '+13163937207' || rawTel === '316-393-7207');
    assert(validTelTarget, `Telephone link #${pageTelCount} href is tel:3163937207 (actual: tel:${rawTel})`, page);

    // Verify anchor text or aria-label contains 316-393-7207 or Call
    const ariaLabelMatch = attrs.match(/aria-label=["']([^"']+)["']/i);
    const ariaLabel = ariaLabelMatch ? ariaLabelMatch[1] : '';
    const textToCheck = anchorInner || ariaLabel;

    const containsPhoneDigits = textToCheck.replace(/\D/g, '').includes('3163937207');
    const isCallAction = /call/i.test(textToCheck) || /316-393-7207/.test(textToCheck);
    assert(containsPhoneDigits || isCallAction, `Telephone link text/label matches call/number pattern ("${textToCheck}")`, page);
  }
});
assert(totalTelLinks >= 30, `Total telephone links across site meets high-visibility standard (found ${totalTelLinks})`);

// -----------------------------------------------------------------------------
// 4. COPYWRITING ELEMENTS INTEGRITY
// -----------------------------------------------------------------------------
console.log('\n--- 4. COPYWRITING ELEMENTS INTEGRITY ---');

// Check Home Page specifics
const homeHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
assert(homeHtml.includes('The LC Difference'), 'Home contains "The LC Difference" section', 'index.html');
assert(homeHtml.includes('Lad Oborny'), 'Home mentions owner "Lad Oborny"', 'index.html');
assert(/East Wichita/i.test(homeHtml) && /Andover/i.test(homeHtml), 'Home mentions "East Wichita" and "Andover"', 'index.html');
assert(/Tree Removal/i.test(homeHtml), 'Home mentions Tree Removal', 'index.html');
assert(/Tree Trimming/i.test(homeHtml), 'Home mentions Tree Trimming', 'index.html');
assert(/Stump Grinding/i.test(homeHtml), 'Home mentions Stump Grinding', 'index.html');
assert(/Landscaping/i.test(homeHtml), 'Home mentions Landscaping', 'index.html');

// Check About Page specifics
const aboutHtml = fs.readFileSync(path.join(ROOT_DIR, 'about.html'), 'utf8');
assert(/Lad Oborny/i.test(aboutHtml), 'About page mentions "Lad Oborny"', 'about.html');
assert(/East Wichita/i.test(aboutHtml) && /Andover/i.test(aboutHtml), 'About page mentions "East Wichita" and "Andover"', 'about.html');

// Check Services Page breakdowns
const servicesHtml = fs.readFileSync(path.join(ROOT_DIR, 'services.html'), 'utf8');
assert(/Tree Removal/i.test(servicesHtml), 'Services page breaks down Tree Removal', 'services.html');
assert(/Tree Trimming/i.test(servicesHtml), 'Services page breaks down Tree Trimming', 'services.html');
assert(/Stump Grinding/i.test(servicesHtml), 'Services page breaks down Stump Grinding', 'services.html');
assert(/Landscaping/i.test(servicesHtml), 'Services page breaks down Landscaping', 'services.html');
assert(/East Wichita/i.test(servicesHtml) && /Andover/i.test(servicesHtml), 'Services page mentions "East Wichita" and "Andover"', 'services.html');

// Check 4-Column Footer across all pages
PAGES.forEach(page => {
  const html = fs.readFileSync(path.join(ROOT_DIR, page), 'utf8');
  assert(/footer-col-brand/i.test(html), 'Footer contains Column 1 (Brand & Contact)', page);
  assert(/footer-col-nav/i.test(html), 'Footer contains Column 2 (Quick Links)', page);
  assert(/footer-col-services/i.test(html), 'Footer contains Column 3 (Core Services)', page);
  assert(/footer-col-trust/i.test(html), 'Footer contains Column 4 (Service Areas & Trust)', page);
  assert(html.includes('Lad Oborny'), 'Footer mentions owner "Lad Oborny"', page);
  assert(/East Wichita/i.test(html) && /Andover/i.test(html), 'Footer mentions "East Wichita & Andover"', page);
  assert(/Tree Removal/i.test(html) && /Tree Trimming/i.test(html) && /Stump Grinding/i.test(html) && /Landscaping/i.test(html), 'Footer links 4 core services', page);
});

// -----------------------------------------------------------------------------
// 5. TIER 5 ADVERSARIAL STRESS-TESTING & EDGE CASES
// -----------------------------------------------------------------------------
console.log('\n--- 5. TIER 5 ADVERSARIAL STRESS-TESTING & EDGE CASES ---');

// 5.1 Broken Links / Anchors / References check
PAGES.forEach(page => {
  const html = fs.readFileSync(path.join(ROOT_DIR, page), 'utf8');
  
  // Find all internal links href="something"
  const hrefRegex = /\bhref=["']([^"']+)["']/gi;
  let m;
  while ((m = hrefRegex.exec(html)) !== null) {
    const href = m[1].trim();
    if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('javascript:')) {
      continue; // checked elsewhere
    }
    const cleanHref = href.split('?')[0].split('#')[0];
    if (cleanHref) {
      const targetFile = path.resolve(ROOT_DIR, cleanHref);
      assert(fs.existsSync(targetFile), `Internal link resolves to file (${href})`, page);
    }
  }

  // Find all script tags src="something"
  const scriptRegex = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  while ((m = scriptRegex.exec(html)) !== null) {
    const src = m[1].trim();
    const cleanSrc = src.split('?')[0].split('#')[0];
    const scriptPath = path.resolve(ROOT_DIR, cleanSrc);
    assert(fs.existsSync(scriptPath), `Script src resolves on disk (${src})`, page);
  }

  // Find all stylesheet link tags href="something"
  const cssRegex = /<link\b[^>]*rel=["']stylesheet["'][^>]*\bhref=["']([^"']+)["'][^>]*>/gi;
  while ((m = cssRegex.exec(html)) !== null) {
    const href = m[1].trim();
    const cleanHref = href.split('?')[0].split('#')[0];
    const cssPath = path.resolve(ROOT_DIR, cleanHref);
    assert(fs.existsSync(cssPath), `Stylesheet href resolves on disk (${href})`, page);
  }
});

// 5.2 Form Field Adversarial Check (Estimate and Contact)
const estimateHtml = fs.readFileSync(path.join(ROOT_DIR, 'estimate.html'), 'utf8');
const contactHtml = fs.readFileSync(path.join(ROOT_DIR, 'contact.html'), 'utf8');

// Ensure forms have method, id, action or data-handler
assert(/<form\b[^>]*id=["']estimate-form["'][^>]*>/i.test(estimateHtml), 'Estimate form has id="estimate-form"', 'estimate.html');
assert(/<form\b[^>]*id=["']contact-form["'][^>]*>/i.test(contactHtml), 'Contact form has id="contact-form"', 'contact.html');

// Check all form inputs have associated labels or aria-label
function checkFormAccessibility(formHtml, page) {
  const inputRegex = /<(input|select|textarea)\b([^>]*)>/gi;
  let match;
  while ((match = inputRegex.exec(formHtml)) !== null) {
    const tag = match[1];
    const attrs = match[2];
    if (/type=["'](hidden|submit|button)["']/i.test(attrs)) continue;

    const idMatch = attrs.match(/\bid=["']([^"']+)["']/i);
    const id = idMatch ? idMatch[1] : null;
    const hasAriaLabel = /aria-label=/i.test(attrs) || /aria-labelledby=/i.test(attrs);
    
    let hasLabel = hasAriaLabel;
    if (id) {
      const labelRegex = new RegExp(`<label\\b[^>]*\\bfor=["']${id}["']`, 'i');
      if (labelRegex.test(formHtml)) {
        hasLabel = true;
      }
    }
    assert(hasLabel, `<${tag}> element has corresponding <label for="${id}"> or aria-label`, page);
  }
}

checkFormAccessibility(estimateHtml, 'estimate.html');
checkFormAccessibility(contactHtml, 'contact.html');

// 5.3 JavaScript module execution & AST / syntax validation
const JS_FILES = ['js/main.js', 'js/gallery.js', 'js/faq.js', 'js/form.js'];
JS_FILES.forEach(jsFile => {
  const filePath = path.join(ROOT_DIR, jsFile);
  const code = fs.readFileSync(filePath, 'utf8');
  let valid = false;
  try {
    new Function(code);
    valid = true;
  } catch (err) {
    console.error(`JS Syntax error in ${jsFile}:`, err.message);
  }
  assert(valid, `JavaScript file executes/parses cleanly without syntax errors`, jsFile);
});

// 5.4 SVG Validation (all SVGs well-formed XML)
function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const allAssetFiles = getFilesRecursively(path.join(ROOT_DIR, 'assets'));
allAssetFiles.forEach(file => {
  if (file.endsWith('.svg')) {
    const relPath = path.relative(ROOT_DIR, file);
    const content = fs.readFileSync(file, 'utf8');
    const hasSvgTag = /<svg\b[^>]*>/i.test(content) && /<\/svg>/i.test(content);
    assert(hasSvgTag, `SVG file is well-formed with opening and closing <svg> tags`, relPath);
  }
});

// 5.5 Meta Viewport & Charset in all HTML files
PAGES.forEach(page => {
  const html = fs.readFileSync(path.join(ROOT_DIR, page), 'utf8');
  assert(/<meta\b[^>]*charset=["']?utf-8["']?/i.test(html), 'Contains <meta charset="UTF-8">', page);
  assert(/<meta\b[^>]*name=["']viewport["'][^>]*content=["'][^"']*width=device-width[^"']*["']/i.test(html), 'Contains mobile viewport meta tag', page);
  assert(/<title>[^<]+<\/title>/i.test(html), 'Contains non-empty <title> tag', page);
  assert(/<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html), 'Contains meta description tag', page);
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================================');
console.log('CHALLENGER 2 AUDIT SUMMARY');
console.log('================================================================================');
console.log(`Total Checks Run   : ${totalTests}`);
console.log(`Passed             : ${passedTests}`);
console.log(`Failed             : ${failedTests}`);

if (failedTests === 0) {
  console.log('\n>>> VERDICT: APPROVE - ZERO DEFECTS DETECTED <<<\n');
  process.exit(0);
} else {
  console.log(`\n>>> VERDICT: REQUEST_CHANGES - ${failedTests} DEFECT(S) DETECTED <<<\n`);
  failures.forEach(f => console.error(` - ${f}`));
  process.exit(1);
}
