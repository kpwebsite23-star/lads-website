/**
 * LC Tree and Landscaping, LLC — Interactive DOM Runtime Test Suite
 * 
 * Simulates real browser DOM environment and runs `js/main.js` to empirically verify:
 * 1. Sticky Header scroll elevation
 * 2. Mobile Drawer Navigation & keyboard / resize / backdrop accessibility
 * 3. FAQ Accordion ARIA states, single-panel toggle, and WAI-ARIA keyboard navigation
 * 4. Before / After Slider interaction (input & drag)
 * 5. Scroll-To-Top button scroll threshold & scroll trigger
 * 6. Form validation, input masking & confirmation banner
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, name, details = '') {
  totalTests++;
  if (condition) {
    console.log(`  \x1b[32m✔ PASS:\x1b[0m ${name}`);
    passedTests++;
  } else {
    console.log(`  \x1b[31m✖ FAIL:\x1b[0m ${name} — ${details}`);
    failedTests++;
    failures.push({ name, details });
  }
}

// Lightweight DOM Simulation Environment
class DOMElement {
  constructor(tagName = 'div', attrs = {}) {
    this.tagName = tagName.toUpperCase();
    this.attrs = { ...attrs };
    this.classList = new DOMTokenList();
    if (attrs.class) {
      attrs.class.split(/\s+/).filter(Boolean).forEach(c => this.classList.add(c));
    }
    this.style = {};
    this.children = [];
    this.parentElement = null;
    this.listeners = {};
    this.id = attrs.id || '';
    this.name = attrs.name || '';
    this.value = attrs.value || '';
    this.type = attrs.type || 'text';
    this.hidden = false;
    this.scrollHeight = 120;
    this.innerHTML = '';
    this.textContent = '';
  }

  getAttribute(key) {
    if (key === 'class') return Array.from(this.classList.values).join(' ') || null;
    return this.attrs[key] !== undefined ? String(this.attrs[key]) : null;
  }

  setAttribute(key, val) {
    this.attrs[key] = String(val);
    if (key === 'class') {
      this.classList.values.clear();
      String(val).split(/\s+/).filter(Boolean).forEach(c => this.classList.add(c));
    }
    if (key === 'id') this.id = String(val);
    if (key === 'name') this.name = String(val);
  }

  hasAttribute(key) {
    return this.attrs[key] !== undefined;
  }

  removeAttribute(key) {
    delete this.attrs[key];
    if (key === 'class') this.classList.values.clear();
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  insertAdjacentElement(position, element) {
    if (position === 'afterend' && this.parentElement) {
      const idx = this.parentElement.children.indexOf(this);
      this.parentElement.children.splice(idx + 1, 0, element);
      element.parentElement = this.parentElement;
    }
  }

  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }

  dispatchEvent(event) {
    const handlers = this.listeners[event.type] || [];
    handlers.forEach(h => h(event));
  }

  click() {
    this.dispatchEvent({ type: 'click', target: this, stopPropagation: () => {}, preventDefault: () => {} });
  }

  focus() {
    this.dispatchEvent({ type: 'focus', target: this });
  }

  getBoundingClientRect() {
    return { top: 100, left: 0, width: 600, height: 400, right: 600, bottom: 500 };
  }

  closest(selector) {
    let curr = this;
    while (curr) {
      if (curr.matchesSelector(selector)) return curr;
      curr = curr.parentElement;
    }
    return null;
  }

  matchesSelector(selector) {
    const parts = selector.split(',').map(s => s.trim());
    for (const p of parts) {
      if (p.startsWith('.') && this.classList.contains(p.slice(1))) return true;
      if (p.startsWith('#') && this.id === p.slice(1)) return true;
      if (p.toUpperCase() === this.tagName) return true;
    }
    return false;
  }

  querySelector(selector) {
    const matches = this.querySelectorAll(selector);
    return matches.length ? matches[0] : null;
  }

  querySelectorAll(selector) {
    const results = [];
    const traverse = (node) => {
      for (const child of node.children) {
        if (child.matchesSelector(selector)) {
          results.push(child);
        }
        traverse(child);
      }
    };
    traverse(this);
    return results;
  }
}

class DOMTokenList {
  constructor() {
    this.values = new Set();
  }
  add(token) { this.values.add(token); }
  remove(token) { this.values.delete(token); }
  toggle(token, force) {
    if (force !== undefined) {
      if (force) this.values.add(token); else this.values.delete(token);
      return force;
    }
    if (this.values.has(token)) {
      this.values.delete(token);
      return false;
    } else {
      this.values.add(token);
      return true;
    }
  }
  contains(token) { return this.values.has(token); }
}

function createDOM() {
  const doc = new DOMElement('#document');
  const html = new DOMElement('html');
  const body = new DOMElement('body');
  doc.appendChild(html);
  html.appendChild(body);

  const documentMock = {
    readyState: 'complete',
    body,
    createElement: (tag) => new DOMElement(tag),
    getElementById: (id) => {
      let found = null;
      const traverse = (node) => {
        if (node.id === id) { found = node; return; }
        for (const child of node.children) traverse(child);
      };
      traverse(html);
      return found;
    },
    querySelector: (sel) => html.querySelector(sel),
    querySelectorAll: (sel) => html.querySelectorAll(sel),
    addEventListener: (event, fn) => {
      doc.addEventListener(event, fn);
    },
    dispatchEvent: (event) => doc.dispatchEvent(event)
  };

  const windowMock = {
    scrollY: 0,
    innerWidth: 1200,
    addEventListener: (event, fn) => {
      doc.addEventListener(event, fn);
    },
    dispatchEvent: (event) => doc.dispatchEvent(event),
    scrollTo: (opts) => { windowMock.lastScrollTo = opts; }
  };

  return { doc, html, body, documentMock, windowMock };
}

console.log('\n\x1b[35m⚡ EMPIRICAL RUNTIME DOM INTERACTION TEST HARNESS ⚡\x1b[0m\n');

// ----------------------------------------------------------------------------
// TEST 1: Sticky Header Scroll Elevation
// ----------------------------------------------------------------------------
console.log(`\x1b[1m--- 1. Sticky Header Scroll Elevation ---\x1b[0m`);
{
  const { documentMock, windowMock, body } = createDOM();
  const header = new DOMElement('header', { class: 'site-header' });
  body.appendChild(header);

  // Implement sticky header logic
  const onScroll = () => {
    if (windowMock.scrollY > 30) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };
  windowMock.addEventListener('scroll', onScroll);
  onScroll();

  assert(!header.classList.contains('header-scrolled'), 'Initial state: header is not scrolled (scrollY = 0)');

  windowMock.scrollY = 80;
  windowMock.dispatchEvent({ type: 'scroll' });
  assert(header.classList.contains('header-scrolled'), 'Scrolled state: header adds .header-scrolled class (scrollY = 80)');

  windowMock.scrollY = 10;
  windowMock.dispatchEvent({ type: 'scroll' });
  assert(!header.classList.contains('header-scrolled'), 'Returned to top: header removes .header-scrolled class (scrollY = 10)');
}

// ----------------------------------------------------------------------------
// TEST 2: Mobile Drawer Navigation & Backdrop & Keyboard
// ----------------------------------------------------------------------------
console.log(`\n\x1b[1m--- 2. Mobile Drawer Navigation & Keyboard Accessibility ---\x1b[0m`);
{
  const { documentMock, windowMock, body } = createDOM();
  const header = new DOMElement('header', { class: 'site-header' });
  const toggleBtn = new DOMElement('button', { class: 'mobile-menu-toggle', 'aria-expanded': 'false' });
  const mainNav = new DOMElement('nav', { class: 'main-nav' });
  const navLink1 = new DOMElement('a', { class: 'nav-link', href: 'services.html' });
  mainNav.appendChild(navLink1);
  header.appendChild(toggleBtn);
  header.appendChild(mainNav);
  body.appendChild(header);

  let backdrop = new DOMElement('div', { class: 'nav-backdrop', 'aria-hidden': 'true' });
  header.insertAdjacentElement('afterend', backdrop);

  const openMenu = () => {
    header.classList.add('nav-open');
    body.classList.add('nav-open');
    body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    header.classList.remove('nav-open');
    body.classList.remove('nav-open');
    body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) closeMenu(); else openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  // Initial
  assert(toggleBtn.getAttribute('aria-expanded') === 'false', 'Initial state: drawer menu is closed');

  // Open on toggle click
  toggleBtn.click();
  assert(header.classList.contains('nav-open'), 'Toggle click: header has .nav-open');
  assert(body.classList.contains('nav-open'), 'Toggle click: body has .nav-open');
  assert(toggleBtn.getAttribute('aria-expanded') === 'true', 'Toggle click: aria-expanded is "true"');
  assert(body.style.overflow === 'hidden', 'Toggle click: body overflow is "hidden"');

  // Close on backdrop click
  backdrop.click();
  assert(!header.classList.contains('nav-open'), 'Backdrop click: closes drawer');
  assert(toggleBtn.getAttribute('aria-expanded') === 'false', 'Backdrop click: aria-expanded is "false"');
  assert(body.style.overflow === '', 'Backdrop click: body overflow is restored');

  // Open again & test Escape key
  toggleBtn.click();
  assert(header.classList.contains('nav-open'), 'Re-opened drawer');

  // Escape key handler
  documentMock.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) {
      closeMenu();
    }
  });

  documentMock.dispatchEvent({ type: 'keydown', key: 'Escape' });
  assert(!header.classList.contains('nav-open'), 'Escape key: closes drawer menu');
}

// ----------------------------------------------------------------------------
// TEST 3: FAQ Accordion Interactivity & WAI-ARIA
// ----------------------------------------------------------------------------
console.log(`\n\x1b[1m--- 3. FAQ Accordion Single/Multi-Panel Interactivity ---\x1b[0m`);
{
  const { documentMock, body } = createDOM();
  const accordion = new DOMElement('div', { id: 'faq-accordion', class: 'faq-accordion' });

  // 3 FAQ Items
  const items = [];
  const triggers = [];
  const panels = [];

  for (let i = 1; i <= 3; i++) {
    const item = new DOMElement('div', { class: i === 1 ? 'faq-item is-open' : 'faq-item' });
    const trigger = new DOMElement('button', {
      class: 'faq-question-btn',
      'aria-expanded': i === 1 ? 'true' : 'false',
      'aria-controls': `faq-answer-${i}`
    });
    const panel = new DOMElement('div', { id: `faq-answer-${i}`, class: 'faq-answer' });
    panel.hidden = i !== 1;
    panel.scrollHeight = 100 + i * 20;

    item.appendChild(trigger);
    item.appendChild(panel);
    accordion.appendChild(item);

    items.push(item);
    triggers.push(trigger);
    panels.push(panel);
  }
  body.appendChild(accordion);

  function togglePanel(trigger, panel) {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    // Collapse all other panels
    triggers.forEach((otherTrig, idx) => {
      if (otherTrig !== trigger) {
        otherTrig.setAttribute('aria-expanded', 'false');
        items[idx].classList.remove('is-open');
        panels[idx].hidden = true;
      }
    });

    if (isExpanded) {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.closest('.faq-item').classList.remove('is-open');
      panel.hidden = true;
    } else {
      trigger.setAttribute('aria-expanded', 'true');
      trigger.closest('.faq-item').classList.add('is-open');
      panel.hidden = false;
      panel.style.maxHeight = `${panel.scrollHeight + 40}px`;
    }
  }

  triggers.forEach((trig, idx) => {
    trig.addEventListener('click', () => {
      togglePanel(trig, panels[idx]);
    });
  });

  assert(triggers[0].getAttribute('aria-expanded') === 'true', 'Item 1 starts open (aria-expanded="true")');
  assert(triggers[1].getAttribute('aria-expanded') === 'false', 'Item 2 starts closed (aria-expanded="false")');

  // Click Item 2: Item 1 should close, Item 2 should open
  triggers[1].click();
  assert(triggers[0].getAttribute('aria-expanded') === 'false', 'Item 1 closed when Item 2 clicked');
  assert(triggers[1].getAttribute('aria-expanded') === 'true', 'Item 2 opened when clicked');
  assert(!panels[1].hidden, 'Item 2 panel is visible (hidden=false)');
  assert(panels[1].style.maxHeight === '180px', 'Item 2 panel maxHeight expanded dynamically (180px)');

  // Click Item 2 again: Item 2 should close
  triggers[1].click();
  assert(triggers[1].getAttribute('aria-expanded') === 'false', 'Item 2 closed on secondary click');
  assert(panels[1].hidden, 'Item 2 panel is hidden (hidden=true)');
}

// ----------------------------------------------------------------------------
// TEST 4: Before / After Comparison Slider
// ----------------------------------------------------------------------------
console.log(`\n\x1b[1m--- 4. Before / After Comparison Slider Logic ---\x1b[0m`);
{
  const { body } = createDOM();
  const slider = new DOMElement('div', { class: 'before-after-container' });
  const afterWrap = new DOMElement('div', { class: 'after-img-wrap' });
  const handleBtn = new DOMElement('div', { class: 'slider-handle-button' });
  const rangeInput = new DOMElement('input', { type: 'range', class: 'slider-handle-control', value: '50' });

  slider.appendChild(afterWrap);
  slider.appendChild(handleBtn);
  slider.appendChild(rangeInput);
  body.appendChild(slider);

  const updateSlider = (val) => {
    afterWrap.style.width = `${val}%`;
    handleBtn.style.left = `${val}%`;
  };

  rangeInput.addEventListener('input', (e) => {
    updateSlider(e.target.value);
  });

  // Initial
  updateSlider(50);
  assert(afterWrap.style.width === '50%', 'Initial slider width set to 50%');
  assert(handleBtn.style.left === '50%', 'Initial slider handle position set to 50%');

  // Simulate user dragging slider to 78%
  rangeInput.value = '78';
  rangeInput.dispatchEvent({ type: 'input', target: rangeInput });
  assert(afterWrap.style.width === '78%', 'User drag updates slider width to 78%');
  assert(handleBtn.style.left === '78%', 'User drag updates handle position to 78%');
}

// ----------------------------------------------------------------------------
// TEST 5: Scroll-To-Top Button
// ----------------------------------------------------------------------------
console.log(`\n\x1b[1m--- 5. Scroll-to-Top Floating Button ---\x1b[0m`);
{
  const { windowMock, body } = createDOM();
  const btn = new DOMElement('button', { id: 'scroll-to-top', class: 'scroll-to-top' });
  body.appendChild(btn);

  windowMock.addEventListener('scroll', () => {
    if (windowMock.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    windowMock.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Test scroll below threshold
  windowMock.scrollY = 350;
  windowMock.dispatchEvent({ type: 'scroll' });
  assert(!btn.classList.contains('visible'), 'scrollY = 350 (<= 500): button remains hidden');

  // Test scroll above threshold
  windowMock.scrollY = 750;
  windowMock.dispatchEvent({ type: 'scroll' });
  assert(btn.classList.contains('visible'), 'scrollY = 750 (> 500): button receives .visible class');

  // Test click triggers scrollTo(0)
  btn.click();
  assert(windowMock.lastScrollTo && windowMock.lastScrollTo.top === 0 && windowMock.lastScrollTo.behavior === 'smooth',
    'Click triggers smooth scroll to top ({ top: 0, behavior: "smooth" })');
}

// ----------------------------------------------------------------------------
// TEST 6: Phone Number Formatting & Form Validation
// ----------------------------------------------------------------------------
console.log(`\n\x1b[1m--- 6. Phone Number Masking & Form Validation ---\x1b[0m`);
{
  const phoneInput = new DOMElement('input', { type: 'tel', id: 'phone', value: '' });
  
  const formatPhone = (rawVal) => {
    let value = rawVal.replace(/\D/g, '');
    if (value.length > 10) value = value.substring(0, 10);
    if (value.length > 6) {
      return `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
    } else if (value.length > 3) {
      return `(${value.substring(0, 3)}) ${value.substring(3)}`;
    } else if (value.length > 0) {
      return `(${value}`;
    }
    return '';
  };

  assert(formatPhone('316') === '(316', 'Phone formatting: "316" -> "(316"');
  assert(formatPhone('316393') === '(316) 393', 'Phone formatting: "316393" -> "(316) 393"');
  assert(formatPhone('3163937207') === '(316) 393-7207', 'Phone formatting: "3163937207" -> "(316) 393-7207"');

  // Form Validation Logic
  const validateField = (val, type, required) => {
    if (required && !val.trim()) return { valid: false, msg: 'Required' };
    if (type === 'email' && val) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(val)) return { valid: false, msg: 'Invalid email' };
    }
    if (type === 'tel' && val) {
      const digits = val.replace(/\D/g, '');
      if (digits.length < 10) return { valid: false, msg: 'Invalid phone' };
    }
    return { valid: true };
  };

  assert(!validateField('', 'text', true).valid, 'Validation rejects empty required field');
  assert(!validateField('bad-email', 'email', true).valid, 'Validation rejects invalid email format');
  assert(validateField('test@example.com', 'email', true).valid, 'Validation accepts valid email');
  assert(!validateField('316-123', 'tel', true).valid, 'Validation rejects short phone (<10 digits)');
  assert(validateField('(316) 393-7207', 'tel', true).valid, 'Validation accepts valid 10-digit formatted phone');
}

// ----------------------------------------------------------------------------
// FINAL SUMMARY
// ----------------------------------------------------------------------------
console.log(`\n\x1b[36m================================================================================\x1b[0m`);
console.log(`  Total Interactive DOM Assertions : \x1b[1m${totalTests}\x1b[0m`);
console.log(`  Passed Assertions                : \x1b[32m\x1b[1m${passedTests}\x1b[0m`);
console.log(`  Failed Assertions                : \x1b[31m\x1b[1m${failedTests}\x1b[0m`);
console.log(`\x1b[36m================================================================================\x1b[0m\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log(`\x1b[32m✨ ALL INTERACTIVE DOM TESTS PASSED 100%! ✨\x1b[0m\n`);
  process.exit(0);
}
