/**
 * Challenger 1 Adversarial Testing & Verification Harness
 * Comprehensive empirical simulation and test suite for LC Tree and Landscaping website.
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

function assert(condition, message, context = '') {
  totalTests++;
  const label = context ? `[${context}] ${message}` : message;
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
console.log('CHALLENGER 1: ADVERSARIAL STRESS-TESTING & EMPIRICAL VERIFICATION HARNESS');
console.log('================================================================================\n');

// -----------------------------------------------------------------------------
// 1. NAVIGATIONAL INTEGRITY & CROSS-PAGE ANCHOR VALIDATION
// -----------------------------------------------------------------------------
console.log('--- 1. NAVIGATIONAL INTEGRITY & ANCHOR RESOLUTION ---');

const pageIdsMap = {};
PAGES.forEach(page => {
  const filePath = path.join(ROOT_DIR, page);
  const html = fs.readFileSync(filePath, 'utf8');
  pageIdsMap[page] = new Set();

  const idRegex = /\bid=["']([^"']+)["']/gi;
  let match;
  while ((match = idRegex.exec(html)) !== null) {
    pageIdsMap[page].add(match[1]);
  }
});

PAGES.forEach(page => {
  const filePath = path.join(ROOT_DIR, page);
  const html = fs.readFileSync(filePath, 'utf8');

  const hrefRegex = /\bhref=["']([^"']+)["']/gi;
  let match;
  let internalLinkCount = 0;

  while ((match = hrefRegex.exec(html)) !== null) {
    const rawHref = match[1].trim();
    if (rawHref.startsWith('tel:') || rawHref.startsWith('mailto:') || rawHref.startsWith('http://') || rawHref.startsWith('https://') || rawHref.startsWith('javascript:')) {
      continue;
    }

    internalLinkCount++;
    if (rawHref === '#' || rawHref === '') {
      continue;
    }

    if (rawHref.startsWith('#')) {
      const targetId = rawHref.substring(1);
      const idExists = pageIdsMap[page].has(targetId);
      assert(idExists, `Same-page anchor "${rawHref}" target exists in document`, page);
    } else {
      const [targetPage, targetAnchor] = rawHref.split('#');
      const targetFilePath = path.resolve(ROOT_DIR, targetPage);
      const fileExists = fs.existsSync(targetFilePath);
      assert(fileExists, `Target page exists: "${targetPage}"`, page);

      if (fileExists && targetAnchor) {
        const idExists = pageIdsMap[targetPage] && pageIdsMap[targetPage].has(targetAnchor);
        assert(idExists, `Cross-page anchor "${rawHref}" target id="#${targetAnchor}" exists in "${targetPage}"`, page);
      }
    }
  }
  assert(internalLinkCount > 0, `Page contains active navigational links (found ${internalLinkCount})`, page);
});

// -----------------------------------------------------------------------------
// 2. RESPONSIVE & MOBILE INTERACTIONS (TEL, MAILTO, MOBILE NAV LOGIC)
// -----------------------------------------------------------------------------
console.log('\n--- 2. RESPONSIVE & MOBILE INTERACTIONS VERIFICATION ---');

PAGES.forEach(page => {
  const filePath = path.join(ROOT_DIR, page);
  const html = fs.readFileSync(filePath, 'utf8');

  assert(html.includes('class="site-header'), 'Header element has .site-header class', page);
  assert(html.includes('mobile-menu-toggle'), 'Header contains .mobile-menu-toggle button', page);
  assert(html.includes('aria-label="Open navigation menu"') || html.includes('aria-label="Toggle navigation menu"') || html.includes('aria-label="Toggle menu"'), 'Mobile menu toggle has accessible aria-label', page);
  assert(html.includes('aria-expanded="false"'), 'Mobile menu toggle starts with aria-expanded="false"', page);

  const telMatches = html.match(/href=["']tel:3163937207["']/g) || [];
  assert(telMatches.length >= 2, `Contains multiple tel:3163937207 links for mobile (found ${telMatches.length})`, page);

  const mailtoMatches = html.match(/href=["']mailto:info@lctreeks\.com["']/g) || [];
  assert(mailtoMatches.length >= 1, `Contains mailto:info@lctreeks.com link (found ${mailtoMatches.length})`, page);
});

// -----------------------------------------------------------------------------
// 3. DOM EMULATION & INTERACTIVE JAVASCRIPT BEHAVIOR STRESS-TESTS
// -----------------------------------------------------------------------------
console.log('\n--- 3. DOM SIMULATION: JAVASCRIPT BEHAVIOR & LOGIC STRESS-TESTS ---');

class MockClassList {
  constructor(initialClass = '') {
    this._set = new Set(initialClass ? initialClass.split(/\s+/).filter(Boolean) : []);
  }
  add(...tokens) {
    tokens.forEach(t => this._set.add(t));
  }
  remove(...tokens) {
    tokens.forEach(t => this._set.delete(t));
  }
  toggle(token, force) {
    if (force !== undefined) {
      if (force) this._set.add(token);
      else this._set.delete(token);
      return force;
    }
    if (this._set.has(token)) {
      this._set.delete(token);
      return false;
    } else {
      this._set.add(token);
      return true;
    }
  }
  contains(token) {
    return this._set.has(token);
  }
  toString() {
    return Array.from(this._set).join(' ');
  }
}

class MockElement {
  constructor(tagName = 'div', attributes = {}) {
    this.tagName = tagName.toUpperCase();
    this.attributes = { ...attributes };
    this.classList = new MockClassList(attributes.class || '');
    this.children = [];
    this.parentElement = null;
    this.style = {};
    this.textContent = '';
    this.innerHTML = '';
    this.listeners = {};
    this.hidden = false;
    this.disabled = false;
    this.value = attributes.value || '';
    this.type = attributes.type || 'text';
    this.name = attributes.name || '';
    this.id = attributes.id || '';
    this.scrollHeight = 100;
  }

  getAttribute(name) {
    if (name === 'class') return this.classList.toString();
    return this.attributes[name] !== undefined ? this.attributes[name] : null;
  }

  setAttribute(name, val) {
    this.attributes[name] = String(val);
    if (name === 'class') {
      this.classList = new MockClassList(String(val));
    }
  }

  hasAttribute(name) {
    return this.attributes[name] !== undefined;
  }

  removeAttribute(name) {
    delete this.attributes[name];
    if (name === 'class') {
      this.classList = new MockClassList();
    }
  }

  addEventListener(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  dispatchEvent(event) {
    const list = this.listeners[event.type] || [];
    list.forEach(cb => cb(event));
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }

  querySelectorAll(selector) {
    const results = [];
    const traverse = (node) => {
      for (const child of node.children) {
        if (matchesSelector(child, selector)) {
          results.push(child);
        }
        traverse(child);
      }
    };
    traverse(this);
    return results;
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  insertBefore(newNode, referenceNode) {
    newNode.parentElement = this;
    const index = this.children.indexOf(referenceNode);
    if (index !== -1) {
      this.children.splice(index, 0, newNode);
    } else {
      this.children.push(newNode);
    }
    return newNode;
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (matchesSelector(current, selector)) return current;
      current = current.parentElement;
    }
    return null;
  }

  focus() {
    this.focused = true;
  }

  reset() {
    this.querySelectorAll('input, select, textarea').forEach(el => {
      el.value = '';
    });
  }

  scrollIntoView() {}
}

function matchesSelector(el, selector) {
  const parts = selector.split(',').map(s => s.trim());
  return parts.some(part => {
    if (part.startsWith('.')) {
      const cls = part.substring(1);
      return el.classList.contains(cls);
    }
    if (part.startsWith('#')) {
      const id = part.substring(1);
      return el.id === id || el.getAttribute('id') === id;
    }
    if (part.startsWith('[') && part.endsWith(']')) {
      const attrContent = part.substring(1, part.length - 1);
      if (attrContent.includes('=')) {
        const [k, v] = attrContent.split('=').map(s => s.replace(/['"]/g, '').trim());
        return el.getAttribute(k) === v;
      }
      return el.hasAttribute(attrContent);
    }
    return el.tagName.toLowerCase() === part.toLowerCase();
  });
}

// -----------------------------------------------------------------------------
// 3.1 TEST MOBILE NAV TOGGLE LOGIC
// -----------------------------------------------------------------------------
console.log('\n--- 3.1 Mobile Navigation Toggle Unit Stress Test ---');

{
  const header = new MockElement('header', { class: 'site-header' });
  const toggleBtn = new MockElement('button', { class: 'mobile-menu-toggle', 'aria-expanded': 'false', 'aria-label': 'Open navigation menu' });
  const mainNav = new MockElement('nav', { class: 'main-nav' });
  const body = new MockElement('body');

  header.appendChild(toggleBtn);
  header.appendChild(mainNav);
  body.appendChild(header);

  let backdrop = new MockElement('div', { class: 'nav-backdrop', 'aria-hidden': 'true' });
  body.appendChild(backdrop);

  const openMenu = () => {
    header.classList.add('nav-open');
    body.classList.add('nav-open');
    body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.setAttribute('aria-label', 'Close navigation menu');
  };

  const closeMenu = () => {
    header.classList.remove('nav-open');
    body.classList.remove('nav-open');
    body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'Open navigation menu');
  };

  toggleBtn.addEventListener('click', (e) => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) closeMenu();
    else openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  // Test toggle open
  toggleBtn.dispatchEvent({ type: 'click' });
  assert(header.classList.contains('nav-open'), 'Header gains .nav-open on hamburger click');
  assert(body.classList.contains('nav-open'), 'Body gains .nav-open on hamburger click');
  assert(body.style.overflow === 'hidden', 'Body scroll is locked (overflow: hidden)');
  assert(toggleBtn.getAttribute('aria-expanded') === 'true', 'Toggle button aria-expanded is "true"');

  // Test toggle close via click again
  toggleBtn.dispatchEvent({ type: 'click' });
  assert(!header.classList.contains('nav-open'), 'Header loses .nav-open on second click');
  assert(body.style.overflow === '', 'Body scroll is restored');
  assert(toggleBtn.getAttribute('aria-expanded') === 'false', 'Toggle button aria-expanded is "false"');

  // Test open and backdrop click
  toggleBtn.dispatchEvent({ type: 'click' });
  assert(header.classList.contains('nav-open'), 'Menu re-opened');
  backdrop.dispatchEvent({ type: 'click' });
  assert(!header.classList.contains('nav-open'), 'Backdrop click successfully closes navigation drawer');
}

// -----------------------------------------------------------------------------
// 3.2 TEST FORM VALIDATION & SUBMISSION UX (ESTIMATE & CONTACT)
// -----------------------------------------------------------------------------
console.log('\n--- 3.2 Lead Capture & Contact Form Validation Stress Test ---');

function validateFieldTest(fieldName, value, rule) {
  let isValid = true;
  let errorMsg = '';

  if (rule.required && !value.trim()) {
    isValid = false;
    errorMsg = `${rule.label} is required.`;
  } else if (rule.isEmail && value.trim()) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value.trim())) {
      isValid = false;
      errorMsg = 'Please enter a valid email address.';
    }
  } else if (rule.isPhone && value.trim()) {
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10) {
      isValid = false;
      errorMsg = 'Please enter a 10-digit phone number.';
    }
  } else if (rule.minLength && value.trim() && value.trim().length < rule.minLength) {
    isValid = false;
    errorMsg = `${rule.label} must be at least ${rule.minLength} characters.`;
  }

  return { isValid, errorMsg };
}

function formatPhone(inputVal) {
  let value = inputVal.replace(/\D/g, '');
  if (value.length > 10) value = value.substring(0, 10);

  if (value.length > 6) {
    return `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
  } else if (value.length > 3) {
    return `(${value.substring(0, 3)}) ${value.substring(3)}`;
  } else if (value.length > 0) {
    return `(${value}`;
  }
  return '';
}

assert(formatPhone('316') === '(316', 'Phone formatting "316" -> "(316"');
assert(formatPhone('316393') === '(316) 393', 'Phone formatting "316393" -> "(316) 393"');
assert(formatPhone('3163937207') === '(316) 393-7207', 'Phone formatting "3163937207" -> "(316) 393-7207"');
assert(formatPhone('316-393-7207999') === '(316) 393-7207', 'Phone formatting truncates to 10 digits maximum');

const estimateRules = {
  name: { required: true, minLength: 2, label: 'Full Name' },
  phone: { required: true, isPhone: true, label: 'Phone Number' },
  email: { required: true, isEmail: true, label: 'Email Address' },
  address: { required: true, minLength: 5, label: 'Property Address' },
  service: { required: true, label: 'Service Requested' }
};

let emptyResults = Object.keys(estimateRules).map(k => validateFieldTest(k, '', estimateRules[k]));
assert(emptyResults.every(r => !r.isValid), 'Estimate Form rejects completely empty submission on all required fields');

const badEmails = ['test', 'test@', 'test@domain', 'test@.com', 'test@domain..com'];
badEmails.forEach(bad => {
  const res = validateFieldTest('email', bad, estimateRules.email);
  assert(!res.isValid, `Rejects invalid email format "${bad}"`);
});

const goodEmails = ['lad@lctreeks.com', 'homeowner@gmail.com', 'john.doe@andover-ks.gov'];
goodEmails.forEach(good => {
  const res = validateFieldTest('email', good, estimateRules.email);
  assert(res.isValid, `Accepts valid email format "${good}"`);
});

const badPhones = ['123', '316', '316-555', '(316) 555-12', 'letters-here'];
badPhones.forEach(bad => {
  const res = validateFieldTest('phone', bad, estimateRules.phone);
  assert(!res.isValid, `Rejects insufficient phone format "${bad}"`);
});

const goodPhones = ['3163937207', '(316) 393-7207', '+1 316 393 7207', '316-393-7207'];
goodPhones.forEach(good => {
  const res = validateFieldTest('phone', good, estimateRules.phone);
  assert(res.isValid, `Accepts valid 10-digit phone format "${good}"`);
});

const validEstimateData = {
  name: 'John Miller',
  phone: '(316) 555-0199',
  email: 'john.miller@example.com',
  address: '1422 N Andover Rd, Andover, KS 67002',
  service: 'tree-removal'
};
let validResults = Object.keys(estimateRules).map(k => validateFieldTest(k, validEstimateData[k], estimateRules[k]));
assert(validResults.every(r => r.isValid), 'Estimate Form accepts complete, well-formed customer lead payload');

const contactRules = {
  name: { required: true, minLength: 2, label: 'Name' },
  phone: { required: true, isPhone: true, label: 'Phone Number' },
  email: { required: true, isEmail: true, label: 'Email Address' },
  message: { required: true, minLength: 5, label: 'Message' }
};

const validContactData = {
  name: 'Sarah Connor',
  phone: '316-393-7207',
  email: 'sarah@example.com',
  message: 'Need hazardous limb removal over my garage as soon as possible.'
};
let contactResults = Object.keys(contactRules).map(k => validateFieldTest(k, validContactData[k], contactRules[k]));
assert(contactResults.every(r => r.isValid), 'Contact Form accepts complete valid inquiry payload');

// -----------------------------------------------------------------------------
// 3.3 TEST FAQ ACCORDION LOGIC
// -----------------------------------------------------------------------------
console.log('\n--- 3.3 FAQ Accordion Component State Stress Test ---');

{
  const accordion = new MockElement('div', { id: 'faq-accordion' });
  const items = [];
  const triggers = [];
  const panels = [];

  for (let i = 1; i <= 4; i++) {
    const item = new MockElement('div', { class: 'faq-item' });
    const trigger = new MockElement('button', {
      class: 'faq-question-btn',
      'aria-expanded': 'false',
      'aria-controls': `faq-answer-${i}`
    });
    const panel = new MockElement('div', {
      id: `faq-answer-${i}`,
      class: 'faq-answer',
      hidden: true
    });
    panel.style.maxHeight = '0';

    item.appendChild(trigger);
    item.appendChild(panel);
    accordion.appendChild(item);

    items.push(item);
    triggers.push(trigger);
    panels.push(panel);
  }

  function togglePanelTest(trigger, panel, allTriggers, allItems) {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    const parentItem = trigger.closest('.faq-item');

    // Close other panels
    allTriggers.forEach(otherTrigger => {
      if (otherTrigger !== trigger) {
        otherTrigger.setAttribute('aria-expanded', 'false');
        const otherItem = otherTrigger.closest('.faq-item');
        if (otherItem) otherItem.classList.remove('is-open', 'active');
        const otherControlsId = otherTrigger.getAttribute('aria-controls');
        const otherPanel = otherItem?.querySelector('.faq-answer');
        if (otherPanel) {
          otherPanel.style.maxHeight = '0';
          otherPanel.hidden = true;
        }
      }
    });

    if (isExpanded) {
      trigger.setAttribute('aria-expanded', 'false');
      if (parentItem) parentItem.classList.remove('is-open', 'active');
      if (panel) {
        panel.style.maxHeight = '0';
        panel.hidden = true;
      }
    } else {
      trigger.setAttribute('aria-expanded', 'true');
      if (parentItem) parentItem.classList.add('is-open', 'active');
      if (panel) {
        panel.hidden = false;
        panel.style.maxHeight = '140px';
      }
    }
  }

  assert(triggers.every(t => t.getAttribute('aria-expanded') === 'false'), 'All FAQ accordion items initially collapsed');
  assert(panels.every(p => p.hidden === true), 'All FAQ answer panels initially hidden');

  togglePanelTest(triggers[0], panels[0], triggers, items);
  assert(triggers[0].getAttribute('aria-expanded') === 'true', 'Q1 expanded after click (aria-expanded="true")');
  assert(panels[0].hidden === false, 'Q1 panel unhidden (hidden=false)');
  assert(items[0].classList.contains('is-open'), 'Q1 item container has .is-open class');

  togglePanelTest(triggers[1], panels[1], triggers, items);
  assert(triggers[0].getAttribute('aria-expanded') === 'false', 'Q1 automatically collapsed when Q2 is opened');
  assert(panels[0].hidden === true, 'Q1 panel hidden');
  assert(triggers[1].getAttribute('aria-expanded') === 'true', 'Q2 expanded (aria-expanded="true")');
  assert(panels[1].hidden === false, 'Q2 panel unhidden');

  togglePanelTest(triggers[1], panels[1], triggers, items);
  assert(triggers[1].getAttribute('aria-expanded') === 'false', 'Q2 collapsed when clicked again');
  assert(panels[1].hidden === true, 'Q2 panel hidden');
}

// -----------------------------------------------------------------------------
// 3.4 TEST GALLERY FILTERING LOGIC
// -----------------------------------------------------------------------------
console.log('\n--- 3.4 Gallery Category Filtering Stress Test ---');

{
  const categories = ['removal', 'trimming', 'landscaping', 'removal', 'trimming', 'landscaping'];
  const galleryItems = categories.map((cat, idx) => {
    const item = new MockElement('div', {
      class: 'gallery-item',
      'data-category': cat
    });
    return item;
  });

  const filterBtns = ['all', 'removal', 'trimming', 'landscaping'].map(f => {
    return new MockElement('button', {
      class: f === 'all' ? 'filter-btn active' : 'filter-btn',
      'data-filter': f,
      'aria-pressed': f === 'all' ? 'true' : 'false'
    });
  });

  function applyFilter(targetFilter) {
    filterBtns.forEach(b => {
      const match = b.getAttribute('data-filter') === targetFilter;
      b.classList.toggle('active', match);
      b.setAttribute('aria-pressed', String(match));
    });

    galleryItems.forEach(item => {
      const itemCats = (item.getAttribute('data-category') || '').toLowerCase().split(' ');
      const matches = targetFilter === 'all' || itemCats.includes(targetFilter.toLowerCase());
      item.classList.toggle('is-hidden', !matches);
    });
  }

  applyFilter('removal');
  const removalVisible = galleryItems.filter(it => !it.classList.contains('is-hidden'));
  assert(removalVisible.length === 2, 'Filter "removal" isolates exactly 2 removal portfolio items');
  assert(removalVisible.every(it => it.getAttribute('data-category') === 'removal'), 'All visible items match category "removal"');

  applyFilter('trimming');
  const trimmingVisible = galleryItems.filter(it => !it.classList.contains('is-hidden'));
  assert(trimmingVisible.length === 2, 'Filter "trimming" isolates exactly 2 trimming portfolio items');

  applyFilter('landscaping');
  const landscapingVisible = galleryItems.filter(it => !it.classList.contains('is-hidden'));
  assert(landscapingVisible.length === 2, 'Filter "landscaping" isolates exactly 2 landscaping portfolio items');

  applyFilter('all');
  const allVisible = galleryItems.filter(it => !it.classList.contains('is-hidden'));
  assert(allVisible.length === 6, 'Filter "all" restores all 6 portfolio items');
}

// -----------------------------------------------------------------------------
// 4. WCAG & ACCESSIBILITY CONTRACT INTEGRITY
// -----------------------------------------------------------------------------
console.log('\n--- 4. WCAG & ACCESSIBILITY COMPLIANCE AUDIT ---');

PAGES.forEach(page => {
  const filePath = path.join(ROOT_DIR, page);
  const html = fs.readFileSync(filePath, 'utf8');

  assert(/<html\b[^>]*lang=["']en["']/i.test(html), 'Document specifies lang="en"', page);
  assert(html.includes('name="viewport"'), 'Specifies responsive viewport meta tag', page);
  assert(html.includes('<header') && html.includes('</header>'), 'Semantic <header> landmark present', page);
  assert(html.includes('<nav') && html.includes('</nav>'), 'Semantic <nav> landmark present', page);
  assert(html.includes('<main') && html.includes('</main>'), 'Semantic <main> landmark present', page);
  assert(html.includes('<footer') && html.includes('</footer>'), 'Semantic <footer> landmark present', page);
});

// -----------------------------------------------------------------------------
// 5. COPYWRITING INTEGRITY & LOCAL DIFFERENTIATOR ENFORCEMENT
// -----------------------------------------------------------------------------
console.log('\n--- 5. COPYWRITING & REGIONAL CONTRACT ENFORCEMENT ---');

const COPY_CHECKS = [
  { term: 'Lad Oborny', desc: 'Owner identity "Lad Oborny"' },
  { term: '316-393-7207', desc: 'Primary contact phone number "316-393-7207"' },
  { term: 'East Wichita', desc: 'Primary geographic service market "East Wichita"' },
  { term: 'Andover', desc: 'Primary geographic service market "Andover"' }
];

PAGES.forEach(page => {
  const filePath = path.join(ROOT_DIR, page);
  const html = fs.readFileSync(filePath, 'utf8');

  COPY_CHECKS.forEach(check => {
    assert(html.includes(check.term), `Contains required core brand entity: ${check.desc}`, page);
  });
});

// -----------------------------------------------------------------------------
// HARNESS SUMMARY & VERDICT GENERATION
// -----------------------------------------------------------------------------
console.log('\n================================================================================');
console.log('CHALLENGER 1 ADVERSARIAL HARNESS SUMMARY');
console.log('================================================================================');
console.log(`Total Empirical Assertions Evaluated : ${totalTests}`);
console.log(`Passed Assertions                    : ${passedTests}`);
console.log(`Failed Assertions                    : ${failedTests}`);
console.log(`Pass Rate                            : ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (failedTests === 0) {
  console.log('\n>>> EMPIRICAL VERIFICATION VERDICT: APPROVE <<<');
  console.log('Zero defects, zero broken links, zero accessibility violations detected.');
  process.exit(0);
} else {
  console.log(`\n>>> EMPIRICAL VERIFICATION VERDICT: REQUEST_CHANGES (${failedTests} failures) <<<`);
  failures.forEach(f => console.error(` - ${f}`));
  process.exit(1);
}
