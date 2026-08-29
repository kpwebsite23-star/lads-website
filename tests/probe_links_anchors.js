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

const pageIds = {};
PAGES.forEach(p => {
  const html = fs.readFileSync(path.join(ROOT_DIR, p), 'utf8');
  pageIds[p] = new Set();
  const idRegex = /\bid=["']([^"']+)["']/gi;
  let m;
  while ((m = idRegex.exec(html)) !== null) {
    pageIds[p].add(m[1]);
  }
});

let broken = [];
let totalLinks = 0;
let crossPageAnchors = 0;
let internalPageLinks = 0;

PAGES.forEach(page => {
  const html = fs.readFileSync(path.join(ROOT_DIR, page), 'utf8');
  const aRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = aRegex.exec(html)) !== null) {
    totalLinks++;
    const attrs = match[1];
    const hrefMatch = attrs.match(/\bhref=["']([^"']*)["']/i);
    if (!hrefMatch) {
      broken.push({ page, reason: 'Missing href attribute in <a>', tag: match[0].substring(0, 60) });
      continue;
    }
    const href = hrefMatch[1].trim();
    if (href === '' || href === '#') {
      continue;
    }
    if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('javascript:')) {
      continue;
    }

    if (href.startsWith('#')) {
      const anchor = href.substring(1);
      if (!pageIds[page].has(anchor)) {
        broken.push({ page, reason: `Missing anchor target in same page: #${anchor}`, href });
      }
    } else {
      internalPageLinks++;
      const [targetPage, anchor] = href.split('#');
      const targetPath = path.resolve(ROOT_DIR, targetPage);
      if (!fs.existsSync(targetPath)) {
        broken.push({ page, reason: `Target page not found: ${targetPage}`, href });
      } else if (anchor) {
        crossPageAnchors++;
        if (!pageIds[targetPage] || !pageIds[targetPage].has(anchor)) {
          broken.push({ page, reason: `Cross-page anchor #${anchor} not found in ${targetPage}`, href });
        }
      }
    }
  }
});

console.log('=== LINK & ANCHOR INTEGRITY PROBE RESULTS ===');
console.log('Total <a> tags scanned    :', totalLinks);
console.log('Internal page links       :', internalPageLinks);
console.log('Cross-page anchors tested :', crossPageAnchors);
console.log('Broken Links/Anchors Count:', broken.length);

if (broken.length > 0) {
  console.log('FAILURES FOUND:', JSON.stringify(broken, null, 2));
  process.exit(1);
} else {
  console.log('✔ SUCCESS: 100% of internal links and cross-page anchors resolve cleanly!');
  process.exit(0);
}
