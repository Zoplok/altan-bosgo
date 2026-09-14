---
name: Altan Bosgo Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45474c'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cc'
  surface-tint: '#585e6f'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#151b2a'
  on-primary-container: '#7d8496'
  inverse-primary: '#c0c6da'
  secondary: '#7d5700'
  on-secondary: '#ffffff'
  secondary-container: '#ffc55f'
  on-secondary-container: '#755100'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#00174b'
  on-tertiary-container: '#497cff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f6'
  primary-fixed-dim: '#c0c6da'
  on-primary-fixed: '#151b2a'
  on-primary-fixed-variant: '#404757'
  secondary-fixed: '#ffdeaa'
  secondary-fixed-dim: '#f5bd58'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5f4100'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#003ea8'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.025em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies academic distinction, intellectual ascension, and progressive educational technology. Derived directly from the visual symbolism of the "Golden Portal" (portal archway, celestial stair, open tome, and scholar's mortarboard), the aesthetic balances the timeless authority of classical scholarship with the kinetic clarity of modern fintech and SaaS applications.

### Design Principles
- **Prestigious Trust:** Deep midnight foundations and warm academic gold accents build institutional confidence for students, parents, and universities navigating higher education choices.
- **Data Lucidity:** Educational decisions require rigorous metric comparisons (ЭЕШ score thresholds, tuition ranges, employment statistics). Typography, badges, and layout hierarchy emphasize effortless scanability.
- **Sovereign Clarity:** UI components honor bilingual and Cyrillic script demands with balanced letter spacing, generous x-heights, and structured line heights.
- **Architectural Harmony:** Geometric forms borrow from the portal arch motif—crisp geometry tempered by soft inner radiuses and disciplined borderlines.

## Colors

The color palette draws directly from the brand insignia: a nocturnal navy foundation, luminous imperial gold, and high-clarity neutrals.

### Palette Architecture
- **Primary Navy (`#0B1220`):** Acts as the foundational anchor. Used for primary typography and high-emphasis headers in light mode; serves as canvas background in dark mode.
- **Academic Gold (`#D9A441` / Hover `#E5B254` / Subtle Tint `#FDF8EE`):** Signifies achievement, honors, scholarship thresholds, and high-order CTA moments.
- **Functional Accent Blue (`#2563EB`):** Applied to active states, links, filters, and standard digital interactions where high contrast is necessary.
- **Verification Emerald (`#10B981` / Dark Mode Tint `#064E3B`):** Reserved strictly for institutional accreditations (`✓ Баталгаатай`), active admissions badges, and verified career data.
- **Light Surfaces:** Base canvas `#F8FAFC`, elevated container cards `#FFFFFF`, secondary nested blocks `#F1F5F9`.
- **Dividers & Strokes:** `#E2E8F0` on light mode; `#1E293B` on dark mode.

## Typography

The typographic hierarchy pairs the structured, geometry-conscious **Plus Jakarta Sans** for headlines, stats, and branding cues with the neutral legibility of **Inter** for Cyrillic body copy, course curriculums, and tabular data.

### Cyrillic Optimization
- Headers feature tight negative tracking (`-0.02em` to `-0.015em`) to retain visual density across wide Cyrillic uppercase and lowercase glyph sets (e.g., Ж, Ш, Щ, Ю, Ф).
- Body copy uses relaxed line heights (minimum 1.5x) to maintain effortless readability during prolonged scanning of admission requirements and program guidelines.
- Numeric weights (TUITION, ЭЕШ threshold scores, ranks) leverage tabular figures (`tnum`) for exact vertical alignment in comparison matrices.

## Layout & Spacing

A structured 12-column responsive fluid grid governs desktop and tablet breakpoints, collapsing into an agile 4-column system on mobile viewports.

### Grid Breakpoints & Alignment
- **Desktop (1280px+):** 12 columns, max container width of 1200px, 24px gutters, 32px safe margins.
- **Tablet (768px - 1279px):** 8 columns, 20px gutters, 24px margins.
- **Mobile (320px - 767px):** 4 columns, 12px gutters, 16px margins.

### Vertical Rhythm
Layout spacing operates strictly on an 8pt base grid with a 4pt sub-scale (`0.25rem`, `0.5rem`, `1rem`, `1.5rem`, `2.5rem`). Section separators maintain clear 64px to 96px whitespace gaps, prioritizing breathable structure between university directory cards, search toolbars, and institutional scoreboards.

## Elevation & Depth

Visual hierarchy uses a refined combination of crisp hairline borders and soft ambient shadows. Surfaces appear tactile and elevated rather than aggressively detached.

### Elevation Hierarchy
- **Level 0 (Base Canvas):** `#F8FAFC` (Light) / `#0B1220` (Dark). Completely flat, grounding all operational components.
- **Level 1 (Card & Content Blocks):** `#FFFFFF` (Light) / `#111827` (Dark). Border stroke `1px solid #E2E8F0` (Light) or `#1E293B` (Dark). Shadow: `0 1px 3px 0 rgba(11, 18, 32, 0.04), 0 1px 2px -1px rgba(11, 18, 32, 0.04)`.
- **Level 2 (Hovered Cards, Popovers, Dropdowns):** Subtle ambient diffusion: `0 10px 25px -5px rgba(11, 18, 32, 0.08), 0 8px 10px -6px rgba(11, 18, 32, 0.04)`.
- **Level 3 (Sticky Navigation, Modals, Comparison Drawers):** `0 20px 30px -10px rgba(11, 18, 32, 0.16)`. In light mode, navigation applies a glassmorphic blur (`backdrop-filter: blur(12px)`) with `rgba(255, 255, 255, 0.85)` surface opacity.
- **Gold Accent Glow:** For verified university highlights or star threshold markers, use a focused golden halo: `0 0 0 1px #D9A441, 0 4px 14px rgba(217, 164, 65, 0.25)`.

## Shapes

The design system employs a **Rounded** shape language (`roundedness: 2`), reflecting the architectural curve of the arch portal in the logo.

### Radius Distribution
- **Base Components (`0.5rem` / 8px):** Standard buttons, text inputs, filter selectors, dropdown panels, and table row containers.
- **Container Surfaces (`1rem` / 16px):** University cards, comparison widgets, modal sheets, and scorecard tiles.
- **Outer Shells & Hero Banners (`1.5rem` / 24px):** Major educational showcase banners, search bars, and onboarding prompts.
- **Pills (`9999px`):** Status chips, ЭЕШ score tags, verified accreditation emblems (`✓ Баталгаатай`), and quick-tag search filters.

## Components

### Buttons
- **Primary (Gold Sovereign):** Background `#D9A441`, text `#0B1220` (bold, high contrast), border radius 8px. Hover shifts to `#E5B254` with subtle translateY(-1px).
- **Secondary (Navy Academic):** Background `#0B1220`, text `#FFFFFF`. Hover shifts to `#1E293B`.
- **Outline / Ghost:** 1px border `#E2E8F0` (`#1E293B` in dark), text `#111827` (`#F8FAFC` in dark).

### Badges & Filter Chips
- **Verified Badge:** Background `#ECFDF5`, text `#065F46`, border `1px solid #A7F3D0`. Includes leading checkmark icon: `✓ Баталгаатай`. Dark mode maps to background `#064E3B`, text `#6EE7B7`.
- **Threshold Score Chip (ЭЕШ Оноо):** Pill container with `#FDF8EE` background, `#92400E` text, and `#FDE68A` border. Displays qualifying score bars (e.g., `Босго оноо: 620+`).
- **Interactive Quick-Tags:** Full-pill shaped with subtle transition states; toggled states fill with `#0B1220` (or `#D9A441` in dark mode).

### University Directory Card
- Structural card with a 16px radius, enclosed by a 1px slate hairline border.
- Header incorporates university crest, English and Mongolian official titles, and the emerald accreditation badge.
- Body displays a 3-column metric grid: Minimum Admission Score (ЭЕШ), Annual Tuition Counter (Төлбөр), and Employment Rate (Ажил эрхлэлт).
- Bottom anchor provides a dual CTA: "Харьцуулах" (Add to Compare) ghost action and "Хөтөлбөрүүд" (Explore Programs) gold primary action.

### Comparative Table
- Sticky header featuring primary Navy accents with subtle horizontal separators.
- Alternating row zebra tints (`#F8FAFC` in light mode, `#0F172A` in dark mode).
- Standardized metric indicators with dedicated threshold chips and visual check/cross status flags.

### Input Fields & Search Bars
- Large search inputs equipped with an integrated magnifying glass icon, trailing keyboard shortcut prompt (`⌘K`), and bottom-anchored popular quick-tag filters.
- Active states highlight using a 2px ring: `#D9A441` with zero interior inset blur.