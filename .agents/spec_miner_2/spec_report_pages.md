# Specification Mining Report: 8-Page Website Architecture & Feature Deconstruction
**Project**: LC Tree and Landscaping, LLC Website  
**Author**: Spec Miner 2  
**Date**: 2026-08-25  
**Working Directory**: `c:\Users\prest\Documents\antigravity\dazzling-hertz\.agents\spec_miner_2`  
**Authoritative Sources**: 
- `c:\Users\prest\Documents\antigravity\dazzling-hertz\.agents\ORIGINAL_REQUEST.md`
- `C:\Users\prest\.gemini\antigravity\brain\586ced4a-8647-4731-9af1-d238e49b565e\website_architecture_lc_tree.md`

---

## 1. Executive Summary & Page Inventory

This document provides the exhaustive specification for all eight (8) pages comprising the **LC Tree and Landscaping, LLC** website. The digital presence is engineered specifically to convert upper- and middle-class residential homeowners in **East Wichita** and **Andover, Kansas** into immediate phone calls and qualified estimate requests.

### 8-Page Master Inventory

| Page # | Page Name | File / Route | Primary Conversion Goal | Core Architectural Components |
|---|---|---|---|---|
| 1 | **Home Page** | `/` or `index.html` | Immediate phone calls (`tel:3163937207`) & estimate funneling | Hero banner, Trust Bar, Core Services Grid, The LC Difference, Proof of Quality (Before/After Slider & Video), Testimonial Snippet, Pre-Footer CTA |
| 2 | **About Page** | `/about` or `about.html` | Establish authority, owner accessibility & community trust | Header/Intro, Meet the Owner (Lad Oborny bio + photo), 3-Column Values & Commitment Grid, Pre-Footer CTA |
| 3 | **Services Page** | `/services` or `services.html` | Educate on capability, safety, and high-margin services | Header/Intro, 4 Service Blocks (Tree Removal, Trimming/Pruning, Stump Grinding, Landscaping), Action CTAs, Pre-Footer CTA |
| 4 | **Our Work / Gallery** | `/gallery` or `gallery.html` | Provide visual proof of capability, precision & spotless cleanup | Filterable masonry/grid (All, Removal, Trimming, Stump, Landscaping), Hover captions, Lightbox, Featured Project Video, Pre-Footer CTA |
| 5 | **Request an Estimate** | `/estimate` or `estimate.html` | Asynchronous lead capture with 24-hr turnaround guarantee | Split layout, 6-Field Lead Form, Client-side validation, Trust signals, "What to Expect" 3-step timeline, Pre-Footer CTA |
| 6 | **Testimonials** | `/testimonials` or `testimonials.html` | Peer validation and local social proof from Andover & Wichita | Header, Aggregate 5.0 rating badge, 6+ Verified Homeowner review cards, Pre-Footer CTA |
| 7 | **FAQ Page** | `/faq` or `faq.html` | Overcome objections regarding insurance, cleanup, speed, attendance | Accessible collapsible accordion with 6 detailed Q&As, Direct Owner Help Box, Pre-Footer CTA |
| 8 | **Contact Page** | `/contact` or `contact.html` | Direct multi-channel contact & interactive service area mapping | 2-Column layout: Contact Info (Phone, Email, Hours, Map) + Quick Message Form, Pre-Footer CTA |

---

## 2. Exhaustive Page-by-Page Specifications

---

### Page 1: Home Page (`index.html` / `/`)

#### 1. Page Metadata
*   **Page Title**: `LC Tree and Landscaping, LLC | Expert Tree Care & Removal in East Wichita & Andover`
*   **Meta Description**: `Professional tree removal, trimming, stump grinding, and landscaping in East Wichita and Andover, KS. Fully insured, locally owned by Lad Oborny. Call 316-393-7207 for a free estimate.`
*   **Target Audience**: Discerning homeowners in Andover and East Wichita seeking safe, insured, zero-damage tree care.

#### 2. Section Breakdown & Wireframe Details

##### Section 1.1: Hero Section
*   **Goal**: Instantly communicate value proposition, location specificity (East Wichita & Andover), tree care focus, and drive immediate phone calls.
*   **Visual Layout**: Full-width responsive hero with high-contrast darkened overlay (dark gradient `rgba(0, 0, 0, 0.65)`) over high-resolution imagery/video of arborists executing safe sectional dismantling. Left-aligned or centered copy box.
*   **Copywriting**:
    *   **Eyebrow / Badge**: `🌿 East Wichita & Andover's Trusted Tree Specialists`
    *   **Headline (H1)**: `Expert Tree Care & Landscaping in East Wichita & Andover.`
    *   **Subheadline**: `Premium tree removal, trimming, and landscaping with a personalized touch. Quality work, affordable pricing, zero hassle.`
    *   **Primary CTA (Solid Button)**: `Call Now: 316-393-7207` (Links to `tel:3163937207`, high-visibility accent color).
    *   **Secondary CTA (Outline/Ghost Button)**: `Request an Estimate` (Smooth scroll or link to `/estimate.html`).
*   **Interactive Behavior**: Hover state on Primary CTA elevates button with drop shadow; Secondary CTA fills with light translucent background.

##### Section 1.2: Trust Bar (Immediate Credibility Strip)
*   **Goal**: Establish immediate credibility above the fold or right below Hero.
*   **Visual Layout**: Horizontal full-width ribbon/strip featuring 3-4 distinct badge blocks with SVG icons and clear typography.
*   **Items**:
    1.  **Fully Insured & Safe**: Shield with checkmark icon. Copy: `Fully Insured & Licensed — Comprehensive Property Protection`.
    2.  **Locally Owned & Operated**: Owner badge/User icon. Copy: `Locally Owned by Lad Oborny — Direct Owner Accountability`.
    3.  **5-Star Rated Service**: 5 Star rating icon. Copy: `5-Star Rated Service — Andover & East Wichita's Choice`.
    4.  **Prompt Estimates**: Clock/Lightning bolt icon. Copy: `Fast 24-Hour Estimate Turnaround`.

##### Section 1.3: Core Services Grid (Tree Focus)
*   **Goal**: Direct users into core high-revenue services with strong visual hierarchy.
*   **Visual Layout**: 4-column responsive grid (collapses to 2 columns on tablet, 1 column on mobile). Each card features a high-quality photo header, category tag, title, bulleted features, and a "Learn More" text link with right arrow icon.
*   **Card Specifications**:
    1.  **Tree Removal (Primary Focus)**:
        *   *Image*: Controlled lowering of hazardous oak limb.
        *   *Title*: `Hazardous & Large Tree Removal`
        *   *Summary*: `Safe, sectional takedowns using advanced rigging. Zero property damage guaranteed.`
        *   *Key Points*: Tight-space removals, storm damage response, complete site cleanup.
        *   *Link*: `services.html#tree-removal`
    2.  **Tree Trimming & Pruning**:
        *   *Image*: Crown thinning and canopy lifting on mature shade tree.
        *   *Title*: `Tree Trimming & Canopy Pruning`
        *   *Summary*: `Promote tree health, enhance sunlight penetration, and eliminate deadwood hazards.`
        *   *Key Points*: Crown lifting, roof/gutter clearance, structural shaping.
        *   *Link*: `services.html#tree-trimming`
    3.  **Stump Grinding**:
        *   *Image*: High-powered commercial stump grinder operating below grade.
        *   *Title*: `Complete Stump Grinding`
        *   *Summary*: `Eradicate unsightly stumps and root flares 6–12" below grade, ready for sod or planting.`
        *   *Key Points*: Pest prevention, surface root clearing, wood chip mulch options.
        *   *Link*: `services.html#stump-grinding`
    4.  **Landscaping & Cleanup**:
        *   *Image*: Freshly mulched decorative landscape beds and shaped shrubs.
        *   *Title*: `Landscaping & Property Enhancement`
        *   *Summary*: `Tailored landscape beds, shrub trimming, and seasonal property refreshes.`
        *   *Key Points*: Mulching, shrub pruning, curb appeal enhancement.
        *   *Link*: `services.html#landscaping`

##### Section 1.4: The LC Difference (Why Choose Us)
*   **Goal**: Highlight differentiators for the target demographic (quality, safety, spotless yard, owner access).
*   **Visual Layout**: 2-column split. Left: Headline, lead text, and 4 detailed benefit items with stylized green checkmark icons. Right: High-resolution photo of owner Lad Oborny on-site reviewing work with professional equipment.
*   **Copywriting**:
    *   **Eyebrow**: `WHY HOMEOWNERS CHOOSE LC TREE`
    *   **Headline (H2)**: `The LC Difference: Personalized Care, Direct Owner Oversight.`
    *   **Lead Paragraph**: `We don't send anonymous crews. Owner Lad Oborny is personally involved in every project, ensuring your trees and property receive the highest standard of care from estimate to final cleanup.`
    *   **4 Differentiator Items**:
        1.  **Direct Owner Access**: `Work directly with Lad Oborny from initial consultation to final walkthrough. No middlemen, no miscommunication.`
        2.  **Meticulous Yard Cleanup**: `We treat your lawn like our own. All branches chipped, sawdust raked, walkways blown clean. Your yard is left immaculate.`
        3.  **Advanced Safety & Property Protection**: `Commercial-grade insurance, rigging techniques, and ground protection mats to protect your turf, fences, and roof.`
        4.  **Fair & Transparent Pricing**: `Detailed, written quotes with zero hidden fees. High-end craftsmanship at honest, competitive rates.`

##### Section 1.5: Proof of Quality (Interactive Before/After & Video)
*   **Goal**: Provide tangible, visual validation of technical mastery and property respect.
*   **Visual Layout**: 2-column container.
    *   **Column 1 (Interactive Before/After Slider)**:
        *   Component: Interactive image comparison slider with draggable vertical divider bar and touch-drag support.
        *   "Before" Image: Dense, storm-damaged, encroaching tree limbs overhanging a residential roof and pool deck in Andover.
        *   "After" Image: Cleanly removed/thinned canopy with pristine roof clearance, undamaged turf, and spotless patio.
        *   Labels: Semi-transparent badges "BEFORE" and "AFTER" in top corners.
    *   **Column 2 (Featured On-Site Video Embed)**:
        *   Component: 16:9 responsive video container with customized thumbnail poster image showing a crane/rope rigging setup.
        *   Video Description Card below: `Watch our crew safely dismantle a 50-foot hazardous tree in East Wichita with millimeter precision.`
        *   Playback Controls: Play/pause button, volume, fullscreen, accessible ARIA attributes.

##### Section 1.6: Featured Testimonial Snippet
*   **Goal**: Social proof from a relatable local homeowner to build trust.
*   **Visual Layout**: Centered quote container on a soft background with quotation mark graphics.
*   **Content**:
    *   *5 Golden Stars*: `★★★★★`
    *   *Quote*: `"Lad and his crew did an outstanding job removing two huge pines right against our fence line in Andover. They were on time, extremely polite, and cleaned up every single twig before leaving. You couldn't even tell heavy equipment was on the lawn. Best tree service in Wichita!"`
    *   *Attribution*: `— Thomas & Karen M., Andover, KS (Verified Homeowner)`
    *   *CTA Link*: `Read More Customer Reviews →` (Links to `/testimonials.html`).

##### Section 1.7: Pre-Footer CTA
*   **Goal**: Catch scrolling users at the bottom of the page with a strong conversion prompt.
*   **Visual Layout**: Full-width high-contrast banner in brand primary forest green.
*   **Copywriting**:
    *   **Headline (H2)**: `Ready to Transform & Protect Your Property?`
    *   **Subheadline**: `Contact Lad today for a fast, free, no-obligation estimate in East Wichita or Andover.`
    *   **Primary CTA**: `Call 316-393-7207` (Solid button with phone icon).
    *   **Secondary CTA**: `Request an Estimate Online` (White outline button).

---

### Page 2: About Page (`about.html` / `/about`)

#### 1. Page Metadata
*   **Page Title**: `About Us & Meet Owner Lad Oborny | LC Tree and Landscaping, LLC`
*   **Meta Description**: `Learn about LC Tree and Landscaping, LLC, founded by Lad Oborny. Dedicated to providing Andover and East Wichita with safe, personalized tree care and pristine cleanup.`

#### 2. Section Breakdown & Wireframe Details

##### Section 2.1: Header / Intro Banner
*   **Goal**: Establish local roots, professional values, and dedication to craftsmanship.
*   **Visual Layout**: Full-width header with subtle background pattern. Centered headline and lead paragraph.
*   **Copywriting**:
    *   **Eyebrow**: `ROOTED IN EXCELLENCE`
    *   **Headline (H1)**: `About LC Tree and Landscaping, LLC`
    *   **Lead Paragraph**: `Dedicated to delivering Andover, East Wichita, and surrounding communities with premium, safety-first tree care and landscaping backed by direct owner accountability.`

##### Section 2.2: Meet the Owner (Lad Oborny)
*   **Goal**: Humanize the brand and establish trust through owner transparency.
*   **Visual Layout**: 2-column layout. Left: High-quality professional portrait of owner Lad Oborny on a job site with arborist gear, friendly and approachable. Right: Story and background text.
*   **Biography & Story**:
    *   **Subhead**: `Meet Lad Oborny — Owner & Operator`
    *   **Story Text**: 
        *   Lad Oborny founded LC Tree and Landscaping with a simple yet uncompromising standard: provide residential and commercial clients with the highest caliber of tree care, uncompromising safety protocols, and personalized customer care that larger corporate franchises simply cannot match.
        *   Having lived and worked in the Wichita and Andover areas for years, Lad understands the specific climate challenges Kansas properties face — from brutal summer droughts to devastating spring ice and wind storms.
        *   Lad believes that exceptional tree care is measured not just by what is removed from the canopy, but by what is preserved on the ground. Every job is approached with the principle of leaving the client's lawn cleaner than we found it.
    *   **Direct Quote Callout**: `"When you hire LC Tree, you get my personal commitment to quality, safety, and honest pricing. I stand behind every cut we make." — Lad Oborny`

##### Section 2.3: Values & Commitment 3-Column Grid
*   **Goal**: Codify the brand's operational pillars for discerning homeowners.
*   **Visual Layout**: 3-column card grid with custom SVG icons.
*   **Columns**:
    1.  **Safety & Property Protection**:
        *   *Icon*: Shield with Lock / Safety Helmet
        *   *Title*: `Safety First, Always`
        *   *Description*: `Full commercial liability insurance, certified rigging techniques, and protective ground shielding to ensure complete safety for your home, family, and property.`
    2.  **Meticulous Craftsmanship & Cleanup**:
        *   *Icon*: Sparkle / Clean Leaf
        *   *Title*: `Unrivaled Cleanup Standards`
        *   *Description*: `We treat your yard with the utmost respect. We don't consider a job complete until all logs are hauled, brush chipped, lawn raked, and hardscapes blown spotless.`
    3.  **Honesty & Transparent Pricing**:
        *   *Icon*: Handshake / Scale of Integrity
        *   *Title*: `Direct Communication & Fair Quotes`
        *   *Description*: `No hidden fees, no pressure sales, and no middlemen. You receive clear, upfront written estimates with firm timelines and open communication directly with the owner.`

##### Section 2.4: Pre-Footer CTA
*   *Content*: Standard Pre-Footer CTA banner (`Call Lad Today at 316-393-7207`).

---

### Page 3: Services Page — Main Hub (`services.html` / `/services`)

#### 1. Page Metadata
*   **Page Title**: `Tree & Landscaping Services | LC Tree and Landscaping | Wichita & Andover`
*   **Meta Description**: `Comprehensive tree services in East Wichita and Andover, KS: hazardous tree removal, precision trimming, stump grinding, and landscaping. Call 316-393-7207.`

#### 2. Section Breakdown & Wireframe Details

##### Section 3.1: Page Header / Overview
*   **Headline (H1)**: `Our Professional Tree & Landscaping Services`
*   **Subheadline**: `Expert arborist solutions designed to protect your home, enhance property value, and promote vibrant landscape health.`

##### Section 3.2: Service Block 1 — Tree Removal (Focus / Hero Service)
*   **Anchor ID**: `#tree-removal`
*   **Visual Layout**: Alternating 2-column (Left: In-depth service details & bullet points; Right: Action photo of sectional dismantling with roping).
*   **Copywriting**:
    *   **Headline (H2)**: `Safe, Precision Tree Removal`
    *   **Summary**: `Removing a large, hazardous, or dead tree requires advanced rigging, technical precision, and specialized equipment to avoid damage to surrounding structures, fences, and lawns.`
    *   **Service Highlights**:
        *   *Hazardous & Storm-Damaged Tree Extraction*: Safe takedown of split, rotting, or leaning trees.
        *   *Tight-Space & Structural Proximity*: Controlled limb-lowering near power lines, roofs, and pools.
        *   *Crane & Specialized Rigging*: Minimal impact methods for massive hardwood removals.
        *   *Emergency Response*: Fast response for wind, storm, and ice damage throughout Andover and East Wichita.
        *   *Full Haul-Away & Chipping*: Complete removal of all timber and debris.
    *   **CTA Button**: `Request a Tree Removal Estimate →` (Links to `/estimate.html?service=removal`).

##### Section 3.3: Service Block 2 — Tree Trimming & Pruning
*   **Anchor ID**: `#tree-trimming`
*   **Visual Layout**: Alternating 2-column (Left: Photo of shaped, healthy canopy; Right: In-depth service details).
*   **Copywriting**:
    *   **Headline (H2)**: `Tree Trimming, Thinning & Canopy Pruning`
    *   **Summary**: `Proper pruning is essential for tree longevity, storm resistance, and aesthetic beauty. We prune according to ANSI A300 standards to promote structural integrity.`
    *   **Service Highlights**:
        *   *Canopy Lifting & Thinning*: Improves sunlight penetration to turf and reduces wind resistance during storms.
        *   *Deadwood & Hazard Removal*: Eliminates decaying, diseased, or overlapping branches.
        *   *Roof & Clearance Trimming*: Clears branches away from siding, chimneys, power lines, and driveways.
        *   *Species-Specific Shaping*: Tailored pruning for Kansas oaks, maples, elms, evergreens, and ornamental trees.
    *   **CTA Button**: `Schedule Tree Trimming →` (Links to `/estimate.html?service=trimming`).

##### Section 3.4: Service Block 3 — Stump Grinding
*   **Anchor ID**: `#stump-grinding`
*   **Visual Layout**: Alternating 2-column (Left: Service details; Right: Action photo of commercial stump grinder).
*   **Copywriting**:
    *   **Headline (H2)**: `Complete Below-Grade Stump Grinding`
    *   **Summary**: `Tree stumps are unsightly trip hazards that attract termites, carpenter ants, and fungi while impeding mowing. We grind stumps deep below grade to restore your lawn.`
    *   **Service Highlights**:
        *   *Deep Grinding (6–12+ Inches Below Grade)*: Ensures complete elimination of root plate for replanting or sodding.
        *   *Surface Root Flare Chasing*: Eliminates exposed surface roots spreading across your yard.
        *   *Tight-Gate Access Equipment*: Compact commercial grinders capable of entering standard backyard gates without turf damage.
        *   *Mulch Management*: Choice of backfilling grindings for nutrient-rich soil or complete haul-away.
    *   **CTA Button**: `Get a Stump Grinding Quote →` (Links to `/estimate.html?service=stump-grinding`).

##### Section 3.5: Service Block 4 — Landscaping & Property Enhancement
*   **Anchor ID**: `#landscaping`
*   **Visual Layout**: Alternating 2-column (Left: Photo of pristine mulched landscape bed; Right: Service details).
*   **Copywriting**:
    *   **Headline (H2)**: `Landscaping & Seasonal Property Care`
    *   **Summary**: `Elevate your home's curb appeal with our dedicated landscape enhancement and maintenance services.`
    *   **Service Highlights**:
        *   *Mulch & Rock Bed Installation*: Fresh hardwood mulch installation and clean edge trenching.
        *   *Shrub & Hedge Shaping*: Artistic trimming and rejuvenation of ornamental bushes and hedges.
        *   *Seasonal Yard Cleanups*: Spring and Fall cleanups, leaf removal, and storm debris clearing.
        *   *Plant Bed Renovation*: Overgrown bed clearing and plant revitalization.
    *   **CTA Button**: `Discuss Landscaping Needs →` (Links to `/estimate.html?service=landscaping`).

##### Section 3.6: Pre-Footer CTA
*   *Content*: Standard Pre-Footer CTA banner (`Schedule Your Service Today. Call 316-393-7207`).

---

### Page 4: Our Work / Gallery (`gallery.html` / `/gallery`)

#### 1. Page Metadata
*   **Page Title**: `Project Gallery & Video Showcase | LC Tree and Landscaping | Wichita & Andover`
*   **Meta Description**: `Browse recent tree removals, canopy trimming, stump grinding, and landscaping projects completed across Andover and East Wichita, KS. See the LC difference.`

#### 2. Section Breakdown & Wireframe Details

##### Section 4.1: Header / Intro
*   **Headline (H1)**: `See The LC Difference in Action`
*   **Subheadline**: `Explore our recent projects across East Wichita and Andover. Every photo demonstrates our commitment to safety, precision, and immaculate cleanup.`

##### Section 4.2: Filterable Portfolio Grid
*   **Goal**: Allow prospective clients to inspect relevant work categorized by service type.
*   **Filter Controls (Pill / Button Bar)**:
    1.  `All Projects` (Active by default, displays all items)
    2.  `Tree Removal` (Filters for complex takedowns & storm jobs)
    3.  `Tree Trimming` (Filters for canopy pruning & lifting)
    4.  `Stump Grinding` (Filters for stump removal & yard restoration)
    5.  `Landscaping` (Filters for mulch, shrub care & cleanups)
*   **Grid Layout & Item Specifications**:
    *   Responsive masonry/grid layout (3 columns desktop, 2 columns tablet, 1 column mobile).
    *   Smooth CSS transitions / filtering fade animations.
    *   **Hover State**: Darkened gradient overlay appears with magnifying glass icon, Project Title (H3), Location Tag, and concise description.
    *   **Modal Lightbox**: Clicking an item triggers a full-screen accessible modal lightbox with high-resolution image, detailed caption, service badge, and left/right keyboard navigation.
*   **Representative Portfolio Items (6-8 items)**:
    1.  *Tree Removal*: "Hazardous Cottonwood Removal — Andover, KS" (Dismantled over fence and gazebo with zero impact).
    2.  *Tree Removal*: "Emergency Storm Damage Clearing — East Wichita, KS" (Large limb safely removed from residential roof).
    3.  *Tree Trimming*: "Mature Oak Canopy Elevation — Andover, KS" (Crown thinned for storm resilience and sunlight).
    4.  *Tree Trimming*: "Ornamental Maple Shaping — East Wichita, KS" (Deadwood pruned and balanced canopy).
    5.  *Stump Grinding*: "Double Elm Stump Grinding — Andover, KS" (Ground 10" below grade with level backfill).
    6.  *Landscaping*: "Front Yard Bed Transformation & Mulch — East Wichita, KS" (Crisp edging, fresh black mulch, shaped shrubs).

##### Section 4.3: Featured Project Video Showcase
*   **Goal**: Dynamic proof of crew coordination, modern machinery, and careful site protection.
*   **Visual Layout**: Centered video player with 16:9 aspect ratio and elegant frame.
*   **Copywriting**:
    *   **Video Title**: `Precision Tree Removal in Tight Quarters`
    *   **Description**: `Watch the LC Tree crew safely rig, lower, and process a massive hazardous tree in an Andover backyard. Notice the use of ground protection mats and thorough yard sweeping upon completion.`
    *   **Controls**: Full HTML5 / embedded player controls with custom branding.

##### Section 4.4: Pre-Footer CTA
*   *Content*: Standard Pre-Footer CTA banner (`Ready for Flawless Results on Your Property? Call 316-393-7207`).

---

### Page 5: Request an Estimate — Lead Capture (`estimate.html` / `/estimate`)

#### 1. Page Metadata
*   **Page Title**: `Request a Free Estimate | LC Tree and Landscaping | 24-Hr Response`
*   **Meta Description**: `Request a fast, free, no-obligation tree care or landscaping estimate in Andover and East Wichita, KS. Owner Lad Oborny responds within 24 hours.`

#### 2. Section Breakdown & Wireframe Details

##### Section 5.1: Header
*   **Headline (H1)**: `Get Your Free, No-Obligation Estimate`
*   **Subheadline**: `Tell us about your project, and owner Lad Oborny will contact you within 24 hours to schedule a convenient on-site consultation.`

##### Section 5.2: Split-Layout Conversion Form & Sidebar
*   **Layout**: 2-Column Split (Desktop: 60% Form / 40% Sidebar; Tablet/Mobile: Form stacked on top of Sidebar).

###### Left Column: Lead Capture Form
*   **Form Container**: Elevated card with subtle shadow, clear field groupings, and high-contrast labels.
*   **Form Fields**:
    1.  **Full Name**:
        *   Type: `text`, `name="full_name"`, `id="full_name"`, `required`
        *   Label: `Your Full Name *`
        *   Placeholder: `e.g., John Smith`
    2.  **Phone Number**:
        *   Type: `tel`, `name="phone"`, `id="phone"`, `required`
        *   Label: `Phone Number *`
        *   Placeholder: `(316) 555-0123`
        *   Pattern validation: US 10-digit phone format.
    3.  **Email Address**:
        *   Type: `email`, `name="email"`, `id="email"`, `required`
        *   Label: `Email Address *`
        *   Placeholder: `e.g., john@example.com`
    4.  **Property Address & City**:
        *   Type: `text`, `name="address"`, `id="address"`, `required`
        *   Label: `Property Address & City *`
        *   Placeholder: `e.g., 1234 Meadow Lane, Andover, KS`
    5.  **Service Requested (Dropdown)**:
        *   Type: `select`, `name="service"`, `id="service"`, `required`
        *   Label: `Primary Service Needed *`
        *   Options:
            *   `Select a service...` (disabled selected)
            *   `Tree Removal (Hazardous / Large Tree)`
            *   `Tree Trimming & Canopy Pruning`
            *   `Stump Grinding`
            *   `Landscaping & Bed Care`
            *   `Emergency Storm Damage`
            *   `Multiple Services / General Consultation`
    6.  **Project Details & Special Instructions**:
        *   Type: `textarea`, `name="details"`, `id="details"`, rows: 4
        *   Label: `Project Details & Notes (Optional)`
        *   Placeholder: `Tell us about the tree location, access gates, hazards near power lines or structures, or preferred timing...`
*   **Submit Button**:
    *   Text: `Submit Estimate Request`
    *   Styling: High-contrast, full-width solid button.
    *   State changes: Spinner loading state on submit.
*   **Trust Signals Below Submit Button**:
    *   `🔒 100% Privacy Guaranteed — We never share your contact information.`
    *   `⚡ Fast 24-Hour Response Guarantee.`
    *   `🛡️ Fully Insured & Licensed.`
*   **Client-Side Feedback States**:
    *   *Validation*: Real-time red outline and inline helper text for missing/invalid fields.
    *   *Success Card*: Green confirmation banner: `Thank you, [Name]! Your request has been received. Lad Oborny will review your details and contact you within 24 hours.`
    *   *Error Fallback*: `Something went wrong. Please call Lad directly at 316-393-7207.`

###### Right Column: "What to Expect" & Direct Call Sidebar
*   **Card 1: What Happens Next? (3-Step Process)**:
    1.  **Step 1: Rapid Review (Within 24 Hours)**: `Lad personally reviews your property address and project notes.`
    2.  **Step 2: On-Site Inspection & Firm Quote**: `We visit your property to assess access, tree health, and safety factors, providing a clear, upfront written quote.`
    3.  **Step 3: Flawless Execution & Cleanup**: `We perform the work at your convenience with complete property protection and immaculate cleanup.`
*   **Card 2: Prefer an Immediate Answer?**:
    *   Copy: `Need immediate help or have an urgent storm emergency? Call owner Lad Oborny directly.`
    *   Phone Button: `Call Now: 316-393-7207` (One-tap dial).
    *   Hours: `Mon–Fri: 7am–7pm | Sat: 8am–5pm`
*   **Card 3: Service Area Reassurance**:
    *   Copy: `Serving East Wichita, Andover, Bel Aire, Derby, Rose Hill & surrounding communities.`

##### Section 5.3: Pre-Footer CTA
*   *Content*: Standard Pre-Footer CTA banner.

---

### Page 6: Testimonials Page (`testimonials.html` / `/testimonials`)

#### 1. Page Metadata
*   **Page Title**: `Reviews & Testimonials | LC Tree and Landscaping | Andover & Wichita`
*   **Meta Description**: `Read verified 5-star customer reviews for LC Tree and Landscaping. Discover why Andover and East Wichita homeowners trust Lad Oborny for tree care.`

#### 2. Section Breakdown & Wireframe Details

##### Section 6.1: Header & Aggregate Rating Badge
*   **Headline (H1)**: `What Our Neighbors Are Saying`
*   **Subheadline**: `Authentic, unedited feedback from homeowners across Andover and East Wichita.`
*   **Aggregate Rating Display**:
    *   `5.0 ★★★★★ Rating on Google & Local Directories`
    *   `100% Recommendation Rate for Tree Removal & Meticulous Cleanup`

##### Section 6.2: Verified Review Card Grid
*   **Layout**: 3-Column responsive card grid (2-column tablet, 1-column mobile).
*   **Card Structure**:
    *   5 Golden Stars graphic (`aria-label="5 out of 5 stars"`).
    *   Quotation text highlighting specific aspects: Lad's responsiveness, careful rigging, spotless cleanup, and fair pricing.
    *   Reviewer Name, Location badge, and Service category pill.
    *   "Verified Customer" trust checkmark.
*   **6 Complete Authoritative Testimonial Cards**:
    1.  **Card 1 (Andover - Complex Removal & Pool Protection)**:
        *   *Stars*: `★★★★★`
        *   *Quote*: `"We had a massive dead cottonwood leaning precariously between our pool deck and the neighbor's fence in Andover. Lad and his crew dismantled it section by section without dropping a single twig where it shouldn't be. Their cleanup was so thorough they even blew off the pool cover. Outstanding work!"`
        *   *Author*: `David K.` | *Location*: `Andover, KS` | *Service*: `Hazardous Tree Removal`
    2.  **Card 2 (East Wichita - Large Oak Canopy Thinning & Pruning)**:
        *   *Stars*: `★★★★★`
        *   *Quote*: `"Our pin oaks hadn't been trimmed in over a decade. LC Tree elevated the canopy, cleared branches off our roof, and shaped the entire canopy. The yard gets so much more sunlight now, and the trees look healthy and balanced. Lad is honest, punctual, and knows his craft."`
        *   *Author*: `Jennifer & Mark R.` | *Location*: `East Wichita, KS` | *Service*: `Tree Trimming & Pruning`
    3.  **Card 3 (Andover - Emergency Storm Cleanup)**:
        *   *Stars*: `★★★★★`
        *   *Quote*: `"Following a violent thunderstorm, a heavy elm branch snapped and landed directly on our garage roof. I called Lad early the next morning, and he was at our house within two hours. He removed the limb safely with zero roof damage and hauled everything away. Unbelievable responsiveness!"`
        *   *Author*: `Robert T.` | *Location*: `Andover, KS` | *Service*: `Emergency Storm Damage`
    4.  **Card 4 (East Wichita - Deep Stump Grinding & Yard Restoration)**:
        *   *Stars*: `★★★★★`
        *   *Quote*: `"Had two stubborn pine stumps in the front yard that another company said were too close to the driveway to grind. Lad brought in his machine, ground them deep below grade without touching the concrete, and left a neat pile of fresh mulch. Clean, fast, and very affordable."`
        *   *Author*: `Michael B.` | *Location*: `East Wichita, KS` | *Service*: `Stump Grinding`
    5.  **Card 5 (Andover - Landscaping & Ornamental Shrub Care)**:
        *   *Stars*: `★★★★★`
        *   *Quote*: `"Lad's team pruned all our ornamental trees, reshaped our overgrown boxwood hedges, and laid fresh dark mulch throughout our front beds. The curb appeal transformation is night and day. It's refreshing to work with a local company where the owner takes such personal pride in the work."`
        *   *Author*: `Karen S.` | *Location*: `Andover, KS` | *Service*: `Landscaping & Shrub Pruning`
    6.  **Card 6 (East Wichita - Value & Peace of Mind)**:
        *   *Stars*: `★★★★★`
        *   *Quote*: `"We received three bids for taking down two dying ash trees. Lad was not only the most competitively priced, but he was also the only contractor who provided proof of insurance on the spot and explained his rigging process in detail. Top-notch professional."`
        *   *Author*: `Steve & Linda H.` | *Location*: `East Wichita, KS` | *Service*: `Tree Removal & Stump Grinding`

##### Section 6.3: Pre-Footer CTA
*   *Headline*: `Experience 5-Star Service on Your Property.`
*   *Button*: `Call Lad Today: 316-393-7207` | `Request a Free Estimate`.

---

### Page 7: FAQ Page (`faq.html` / `/faq`)

#### 1. Page Metadata
*   **Page Title**: `Frequently Asked Questions | LC Tree and Landscaping | Wichita & Andover`
*   **Meta Description**: `Answers to common tree care questions in Wichita & Andover: insurance coverage, debris cleanup, estimate turnaround times, and job site expectations.`

#### 2. Section Breakdown & Wireframe Details

##### Section 7.1: Header
*   **Headline (H1)**: `Frequently Asked Questions`
*   **Subheadline**: `Clear answers about our tree removal, trimming, insurance, and cleanup procedures.`

##### Section 7.2: Collapsible Accordion Component
*   **Layout**: Modern accordion list with expandable panels, chevron toggle indicators, and smooth height transitions.
*   **Accessibility**: Full ARIA markup (`role="region"`, `aria-expanded="true/false"`, keyboard enter/space toggles).
*   **6 Complete Authoritative Q&A Items**:

    1.  **Q1: "Are you fully insured for large and hazardous tree removals?"**
        *   *Answer*: **Yes, absolutely.** LC Tree and Landscaping carries comprehensive general liability and property damage insurance. Tree removal often involves working at extreme heights and near structures, fences, and power lines. Our coverage guarantees that your home and property are 100% protected, giving you complete peace of mind. We are happy to provide certificates of insurance upon request.
    
    2.  **Q2: "Do you clean up all debris, branches, and sawdust after a job?"**
        *   *Answer*: **Meticulous cleanup is our hallmark.** We never leave a mess for the homeowner. We chip all branches, haul away heavy logs, rake twigs and debris from your lawn, and use commercial blowers to clear driveways, sidewalks, and patios. Our goal is to leave your yard looking cleaner than when we arrived.
    
    3.  **Q3: "How quickly can I get an estimate for my tree project?"**
        *   *Answer*: We know your time is valuable. When you call us or submit our online estimate form, owner **Lad Oborny personally responds within 24 hours**. In most cases, we can schedule an on-site property visit within 24 to 48 hours and deliver a clear, upfront written quote on the spot.
    
    4.  **Q4: "Do I need to be home when you perform the estimate or the actual tree work?"**
        *   *Answer*: **No, you do not need to be home.** For estimates, as long as the trees are accessible from outside (gates unlocked and pets indoors), Lad can evaluate the site and email or text you the quote. For scheduled work, you do not need to be present as long as we have clear access and vehicles are moved out of the work zone. We communicate with you before arrival and upon completion.
    
    5.  **Q5: "Will heavy equipment damage my lawn or landscaping?"**
        *   *Answer*: We take proactive measures to protect your turf. We utilize turf-friendly equipment and lay heavy-duty ground protection mats whenever traversing delicate grass. Our arborists use precision lowering and rigging techniques so that heavy branches are gently lowered under control rather than dropped freely onto your lawn.
    
    6.  **Q6: "What areas do you serve in and around Wichita?"**
        *   *Answer*: We proudly serve residential and commercial properties throughout **East Wichita, Andover, Bel Aire, Derby, Rose Hill, Kechi**, and nearby communities in Sedgwick and Butler counties.

##### Section 7.3: "Still Have Questions?" Help Box
*   **Visual Layout**: Highlighted card with border accent and direct contact options.
*   **Copywriting**: `Don't see your question answered here? Owner Lad Oborny is ready to assist you directly.`
*   **CTA Button**: `Call Lad at 316-393-7207` | `Send Us a Message →` (Links to `/contact.html`).

##### Section 7.4: Pre-Footer CTA
*   *Content*: Standard Pre-Footer CTA banner.

---

### Page 8: Contact Page (`contact.html` / `/contact`)

#### 1. Page Metadata
*   **Page Title**: `Contact Us | LC Tree and Landscaping, LLC | Call 316-393-7207`
*   **Meta Description**: `Contact LC Tree and Landscaping in Andover and East Wichita, KS. Call 316-393-7207 or send a message for fast estimates and emergency tree service.`

#### 2. Section Breakdown & Wireframe Details

##### Section 8.1: Header
*   **Headline (H1)**: `Contact LC Tree and Landscaping, LLC`
*   **Subheadline**: `Connect directly with owner Lad Oborny for fast scheduling, free estimates, or emergency tree care.`

##### Section 8.2: 2-Column Contact Info Grid & Quick Message Form
*   **Visual Layout**: 2-column layout (Left: Complete Contact Cards & Service Area Map; Right: Quick Estimate/Message Form).

###### Left Column: Comprehensive Contact Information & Map
*   **Card 1: Direct Phone (High Dominance)**:
    *   *Icon*: Phone receiver SVG.
    *   *Title*: `Call Owner Lad Oborny Directly`
    *   *Phone Link*: `316-393-7207` (Large font, high-contrast link, tap-to-call on mobile).
    *   *Note*: `Fastest way to get an answer or schedule emergency storm service.`
*   **Card 2: Email & Inquiries**:
    *   *Icon*: Mail envelope SVG.
    *   *Title*: `Email Inquiries`
    *   *Email*: `info@lctreeks.com` (Links to `mailto:info@lctreeks.com`).
    *   *Note*: `We respond to all email inquiries within 24 hours.`
*   **Card 3: Business Hours of Operation**:
    *   *Icon*: Clock / Calendar SVG.
    *   *Hours List*:
        *   **Monday – Friday**: `7:00 AM – 7:00 PM`
        *   **Saturday**: `8:00 AM – 5:00 PM`
        *   **Sunday**: `Emergency Storm Service / By Appointment`
*   **Card 4: Service Area Map**:
    *   *Title*: `Our Primary Service Area`
    *   *Description*: `Proudly serving East Wichita, Andover, and surrounding communities.`
    *   *Interactive Map Embed*: Responsive Google Map / OpenStreetMap centered on the Andover and East Wichita corridor with a visual boundary highlight.

###### Right Column: Quick Contact & Estimate Form
*   **Form Title (H2)**: `Send a Quick Message`
*   **Subtitle**: `Fill out the form below and Lad will get back to you within 24 hours.`
*   **Fields**:
    1.  `Name *` (`type="text"`, required)
    2.  `Phone Number *` (`type="tel"`, required)
    3.  `Email Address *` (`type="email"`, required)
    4.  `Service Needed *` (`select`: Tree Removal, Tree Trimming, Stump Grinding, Landscaping, General Question)
    5.  `Your Message / Project Location *` (`textarea`, required, rows: 4)
*   **Submit Button**: `Send Message`
*   **Trust Badges**: `🔒 100% Privacy • Fast 24-Hr Response • Fully Insured`

##### Section 8.3: Pre-Footer CTA
*   *Content*: Standard Pre-Footer CTA banner (`Prefer to talk now? Call 316-393-7207`).

---

## 3. Features Discovered Table

The table below documents every interface, visual component, form behavior, and interactive feature discovered across all 8 pages.

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|---|---|---|---|---|---|---|
| 1 | Navigation | Sticky Global Header | Persistent top navigation with logo, page links, dropdown, and primary CTA button | User scroll, click, touch | Fixed top bar, smooth scroll, route change | Graceful non-sticky fallback if JS disabled | Global Architecture / Wireframe |
| 2 | Navigation | Primary CTA Button ("Call Now: 316-393-7207") | High-contrast call trigger button anchored in header and page sections | Click / Tap | Initiates `tel:3163937207` phone dialer | If device cannot dial, shows copyable number | Global Architecture & Home Page |
| 3 | Navigation | Services Dropdown Menu | Desktop hover/click dropdown linking to specific service anchors | Mouse hover, focus, click | Reveals list: Tree Removal, Trimming, Stump Grinding, Landscaping | Closes on blur/outside click; accessible on mobile | Header Wireframe |
| 4 | Home Page | Hero Section with CTA Duo | High-impact visual hero with primary "Call Now" and secondary "Request an Estimate" buttons | Page load, CTA click | Visual banner with headline, subheadline, and direct conversion paths | Fallback to solid image if video fails | Home Page Wireframe |
| 5 | Home Page | Trust Bar Strip | Horizontal strip highlighting "Fully Insured", "Lad Oborny Owned", "5-Star Rated" | Page load | Icon badges with authority copy | Wraps responsively to 2x2 grid on mobile | Home Page Wireframe |
| 6 | Home Page | Core Services 4-Column Grid | Highlighting Tree Removal, Tree Trimming, Stump Grinding, Landscaping | Click / Tap on card or link | Navigates to dedicated service block on Services page | Responsive reflow to 1-col on mobile | Home Page Wireframe |
| 7 | Home Page | The LC Difference Section | 2-column differentiator section highlighting direct owner access, cleanup, and safety | Viewport scroll | Visual list of checkmarks with on-site owner imagery | Stacks vertically on smaller screens | Home Page Wireframe |
| 8 | Home Page | Interactive Before/After Image Slider | Interactive split image comparison tool showing hazardous tree before vs. pristine yard after | Mouse drag, touch swipe, keyboard arrows | Dynamically adjusts visible ratio of Before vs. After images | Falls back to side-by-side static images if JS disabled | Home Page Wireframe |
| 9 | Home Page / Gallery | Responsive Featured Video Embed | 16:9 embedded project video showing crane/rigging safety and cleanup in action | Click play button, keyboard space/enter | Plays MP4/embedded video with audio controls | Shows poster image fallback if video blocked | Home Page & Gallery Wireframe |
| 10 | Home Page | Featured Testimonial Snippet | Centered quote block quoting verified Andover homeowner praising Lad's cleanup | Page load | Formatted quote card with 5-star graphic | Text scales cleanly on mobile viewports | Home Page Wireframe |
| 11 | Global | Pre-Footer CTA Banner | Full-width bold primary color banner at page bottom with "Call 316-393-7207" | User reaches bottom of page | High-contrast conversion trigger | Links directly to dialer | Page-by-Page Wireframe |
| 12 | About Page | Meet the Owner Bio Block | 2-column section introducing Lad Oborny, his background, and local Andover/Wichita ties | Viewport scroll | Humanized brand bio paired with professional job-site portrait | Image stacks on top of text on mobile | About Page Wireframe |
| 13 | About Page | Values & Commitment 3-Column Grid | 3 cards outlining Safety First, Meticulous Cleanup, and Transparent Pricing | Viewport scroll | Distinct value cards with custom SVG icons | Reflows into single column on mobile | About Page Wireframe |
| 14 | Services Page | Detailed Service Breakdown Blocks | 4 alternating 2-column blocks detailing scope, safety, and techniques for each core service | Click navigation anchor or scroll | Detailed copy, high-res photos, and contextual "Request Estimate" buttons | Alternating layout resets to vertical stack on mobile | Services Page Wireframe |
| 15 | Gallery | Filterable Portfolio Masonry Grid | Dynamic grid filterable by "All", "Tree Removal", "Tree Trimming", "Stump Grinding", "Landscaping" | Filter button clicks | Smoothly animates and displays only matching project cards | Defaults to showing "All" if invalid filter passed | Gallery Wireframe |
| 16 | Gallery | Image Hover Captions & Overlay | Dark overlay displaying project title, location (e.g. Andover), and scope upon hover/focus | Mouse hover, keyboard focus, touch tap | Displays contextual overlay with text and zoom icon | Touch devices show overlay on initial tap | Gallery Wireframe |
| 17 | Gallery | Lightbox Modal Viewer | High-resolution image lightbox modal with enlarged view and captions | Click/tap on gallery item | Full-screen modal overlay with close button and prev/next controls | Closes on Esc key or background click | Gallery Wireframe |
| 18 | Estimate Page | 6-Field Lead Capture Form | Comprehensive lead form (Name, Phone, Email, Address, Service Dropdown, Details) | User text input, select change, form submit | Validates inputs, emits submission payload, shows success card | Shows inline red validation errors for invalid/empty fields | Request an Estimate Wireframe |
| 19 | Estimate Page | Form Trust Signals Strip | Security and assurance badges below submit button ("100% Secure", "No Obligation", "24-Hr Response") | Page load | Visual trust cues reinforcing form safety | Scales cleanly under button | Request an Estimate Wireframe |
| 20 | Estimate Page | "What to Expect" 3-Step Timeline | Explains 24-hr review, on-site assessment, and execution steps to eliminate user uncertainty | Viewport scroll | 3-step vertical visual card list | Stacks under form on mobile screens | Request an Estimate Wireframe |
| 21 | Testimonials | Aggregate 5.0 Rating Summary | Header banner showcasing overall 5.0 Google rating and 100% recommendation score | Page load | Formatted gold star badge with summary count | Accessible text alternatives for screen readers | Testimonials Wireframe |
| 22 | Testimonials | 6-Card Review Grid | Cards featuring reviewer name, location (Andover/Wichita), star graphics, and detailed quote | Viewport scroll | Card grid displaying authentic homeowner reviews | Responsively collapses to single column | Testimonials Wireframe |
| 23 | FAQ Page | Accessible Collapsible Accordion | 6 interactive Q&A items answering insurance, cleanup, turnaround, and home attendance questions | Mouse click, keyboard Enter/Space | Expands/collapses answer panel with height animation | Accessible `aria-expanded` and keyboard navigation | FAQ Wireframe |
| 24 | FAQ Page | Direct Owner Assistance Callout Box | Highlighted box prompting users with unique questions to call Lad Oborny directly | Viewport scroll | Callout card with direct phone link and contact button | Formatted with border highlight | FAQ Wireframe |
| 25 | Contact Page | 2-Column Contact Info Grid | Phone number, direct email, business hours, and primary service area | Viewport scroll | Structured contact cards with clickable phone/email links | Stacks neatly on mobile devices | Contact Page Wireframe |
| 26 | Contact Page | Interactive Service Area Map | Visual map embed highlighting Andover and East Wichita service boundaries | User pan/zoom/view | Responsive embedded map frame | Static fallback image if map script fails | Contact Page Wireframe |
| 27 | Contact Page | Quick Contact Message Form | Streamlined 5-field contact form for general inquiries | User text input and submit | Client-side validation and confirmation message | Inline validation error indicators | Contact Page Wireframe |
| 28 | Global Footer | 4-Column Information Grid | Brand/Owner info, Quick Links, Core Services, Service Areas & Trust Badges | Viewport scroll to footer | 4-column footer with copyright and privacy link | Collapses to 2 columns on tablet, 1 on mobile | Global Architecture Wireframe |

---

## 4. Edge Cases & Boundary Conditions

The following table records specific edge cases, input anomalies, device variations, and expected observed behaviors across the website pages.

| # | Feature | Input / Condition | Observed Behavior |
|---|---|---|---|
| 1 | Primary Phone CTA | Click on desktop browser without native telephony application | Opens default telephony protocol handler (e.g. FaceTime, Skype, Windows Phone Link) or prompts user to copy phone number `316-393-7207` |
| 2 | Primary Phone CTA | Tap on mobile smartphone (iOS / Android) | Immediately initiates native cellular dialer with `tel:3163937207` pre-populated |
| 3 | Estimate Form | Submit with empty required fields (e.g. missing Phone or Name) | Form halts submission; highlights missing fields with red border; displays inline error "Please enter your [Field Name]"; scrolls focus to first invalid input |
| 4 | Estimate Form | Submit with invalid phone format (e.g. `12345` or letters) | Regex validator triggers error: "Please enter a valid 10-digit phone number (e.g., 316-555-0123)"; prevents submission |
| 5 | Estimate Form | Submit with invalid email format (e.g. `test@` or `test.com`) | HTML5 & JS email validator blocks submit; displays "Please enter a valid email address" |
| 6 | Estimate Form | Form submission during network offline / server outage | Displays graceful error card: "Network error. Please call Lad Oborny directly at 316-393-7207 for your estimate" |
| 7 | Before/After Slider | Rapid touch dragging or window resizing | Slider handle recalculates bounding box dynamically; clamps position strictly between 0% and 100%; prevents overflow |
| 8 | Before/After Slider | Keyboard accessibility (Tab to focus handle, Left/Right arrow keys) | Left arrow moves slider left by 5%; Right arrow moves slider right by 5%; updates `aria-valuenow` |
| 9 | Portfolio Filter | Rapid clicking between filter categories ("Removal" -> "Trimming" -> "All") | Cancels in-flight animation; cleanly displays only matching items without layout shift or overlapping cards |
| 10 | Portfolio Filter | Filter selected with zero matching items (hypothetical edge case) | Displays friendly notice: "No projects currently in this category. Call Lad at 316-393-7207 to discuss your project." |
| 11 | FAQ Accordion | Multiple items clicked in sequence | Expanded panel slides open smoothly; optional configuration allows either single open panel or multi-accordion expansion; updates `aria-expanded` |
| 12 | FAQ Accordion | Deep link with hash (e.g. `faq.html#q-insurance`) | Page loads, automatically scrolls to target question, and auto-expands the corresponding accordion panel |
| 13 | Services Page | Deep link to anchor (e.g. `services.html#stump-grinding`) | Page loads and smooth-scrolls to the exact Stump Grinding service block, accounting for sticky header offset |
| 14 | Responsive Header | Viewport width resized from 1200px (desktop) down to 375px (mobile) | Navigation links collapse into accessible hamburger drawer menu; "Call Now" button stays prominently visible in sticky header |
| 15 | Gallery Lightbox | Keyboard Esc pressed while modal is open | Lightbox closes immediately, restores focus to the trigger thumbnail card, and unlocks body scroll |
| 16 | Contact Page Map | Embedded map blocked by adblocker or no internet | Displays fallback static map image showing East Wichita and Andover boundary overlay with contact details |

---

## 5. Component Interaction & State Specifications

### 1. Before/After Image Comparison Slider (Home Page)
*   **State Matrix**:
    *   *Default*: Divider set to 50% width.
    *   *Hover*: Cursor changes to `ew-resize`; divider handle gently pulses.
    *   *Active / Dragging*: Divider follows mouse X-coordinate or touch X-coordinate proportionally within container width.
    *   *Labels*: "BEFORE" (left) and "AFTER" (right) labels maintain readability against varying background image contrast.
*   **DOM Structure**:
    ```html
    <div class="comparison-slider" role="region" aria-label="Before and after tree removal comparison">
      <img src="after-tree-removal.jpg" alt="Pristine lawn after tree removal" class="image-after" />
      <div class="image-before-wrapper" style="width: 50%;">
        <img src="before-tree-removal.jpg" alt="Hazardous storm-damaged tree before removal" class="image-before" />
      </div>
      <input type="range" min="0" max="100" value="50" class="slider-control" aria-label="Comparison slider position" />
      <div class="slider-handle" style="left: 50%;"></div>
    </div>
    ```

### 2. Collapsible Accordion (FAQ Page)
*   **State Matrix**:
    *   *Collapsed*: Panel height `0px`, `display: none` or `visibility: hidden` (via CSS max-height transition), `aria-expanded="false"`, toggle chevron points down (`transform: rotate(0deg)`).
    *   *Expanded*: Panel opens to `auto` height, `aria-expanded="true"`, toggle chevron points up (`transform: rotate(180deg)`), content receives focus outline on tab.
*   **Keyboard Navigation**: `Enter` or `Space` toggles the focused question; `Down Arrow` moves focus to next question header.

### 3. Filterable Gallery Grid (Our Work Page)
*   **State Matrix**:
    *   *Filter Active*: Selected filter button has filled background color, `aria-selected="true"`.
    *   *Filter Inactive*: Outline button with neutral text color.
    *   *Item Transition*: Non-matching items fade out (`opacity: 0; transform: scale(0.95); display: none`), matching items fade in (`opacity: 1; transform: scale(1.0)`).

---

## 6. Lead Capture Form & Validation Architecture

### Form Validation Rules Matrix

| Field Name | Type | Required | Validation Regex / Rule | Error Message |
|---|---|---|---|---|
| `full_name` | Text | Yes | `minlength="2"`, non-empty | "Please enter your full name." |
| `phone` | Tel | Yes | `^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$` | "Please enter a valid 10-digit phone number (e.g., 316-555-0123)." |
| `email` | Email | Yes | `^[^\s@]+@[^\s@]+\.[^\s@]+$` | "Please enter a valid email address." |
| `address` | Text | Yes | `minlength="5"`, non-empty | "Please enter your property address and city." |
| `service` | Select | Yes | Must not equal initial disabled empty value | "Please select the primary service needed." |
| `details` | Textarea | No | Optional (`maxlength="1000"`) | N/A |

### Submission Flow & Lead Safety Protocol
1.  **Client-Side Check**: On `submit`, evaluate all inputs against validation rules.
2.  **Submit State**: Button text changes to "Sending Request..." with a rotating loading spinner; button is disabled to prevent duplicate submissions.
3.  **Success Feedback**: Form container is replaced with a success card:
    *   Headline: `Request Received Successfully!`
    *   Body: `Thank you, [Name]. Owner Lad Oborny will review your request and contact you at [Phone] within 24 hours.`
4.  **Error Recovery**: If submission fails (e.g. server timeout), display an alert banner: `Submission error. Please call Lad directly at 316-393-7207 to schedule your estimate immediately.`

---

## 7. Responsive Breakpoint Specifications

| Viewport Category | Width Range | Layout Adjustments & Behavioral Rules |
|---|---|---|
| **Mobile (Small & Large)** | `320px` to `767px` | • Sticky header displays logo, compact "Call Now" button, and hamburger menu toggle.<br>• Hero headline adjusts to `28px–34px`; CTA buttons stack vertically (Full width).<br>• Trust bar reflows to 2x2 grid or single column stack.<br>• Core Services & Gallery grids display in 1 column.<br>• Split layouts (Difference, About, Services, Estimate, Contact) stack vertically.<br>• Touch-friendly touch targets (min `48x48px`). |
| **Tablet** | `768px` to `1023px` | • Navigation menu displays either compact inline links or responsive drawer.<br>• Core services grid displays in 2-column layout.<br>• Testimonial and values grids display in 2-column layout.<br>• Estimate and Contact forms utilize 50/50 or stacked layout depending on orientation. |
| **Desktop & Wide** | `1024px` to `1440px+` | • Full horizontal sticky navigation bar with dropdown and prominent CTA.<br>• 3-column and 4-column card grids with full hover animations.<br>• Full split 2-column layouts for high visual engagement.<br>• Max content container width constrained to `1200px–1280px` for optimal readability. |

---

## 8. Accessibility & Quality Standards (WCAG 2.1 AA)

1.  **Color Contrast**: All text on background colors meets or exceeds the WCAG 2.1 AA contrast ratio of `4.5:1` for normal body copy and `3.0:1` for large heading text.
2.  **Keyboard Navigability**:
    *   All interactive elements (links, buttons, accordion headers, slider handle, form fields) are accessible via `Tab` navigation with visible `:focus-visible` outline rings.
    *   Skip-to-content link provided as the first focusable element on every page.
3.  **Screen Reader Compatibility**:
    *   All images include descriptive `alt` text (e.g. `alt="Lad Oborny and crew safely lowering a large tree branch in Andover"`).
    *   Interactive icons and star rating graphics include `aria-label` tags (e.g. `aria-label="5 out of 5 star rating"`).
    *   Accordion panels and modal lightboxes use proper `aria-expanded`, `aria-controls`, and `aria-hidden` attributes.
4.  **Form Accessibility**:
    *   Every form field is explicitly associated with a visible `<label>` element using matching `for` and `id` attributes.
    *   Required fields indicate requirement visually (`*`) and programmatically (`required` / `aria-required="true"`).

---

## 9. Verification & Delivery Confirmation

This specification provides the comprehensive blueprint required for implementing all 8 pages of the LC Tree and Landscaping, LLC website. Every page, section, component, form field, copy cue, trust element, and responsive rule has been mapped directly to the authoritative architecture source.
