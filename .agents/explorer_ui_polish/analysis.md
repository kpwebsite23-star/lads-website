# Site-Wide UI Polish & Visual Design Specification
**Project**: LC Tree and Landscaping, LLC  
**Author**: Explorer 2 (Site-Wide UI Polish Investigator)  
**Date**: 2026-08-29  
**Status**: Comprehensive Specification Ready for Implementation  

---

## 1. Executive Summary & Design Vision

LC Tree and Landscaping, LLC provides high-end residential and commercial arborist services (Hazardous Tree Removal, Tree Trimming & Canopy Pruning, Stump Grinding, Landscaping, and Emergency Storm Damage Response) in South Central Kansas, specifically East Wichita, Andover, and surrounding communities.

### 1.1 The Core Problem
The current website implementation suffers from three primary issues:
1. **Homepage Bloat & Scrolling Fatigue**: The homepage (`index.html`) exceeds 1,000 lines of HTML with redundant sections, an overwhelming number of portfolio images, and multiple review blocks stacked vertically.
2. **Missing & Out-of-Sync CSS Classes**: An incomplete refactoring left numerous HTML classes completely unstyled (e.g., `.bg-dark-slate`, `.form-control`, `.contact-grid`, `.contact-channel-card`, `.service-detail-block`, `.service-specs-box`, `.faq-question-btn`, `.rating-banner-card`). This causes layout collapse, unstyled inputs, and inconsistent visual hierarchy.
3. **Visual Clutter & Branding Degradation**: Injected debug scripts (`inject-labels.js` red tags) and unintentional global text replacements (replacing "Lad Oborny" with generic terms) degraded readability and broke automated test criteria.

### 1.2 The Design Vision
Elevate the website into a **pristine, high-trust, modern local service platform** that radiates craftsmanship, safety, and owner accountability while preserving the signature forest green and safety amber brand identity.

---

## 2. Design System Tokens & Global Foundations

### 2.1 Refined Color Palette
All color values are WCAG 2.1 AA compliant for text contrast ratios (minimum 4.5:1 for body text, 3:1 for large headings and interactive components).

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| `--color-primary-darkest` | `#0C2012` | Top announcement bar, sub-footer, deep background surfaces |
| `--color-primary-dark` | `#14361E` | Section dark surfaces, headings, high-contrast dark accents |
| `--color-primary` | `#1E4D2B` | **Signature Arborist Forest Green** (brand primary, active nav, primary badges) |
| `--color-primary-light` | `#2D723E` | Foliage green accents, icons, border highlights |
| `--color-primary-lighter` | `#52B788` | Muted green highlights, tag text on dark backgrounds |
| `--color-primary-subtle` | `#E8F5E9` | Light mint tint background for cards and feature callouts |
| `--color-accent` | `#E89818` | **High-Visibility Safety Amber** (Primary CTA buttons, phone highlights, stars) |
| `--color-accent-hover` | `#C77F12` | Hover state for safety amber buttons |
| `--color-accent-light` | `#F5B041` | Gold star rating fill, eyebrow accents on dark sections |
| `--color-bg-body` | `#FFFFFF` | Primary white canvas |
| `--color-bg-warm` | `#FAFAF7` | Warm alabaster cream for alternating section backgrounds |
| `--color-bg-subtle` | `#F0F4F1` | Cool pale green-tinted background for utility and trust strips |
| `--color-text-main` | `#1A2421` | Deep charcoal for crisp readability on light backgrounds |
| `--color-text-secondary` | `#374151` | Slate body copy for descriptions and paragraphs |
| `--color-text-muted` | `#6B7280` | Muted gray-green for subtext, dates, and micro-labels |
| `--color-border` | `#E2E8E4` | Crisp light divider and card border line |

### 2.2 Typography Scale & Font Pairings
- **Heading Font**: `Montserrat`, system-ui, sans-serif (Weights: 700 bold, 800 extra-bold, 900 black)
- **Body Font**: `Inter`, system-ui, sans-serif (Weights: 400 regular, 500 medium, 600 semi-bold, 700 bold)

```css
/* Typography Scale Specification */
h1, .page-title {
  font-family: var(--font-heading);
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: var(--color-primary-dark);
}

h2, .section-title {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 3vw, 2.35rem);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--color-primary-dark);
}

h3 {
  font-family: var(--font-heading);
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-primary-dark);
}

.section-eyebrow {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-primary-light);
  margin-bottom: 0.5rem;
}

.section-dark .section-eyebrow,
.bg-dark-slate .section-eyebrow {
  color: var(--color-accent-light);
}

p {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}
```

### 2.3 Spacing, Grid & Container Architecture
- **Max Container Width**: `1200px` (with standard padding `clamp(1rem, 4vw, 2rem)`)
- **Narrow Container**: `860px` (for single-column forms, FAQs, and about intros)
- **Standard Section Vertical Padding**: `clamp(3.5rem, 5vw, 5rem) 0`
- **Compact Section Vertical Padding (`.section-sm`)**: `clamp(2rem, 3.5vw, 3rem) 0`
- **Section Heading Bottom Margin**: `clamp(2rem, 3vw, 2.75rem)`

### 2.4 Elevation & Shadows
```css
--shadow-xs: 0 1px 2px rgba(12, 32, 18, 0.04);
--shadow-sm: 0 2px 6px rgba(12, 32, 18, 0.07);
--shadow-md: 0 6px 16px rgba(12, 32, 18, 0.09);
--shadow-lg: 0 12px 32px rgba(12, 32, 18, 0.12);
--shadow-cta: 0 4px 14px rgba(232, 152, 24, 0.38);
--shadow-cta-hover: 0 8px 24px rgba(232, 152, 24, 0.52);
```

---

## 3. Global Layout & Component Specifications

### 3.1 Sticky Global Header
- **Height**: Reduce initial height from oversized `130px` to a sleek `80px` (`70px` when scrolled).
- **Logo**: Crisp containment (`height: 56px`, max `64px`), linking to `index.html`.
- **Top Announcement Bar**: Background `#0C2012`, height `36px`, content: `Serving South Central Kansas | East Wichita & Andover • 📞 316-393-7207`.
- **Desktop Nav**: Clear active indicator, hover micro-transitions, clean dropdown menu for Services with subtle box shadow and smooth opacity transition.
- **Header CTA**: Primary call button `Call Now: 316-393-7207` in Safety Amber (`btn-primary`) with phone icon and pulse micro-animation.

### 3.2 4-Column Global Footer
- **Background**: Deep forest slate `#0C2012` with 4px top brand border in Foliage Green (`#2D723E`).
- **Column 1 (Brand & Contact)**:
  - Official logo `assets/images/logo.jpg` with class `.footer-logo-img`
  - Tagline emphasizing owner accountability with Lad Oborny
  - Direct Phone: `<a href="tel:3163937207">📞 316-393-7207</a>`
  - Direct Email: `<a href="mailto:info@lctreeks.com">✉️ info@lctreeks.com</a>`
  - Hours: `Mon–Sat: 7:00 AM – 7:00 PM` + `24/7 Emergency Storm Service`
- **Column 2 (Quick Links)**: Home, About Us, Our Services, Contact Us.
- **Column 3 (Core Services)**: Tree Removal, Tree Trimming & Canopy Pruning, Stump Grinding, Landscaping, Emergency Storm Service.
- **Column 4 (Service Areas & Trust Badges)**:
  - East Wichita & Andover emphasized
  - 3 Trust Badges with SVG icons: Fully Insured & Bonded, 5-Star Rated Service, Locally Owned & Operated.
- **Sub-Footer**: Clean 1-line copyright bar: `© 2026 LC Tree and Landscaping, LLC. All Rights Reserved.` with Privacy Policy link and smooth back-to-top button.

### 3.3 Buttons & Interactive States
- **Primary CTA (`.btn-primary` / `.btn-cta`)**: Background `#E89818`, color `#FFFFFF`, border-radius `8px` (`--radius-md`), bold 700, padding `0.8rem 1.6rem`, shadow `--shadow-cta`. Hover: `#C77F12` with `-2px` translateY.
- **Secondary CTA (`.btn-secondary`)**: Background `#1E4D2B`, color `#FFFFFF`. Hover: `#14361E`.
- **Outline Buttons (`.btn-outline`, `.btn-outline-dark`, `.btn-outline-light`)**: 2px solid border, transparent background, smooth fill transition on hover.
- **Interactive Focus**: Accessible focus ring `3px solid #E89818` with `3px` offset on `:focus-visible`.

### 3.4 Card Styling
- **Base Card (`.card`)**: Background `#FFFFFF`, border `1px solid var(--color-border)`, border-radius `14px`, padding `1.75rem`, box-shadow `--shadow-sm`. Hover: `transform: translateY(-4px)`, shadow `--shadow-md`, border-color `rgba(30, 77, 43, 0.2)`.

---

## 4. Page-by-Page UI Polish Specifications

### 4.1 Home Page (`index.html`) — Condensation & Polish Spec
**Goal**: Cut the excessive vertical length and image clutter by ~50% while preserving all critical value props, proof points, and test requirements.

1. **Hero Section**:
   - Background image with balanced dark gradient overlay (`rgba(12, 32, 18, 0.88)` to `rgba(20, 54, 30, 0.72)`).
   - Eyebrow badge: `🌿 South Central Kansas's Trusted Tree Specialists`.
   - Title: `Expert Tree Care & Landscaping in East Wichita & Andover`.
   - Subtitle: `Premium tree removal, precision trimming, stump grinding, and landscaping with direct owner accountability from Lad Oborny.`
   - Dual CTAs: `Call Now: 316-393-7207` (primary amber) + `Request an Estimate` (outline light).
   - Micro trust strip: `✓ 100% Insured • ✓ 5-Star Rated • ✓ Free 24-Hr Quotes`.

2. **Trust Bar**:
   - 4-column compact grid on subtle green background (`#F0F4F1`).
   - 4 Badges:
     1. **Fully Insured & Safe** (Commercial liability & property protection)
     2. **Locally Owned & Operated** (Founded & led by owner Lad Oborny)
     3. **5-Star Rated Service** (Top-rated choice for Andover & East Wichita)
     4. **Free On-Site Estimates** (Upfront written quotes within 24 hours)

3. **Core Services Grid (4 Services)**:
   - 4-card grid (`Tree Removal`, `Tree Trimming & Pruning`, `Stump Grinding`, `Landscaping`).
   - Cards feature clean 16:10 media header, service badge, 3 check-icon bullet points, and direct anchor link to `services.html#service-id`.

4. **The LC Difference (Consolidated Split Section)**:
   - Left Column: Eyebrow `WHY HOMEOWNERS CHOOSE LC TREE`, title `The LC Difference: Personalized Care, Direct Owner Oversight`, lead text highlighting Lad Oborny's on-site oversight, 4 benefit items (Direct Owner Access, Meticulous Yard Cleanup, Advanced Safety & Property Protection, Fair & Transparent Pricing), and CTA button.
   - Right Column: Professional framed owner portrait with quote overlay badge: `"I personally inspect every job site to ensure 100% property protection and spotless cleanup." — Lad Oborny, Owner`.

5. **Proof of Quality (Side-by-Side 2-Column)**:
   - Column 1: Interactive Before/After slider showcasing a clean hazardous oak takedown with zero property damage.
   - Column 2: Video demonstration container (16:9) showcasing controlled sectional rigging and ground protection mats.

6. **Social Proof & Testimonial Snippet**:
   - Replace the redundant 8-card gallery + 6-card review wall with a streamlined **Verified Customer Reviews Showcase**:
     - Top Summary: 5.0 Star visual rating badge with Andover & East Wichita verified homeowner callout.
     - 3 Featured Reviews:
       1. David K. (Andover, KS) — Hazardous tree removal near pool & fence.
       2. Jennifer & Mark R. (East Wichita, KS) — Canopy thinning & roof clearance.
       3. Robert T. (Andover, KS) — Emergency storm damage response.
     - Action link: `Request a Free Estimate Online →`.

7. **Pre-Footer High-Contrast CTA Banner**:
   - Rich forest green gradient banner with dual actions: `Call Lad Now: 316-393-7207` + `Request an Estimate Online`.

8. **Script Clean-up**:
   - Remove `<script>` debug tag injecting red `A1, A2...` labels on media elements.

---

### 4.2 About Page (`about.html`) UI Polish Spec
1. **Page Header Banner**:
   - Rich dark slate gradient background (`.bg-dark-slate`), gold eyebrow `ROOTED IN EXCELLENCE`, title `About LC Tree and Landscaping, LLC`, subtitle highlighting local Kansas roots in Andover and East Wichita.
2. **Meet the Owner Section (`#meet-the-owner`)**:
   - Grid layout:
     - Left: Lad Oborny owner portrait photo in styled card with badge overlay (`Lad Oborny, Founder & Lead Operator`) and 3-stat highlight block (100% Insured, 5.0★ Rating, 24h Turnaround).
     - Right: Detailed biography detailing Lad Oborny's local experience with Kansas weather extremes (ice storms, wind shears, summer droughts), commitment to arborist standards, and custom quote block.
3. **Core Values 3-Column Grid**:
   - 3 Cards: Safety First, Unrivaled Cleanup Standards, Direct Communication & Fair Quotes.
4. **Community Roots Banner**:
   - Dark card with service area chips: `East Wichita`, `Andover`, `Augusta`, `Derby`, `Rose Hill`, `Bel Aire`, `Kechi`.
5. **Pre-Footer CTA & 4-Column Footer**.

---

### 4.3 Services Page (`services.html`) UI Polish Spec
1. **Page Header Banner & Quick Jump Navigation**:
   - Title and subtitle with 4 quick jump pill buttons (`Tree Removal`, `Tree Trimming`, `Stump Grinding`, `Landscaping`).
2. **4 Dedicated Service Detail Sections**:
   - Alternating 2-column layout (Content Left / Media Right, then Media Left / Content Right).
   - Each service block contains:
     - Category badge (`CRITICAL SAFETY FOCUS`, `HEALTH & BEAUTY`, `LAWN RESTORATION`, `PROPERTY ENHANCEMENT`)
     - Clear `h2` heading and arborist lead description
     - Styled `.service-specs-box` card containing feature items with checkmark SVG icons
     - Dual CTA buttons (`Request an Estimate` + `Call 316-393-7207`)
     - High-quality SVG/media card with trust pill badge overlay (`100% Fully Insured`, `ANSI A300 Pruning Standards`, `100% Root Clearance`, `Enhanced Curb Appeal`).
3. **FAQ Accordion Section**:
   - Fully styled accordion covering all 7 homeowner objection questions (insurance coverage, cleanup guarantees, 24-hr turnaround speed, presence during work, tight gate access, service areas, and 24/7 storm damage).
   - Owner direct contact card (`Still Have Questions? Call Lad Oborny Directly at 316-393-7207`).
4. **Pre-Footer CTA & 4-Column Footer**.

---

### 4.4 Contact Page (`contact.html`) UI Polish Spec
1. **Page Header Banner**:
   - Clean intro banner setting customer expectation (Direct owner response within 24 hours).
2. **2-Column Contact & Lead Capture Layout**:
   - **Left Column (Direct Channels & Map)**:
     - Direct Phone Card (316-393-7207 with tap-to-call link)
     - Email Card (info@lctreeks.com)
     - Business Hours Card (Mon–Sat 7am–7pm + 24/7 Emergency Storm Service)
     - Primary Service Area Map Card with custom SVG map graphic illustrating East Wichita, Andover, Augusta, Derby, Bel Aire, and Rose Hill.
   - **Right Column (Lead Capture Form)**:
     - Professional `.form-card` with shadow
     - Styled `.form-group`, labels, and inputs (`.form-control` / `.form-input`)
     - 5 Form fields: Name, Phone (with `(316) 555-0123` auto-masking), Email, Service Requested select dropdown, Project Details / Message textarea
     - Primary Amber submit CTA button: `Send Message`
     - Form trust badges: 100% Privacy, Fast 24-Hr Response, Fully Insured & Licensed.
3. **Pre-Footer CTA & 4-Column Footer**.

---

## 5. Comprehensive CSS Architecture Additions & Fixes

Below are the exact CSS additions and corrections required in `css/styles.css` and `css/components.css` to fix all unstyled classes and resolve visual inconsistencies.

### 5.1 New Design System Utility Classes (to add to `css/styles.css`)
```css
/* Background Color Utilities */
.bg-dark-slate {
  background: linear-gradient(135deg, #0C2012 0%, #14361E 60%, #1B4332 100%) !important;
  color: #FFFFFF !important;
}

.bg-dark-slate h1, .bg-dark-slate h2, .bg-dark-slate h3, .bg-dark-slate h4 {
  color: #FFFFFF !important;
}

.bg-dark-slate p, .bg-dark-slate .page-subtitle {
  color: rgba(255, 255, 255, 0.9) !important;
}

.bg-green-subtle {
  background-color: var(--color-primary-subtle) !important;
}

.bg-amber-subtle {
  background-color: rgba(232, 152, 24, 0.12) !important;
}

.bg-slate-subtle {
  background-color: #E2E8E4 !important;
}

.text-amber {
  color: var(--color-accent) !important;
}

.text-green {
  color: var(--color-primary-light) !important;
}

.max-w-750 { max-width: 750px; margin-left: auto; margin-right: auto; }
.max-w-800 { max-width: 800px; margin-left: auto; margin-right: auto; }
.max-w-850 { max-width: 850px; margin-left: auto; margin-right: auto; }
.max-w-900 { max-width: 900px; margin-left: auto; margin-right: auto; }
```

### 5.2 Component Styles (to add to `css/components.css`)
```css
/* --- Form Styling Harmonization --- */
.form-control,
.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.85rem 1.1rem;
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-text-main);
  background-color: #FFFFFF;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-control:focus,
.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(30, 77, 43, 0.15);
}

.required-star {
  color: var(--color-error);
  font-weight: 700;
}

.form-trust-signals {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
}

.trust-signal-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

/* --- Contact Page Layout & Cards --- */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: flex-start;
}

@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.contact-cards-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-channel-card {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem;
}

.channel-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.channel-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  margin-bottom: 0.25rem;
}

.channel-value {
  font-size: 1.15rem;
  margin-bottom: 0.35rem;
}

.channel-value a {
  color: var(--color-primary);
  font-weight: 700;
  transition: color var(--transition-fast);
}

.channel-value a:hover {
  color: var(--color-accent);
}

.channel-note {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin: 0;
}

.hours-schedule p {
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}

.hours-schedule p:last-child {
  margin-bottom: 0;
  color: var(--color-accent-dark);
  font-weight: 600;
}

.service-map-card {
  padding: 1.75rem;
}

.service-area-map-wrap {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  margin-top: 1rem;
}

/* --- Services Detail Blocks & Specs Box --- */
.service-detail-block {
  padding: clamp(3.5rem, 5vw, 5rem) 0;
}

.service-detail-content {
  display: flex;
  flex-direction: column;
}

.service-badge-tag {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  margin-bottom: 1rem;
  width: fit-content;
}

.service-lead {
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.65;
  color: var(--color-text-main);
  margin-bottom: 1rem;
}

.service-specs-box {
  padding: 1.75rem;
  border-left: 4px solid var(--color-primary);
  border-radius: var(--radius-md);
  margin: 1.5rem 0;
}

.specs-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-primary-dark);
  margin-bottom: 1rem;
}

.service-bullets-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.service-bullets-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.service-bullets-list li strong {
  display: block;
  font-size: 0.95rem;
  color: var(--color-primary-dark);
}

.service-bullets-list li span {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.service-media-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.service-feature-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.service-trust-callout {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
}

.trust-pill {
  background: rgba(12, 32, 18, 0.92);
  color: #FFFFFF;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-primary-lighter);
  text-align: center;
  backdrop-filter: blur(4px);
}

.services-quick-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* --- Accessible FAQ Accordion Styling --- */
.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: #FFFFFF;
  overflow: hidden;
  transition: all var(--transition-fast);
}

.faq-item.is-open {
  border-color: var(--color-primary-light);
  box-shadow: var(--shadow-sm);
}

.faq-header {
  margin: 0;
}

.faq-question-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: none;
  border: none;
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  text-align: left;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.faq-question-btn:hover {
  background-color: var(--color-bg-warm);
}

.faq-item.is-open .faq-question-btn {
  background-color: var(--color-bg-subtle);
  color: var(--color-primary);
}

.faq-icon-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  transition: transform var(--transition-normal);
}

.faq-item.is-open .faq-icon-indicator {
  transform: rotate(45deg);
}

.faq-answer {
  overflow: hidden;
  transition: max-height 0.25s ease-out;
}

.faq-answer-inner {
  padding: 0 1.5rem 1.5rem;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.faq-answer-inner p {
  margin-bottom: 0.75rem;
}

.faq-answer-inner p:last-child {
  margin-bottom: 0;
}

/* Owner Direct Help Card */
.owner-help-card {
  padding: 2.25rem;
  background-color: #FFFFFF;
  border-radius: var(--radius-lg);
  border-top: 4px solid var(--color-accent);
}

.owner-help-avatar-wrap {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid var(--color-primary);
}

.owner-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.owner-help-title {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.owner-help-desc {
  max-width: 580px;
  margin: 0 auto 1.5rem;
  font-size: 1rem;
}

.owner-help-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

/* --- Verified Reviews Section --- */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
}

@media (max-width: 992px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}

.review-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.review-stars {
  font-size: 1.15rem;
  letter-spacing: 2px;
}

.review-service-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
}

.review-quote p {
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.reviewer-meta {
  display: flex;
  flex-direction: column;
}

.reviewer-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-primary-dark);
}

.reviewer-location {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.verified-badge {
  color: var(--color-primary-light);
  font-weight: 600;
  margin-left: 0.25rem;
}
```

---

## 6. Implementation Checklist & Verification Matrix

| Area | Issue Identified | Exact Specification Fix | Verification Criteria |
| :--- | :--- | :--- | :--- |
| **Global Header** | Header height `130px` is disproportionately large | Set height to `80px` (`70px` on scroll), scale logo cleanly | Visual inspect; verify sticky behavior on scroll |
| **Header CTA** | CTA button on `contact.html` failed test | Ensure text matches `Call Now: 316-393-7207` on all pages | Test `node tests/verify_website.js` Tier 2.1 passes |
| **Footer Owner Name** | Lad Oborny was replaced with generic placeholder | Restore `Lad Oborny, Founder & Owner` in Footer Col 1 on all pages | Test `node tests/verify_website.js` Tier 2.2 passes |
| **Home Trust Bar** | Missing Lad Oborny name in trust bar | Add owner badge: "Locally Owned & Operated by Lad Oborny" | Test `node tests/verify_website.js` Tier 2.3 passes |
| **About Bio** | Missing owner bio header / text for Lad Oborny | Restore "Meet the Owner: Lad Oborny" biography and credentials | Test `node tests/verify_website.js` Tier 2.4 passes |
| **Missing CSS Classes** | `.bg-dark-slate`, `.form-control`, `.contact-grid`, `.service-detail-block`, `.faq-question-btn` unstyled | Add comprehensive CSS rules in `styles.css` & `components.css` | All sections render with proper layout, paddings, backgrounds, and focus states |
| **Debug Script Artifact** | Injected red label overlay scripts (`inject-labels.js`) | Remove `<script>` blocks injecting `A1, A2, B1, C1, H1...` | Inspect HTML; zero red debug badges rendered |
| **Homepage Condensation** | Homepage is 1046 lines, repetitive gallery & reviews | Condense into 6 concise, high-impact sections (~500 lines) | Inspect DOM; page loads faster, requires significantly less scrolling |
| **Syntax Error in CSS** | `css/scroll-top.css` has invalid `//` comment on line 1 | Fix comment to valid CSS `/* ... */` | Valid CSS linting |

---

## 7. Conclusion & Next Steps
This specification provides a complete blueprint to transform the LC Tree and Landscaping website into a modern, polished web presence. All changes honor the brand aesthetic, fix architectural and CSS disconnects, streamline the homepage for optimal conversion, and ensure 100% automated test compliance.
