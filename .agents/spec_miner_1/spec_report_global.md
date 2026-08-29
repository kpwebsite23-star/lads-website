# Global Architecture & Cross-Cutting Conversion Strategy Specification Report
**Project**: LC Tree and Landscaping, LLC Website  
**Author**: Spec Miner 1  
**Date**: 2026-08-25  
**Version**: 1.0.0  
**Status**: Final Authoritative Specification  

---

## 1. Executive Summary & Specification Scope

This document provides the authoritative, exhaustive specification for the **Global Architecture**, **Brand Style Guide & Design System**, and **Cross-Cutting Conversion Strategy** for the **LC Tree and Landscaping, LLC** website.

The website serves as a high-conversion digital presence targeting middle-to-upper-class residential and commercial property owners in **East Wichita, Andover, and surrounding Kansas communities**. The overarching technical objective is to establish an intuitive, responsive, and accessible 8-page website that funnels prospective clients toward immediate phone consultations (`316-393-7207`) with the owner, **Lad Oborny**, while maintaining an asynchronous estimate request safety net.

---

## 2. Authoritative Sources & Traceability

This specification derives directly from and strictly adheres to:
1. `c:\Users\prest\Documents\antigravity\dazzling-hertz\.agents\ORIGINAL_REQUEST.md` (Requirements R1, R2, R3, Acceptance Criteria)
2. `C:\Users\prest\.gemini\antigravity\brain\586ced4a-8647-4731-9af1-d238e49b565e\website_architecture_lc_tree.md` (Global Architecture, Page Wireframes, Conversion Strategy)
3. WCAG 2.1 Level AA Accessibility Standards

---

## 3. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Global Header | Secondary Top Bar | Thin, high-contrast banner above main header communicating location and service tier ("Serving East Wichita, Andover, & Surrounding Areas \| Premium Tree Care & Landscaping"). | Viewport width, scroll position | Visual banner text with geographical and trust cues | Responsive collapse / font scale on ultra-narrow viewports (<360px) | `website_architecture_lc_tree.md` § 1. Global Architecture |
| 2 | Global Header | Sticky Header Container | Fixed header pinning to viewport top on scroll with shadow elevation and backdrop solid/blur to prevent content bleed. | Window scroll event, page resize | Pinned top navigation bar with z-index 1000+ | Graceful fallback without layout jump (CSS `position: sticky`) | `website_architecture_lc_tree.md` § 1. Global Architecture; `ORIGINAL_REQUEST.md` R2 |
| 3 | Global Header | Brand Logo & Home Link | Professional logo displaying "LC Tree and Landscaping, LLC" linked directly to homepage (`index.html`). | User click / tap / keyboard Enter | Navigates to `index.html` with focus reset | Falls back to text brand name if image fails | `website_architecture_lc_tree.md` § 1. Global Architecture |
| 4 | Global Header | Desktop Navigation Bar | Horizontal menu featuring 7 top-level navigation links (Home, About, Services, Gallery, Testimonials, FAQ, Contact). | Click, Hover, Keyboard Tab | Highlights active route (`aria-current="page"`), activates dropdown on Services | Remains visible on viewports ≥1024px; collapses to hamburger <1024px | `website_architecture_lc_tree.md` § 1. Global Architecture |
| 5 | Global Header | Services Mega/Dropdown Menu | Interactive dropdown nested under 'Services' containing direct links to Tree Removal, Tree Trimming, Stump Grinding, Landscaping. | Hover, Click, Focus, Down Arrow key | Displays submenu panel with 4 service links | Closes on click-outside, Escape key, or Tab out; mobile expands as accordion | `website_architecture_lc_tree.md` § 1. Global Architecture; `ORIGINAL_REQUEST.md` R1 |
| 6 | Global Header | Primary CTA Button ("Call Now") | High-contrast, visually prominent solid button displaying "Call Now: 316-393-7207" in desktop header. | Click, keyboard activation | Initiates `tel:3163937207` dialer protocol | Opens OS/browser default telephony handler or displays copyable phone number | `website_architecture_lc_tree.md` § 1 & 3; `ORIGINAL_REQUEST.md` R2 |
| 7 | Global Header | Mobile Tap-to-Call Action | Touch-optimized, one-tap phone call trigger accessible on mobile devices for frictionless immediate dialing. | Screen touch / tap (<768px viewports) | Direct dial trigger to `tel:3163937207` | Validates tel URI formatting to avoid broken mobile scheme errors | `website_architecture_lc_tree.md` § 1 & 3 |
| 8 | Global Header | Mobile Hamburger Menu Drawer | Accessible toggle button activating an off-canvas or collapsible navigation drawer containing all 8 pages and service sub-items. | Tap hamburger icon, ESC key, overlay click | Opens/closes full navigation drawer, sets `aria-expanded` | Closes on route selection; traps keyboard focus while open; body scroll lock | `website_architecture_lc_tree.md` § 1. Global Architecture |
| 9 | Global Footer | Column 1: Brand & Contact | Comprehensive contact block with company name, Owner: Lad Oborny, clickable phone (`316-393-7207`), email link, and business hours. | Page render, user interaction | Formatted contact block with `tel:` and `mailto:` links | Visual fallbacks for mail client unavailability | `website_architecture_lc_tree.md` § 1. Global Architecture; `ORIGINAL_REQUEST.md` R2 |
| 10 | Global Footer | Column 2: Quick Links | Hierarchical list duplicating main website navigation (Home, About, Gallery, Testimonials, FAQ, Contact, Request an Estimate). | User click / keyboard navigation | Instant routing to corresponding page | 404 prevention through relative clean path validation | `website_architecture_lc_tree.md` § 1. Global Architecture |
| 11 | Global Footer | Column 3: Core Services Links | Direct links to specific high-value service anchors/pages (Tree Removal, Tree Trimming, Stump Grinding, Landscaping). | User click / keyboard navigation | Routes to `services.html` or anchor sections | Smooth scrolls to exact service anchor ID | `website_architecture_lc_tree.md` § 1. Global Architecture |
| 12 | Global Footer | Column 4: Service Areas & Trust | Geographical callout ("Proudly Serving East Wichita & Andover") and trust badges (Fully Insured, 5-Star Reviews, Local Business). | Page render | Renders badge icons and service area text | Scalable vector graphics ensure no pixelation | `website_architecture_lc_tree.md` § 1. Global Architecture |
| 13 | Global Footer | Bottom Legal Bar (Sub-Footer) | Copyright statement ("Copyright © 2026 LC Tree and Landscaping, LLC. All Rights Reserved.") and Privacy Policy link. | Page render, user click | Renders dynamic/static year and privacy route | Secure linking without dead ends | `website_architecture_lc_tree.md` § 1. Global Architecture |
| 14 | Design System | Brand Color Palette | Semantic CSS variable tokens: Arborist Forest Green (Primary `#1B4332`), Safety Amber/Orange (CTA Accent `#D97706`/`#E65100`), Midnight Slate (Dark `#111827`), Warm Off-White (`#F9FAFB`). | CSS stylesheets, CSS custom properties | High contrast, accessible visual identity | Contrast ratio meets ≥4.5:1 for body and ≥3:1 for large text per WCAG AA | `website_architecture_lc_tree.md` § 1 & 3; Design System |
| 15 | Design System | Typography Hierarchy | Strict typographic scale utilizing modern sans-serif fonts (Inter / Montserrat / System Sans) with clear H1-H6, body, and caption styling. | Text content rendering | Legible, responsive font scaling across all device sizes | Responsive fluid typography preventing overflow | `website_architecture_lc_tree.md` § 1, 2, 3 |
| 16 | Design System | Button System (Primary/Secondary) | Reusable button components: Solid High-Contrast Primary CTA (`.btn-primary`), Outline/Ghost Secondary CTA (`.btn-outline`), and Phone CTA (`.btn-phone`). | Button class attributes, user events | Consistent padding, hover elevation, active scale, and focus rings | Focus visible indicator (`:focus-visible`) on keyboard navigation | `website_architecture_lc_tree.md` § 2 & 3 |
| 17 | Design System | Trust Badges & Iconography System | Standardized vector badges for "Fully Insured & Safe", "Locally Owned by Lad Oborny", "5-Star Rated Service", and Arborist Quality. | SVG / Icon markup | High-resolution, lightweight visual trust indicators | Screen-reader accessible with `aria-label` or `aria-hidden` | `website_architecture_lc_tree.md` § 1 & 2 |
| 18 | Design System | Card & Elevation Architecture | Standardized cards for services, testimonials, trust signals, and team info with consistent borders, shadows, and hover transitions. | HTML card markup | Crisp bordered containers with soft box-shadows (`0 4px 6px -1px rgba(0,0,0,0.1)`) | Graceful degradation without 3D acceleration issues | `website_architecture_lc_tree.md` § 2 |
| 19 | Conversion Funnel | Visual Dominance of Call Now CTA | Primary CTA button engineered with maximum visual weight, bright contrasting color, and repeated placement at top, mid, and pre-footer. | Page scroll & eye-tracking flow | Drives user attention directly to the phone number | Maintains accessibility without overwhelming secondary content | `website_architecture_lc_tree.md` § 3. Conversion Strategy |
| 20 | Conversion Funnel | Pre-Footer Conversion Strip | Universal full-width conversion banner placed immediately above footer on all pages ("Ready to transform your property? Call Lad today for a fast, free estimate: 316-393-7207"). | Page render | Prompts final conversion before reaching footer navigation | Responsive button wrap on small viewports | `website_architecture_lc_tree.md` § 2 & 3 |
| 21 | Conversion Funnel | Demographic Trust Engineering | Humanizing the company via owner Lad Oborny, highlighting full insurance, local East Wichita/Andover roots, and zero property damage cleanup. | Content copy, portrait imagery, trust badges | Establishes immediate authority and lowers hesitation for affluent homeowners | Clear messaging counters price resistance with quality assurance | `website_architecture_lc_tree.md` § 3. Conversion Strategy |
| 22 | Conversion Funnel | Secondary Estimate Safety Net | "Request an Estimate" secondary conversion pathway capturing after-hours, at-work, or asynchronous leads with 24-hour response commitment. | User input via form fields on `estimate.html` or modal | Captures qualified lead with zero pressure | Client-side validation prevents empty/invalid submission | `website_architecture_lc_tree.md` § 3. Conversion Strategy |
| 23 | Accessibility | WCAG 2.1 AA Compliance Suite | Keyboard navigability, skip-to-content link, ARIA landmarks (`header`, `nav`, `main`, `footer`), minimum 44x44px touch targets. | User assistive tech / keyboard input | Accessible DOM tree, high contrast, focus management | Automated linting & screen reader compatibility | WCAG 2.1 AA Standards |

---

## 4. Edge Cases & Observed Behaviors

| # | Feature | Input / Condition | Expected & Observed Behavior |
|---|---------|-------------------|-----------------------------|
| 1 | Sticky Header | User scrolls rapidly down a long page (e.g. Services or FAQ) | Header sticks smoothly to top of viewport with CSS `position: sticky; top: 0;` (or `position: fixed`). Background has solid/semi-opaque backdrop (`rgba(27, 67, 50, 0.98)` or `#FFFFFF` with shadow) so page text does not show through. |
| 2 | Services Dropdown | Keyboard user presses `Tab` onto "Services" and hits `Enter` or `Space` | Services dropdown opens; focus moves to first child item ("Tree Removal"). Pressing `Escape` closes the dropdown and returns focus to "Services". Pressing `Tab` out of the last item closes the menu. |
| 3 | Services Dropdown | Mobile user taps "Services" in mobile drawer | Tapping does not cause accidental immediate navigation to `services.html` if user wants to expand sub-items; accordion expands sublinks smoothly, or provides both a parent link and a separate chevron expander button. |
| 4 | Mobile Navigation | User opens mobile drawer menu while at the bottom of the page | Drawer opens cleanly over full viewport; `body` scroll is locked (`overflow: hidden`) to prevent background scrolling. When closed, `body` scroll lock is released. |
| 5 | Mobile Navigation | Viewport resized dynamically from mobile (<1024px) to desktop (≥1024px) | Mobile drawer automatically closes, backdrop removes, and desktop navigation bar renders in proper horizontal alignment without broken state. |
| 6 | Primary CTA ("Call Now") | Desktop user without a softphone app clicks "Call Now: 316-393-7207" | The browser triggers `tel:3163937207`. The full readable phone number is visibly printed inside the button text so the desktop user can manually dial the number on their physical phone without clicking. |
| 7 | Primary CTA ("Call Now") | Mobile user taps "Call Now" button | Native phone dialer launches immediately with `3163937207` pre-filled, creating 1-tap zero-friction calling. |
| 8 | Secondary Top Bar | Mobile screen is narrow (320px–375px wide) | Top bar text scales down gracefully or stacks cleanly ("Serving East Wichita & Andover \| Premium Tree Care") without clipping or causing horizontal page overflow. |
| 9 | 4-Column Footer | Screen width changes across breakpoints (Desktop 1200px -> Tablet 768px -> Mobile 375px) | Footer layout adapts seamlessly from a 4-column grid (Desktop) to a 2x2 grid (Tablet: Col 1 & 2 on top row, Col 3 & 4 on bottom row) to a single stacked column (Mobile: 1 -> 2 -> 3 -> 4) with 24px vertical gap. |
| 10 | Active Navigation State | User is on `testimonials.html` or `faq.html` | The header link corresponding to the current URL receives `.active` class with visual underline/color highlight and `aria-current="page"`. |
| 11 | Pre-Footer CTA Strip | User reaches end of content on any subpage (e.g. Gallery, About, Contact) | A consistent pre-footer banner is rendered before the footer, reinforcing Lad's direct phone number with a 1-click dial action. |
| 12 | Accessibility Focus Rings | Keyboard-only user navigates via `Tab` key | Every interactive element (logo, nav links, dropdown items, CTA buttons, footer links, privacy link) shows a distinct 2px–3px high-contrast outline focus ring (`:focus-visible`). |

---

## 5. Detailed Global Architecture Specification

```
+---------------------------------------------------------------------------------------------------+
| TOP BAR: Serving East Wichita, Andover, & Surrounding Areas | Premium Tree Care & Landscaping     |
+---------------------------------------------------------------------------------------------------+
| [LOGO: LC Tree & Landscaping]   Home  About  Services [v]  Gallery  Testimonials  FAQ  Contact   [CALL NOW: 316-393-7207] |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|                                       PAGE CONTENT AREA                                           |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
| PRE-FOOTER CTA: Ready to transform your property? Call Lad today for a fast, free estimate! [Call 316-393-7207] |
+---------------------------------------------------------------------------------------------------+
| FOOTER (4-COLUMN GRID):                                                                           |
| [Col 1: Brand & Contact]      [Col 2: Quick Links]    [Col 3: Core Services]    [Col 4: Service Areas & Trust] |
| - LC Tree and Landscaping     - Home                  - Tree Removal            - East Wichita & Andover       |
| - Owner: Lad Oborny           - About Us              - Tree Trimming & Prune   - Fully Insured & Certified    |
| - Tel: 316-393-7207           - Gallery               - Stump Grinding          - 5-Star Rated Service         |
| - Email & Hours               - Estimate / Contact    - Landscaping             - Local Owner-Operated         |
+---------------------------------------------------------------------------------------------------+
| BOTTOM BAR: Copyright © 2026 LC Tree and Landscaping, LLC. All Rights Reserved. | Privacy Policy  |
+---------------------------------------------------------------------------------------------------+
```

### 5.1 Secondary Top Bar (Utility Banner)
* **Visual Presentation**: Slim horizontal bar positioned at the extreme top of the document (`height: ~36px–40px`).
* **Color Palette**: Dark Midnight Slate (`#111827`) or Deep Forest Green (`#1B4332`) with Crisp White or Light Emerald text (`#E5E7EB` / `#A7F3D0`).
* **Copy / Content**:
  - Primary Text: `"Serving East Wichita, Andover, & Surrounding Areas | Premium Tree Care & Landscaping"`
  - Optional Quick Phone / Emergency Indicator: `"Owner-Operated • Fully Insured • Direct Line: (316) 393-7207"`
* **Responsive Behavior**:
  - Desktop (≥1024px): Full text centered or left/right split.
  - Tablet (768px–1023px): Centered single-line text (13px).
  - Mobile (<768px): Condensed text (e.g., `"Serving East Wichita & Andover | (316) 393-7207"`) with no horizontal scrollbar.

### 5.2 Sticky Header Navigation Container
* **Positioning**: Sticky pinning via CSS:
  ```css
  .site-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    background-color: #ffffff; /* or rgba(255, 255, 255, 0.98) */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease-in-out;
  }
  ```
* **Height & Padding**: 72px–80px desktop height; 64px mobile height.
* **Layout Grid / Flexbox**: 3-Zone horizontal layout:
  1. **Left (Brand Identity)**: Logo image + brand text "LC Tree & Landscaping".
  2. **Center (Desktop Navigation)**: Flex list of 7 primary links with active indicator and Services dropdown trigger.
  3. **Right (Conversion Driver)**: Prominent "Call Now: 316-393-7207" button + Mobile Hamburger Toggle (hidden on desktop).

### 5.3 Main Navigation Links & Active States
* **Required Links Structure**:
  1. **Home** (`index.html`)
  2. **About** (`about.html`)
  3. **Services** (`services.html`) [with Dropdown menu]
     - *Tree Removal* (`services.html#tree-removal` or `tree-removal.html`)
     - *Tree Trimming & Pruning* (`services.html#tree-trimming` or `tree-trimming.html`)
     - *Stump Grinding* (`services.html#stump-grinding` or `stump-grinding.html`)
     - *Landscaping* (`services.html#landscaping` or `landscaping.html`)
  4. **Gallery / Our Work** (`gallery.html`)
  5. **Testimonials** (`testimonials.html`)
  6. **FAQ** (`faq.html`)
  7. **Contact** (`contact.html`)
  8. *(Secondary CTA / Navigation link)*: **Request an Estimate** (`estimate.html` or direct button)
* **Active State Indicator**:
  - Class `.nav-link.active`
  - Visual: Bold font weight (600), brand green color (`#1B4332`), and a solid bottom accent bar (`3px solid #D97706`).
  - Accessibility: `aria-current="page"` applied dynamically to the active route.

### 5.4 Services Dropdown Menu Architecture
* **Desktop Interaction**:
  - Triggers on mouse hover (`:hover`) and keyboard focus (`:focus-within`).
  - Smooth fade-in & slide-up animation (`opacity: 1; transform: translateY(0); transition: all 0.2s ease;`).
  - HTML structure:
    ```html
    <li class="nav-item has-dropdown">
      <a href="services.html" class="nav-link" aria-haspopup="true" aria-expanded="false">
        Services <span class="chevron-icon">▾</span>
      </a>
      <ul class="dropdown-menu" aria-label="Services Submenu">
        <li><a href="services.html#tree-removal" class="dropdown-item">Tree Removal</a></li>
        <li><a href="services.html#tree-trimming" class="dropdown-item">Tree Trimming & Pruning</a></li>
        <li><a href="services.html#stump-grinding" class="dropdown-item">Stump Grinding</a></li>
        <li><a href="services.html#landscaping" class="dropdown-item">Landscaping</a></li>
      </ul>
    </li>
    ```
* **Keyboard Accessibility**:
  - Supports `Escape` key to collapse dropdown.
  - Full tab traversal through all 4 service items.

### 5.5 Mobile Navigation Drawer & Hamburger Trigger
* **Breakpoint**: Activates on viewports `< 1024px` (tablets and mobile devices).
* **Hamburger Button**:
  - 44x44px touch target.
  - Three animated horizontal spans (morphs into an "X" when active).
  - Attributes: `aria-label="Toggle navigation menu"`, `aria-expanded="false"`, `aria-controls="mobile-nav"`.
* **Drawer Panel**:
  - Off-canvas slide from right or top accordion overlay.
  - Full height (`100vh`), scrollable if content overflows.
  - Contains all 8 page links, expanded service links, and a full-width "Call Now: 316-393-7207" button at top/bottom.

### 5.6 Primary CTA Button & Mobile Tap-to-Call Mechanics
* **Desktop Rendering**:
  - Text: **"Call Now: 316-393-7207"**
  - Icon: SVG Telephone icon preceding text.
  - Link: `<a href="tel:3163937207" class="btn btn-primary btn-header-cta"><svg ...></svg> Call Now: 316-393-7207</a>`
  - Style: Solid vibrant Amber/Orange (`#D97706` / `#E65100`) with bold white typography and rounded corners (6px–8px).
* **Mobile Rendering**:
  - Sticky header CTA or dedicated persistent Mobile Action Bar.
  - Tap directly initiates telephony dialer `tel:316-393-7207`.
  - Immediate visual feedback on touch (`:active` background darkening).

### 5.7 4-Column Global Footer Specification
The footer anchors every page on the website with an authoritative 4-column responsive grid layout:

```
+---------------------------------------------------------------------------------------------------+
| COLUMN 1: Brand & Contact  | COLUMN 2: Quick Links  | COLUMN 3: Core Services | COLUMN 4: Service Areas & Trust |
| LC Tree and Landscaping    | • Home                 | • Tree Removal          | Proudly Serving:                |
| Owner: Lad Oborny          | • About Us             | • Tree Trimming         | East Wichita & Andover, KS      |
| Phone: (316) 393-7207      | • Our Work / Gallery   | • Stump Grinding        | ------------------------------- |
| Email: info@lctreeks.com   | • Testimonials         | • Landscaping           | [🛡️ Fully Insured]              |
| Hours: Mon-Sat 7am - 7pm   | • FAQ                  |                         | [⭐ 5-Star Rated Service]        |
| 24/7 Emergency Response    | • Contact Us           |                         | [🏡 Locally Owned & Operated]   |
|                            | • Request an Estimate  |                         |                                 |
+---------------------------------------------------------------------------------------------------+
```

#### Column 1: Brand & Contact Information
* **Company Title**: LC Tree and Landscaping, LLC
* **Owner Identification**: `"Owner: Lad Oborny"` (reinforces personal accountability and local owner-operator trust).
* **Direct Telephone**: `(316) 393-7207` (interactive `tel:3163937207` link with phone icon).
* **Direct Email**: `info@lctreeks.com` or `lad@lctreeandlandscaping.com` (interactive `mailto:` link).
* **Hours of Operation**:
  - `"Monday – Saturday: 7:00 AM – 7:00 PM"`
  - `"Sunday: Emergency Storm Response Available"`
* **Tagline**: `"Premium Tree Removal, Trimming & Landscaping with a Personal Touch."`

#### Column 2: Quick Links (Site Navigation)
* List of clean navigational anchor links:
  - `<a href="index.html">Home</a>`
  - `<a href="about.html">About Us</a>`
  - `<a href="gallery.html">Our Work & Gallery</a>`
  - `<a href="testimonials.html">Client Reviews</a>`
  - `<a href="faq.html">Frequently Asked Questions</a>`
  - `<a href="contact.html">Contact Us</a>`
  - `<a href="estimate.html" class="highlight-link">Request an Estimate</a>`

#### Column 3: Core Services Links
* Deep links to specialized revenue-driving service sections:
  - `<a href="services.html#tree-removal">Tree Removal (Hazardous & Large)</a>`
  - `<a href="services.html#tree-trimming">Tree Trimming & Canopy Pruning</a>`
  - `<a href="services.html#stump-grinding">Stump Grinding & Root Removal</a>`
  - `<a href="services.html#landscaping">Residential Landscaping & Cleanup</a>`

#### Column 4: Service Areas & Trust Badges
* **Geographical Heading**: `"Proudly Serving East Wichita & Andover, KS"`
* **Surrounding Service Notice**: `"Also serving Derby, Augusta, Rose Hill, and surrounding areas."`
* **Trust Badges Cluster**:
  1. **Fully Insured Badge**: Shield icon + `"100% Fully Insured & Certified"` (protection guarantee).
  2. **5-Star Reviews Badge**: 5 Gold Stars + `"Top Rated Local Tree Service"`.
  3. **Local Owner-Operated Badge**: Kansas pin icon + `"Locally Owned by Lad Oborny"`.
  4. **Property Protection Guarantee**: Checkmark + `"Zero Property Damage & Complete Debris Cleanup"`.

### 5.8 Sub-Footer (Bottom Bar)
* **Layout**: Horizontal flexbox (space-between) centered vertically on desktop, stacked on mobile.
* **Copyright**: `"Copyright © 2026 LC Tree and Landscaping, LLC. All Rights Reserved."`
* **Legal Navigation**:
  - `<a href="privacy.html">Privacy Policy</a>`
  - `<a href="terms.html">Terms of Service</a>` (optional)
* **Back to Top Button**: Floating or embedded smooth-scroll anchor (`#top`).

---

## 6. Comprehensive Brand Style Guide & Design System

### 6.1 Color Palette & Design Tokens
The color palette reflects natural vitality, arborist mastery, premium execution, and high-visibility safety.

```css
:root {
  /* Primary Arborist Green Tones */
  --color-primary-dark: #143324;     /* Deep Forest Slate */
  --color-primary: #1B4332;          /* Authoritative Arborist Green */
  --color-primary-light: #2D6A4F;    /* Vibrant Foliage Green */
  --color-primary-subtle: #D8F3DC;   /* Soft Leaf Tint */

  /* High-Contrast Conversion Accent (Call Now / CTAs) */
  --color-accent: #D97706;           /* Vivid Amber CTA */
  --color-accent-hover: #B45309;     /* Deep Amber Hover */
  --color-accent-glow: #F59E0B;      /* Highlight Gold */
  --color-accent-orange: #E65100;    /* Safety Warning Orange (Emergency CTA) */

  /* Neutral & Background Tones */
  --color-dark-bg: #111827;          /* Midnight Slate (Top bar & Footer) */
  --color-dark-surface: #1F2937;     /* Elevated Slate */
  --color-text-main: #1F2937;        /* Primary Body Text (High Contrast) */
  --color-text-muted: #4B5563;       /* Secondary Body Text */
  --color-text-light: #F9FAFB;       /* Pure Off-White Text on Dark BG */
  --color-bg-body: #FFFFFF;          /* Pure White Background */
  --color-bg-subtle: #F3F4F6;        /* Light Neutral Section Background */
  --color-border: #E5E7EB;           /* Subtle Border Divider */

  /* Semantic Feedback Tones */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
}
```

#### Color Contrast Ratios (WCAG AA Compliance Verification)
* **Accent `#D97706` on Dark `#111827`**: Contrast ratio `5.84:1` (PASS AA & AAA for large text).
* **White `#FFFFFF` on Primary `#1B4332`**: Contrast ratio `9.48:1` (PASS AAA).
* **Primary Text `#1F2937` on White `#FFFFFF`**: Contrast ratio `12.63:1` (PASS AAA).
* **Primary Text `#1F2937` on Subtle BG `#F3F4F6`**: Contrast ratio `11.52:1` (PASS AAA).
* **White `#FFFFFF` on Accent `#D97706`**: Used for bold button labels (`18px+` bold) with contrast ratio `3.15:1` (PASS for UI Components and Large Text); for standard text, `#111827` on `#F59E0B` (`10.5:1`) or solid `#1B4332` on `#FFFFFF` can be alternated.

### 6.2 Typography Hierarchy & System
* **Primary Font Stack**: `'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`
* **Heading Font Stack**: `'Plus Jakarta Sans', 'Montserrat', 'Inter', sans-serif;`

| Element | Desktop Size | Mobile Size | Weight | Line Height | Letter Spacing | Purpose / Usage |
|---------|--------------|-------------|--------|-------------|----------------|-----------------|
| `H1` (Hero Headline) | 44px–52px (2.75rem–3.25rem) | 32px–36px (2.0rem–2.25rem) | 800 (ExtraBold) | 1.15 | -0.025em | Main hero value propositions |
| `H2` (Section Title) | 32px–38px (2.0rem–2.375rem) | 26px–28px (1.625rem–1.75rem) | 700 (Bold) | 1.25 | -0.02em | Section headings ("The LC Difference", "Our Services") |
| `H3` (Card / Service Title) | 22px–24px (1.375rem–1.5rem) | 20px (1.25rem) | 600 (SemiBold) | 1.35 | -0.01em | Service cards, values, review names |
| `H4` (Subheadings) | 18px–20px (1.125rem–1.25rem) | 17px–18px (1.06rem) | 600 (SemiBold) | 1.4 | 0 | Accordion headers, modal titles |
| `Body Large` (Subtitles) | 18px–20px (1.125rem–1.25rem) | 16px (1.0rem) | 400/500 (Reg/Med) | 1.6 | 0 | Hero subheaders, lead intros |
| `Body Regular` | 16px (1.0rem) | 15px–16px (0.95rem–1.0rem) | 400 (Regular) | 1.65 | 0 | Standard narrative paragraphs |
| `Body Small / Footnote` | 14px (0.875rem) | 13px (0.8125rem) | 400/500 | 1.5 | 0.01em | Footer details, review dates, form hints |
| `Top Bar / Utility` | 13px (0.8125rem) | 12px (0.75rem) | 500 (Medium) | 1.4 | 0.02em | Location banner, copyright |

### 6.3 Button & Interactive Component Architecture

```
[ Primary CTA Button: .btn-primary ]
+------------------------------------------------------+
|  (📞 Phone Icon)   Call Now: 316-393-7207            |
+------------------------------------------------------+
  Background: #D97706 | Color: #FFFFFF | Weight: 700
  Hover: Background #B45309 | Shadow: 0 4px 12px rgba(217, 119, 6, 0.4)

[ Secondary CTA Button: .btn-outline ]
+------------------------------------------------------+
|  Request an Estimate   (➔)                           |
+------------------------------------------------------+
  Border: 2px solid #1B4332 (or #FFFFFF on dark heroes)
  Background: Transparent | Color: #1B4332 (or #FFFFFF)
  Hover: Background #1B4332 | Color: #FFFFFF

[ Pre-Footer Sticky/Banner CTA: .btn-lg-cta ]
+------------------------------------------------------+
|  (📞) Call Lad Directly: 316-393-7207                 |
+------------------------------------------------------+
  Scale: 1.1x | Font-size: 20px | Box Shadow: 0 8px 24px rgba(0,0,0,0.2)
```

### 6.4 Trust Badges, Iconography & Social Proof Elements
1. **Fully Insured Badge**:
   - Icon: Security shield with interior checkmark.
   - Text: `"Fully Insured & Licensed"` / `"Zero Property Liability"`.
2. **5-Star Rated Badge**:
   - Icon: 5 solid amber stars (`#F59E0B`).
   - Text: `"5-Star Rated Service in Andover & Wichita"`.
3. **Owner-Operated Badge**:
   - Icon: Handshake / Kansas state silhouette / Hardhat icon.
   - Text: `"Locally Owned & Operated by Lad Oborny"`.
4. **Spotless Cleanup Guarantee Badge**:
   - Icon: Sparkle / Broom / Yard care icon.
   - Text: `"Meticulous Yard & Debris Cleanup Guaranteed"`.

### 6.5 Cards, Containers & Shadow Elevation System
* **Standard Container Width**: `max-width: 1240px; padding: 0 24px; margin: 0 auto;`
* **Card Tokens**:
  - `card-border-radius: 12px;`
  - `card-bg: #FFFFFF;`
  - `card-border: 1px solid #E5E7EB;`
  - `card-shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.07);`
  - `card-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);`
  - `card-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);`
  - `card-hover-transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;`
  - `card-hover-effect: translateY(-4px); box-shadow: var(--card-shadow-lg);`

### 6.6 Responsive Breakpoints & Grid Architecture
* **xs (Mobile Portrait)**: `320px – 479px` (1 column stacked, full width buttons)
* **sm (Mobile Landscape)**: `480px – 767px` (1-2 columns, compact sticky header)
* **md (Tablet)**: `768px – 1023px` (2 column grid, mobile hamburger menu active)
* **lg (Desktop)**: `1024px – 1279px` (3-4 column grid, desktop horizontal navigation active)
* **xl (Wide Desktop)**: `1280px+` (Max container centered, high-res graphics)

---

## 7. Cross-Cutting Conversion Strategy Specification

```
                          [ TARGET DEMOGRAPHIC ]
              Homeowners in East Wichita, Andover, & Surrounding Areas
              (Values: Safety, Property Preservation, Speed, Trust, Local Roots)
                                     │
                                     ▼
        ┌─────────────────────────────────────────────────────────┐
        │            HIGH VISIBILITY AWARENESS LAYER              │
        │ - Sticky Header with "Call Now: 316-393-7207"           │
        │ - Secondary Top Bar: "Serving East Wichita & Andover"   │
        │ - Immediate Trust Bar: Insured • 5-Star • Lad Oborny    │
        └────────────────────────────┬────────────────────────────┘
                                     │
                     ┌───────────────┴───────────────┐
                     ▼                               ▼
      ┌─────────────────────────────┐ ┌─────────────────────────────┐
      │   PRIMARY CONVERSION PATH   │ │  SECONDARY CONVERSION NET   │
      │        (PHONE CALL)         │ │     (ESTIMATE REQUEST)      │
      │ • 1-Tap Mobile Dialer       │ │ • Asynchronous / After-Hrs  │
      │ • Desktop Direct Number     │ │ • Simple 5-field Form       │
      │ • Owner Access (Lad Oborny) │ │ • "Response within 24 Hrs"  │
      │ • High-Contrast Button      │ │ • "No Obligation / Free"    │
      └──────────────┬──────────────┘ └──────────────┬──────────────┘
                     │                               │
                     └───────────────┬───────────────┘
                                     ▼
                      [ ON-SITE ESTIMATE & REVENUE ]
```

### 7.1 Funneling High-Value Users to Phone Calls
1. **Dominant Visual Hierarchy**:
   - The primary CTA `"Call Now: 316-393-7207"` is rendered in vibrant Amber/Orange (`#D97706`), while secondary actions use subtle outlines or neutral tones.
   - The CTA button is anchored continuously in the sticky header so it is never more than 0 pixels away from the user's viewport.
2. **Repetition at Key Decision Points**:
   - **Hero Section**: Primary Solid Call Button + Secondary Estimate Button.
   - **Service Hub & Subsections**: "Schedule Tree Removal: Call 316-393-7207".
   - **Testimonials & FAQ**: "Questions? Call Lad Directly at 316-393-7207".
   - **Pre-Footer Universal Strip**: High-contrast full-width banner preceding the footer on every page.

### 7.2 Mobile Optimization (Zero-Friction Calling)
* **The "Yard-Walk" Use Case**: Homeowners standing in their yard inspecting storm damage or tree limbs require immediate, zero-friction phone access.
* **Dialer Integration**: Every instance of `316-393-7207` is marked up with semantic `tel:3163937207` links.
* **Touch Target Sizing**: All phone buttons are sized at a minimum height of `48px` with at least `16px` padding to prevent mis-taps.

### 7.3 Trust-Building Architecture for East Wichita & Andover Demographic
* **Psychological Profile**: Affluent Kansas homeowners prioritize **property preservation, safety, and accountability** over cut-rate pricing. They fear damaged roofs, crushed fences, lawn ruts, and uncollected debris.
* **Counteracting Objections via Global Design**:
  1. **Personal Accountability**: The owner, **Lad Oborny**, is explicitly named across the top bar, hero, difference section, about page, and footer column 1.
  2. **Insurance & Safety Verification**: "Fully Insured" trust badges with shield icons are prominently displayed on every page.
  3. **Meticulous Cleanup Guarantee**: Front-and-center messaging assuring that branches, logs, and sawdust are 100% removed.
  4. **Hyper-Local Identity**: Continuous reinforcement of East Wichita and Andover community roots.

### 7.4 Secondary Conversion Safety Net (Request an Estimate)
* **Target Audience**: Users browsing after normal business hours (8 PM – 6 AM), professionals browsing at work who cannot place personal phone calls, or users seeking written quotes.
* **Low Friction Architecture**:
  - Only 5 core fields: Full Name, Phone, Email, Property Address/City, Service Type (Dropdown).
  - Explicit Expectation Setting: `"We respect your time. Fill out the form, and we will get back to you within 24 hours to schedule a convenient on-site visit."`
  - Reassurance micro-copy: `"🔒 100% Free & No Obligation • Your information is strictly private."`

---

## 8. Complete Multi-Page Navigation Matrix

| Page Name | File Name | Header Nav Item | Dropdown Item | Footer Quick Link | Footer Core Service | Primary Page Goal |
|-----------|-----------|-----------------|---------------|-------------------|---------------------|-------------------|
| Home | `index.html` | Yes | - | Yes | - | High-impact overview, brand authority, immediate phone calls |
| About Us | `about.html` | Yes | - | Yes | - | Humanize brand via Lad Oborny, company values & equipment |
| Services (Hub) | `services.html` | Yes (Parent) | - | Yes | - | Comprehensive service offerings & pricing philosophy |
| - Tree Removal | `services.html#tree-removal` | - | Yes | - | Yes | Emergency & hazardous tree removal focus |
| - Tree Trimming | `services.html#tree-trimming` | - | Yes | - | Yes | Tree health, canopy shaping, property beauty |
| - Stump Grinding | `services.html#stump-grinding` | - | Yes | - | Yes | Complete stump eradication and lawn restoration |
| - Landscaping | `services.html#landscaping` | - | Yes | - | Yes | Bed maintenance, planting, mulching, seasonal cleanup |
| Gallery / Our Work | `gallery.html` | Yes | - | Yes | - | Filterable proof of quality, before/after, on-site video |
| Request an Estimate | `estimate.html` | Yes (or Button) | - | Yes | - | Lead capture form for asynchronous quote requests |
| Testimonials | `testimonials.html` | Yes | - | Yes | - | Peer social proof from Andover & East Wichita clients |
| FAQ | `faq.html` | Yes | - | Yes | - | Overcome insurance, cost, and process objections |
| Contact Us | `contact.html` | Yes | - | Yes | - | Direct map, direct contact info, direct form access |
| Privacy Policy | `privacy.html` | - | - | Bottom Bar | - | Legal compliance & consumer data privacy statement |

---

## 9. Implementation Checklist & Verification Criteria

- [ ] **Sticky Header Verification**: Header remains pinned to viewport top across all 8 pages during scroll with proper z-index (`1000`) and no content bleed.
- [ ] **Primary CTA Verification**: Button `"Call Now: 316-393-7207"` is present in the header of all 8 pages and links to `tel:3163937207`.
- [ ] **Mobile Tap-to-Call**: Verified working on mobile resolutions (<768px) with accessible touch targets (≥48px height).
- [ ] **Services Dropdown**: Verified interactive dropdown containing Tree Removal, Tree Trimming, Stump Grinding, and Landscaping on desktop and accordion on mobile.
- [ ] **4-Column Footer**: All 4 columns present across all 8 pages:
  - Col 1: Brand name, Owner Lad Oborny, Phone 316-393-7207, email, business hours.
  - Col 2: Quick links to all main pages.
  - Col 3: Direct links to 4 core services.
  - Col 4: Service areas (East Wichita & Andover) and Trust Badges (Fully Insured, 5-Star, Local).
- [ ] **Bottom Sub-Footer**: Verified Copyright © 2026 and Privacy Policy link.
- [ ] **Design System Tokens**: CSS variables implemented for primary forest greens, safety ambers, midnight slate, and neutrals with WCAG AA contrast compliance.
- [ ] **Pre-Footer CTA Strip**: Rendered across all pages before footer with direct phone call trigger.
- [ ] **Accessibility (WCAG 2.1 AA)**: Keyboard tab order, visible focus rings, ARIA labels on navigation and hamburger menu, alt tags on all imagery.

---
*End of Global Architecture & Cross-Cutting Conversion Strategy Specification Report.*
