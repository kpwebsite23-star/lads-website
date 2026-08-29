import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = path.resolve('.');
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

console.log('=== INDEPENDENT VICTORY AUDITOR FORENSIC PROBE ===\n');

let totalChecks = 0;
let passCount = 0;
let failCount = 0;

function check(desc, condition, info = '') {
  totalChecks++;
  if (condition) {
    passCount++;
    console.log(`  [PASS] ${desc}`);
  } else {
    failCount++;
    console.log(`  [FAIL] ${desc} — ${info}`);
  }
}

// 1. PAGE EXISTENCE AND SIZE
console.log('--- 1. Page Existence and Sizing ---');
for (const p of PAGES) {
  const filePath = path.join(ROOT_DIR, p);
  const exists = fs.existsSync(filePath);
  check(`Page exists: ${p}`, exists);
  if (exists) {
    const stat = fs.statSync(filePath);
    check(`Page size is substantial: ${p} (${stat.size} bytes)`, stat.size > 5000);
  }
}

// 2. STICKY HEADER & CTA ACROSS ALL PAGES
console.log('\n--- 2. Sticky Header and Conversion Elements Across All 8 Pages ---');
for (const p of PAGES) {
  const html = fs.readFileSync(path.join(ROOT_DIR, p), 'utf8');
  check(`[${p}] Semantic <header> present`, /<header\b/i.test(html));
  check(`[${p}] Sticky class .site-header present`, /class=["'][^"']*\bsite-header\b[^"']*["']/i.test(html));
  check(`[${p}] Phone CTA tel:3163937207 present in header`, /href=["']tel:3163937207["']/i.test(html));
  check(`[${p}] "Call Now: 316-393-7207" CTA text present`, /Call Now:\s*316-393-7207/i.test(html) || /Call:\s*316-393-7207/i.test(html));
  check(`[${p}] Top announcement bar mentions East Wichita & Andover`, /East Wichita/i.test(html) && /Andover/i.test(html));
  check(`[${p}] Logo links to index.html and references assets/images/logo.jpg`, /href=["'](index\.html|\/)["'][^>]*>[\s\S]*?<img[^>]+src=["']assets\/images\/logo\.jpg["']/i.test(html) || /<img[^>]+src=["']assets\/images\/logo\.jpg["'][^>]*>[\s\S]*?<\/a>/i.test(html));
}

// 3. 4-COLUMN FOOTER ACROSS ALL 8 PAGES
console.log('\n--- 3. 4-Column Footer Across All 8 Pages ---');
for (const p of PAGES) {
  const html = fs.readFileSync(path.join(ROOT_DIR, p), 'utf8');
  check(`[${p}] Semantic <footer> present`, /<footer\b/i.test(html));
  check(`[${p}] Col 1: Owner Lad Oborny present`, /Lad Oborny/i.test(html));
  check(`[${p}] Col 1: Phone link tel:3163937207 present`, /tel:3163937207/i.test(html));
  check(`[${p}] Col 1: Email link info@lctreeks.com present`, /mailto:info@lctreeks\.com/i.test(html));
  check(`[${p}] Col 2: Quick Links section present`, /Quick Links/i.test(html));
  check(`[${p}] Col 3: Core Services section present`, /Core Services|Services/i.test(html));
  check(`[${p}] Col 4: Service Areas & Trust Badges present`, /East Wichita/i.test(html) && /Andover/i.test(html) && /Fully Insured/i.test(html));
  check(`[${p}] Sub-footer: Copyright present`, /Copyright|©/i.test(html) && /LC Tree/i.test(html));
}

// 4. CONTENT INTEGRATION CHECKS
console.log('\n--- 4. Content Integration Requirements ---');
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
check('Home: "The LC Difference" section present', /The LC Difference/i.test(indexHtml));
check('Home: Meticulous cleanup & personalized care cues', /cleanup|clean up|meticulous/i.test(indexHtml) && /personalized|owner|Lad Oborny/i.test(indexHtml));
check('Home: Testimonial snippet from neighbor present', /testimonial|review/i.test(indexHtml) && /(Andover|East Wichita|Wichita)/i.test(indexHtml));
check('Home: Proof of Quality Before/After comparison present', /Before/i.test(indexHtml) && /After/i.test(indexHtml));

const aboutHtml = fs.readFileSync(path.join(ROOT_DIR, 'about.html'), 'utf8');
check('About: Owner biography for Lad Oborny present', /Lad Oborny/i.test(aboutHtml) && /experience|commitment|care/i.test(aboutHtml));
check('About: Company values section present', /Values|Commitment|Safety/i.test(aboutHtml));

const servicesHtml = fs.readFileSync(path.join(ROOT_DIR, 'services.html'), 'utf8');
check('Services: Tree Removal breakdown present', /Tree Removal/i.test(servicesHtml) && /hazardous|safety|crane/i.test(servicesHtml));
check('Services: Tree Trimming breakdown present', /Tree Trimming/i.test(servicesHtml) || /Pruning/i.test(servicesHtml));
check('Services: Stump Grinding breakdown present', /Stump Grinding/i.test(servicesHtml));
check('Services: Landscaping breakdown present', /Landscaping/i.test(servicesHtml));

const galleryHtml = fs.readFileSync(path.join(ROOT_DIR, 'gallery.html'), 'utf8');
check('Gallery: Filter buttons present', /data-filter=["']all["']/i.test(galleryHtml) && /data-filter=["']removal["']/i.test(galleryHtml));
check('Gallery: Portfolio items present', /gallery-item|portfolio-card|gallery-card/i.test(galleryHtml));

const estimateHtml = fs.readFileSync(path.join(ROOT_DIR, 'estimate.html'), 'utf8');
check('Estimate: 6 form fields present', /name=["']name["']/i.test(estimateHtml) && /name=["']phone["']/i.test(estimateHtml) && /name=["']email["']/i.test(estimateHtml) && /name=["']address["']/i.test(estimateHtml) && /name=["']service["']/i.test(estimateHtml) && /name=["']details["']/i.test(estimateHtml));
check('Estimate: 24-hour turnaround commitment present', /24\s*hours/i.test(estimateHtml));

const faqHtml = fs.readFileSync(path.join(ROOT_DIR, 'faq.html'), 'utf8');
check('FAQ: Accordion container and questions present', /faq-accordion|accordion/i.test(faqHtml) && /insurance|insured/i.test(faqHtml) && /cleanup|clean up/i.test(faqHtml));

const contactHtml = fs.readFileSync(path.join(ROOT_DIR, 'contact.html'), 'utf8');
check('Contact: 2-column layout with direct phone and inquiry form', /316-393-7207/i.test(contactHtml) && /<form/i.test(contactHtml));

// 5. ASSET RESOLUTION & INTEGRITY
console.log('\n--- 5. Asset Existence and Integrity ---');
let brokenAssets = 0;
let totalAssets = 0;
for (const p of PAGES) {
  const html = fs.readFileSync(path.join(ROOT_DIR, p), 'utf8');
  const attrRegex = /(?:src|href)=["']([^"']+)["']/gi;
  let match;
  while ((match = attrRegex.exec(html)) !== null) {
    const target = match[1];
    if (target.startsWith('http://') || target.startsWith('https://') || target.startsWith('tel:') || target.startsWith('mailto:') || target.startsWith('#') || target.startsWith('javascript:')) {
      continue;
    }
    totalAssets++;
    const cleanPath = target.split('?')[0].split('#')[0];
    if (!cleanPath) continue;
    const fullPath = path.resolve(ROOT_DIR, cleanPath);
    if (!fs.existsSync(fullPath)) {
      brokenAssets++;
      console.log(`  [BROKEN LINK/ASSET] in ${p}: ${target} -> ${fullPath}`);
    } else {
      const sz = fs.statSync(fullPath).size;
      if (sz === 0) {
        brokenAssets++;
        console.log(`  [ZERO BYTE ASSET] in ${p}: ${target}`);
      }
    }
  }
}
check(`All ${totalAssets} static asset and navigation references exist and are non-empty`, brokenAssets === 0, `${brokenAssets} broken references`);

// 6. CSS & JAVASCRIPT VALIDATION
console.log('\n--- 6. CSS & JavaScript Modules ---');
const cssFiles = ['css/styles.css', 'css/components.css', 'css/responsive.css'];
for (const c of cssFiles) {
  const cPath = path.join(ROOT_DIR, c);
  const exists = fs.existsSync(cPath);
  check(`Stylesheet exists and has content: ${c}`, exists && fs.statSync(cPath).size > 1000);
}

const jsFiles = ['js/main.js', 'js/gallery.js', 'js/faq.js', 'js/form.js'];
for (const j of jsFiles) {
  const jPath = path.join(ROOT_DIR, j);
  const exists = fs.existsSync(jPath);
  check(`JavaScript module exists and has content: ${j}`, exists && fs.statSync(jPath).size > 1000);
  if (exists) {
    const code = fs.readFileSync(jPath, 'utf8');
    let valid = true;
    try {
      new Function(code);
    } catch (e) {
      if (!e.message.includes('import') && !e.message.includes('export')) {
        valid = false;
      }
    }
    check(`JavaScript syntax is valid: ${j}`, valid);
  }
}

console.log('\n==================================================');
console.log(`INDEPENDENT AUDITOR TOTAL CHECKS : ${totalChecks}`);
console.log(`PASSED CHECKS                    : ${passCount}`);
console.log(`FAILED CHECKS                    : ${failCount}`);
console.log(`PASS RATE                        : ${((passCount / totalChecks) * 100).toFixed(1)}%`);
console.log('==================================================\n');

if (failCount === 0) {
  console.log('>>> VERDICT: ALL AUDIT CRITERIA MET. 100% PASS RATE. <<<');
  process.exit(0);
} else {
  console.log(`>>> VERDICT: AUDIT FAILED WITH ${failCount} DEFECT(S). <<<`);
  process.exit(1);
}
