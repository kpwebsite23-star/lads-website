# Project: LC Tree and Landscaping Website Refinement

## Architecture & Design Vision
LC Tree and Landscaping, LLC is a premier South Central Kansas tree care and landscaping contractor serving East Wichita, Andover, and surrounding communities. The site is a responsive 4-core-page website (`index.html`, `about.html`, `services.html`, `contact.html`) powered by modern vanilla HTML5, semantic CSS3 (`styles.css`, `components.css`, `responsive.css`, `scroll-top.css`), and lightweight interactive vanilla JS (`js/main.js`).

The project refinement focuses on:
1. **Homepage Condensation**: Streamlining `index.html` from 1,046 lines to ~500 lines by eliminating duplicate galleries, consolidating social proof, removing leftover debug scripts, and drastically cutting vertical scroll depth while preserving all arborist conversion drivers and test requirements.
2. **Site-wide UI Polish**: Implementing a modern, cohesive design system across all 4 pages (forest green palette, safety amber accents, refined typography, structured spacing/breathing room, elevated card styling, interactive FAQ accordions, polished forms, responsive layout).
3. **100% Automated Test Compliance**: Resolving all pre-existing failures on `node tests/verify_website.js` (181 assertions across 4 tiers).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Homepage Condensation | Condense `index.html` from 1,046 to ~500 lines, merge Proof of Quality + Gallery into curated showcase, consolidate Reviews into 3-card verified testimonial snippet, add Pre-Footer CTA banner | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Debug Code & Script Removal | Remove injected `<!-- LABELS SCRIPT -->` red badge tags across all HTML pages, fix `css/scroll-top.css` syntax | M1 | Survey (Explorer 1 & 2) |
| 3 | Design System & CSS Foundation | Add missing CSS classes (`.bg-dark-slate`, `.form-control`, `.contact-grid`, `.service-detail-block`, `.faq-accordion`, etc.) in `styles.css` and `components.css` | M1 | ORIGINAL_REQUEST §R2 |
| 4 | Brand & Owner Consistency | Restore `Lad Oborny` owner name across all 4 page footers, `index.html` Trust Bar, and `about.html` leadership bio | M1 | Survey (Explorer 1, 2, 3) |
| 5 | Contact Page & Form Polish | Fix `contact.html` header CTA button, style 2-column contact channels and lead capture form with focus rings and trust signals | M1 | ORIGINAL_REQUEST §R2 & Test Suite |
| 6 | Services & About Pages Polish | Refine alternating service detail blocks, specs boxes, FAQ accordion interactivity, and owner bio layout on `about.html` and `services.html` | M1 | ORIGINAL_REQUEST §R2 |
| 7 | Automated Verification Pass | Achieve 181/181 (100%) test pass rate on `node tests/verify_website.js` with exit code 0 | M1 | ORIGINAL_REQUEST §Verification |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Refinement & Verification | Comprehensive index.html condensation, site-wide UI polish across all pages, CSS enhancements, and 100% test pass on verify_website.js | none | DONE |

## Code Layout & File Ownership
- `index.html`: Homepage structure, hero, trust bar, core services, LC difference, proof of quality, customer reviews, pre-footer CTA, sticky header, footer.
- `about.html`: About page, company background, Lad Oborny biography, core values, service area list.
- `services.html`: Services breakdown, service specs boxes, FAQ accordion, emergency contact info.
- `contact.html`: Contact page, contact channel cards, lead generation form, service area map.
- `css/styles.css`: Global design tokens, typography scale, utility classes (`.bg-dark-slate`, spacing helpers).
- `css/components.css`: Component classes (forms, contact grid, service blocks, FAQ accordion, reviews, cards).
- `css/responsive.css`: Media queries for mobile/tablet responsive breakpoints.
- `css/scroll-top.css`: Back to top floating button styling.
- `js/main.js`: Mobile nav toggle, sticky header scroll behavior, FAQ accordion toggle, before/after comparison slider.

## Interface Contracts & Test Guardrails
- Header: Must include `site-header` / `sticky-header`, logo `assets/images/logo.jpg` with class `logo-img`, phone `Call Now: 316-393-7207` (`tel:3163937207`), top bar with `Serving` and `East Wichita` / `Andover`.
- Footer: 4 columns with class `footer-grid` / `footer-columns`, Col 1 contains `Lad Oborny`, `316-393-7207`, `mailto:info@lctreeks.com`, hours, logo with `footer-logo-img`, Col 2 `Quick Links`, Col 3 `Tree Removal`, `Tree Trimming`/`Pruning`, `Stump Grinding`, `Landscaping`, Col 4 `East Wichita`, `Andover`, `Fully Insured`, `5-Star`, `Locally Owned`.
- All `<img>` tags must have non-empty `alt` attributes.
- All internal file references (`src`, `href`) must exist on disk.
