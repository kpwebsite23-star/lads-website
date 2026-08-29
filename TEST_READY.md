# Test Suite Manifest & Operational Manual: LC Tree and Landscaping, LLC

**Project**: LC Tree and Landscaping, LLC Website  
**Test Suite Path**: `tests/verify_website.js`  
**Configuration**: `package.json` (`"type": "module"`, `"scripts": { "test": "node tests/verify_website.js" }`)  
**Status**: Ready & Operational (Test Harness Active)  
**Execution Time**: <50ms (Zero-dependency Node.js ESM)  

---

## 1. Test Architecture & 4-Tier Strategy

The verification suite implements a strict 4-tier requirement verification strategy:

```
+-------------------------------------------------------------------------------+
|                      AUTOMATED VERIFICATION SUITE (4 TIERS)                   |
+-------------------------------------------------------------------------------+
|  TIER 1: Multi-Page Structural Integrity                                      |
|  - All 8 HTML Pages Exist & Non-Empty (index, about, services, gallery,       |
|    estimate, testimonials, faq, contact)                                      |
|  - Core Stylesheets & JavaScript Modules Exist                                |
|  - HTML5 Standards: DOCTYPE, html lang, head, body, UTF-8 charset, viewport,   |
|    meta description, stylesheet and script links                              |
+-------------------------------------------------------------------------------+
|  TIER 2: Component & Acceptance Criteria Verification                         |
|  - Sticky Header: .site-header, top bar announcement ("Serving East Wichita   |
|    & Andover"), logo linked to index.html, primary CTA "Call Now:             |
|    316-393-7207" (href="tel:3163937207"), 8-route navigation matrix          |
|  - 4-Column Footer: Brand & Owner (Lad Oborny, Phone, Email, Hours), Quick    |
|    Links, Core Services, Service Areas (East Wichita & Andover), Trust Badges |
|    (Fully Insured, 5-Star Reviews, Locally Owned), Copyright & Sub-footer     |
|  - Home: Hero, Trust Bar, Core Services grid, "The LC Difference", Proof of   |
|    Quality (Before/After & Video), Testimonial snippet, Pre-footer CTA        |
|  - Services: 4 Service Blocks (Tree Removal, Trimming & Pruning, Stump        |
|    Grinding, Landscaping), Safety & Cleanup copywriting                       |
|  - Gallery: Category filter controls, responsive grid, lightbox/modal, video  |
|  - Estimate: Lead capture form with 6 fields (Name, Phone, Email, Address,    |
|    Service, Details), 24-hr turnaround text, Trust Signals                    |
|  - FAQ: Collapsible accordion with >=4 Q&As (Insurance, Cleanup, 24h Speed,  |
|    Home Presence)                                                             |
|  - Contact: 2-Column layout (Direct Phone 316-393-7207, Email, Hours, Map,   |
|    Quick Inquiry Form)                                                        |
+-------------------------------------------------------------------------------+
|  TIER 3: Cross-Page Navigational & Link Integrity                            |
|  - Exhaustive scan of every <a> href, <img> src, <link> href, <script> src    |
|  - Relative internal path resolution & zero broken link validation (no 404s)  |
|  - Tap-to-call mobile formatting (tel:3163937207) & mailto: email formatting  |
+-------------------------------------------------------------------------------+
|  TIER 4: Real-World Scenarios, Accessibility & Script Integrity                |
|  - WCAG 2.1 AA Image Accessibility: 100% alt attribute enforcement           |
|  - Form Input UX: required validation, type="tel" for mobile keypad,          |
|    type="email" validation                                                    |
|  - Responsive CSS: Breakpoints and media queries (@media)                     |
|  - JavaScript Modules: Clean ES6+ syntax parsing across all scripts           |
+-------------------------------------------------------------------------------+
```

---

## 2. Requirement Traceability Matrix

| Requirement | Spec Source | Feature Description | Automated Test Assertion in `tests/verify_website.js` |
|:---|:---|:---|:---|
| **R1** | `ORIGINAL_REQUEST.md` § R1 | 8-Page Multi-Page Website | Tier 1.1: Existence & non-empty check for `index.html`, `about.html`, `services.html`, `gallery.html`, `estimate.html`, `testimonials.html`, `faq.html`, `contact.html` |
| **R1** | `PROJECT.md` § 5 | HTML5 Standards & Meta Viewport | Tier 1.3: Valid DOCTYPE, `<html lang>`, charset UTF-8, `<meta name="viewport">`, `<title>`, `<meta name="description">` |
| **R2** | `ORIGINAL_REQUEST.md` § R2 | Sticky Global Header | Tier 2.1: Semantic `<header>`, `.site-header`, sticky positioning, top bar, logo link, 8-page `<nav>` links |
| **R2** | `ORIGINAL_REQUEST.md` § R2 | Primary Call CTA | Tier 2.1 & Tier 3.2: High-contrast button with text `"Call Now: 316-393-7207"` and `href="tel:3163937207"` |
| **R2** | `ORIGINAL_REQUEST.md` § R2 | 4-Column Footer | Tier 2.2: Semantic `<footer>`, 4 columns (Brand/Lad Oborny/Phone/Email/Hours, Quick Links, Core Services, Service Areas & Trust Badges), Sub-footer |
| **R3** | `ORIGINAL_REQUEST.md` § R3 | Home Page Copy & "The LC Difference" | Tier 2.3: Hero, Trust Bar, Core Services grid, "The LC Difference" (meticulous cleanup, owner access, property protection), Proof of Quality, Testimonial snippet, Pre-footer CTA |
| **R3** | `ORIGINAL_REQUEST.md` § R3 | Services Page Breakdown | Tier 2.5: 4 distinct service blocks for Tree Removal, Tree Trimming & Pruning, Stump Grinding, Landscaping |
| **R3** | `website_architecture_lc_tree.md` | Gallery Portfolio & Filtering | Tier 2.6: Filter buttons (`data-filter="all"`, `removal`, `trimming`, `landscaping`), gallery grid, lightbox modal, video player |
| **R3** | `website_architecture_lc_tree.md` | Request an Estimate Form | Tier 2.7: 6 fields (name, phone, email, address, service, details), 24-hr turnaround text, trust signals |
| **R3** | `website_architecture_lc_tree.md` | FAQ Accordion | Tier 2.8: Collapsible accordion with >=4 Q&As (insurance, debris cleanup, speed, home attendance) |
| **R3** | `website_architecture_lc_tree.md` | Contact Page | Tier 2.9: 2-column layout (Phone, Email, Hours, Map representation, quick form) |
| **Link Integrity** | `TEST_INFRA.md` | Zero Broken Internal Links | Tier 3.1: Resolution check across all relative URLs in `<a>`, `<img>`, `<link>`, and `<script>` tags |
| **Accessibility** | `tech_architecture.md` § 4.1 | Image Alt Text & Form Controls | Tier 4.1 & 4.2: WCAG 2.1 AA alt text on all images; `required`, `type="tel"`, `type="email"` attributes on forms |
| **Responsive** | `PROJECT.md` § Tech Stack | Mobile & Tablet Responsiveness | Tier 4.3: Viewport meta tag + responsive CSS `@media` query rules |

---

## 3. How to Run the Test Suite

### Option 1: Via NPM
```bash
npm test
```

### Option 2: Direct Node.js Execution
```bash
node tests/verify_website.js
```

### Execution Characteristics:
- **Runtime**: Node.js v18+ (tested on Node.js v24.12.0)
- **Dependencies**: 0 external dependencies (uses native Node.js `fs`, `path`, `url`)
- **Execution Speed**: <50 milliseconds
- **Exit Code**: `0` when all assertions pass; `1` when any assertion fails with clear diagnostic output

---

## 4. Verification Output Reference

When executed, the runner displays categorized section headers, individual assertion pass/fail indicators, a full summary tally, and detailed diagnostic error messages pointing directly to the offending file or missing element:

```
🌲 LC TREE AND LANDSCAPING, LLC — AUTOMATED TEST RUNNER 🌲
Working Directory: c:\Users\prest\Documents\antigravity\dazzling-hertz
Timestamp: 2026-08-25T...

================================================================================
TIER 1: MULTI-PAGE STRUCTURAL INTEGRITY
================================================================================
--- 1.1 Core HTML Page Files Existence ---
  ✔ PASS: HTML page file exists: index.html
  ...

================================================================================
TIER 2: COMPONENT & ACCEPTANCE CRITERIA VERIFICATION
================================================================================
--- 2.1 Global Sticky Header Verification (All 8 Pages) ---
  ✔ PASS: [index.html] Header: Contains semantic <header> landmark
  ✔ PASS: [index.html] Header CTA: Contains tel:3163937207 phone link
  ...

================================================================================
TIER 3: CROSS-PAGE NAVIGATIONAL & LINK INTEGRITY
================================================================================
--- 3.1 Internal Links & Asset Reference Validation ---
  ✔ PASS: All internal references resolve (X links/assets verified)
  ...

================================================================================
TIER 4: REAL-WORLD SCENARIOS, ACCESSIBILITY & JAVASCRIPT INTEGRITY
================================================================================
--- 4.1 Image Accessibility (WCAG 2.1 AA Alt Text) ---
  ✔ PASS: [index.html] All <img> tags have alt attributes (X images checked)
  ...

================================================================================
VERIFICATION RESULTS SUMMARY
================================================================================
  Total Assertions Checked : N
  Passed Assertions        : N
  Failed Assertions        : 0
  Overall Compliance Rate  : 100.0%

✨ ALL 4 TIERS PASSED! 100% SPECIFICATION COMPLIANCE ACHIEVED. ✨
```
