# Exhaustive Test Constraint Analysis & Specification Guide

**Project**: LC Tree and Landscaping, LLC Website  
**Test Suite Under Investigation**: `tests/verify_website.js` (`npm test`)  
**Workspace Root**: `c:\Users\prest\Documents\antigravity\dazzling-hertz`  
**Investigator**: Explorer 3 (Test Constraints Investigator)  
**Date**: 2026-08-29  

---

## Executive Summary

The primary automated acceptance criterion is:
> **`node tests/verify_website.js` MUST pass 100% with exit code 0 (0 failed assertions).**

Currently, executing `node tests/verify_website.js` evaluates **181 assertions** across 4 tiers:
- **174 Passing**
- **7 Failing** (due to missing owner name `"Lad Oborny"` in footers/trust bar and missing header phone CTA in `contact.html`)
- **Compliance Rate**: 96.1%

This document specifies every hard constraint, required DOM structure, class name, ID, regex pattern, and text literal needed to achieve and maintain 100% test passage while condensing the homepage and polishing the UI.

---

## Tier-by-Tier Specification & Assertion Catalog

### Tier 1: Multi-Page Structural Integrity

#### 1.1 File Existence & Non-Trivial Size
The suite evaluates `REQUIRED_PAGES = ['index.html', 'about.html', 'services.html', 'contact.html']`:
- Every page file must exist on disk: `path.join(ROOT_DIR, page)`
- Every page file size must be **>= 200 bytes** (`stats.size >= 200`).

#### 1.2 Stylesheets, JavaScript, & Brand Asset Files
- **`css/styles.css`**: Must exist on disk.
- **`css/components.css`**: Must exist on disk.
- **`css/responsive.css`**: Must exist on disk.
- **`js/main.js`**: Must exist on disk.
- **`assets/images/logo.jpg`**:
  - File must exist on disk at `assets/images/logo.jpg`.
  - File size must be **> 10,000 bytes** (`logoStats.size > 10000`).
  - File must be a valid JPEG with magic bytes `0xFF 0xD8` (`logoBuf[0] === 0xFF && logoBuf[1] === 0xD8`).

#### 1.3 HTML5 Standards & Meta Tags (Enforced on All 4 Pages)
Each of `index.html`, `about.html`, `services.html`, `contact.html` must contain:
1. `<!DOCTYPE html>` (case-insensitive: `/<!doctype\s+html>/i`)
2. `<html lang="...">` (`/<html[^>]*\blang=["']?[a-zA-Z-]+["']?[^>]*>/i`)
3. Semantic `<head>` and `<body>` tags: `/<head[\s>]/i` and `</head>`, `/<body[\s>]/i` and `</body>`
4. UTF-8 Meta Charset: `/<meta[^>]*\bcharset=["']?utf-8["']?[^>]*>/i`
5. Responsive Meta Viewport: `/<meta[^>]*\bname=["']viewport["'][^>]*>/i`
6. Non-empty `<title>`: `/<title[^>]*>(.*?)<\/title>/is` (trimmed length > 0)
7. SEO Meta Description: `/<meta[^>]*\bname=["']description["'][^>]*>/i`
8. External Stylesheet link: `/<link[^>]*\brel=["']stylesheet["'][^>]*>/i`
9. External Script link: `/<script[^>]*\bsrc=["'][^"']+["'][^>]*>/i`

---

### Tier 2: Component & Acceptance Criteria Verification

#### 2.1 Global Sticky Header Verification (Enforced on ALL 4 Pages)
Each page (`index.html`, `about.html`, `services.html`, `contact.html`) must strictly contain:
1. **Semantic Landmark**: `<header>` tag (`/<header\b[^>]*>/i`).
2. **Sticky Header Class**: Class containing `site-header`, `header-sticky`, or `sticky-header` (`/class=["'][^"']*\b(site-header|header-sticky|sticky-header)\b[^"']*["']/i`).
3. **Top Bar Announcement**: Must contain `"Serving"` AND either `"East Wichita"` or `"Andover"` (`/(East Wichita|Andover)/i` and `/Serving/i`).
4. **Official Brand Logo Link**:
   Must match either:
   - `<a class="...logo..." href="index.html" (or "/")>...<img src="assets/images/logo.jpg" class="...logo-img...">...</a>`
   - `<a href="index.html" class="...logo...">...<img src="assets/images/logo.jpg" class="...logo-img...">...</a>`
   *(Crucial: `src` must equal `"assets/images/logo.jpg"`, class must contain `logo-img`, parent `<a>` must have class containing `logo` and href pointing to `index.html` or `/`).*
5. **Primary Call CTA Link**:
   - `href="tel:3163937207"` (`/href=["']tel:3163937207["']/i`)
   - Text containing `"316-393-7207"` (`/316-393-7207/`)
   - Text matching `/Call Now: 316-393-7207|Call: 316-393-7207|Call 316-393-7207/i`
6. **Navigation Landmark**: `<nav>` tag (`/<nav\b[^>]*>/i`).
7. **Nav Route Links**: Must contain active links to all core pages:
   - `href="index.html"`
   - `href="about.html"`
   - `href="services.html"`
   - `href="contact.html"`

---

#### 2.2 Global 4-Column Footer Verification (Enforced on ALL 4 Pages)
Each page (`index.html`, `about.html`, `services.html`, `contact.html`) must contain:
1. **Semantic Landmark**: `<footer>` tag (`/<footer\b[^>]*>/i`).
2. **4-Column Layout Class**: Must match `/footer-grid|footer-col|footer-columns|footer-col-1|grid-4/i`.
3. **Column 1 (Brand & Owner Info)**:
   - Must contain owner name **`Lad Oborny`** (`/Lad Oborny/i`).
   - Must contain phone number `"316-393-7207"` (`/316-393-7207/`).
   - Must contain email link: `mailto:...@...` (`/mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i`).
   - Must contain business hours: matches `/Hours|Mon|Sat|AM|PM/i`.
   - Must contain brand logo image with class `footer-logo-img`:
     `/<img[^>]+src=["']assets\/images\/logo\.jpg["'][^>]+class=["'][^"']*footer-logo-img[^"']*["']/i`
4. **Column 2 & 3 (Navigation & Services)**:
   - Must have heading `"Quick Links"` (`/Quick Links/i`).
   - Must have heading `"Core Services"` or `"Services"` (`/Core Services|Services/i`).
   - Column 3 must include links/mentions of all 4 core services:
     - `"Tree Removal"` (`/Tree Removal/i`)
     - `"Tree Trimming"` or `"Pruning"` (`/Tree Trimming|Pruning/i`)
     - `"Stump Grinding"` (`/Stump Grinding/i`)
     - `"Landscaping"` (`/Landscaping/i`)
5. **Column 4 (Service Areas & Trust Badges)**:
   - Must specify `"East Wichita"` AND `"Andover"` (`/East Wichita/i` and `/Andover/i`).
   - Must feature trust badges:
     - `"Fully Insured"` or `"Insured"` (`/Fully Insured|Insured/i`)
     - `"5-Star"`, `"Five Star"`, `"★★★★★"`, or `"5.0"` (`/5-Star|Five Star|★★★★★|5\.0/i`)
     - `"Locally Owned"` or `"Local Business"` (`/Locally Owned|Local Business/i`)
6. **Sub-footer**:
   - Copyright notice: `/Copyright|©|\&copy;|All Rights Reserved/i`
   - Brand name: `"LC Tree"` (`/LC Tree/i`)

---

#### 2.3 Home Page (`index.html`) Acceptance Criteria
The homepage `index.html` is the primary target of condensation. When condensing, the following 10 sections/elements **MUST BE PRESERVED**:

1. **Hero Section Headline**:
   - Must contain `"Expert Tree Care"` AND (`"East Wichita"` OR `"Andover"`).
   - Regex: `/Expert Tree Care/i.test(homeContent) && /(East Wichita|Andover)/i.test(homeContent)`
2. **Hero Dual CTAs**:
   - Primary phone CTA: `href="tel:3163937207"` (`/href=["']tel:3163937207["']/i`)
   - Secondary estimate CTA: `href="contact.html"` OR `href="#estimate"` (`/href=["']contact\.html["']/i || /href=["']#estimate["']/i`)
3. **Trust Bar**:
   - Must contain `"Fully Insured"` AND **`"Lad Oborny"`** AND `"5-Star"`.
   - Regex: `/Fully Insured/i.test(homeContent) && /Lad Oborny/i.test(homeContent) && /5-Star/i.test(homeContent)`
4. **4 Core Services Grid**:
   - Must highlight all 4 core services:
     - `"Tree Removal"`
     - `"Tree Trimming"` (or `"Pruning"`)
     - `"Stump Grinding"`
     - `"Landscaping"`
   - Regex: `/Tree Removal/i.test(homeContent) && (/Tree Trimming/i.test(homeContent) || /Pruning/i.test(homeContent)) && /Stump Grinding/i.test(homeContent) && /Landscaping/i.test(homeContent)`
5. **"The LC Difference" Section**:
   - Heading/mention: `"The LC Difference"` (`/The LC Difference/i`)
   - Differentiator copy:
     - Must match `/cleanup|clean up|meticulous/i`
     - Must match `/personalized|owner|property/i`
6. **Proof of Quality (Before/After Comparison)**:
   - Must include `"Before"` AND `"After"` (`/Before/i.test(homeContent) && /After/i.test(homeContent)`).
7. **Proof of Quality (Video / Demo Container)**:
   - Must contain `<video>`, `<iframe>`, or container class `video-container`, `video-wrapper`, or `project-video`.
   - Regex: `/<video\b|<iframe\b|video-container|video-wrapper|project-video/i.test(homeContent)`
8. **Testimonial Snippet**:
   - Must mention `"testimonial"`, `"review"`, or `"quote"` AND (`"Andover"`, `"East Wichita"`, or `"Wichita"`).
   - Regex: `/testimonial|review|quote/i.test(homeContent) && /(Andover|East Wichita|Wichita)/i.test(homeContent)`
9. **Pre-Footer Call CTA Banner**:
   - Must match `/Ready to transform|schedule|free estimate|Call Lad/i` AND contain `"316-393-7207"`.

---

#### 2.4 About Page (`about.html`) Acceptance Criteria
`about.html` must contain:
1. Owner biography mentioning **`Lad Oborny`**: `/Lad Oborny/i.test(aboutContent)`.
2. Local roots & community commitment: `/East Wichita|Andover|Kansas/i.test(aboutContent)`.
3. Core company values: `/Safety|Cleanup|Pricing|Values|Satisfaction/i.test(aboutContent)`.
4. Pre-Footer CTA with phone link: `/tel:3163937207/i.test(aboutContent)`.

---

#### 2.5 Services Page (`services.html`) Acceptance Criteria
`services.html` must contain detailed service blocks:
1. **Tree Removal Block**: Must mention `"Tree Removal"` AND (`hazardous`, `crane`, `safety`, or `tight`).
2. **Tree Trimming Block**: Must mention `"Tree Trimming"` or `"Pruning"` AND (`canopy`, `deadwood`, or `health`).
3. **Stump Grinding Block**: Must mention `"Stump Grinding"` AND (`root`, `below`, or `grind`).
4. **Landscaping Block**: Must mention `"Landscaping"` AND (`mulch`, `cleanup`, `maintenance`, or `bed`).
5. **Pre-Footer CTA**: Must include `/tel:3163937207/i.test(servicesContent)`.

---

#### 2.6 Contact Page (`contact.html`) Acceptance Criteria
`contact.html` must contain:
1. Direct phone link and text: `/316-393-7207/.test(contactContent) && /tel:3163937207/.test(contactContent)`.
2. Email contact link: `/mailto:/i.test(contactContent)`.
3. Hours of operation: `/Hours|7:00|Mon|Sat/i.test(contactContent)`.
4. Service area coverage: `/East Wichita|Andover/i.test(contactContent)`.
5. Quick inquiry form: `/<form\b[^>]*>/i.test(contactContent)`.
6. Header Call CTA: Must include `"Call Now: 316-393-7207"` or `"Call: 316-393-7207"` in the header!

---

#### 2.7 Conditional Standalone Pages (`gallery.html`, `estimate.html`, `testimonials.html`, `faq.html`)
*Note: In the current 4-page architecture, these pages do not exist as separate files. `verify_website.js` handles their absence gracefully via `readFileSafe`. However, if created or if sections exist on other pages, the following rules apply:*
- `estimate.html`: Form with inputs for `name`, `phone` (`type="tel"`), `email` (`type="email"`), `address`, `service` (`<select>`), and `details` (`<textarea>`), plus `"24 hours"` turnaround copy.
- `faq.html`: Accordion container with Q&As covering insurance, cleanup, estimate turnaround speed, and presence requirement.
- `gallery.html`: Filter buttons (`all`, `removal`, `trimming`, `landscaping`), gallery grid, and lightbox markup.
- `testimonials.html`: Rating summary (5.0 / 5-Star), reviews from Andover / East Wichita.

---

### Tier 3: Cross-Page Navigational & Link Integrity

#### 3.1 Internal Links & Asset Reference Validation
- The test suite inspects **every single** `<a href>`, `<img src>`, `<link href>`, and `<script src>` across all 4 pages.
- For every relative link:
  - Query strings (`?foo=bar`) and hashes (`#section`) are stripped.
  - The relative file path is resolved on disk: `path.resolve(pageDir, cleanPath)`.
  - **`fs.existsSync(targetFullPath)` MUST be `true`!**
  - **ZERO broken links are permitted** (`brokenLinksFound === 0`).
  - *Implication for Condensation/Refactoring*: If any image, icon, stylesheet, or script is referenced in HTML, the file **must exist** in the `assets/` or `css/` or `js/` directory. If an asset is deleted from disk, all references in HTML must be removed.

#### 3.2 Tap-to-Call & Email Link Formatting
- Every `<a>` tag with `href="tel:..."`:
  - When non-digit characters are stripped, the phone number must equal `'3163937207'` or `'13163937207'`.
  - Allowed hrefs: `href="tel:3163937207"`, `href="tel:316-393-7207"`, `href="tel:+13163937207"`.
- Every `<a>` tag with `href="mailto:..."`:
  - Must match standard email format: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`.
  - Preferred standard: `href="mailto:info@lctreeks.com"`.

---

### Tier 4: Accessibility, Responsive CSS & JavaScript Integrity

#### 4.1 Image Accessibility (WCAG 2.1 AA Alt Text)
- Every `<img>` tag in all HTML files **must have an `alt` attribute** (`alt="..."`).
- `missingAltCount === 0` is strictly enforced.
- Empty `alt=""` is permitted for decorative images by standard HTML, but having descriptive text like `alt="Tree Trimming in Andover"` is recommended and compliant.

#### 4.2 Form Validation & Accessibility Attributes (Enforced on `contact.html` and `estimate.html`)
Forms on `contact.html` (and `estimate.html` if present) must satisfy:
- At least **2 form controls** must have the `required` attribute (`requiredCount >= 2`).
- Must contain at least one `<input type="tel">` for numeric mobile keypad.
- Must contain at least one `<input type="email">` for HTML5 email validation.

#### 4.3 Responsive CSS & Media Queries
- Across `css/styles.css`, `css/components.css`, and `css/responsive.css`:
  - `css/components.css` and `css/responsive.css` must contain responsive `@media` rules.
  - The total number of `@media` rules across all stylesheets must be **>= 3** (`totalMediaQueries >= 3`).

#### 4.4 JavaScript Syntax & Module Integrity
- `js/main.js` must parse cleanly without syntax errors when evaluated via `new Function(jsContent)`.

---

## Detailed Root Cause Analysis of Current 7 Failures

| # | Failing Test in `verify_website.js` | Failing File & Line in Test | Root Cause in HTML | Fix Prescription |
|---|---|---|---|---|
| **1** | `[contact.html] Header CTA: Is clean without clutter` | `contact.html` (Test line 227) | `contact.html` header lacks the `"Call: 316-393-7207"` or `"Call Now: 316-393-7207"` CTA button inside `.header-actions`. | Add `<a href="tel:3163937207" class="btn btn-phone header-cta">Call: 316-393-7207</a>` inside `.header-actions` in `contact.html`. |
| **2** | `[index.html] Footer Col 1: Names owner` | `index.html` (Test line 263) | Footer Column 1 does not mention `"Lad Oborny"`. | Add `"Lad Oborny, Owner & Operator"` in Footer Column 1 of `index.html`. |
| **3** | `[about.html] Footer Col 1: Names owner` | `about.html` (Test line 263) | Footer Column 1 does not mention `"Lad Oborny"`. | Add `"Lad Oborny, Owner & Operator"` in Footer Column 1 of `about.html`. |
| **4** | `[services.html] Footer Col 1: Names owner` | `services.html` (Test line 263) | Footer Column 1 does not mention `"Lad Oborny"`. | Add `"Lad Oborny, Owner & Operator"` in Footer Column 1 of `services.html`. |
| **5** | `[contact.html] Footer Col 1: Names owner` | `contact.html` (Test line 263) | Footer Column 1 does not mention `"Lad Oborny"`. | Add `"Lad Oborny, Owner & Operator"` in Footer Column 1 of `contact.html`. |
| **6** | `Home: Trust bar features "Fully Insured & Safe", "Locally Owned & Operated", and "5-Star Rated"` | `index.html` (Test line 306) | Trust Bar in `index.html` mentions "Locally Owned" but omitted owner name `"Lad Oborny"`. | Update Trust Bar item in `index.html` to `"Locally Owned & Operated by Lad Oborny"`. |
| **7** | `About: Features owner biography` | `about.html` (Test line 340) | `about.html` body mentions "Owner & Founder" but omitted `"Lad Oborny"`. | Restore/include `"Lad Oborny"` in owner biography / leadership section of `about.html`. |

---

## Homepage (`index.html`) Condensation Guardrails

When condensing `index.html` to satisfy Requirements R1 & R2:

### Permissible to Condense / Remove:
- Redundant repetitive image galleries or overly repetitive badge clusters.
- Verbose paragraph text (shorten to punchy 1-2 sentence value propositions).
- Excessive vertical whitespace and repetitive banner blocks.
- Duplicate CTA sections (as long as Hero dual CTA and Pre-Footer CTA remain).

### Strictly Forbidden to Remove (Will Break Tests):
1. **Hero Headline**: Must contain `"Expert Tree Care"` and `"East Wichita"` / `"Andover"`.
2. **Hero Dual CTA**: `href="tel:3163937207"` and `href="contact.html"` (or `href="#estimate"`).
3. **Trust Bar**: Must contain `"Fully Insured"`, `"Lad Oborny"`, and `"5-Star"`.
4. **4 Core Services**: Must include sections/cards for `"Tree Removal"`, `"Tree Trimming"` (or `"Pruning"`), `"Stump Grinding"`, and `"Landscaping"`.
5. **The LC Difference**: Must retain section heading `"The LC Difference"`, and mention cleanup/meticulous and personalized/owner/property.
6. **Proof of Quality / Before-After**: Must retain `"Before"` and `"After"` labels and video container (`class="video-container"` or `<video>` / `<iframe>`).
7. **Testimonial Snippet**: Must contain review/quote mentioning `"Andover"`, `"East Wichita"`, or `"Wichita"`.
8. **Pre-Footer CTA**: Must retain banner with phone `"316-393-7207"` and call text.
9. **Global Header & 4-Column Footer**: Must preserve all required classes, logo image with `.logo-img` and `.footer-logo-img`, owner `"Lad Oborny"`, contact info, and trust badges.

---

## Developer Verification Checklist

Before completing any implementation or review step, run:
```bash
node tests/verify_website.js
```
The expected output must end with:
```
Total Assertions Checked : 181
Passed Assertions        : 181
Failed Assertions        : 0
Overall Compliance Rate  : 100.0%
✨ ALL 4 TIERS PASSED! 100% SPECIFICATION COMPLIANCE ACHIEVED. ✨
```
Exit code: `0`.
