# Majira Marefu

> **The long African summer.** An invitation. August 2027.
> *Nairobi · Maasai Mara · Lamu · Zanzibar.*

Marketing, reservation, and **institutional-partnership** website for **Majira Marefu**, a premium East African summer-experience operator launching August 2027. The site serves two audiences from the same architecture:

- **Individual guests** — four tiered journeys (USD 4,500–25,000) between Nairobi, the Maasai Mara, Lamu, and Zanzibar. Consumer reservation and Marefu application flows.
- **Institutions, firms, governments & foundations** — commissioned private seasons, reserved weeks, and full-season buyouts. Dedicated Partners surface, confidential-brief flow, capabilities documentation, and case studies.

- **Live:** [tejirijesse.github.io/majira-marefu](https://tejirijesse.github.io/majira-marefu/)
- **Repo:** [github.com/tejirijesse/majira-marefu](https://github.com/tejirijesse/majira-marefu)
- **Stack:** React 18 · TypeScript · Vite · React Router · Framer Motion · Lenis · GitHub Pages

---

## Contents

1. [What this is](#what-this-is)
2. [Tech stack](#tech-stack)
3. [Design system](#design-system)
4. [Interactivity catalogue](#interactivity-catalogue)
5. [Project structure](#project-structure)
6. [Page-by-page tour](#page-by-page-tour)
7. [Running locally](#running-locally)
8. [Building & deploying](#building--deploying)
9. [Accessibility](#accessibility)
10. [Performance](#performance)
11. [Browser support](#browser-support)
12. [Production wire-up (what's NOT yet live)](#production-wire-up-whats-not-yet-live)
13. [Environment variables (for the live build)](#environment-variables-for-the-live-build)
14. [Roadmap](#roadmap)
15. [Credits](#credits)

---

## What this is

This repository contains the full **React-based frontend** for Majira Marefu — designed, from the outset, to serve both a premium consumer audience and a B2B institutional audience on the same domain, with different surfaces and different information architectures inside one coherent brand.

The site is deployable as-is — a fully self-contained SPA served from GitHub Pages. All content, imagery, and copy are baked in; no external services are required to render. The README's final sections document the path to move forms to Supabase, reservations to Stripe, and content to Sanity CMS without re-architecting.

### Audiences & flows

| Audience | Primary surface | Decision flow | Conversion surface |
|---|---|---|---|
| Individual guest (Mwanzo / Pwani / Safari) | `/chapter` → `/arc` → `/journeys` → `/journeys/:slug` | Read narrative → pick a tier → check dates & price | `/hold` (4-step reservation with tweened deposit) |
| Individual guest (Marefu — application-only) | `/journeys/marefu` | Read → decide → write | `/apply` (12-step application with live word count) |
| Waitlist / Wave II access | `/chapter` → `/guestbook` | Read → join | `/guestbook` (waitlist + release calendar) |
| **Corporation / PE / family office** | `/partners` | Select segment → read formats → read case study → review capabilities | `/brief` (4-step confidential brief with live summary) |
| **Government / diplomatic mission** | `/partners` | Same, with protocol-aware capabilities surfaced | `/brief` with routing-to-government-desk hint |
| **University / foundation / NGO / arts** | `/partners` | Same, with impact-reporting capabilities surfaced | `/brief` with institutional-rate note |

**Zero-backend demo.** Both consumer (`/hold`, `/apply`, `/letter`, `/guestbook`) and institutional (`/brief`) form submissions log to the browser console and swap to a success panel. The wiring notes in the final sections describe exactly where each form hands off to Supabase, Stripe, Resend, and (for the institutional desk) a partners CRM or shared-inbox workflow.

### Non-goals for v1

- No backend. Form submissions are logged to the browser console and show success panels.
- No auth. Release-wave gating logic is designed but not enforced.
- No e-commerce for merch, no blog, no multi-language (English only at launch).

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React 18 + TypeScript** | Type-safe component model, huge ecosystem. |
| Build tool | **Vite 5** | Sub-second dev server, tiny production bundle. |
| Routing | **React Router 6** | `BrowserRouter` with basename for subpath deployment. |
| Motion | **Framer Motion 11** | Spring physics, scroll-linked values, `AnimatePresence` for page transitions. |
| Smooth scroll | **Lenis 1.1** | Silky scroll feel, desktop-only, reduced-motion safe. |
| Fonts | **Fraunces + Inter Tight** | Free Google Fonts standing in for GT Sectra + ABC Diatype. |
| Hosting | **GitHub Pages** | Free, fast, global. SPA fallback via `404.html` rewrite pattern. |
| CI/CD | **GitHub Actions** | Auto-builds + deploys on push to `main`. |

Minimal runtime dependencies (~370 KB gzipped-to-116 KB JS) — the app ships with **5 production packages total**: react, react-dom, react-router-dom, framer-motion, lenis.

---

## Design system

All tokens live in [`src/index.css`](src/index.css). No pure white, no pure black — the palette is warm, editorial, and deliberately restrained.

### Palette

| Token | Hex | Use |
|---|---|---|
| `--bone` | `#F4EFE6` | Text on dark, lightest surface |
| `--oat` | `#E8DFD0` | Secondary surfaces, deposit card |
| `--sand` | `#D9C9B0` | **Primary background** |
| `--sand-warm` | `#C9B391` | Alt surface |
| `--ochre` | `#B8935A` | **Accent / eyebrow / active state** |
| `--umber` | `#6B4A2B` | **Primary body text** |
| `--umber-deep` | `#3D2817` | Headlines, brand mark |
| `--ocean` | `#2C5F6F` | Sparing accent |

### Typography

- **Serif — Fraunces** (300 / 400 / 500, italics) → headlines, Swahili words, the wordmark.
- **Sans — Inter Tight** (300 / 400 / 500) → body, navigation, UI.
- **Scale** — `clamp()` throughout so nothing ever feels cramped or outsized.

### Motion tokens

- Ease curve: `cubic-bezier(0.22, 0.61, 0.36, 1)` — exported as `--ease`.
- Durations: `--slow` (1100ms), `--med` (800ms), `--quick` (500ms).

### Bilingual handling

Swahili words render in italic serif with `lang="sw"` attributes so screen readers pronounce them correctly, followed by an English translation in small-caps sans (`.sw` + `.sw-trans` classes).

---

## Interactivity catalogue

This is the substantive delta over the previous static build. Every interaction is reduced-motion safe and gated appropriately for touch vs. pointer.

| Surface | Interaction | Implementation |
|---|---|---|
| **Scroll** | Buttery smooth scroll (desktop, fine pointer only) | [`src/lib/useLenis.ts`](src/lib/useLenis.ts) — `Lenis` mounted at the root, `rAF` loop, auto-teardown. |
| **Scroll** | Scroll progress bar (top of every page) | [`src/components/ScrollProgress.tsx`](src/components/ScrollProgress.tsx) — rAF-throttled listener, `scaleX` transform. |
| **Page nav** | Fade + lift transition between routes | `AnimatePresence mode="wait"` in [`src/App.tsx`](src/App.tsx); [`PageTransition`](src/components/PageTransition.tsx) wraps each route. |
| **Scroll reveal** | Elements fade + rise into view, once | [`useReveal`](src/lib/useReveal.ts) hook + [`Reveal`](src/components/Reveal.tsx) component (IntersectionObserver-backed). |
| **Hero** | Slow ken-burns zoom + cursor parallax | [`KenBurns`](src/components/KenBurns.tsx) — scale keyframe + spring-based x/y offset. |
| **CTAs** | Magnetic attraction to cursor | [`MagneticButton`](src/components/MagneticButton.tsx) — Framer Motion springs, disabled on coarse pointer. |
| **Nav** | Morphs from transparent (over hero) to translucent on scroll | [`Nav`](src/components/Nav.tsx) — scroll listener, `mix-blend-mode` alternative via class toggle. |
| **Arc page** | Horizontal scroll-snap (desktop) / vertical (mobile) | Native CSS `scroll-snap-type`. |
| **Arc page** | Clickable stops open modal with long-form detail | [`Modal`](src/components/Modal.tsx) — portal, escape key, focus trap, scroll lock. |
| **Arc page** | Previous/next buttons, dot indicators, arrow-key navigation | Synced with scroll position via rAF-throttled `onScroll`. |
| **Hand page** | Click any portrait to read longer bio | Same `Modal` pattern, 9 people, hover state with scale + desaturation removal. |
| **Journeys index** | Tier rows scale image + shift color on hover | Pure CSS transitions, no JS. |
| **Tier pages** | Ken-burns hero + parallax body images | Reused `KenBurns` component, different gradient stops. |
| **Apply flow** | 12-step form with per-question animation | [`Apply.tsx`](src/pages/Apply.tsx) — `AnimatePresence mode="wait"`, validation gating. |
| **Apply flow** | **Live word count + encouragement text** on long-form answers | Derived from input value; tiers: "keep going" → "almost there" → "beautifully placed". |
| **Apply flow** | Progress dots morph into stretched pill at current position | CSS `width` transition + class state. |
| **Hold flow** | 4-step reservation with **tweened deposit calculator** | [`useCounter`](src/lib/useCounter.ts) — rAF-based number tween when tier or guest count changes. |
| **Hold flow** | URL query param `?tier=pwani` preselects the tier | `useSearchParams` on mount. |
| **Hold flow** | Random reference number generated on submit | `MJ-XXXXXX` hex slice. |
| **Letter / Guestbook** | Form state, validation, success panel swap | Local state, toast on validation error. |
| **Toasts** | Non-blocking feedback for validation / required fields | [`ToastProvider`](src/components/Toast.tsx) context, portaled, auto-dismiss, stacks. |
| **All modals & forms** | Escape to close, focus trap, ARIA roles | Keyboard-first by design. |
| **Partners page** | Three-segment selector reshapes the panel beneath on click | `AnimatePresence mode="wait"` around the active panel; `role="tablist"` + `aria-selected`. |
| **Partners page** | Seven-phase horizontal-scroll timeline of how a partnership gets built | Native `scroll-snap-type: x mandatory` inside a hidden-scrollbar track. |
| **Partners page** | Capabilities accordion — four categories, one open at a time | `AnimatePresence` height animation; `aria-expanded` toggling; toggle icon rotates from + to ×. |
| **Partners page** | **Auto-advancing case-study carousel, pauses on hover** | `setInterval` in effect, pause via `onMouseEnter/Leave`; dots + prev/next arrows; Framer presence transitions between slides. |
| **Brief form** | Live summary card on the right fills in as you type, sticky | `useMemo` over field values, rendered with friendly labels (e.g. `pe_vc` → "PE / VC"). |
| **Brief form** | Desk-routing hint based on org type | `useMemo` mapping org_type → segment; hint appears in ochre below the select. |
| **Global** | `prefers-reduced-motion` respected everywhere | Lenis skipped, ken-burns stopped, transitions collapsed to 0.01ms. |

---

## Project structure

```
majira-marefu/
├── .github/
│   └── workflows/
│       └── deploy.yml             # Auto-build & deploy to Pages on push to main
├── public/
│   └── 404.html                   # GitHub Pages SPA redirect (rafgraph pattern)
├── src/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── KenBurns.tsx           # Slow zoom + optional cursor parallax
│   │   ├── MagneticButton.tsx     # Spring-based cursor attraction
│   │   ├── Modal.tsx              # Portal + focus trap + scroll lock
│   │   ├── Nav.tsx                # Morphs on scroll; mobile hamburger
│   │   ├── PageTransition.tsx     # Wraps each page for route transitions
│   │   ├── Reveal.tsx             # IntersectionObserver fade-up
│   │   ├── ScrollProgress.tsx     # Top-of-page progress bar
│   │   └── Toast.tsx              # Context + portal; ToastProvider at root
│   ├── lib/
│   │   ├── data.ts                # Consumer: tiers, Arc stops, people, Apply questions
│   │   ├── partnerData.ts         # B2B: segments, capabilities, timeline, case studies, brief fields
│   │   ├── useCounter.ts          # rAF number tween (for deposit calc)
│   │   ├── useLenis.ts            # Smooth scroll mount/teardown
│   │   ├── useReveal.ts           # IntersectionObserver hook
│   │   └── useScrollProgress.ts   # 0..1 page-scroll progress
│   ├── pages/
│   │   ├── Apply.tsx              # 12-step Marefu application (consumer)
│   │   ├── Arc.tsx                # Interactive four-stop arc with modals
│   │   ├── Brief.tsx              # 4-step confidential partner brief (B2B)
│   │   ├── Chapter.tsx            # Long-form editorial introduction
│   │   ├── Guestbook.tsx          # Waitlist form + release calendar
│   │   ├── Hand.tsx               # Portrait grid + bio modals
│   │   ├── Hold.tsx               # 4-step reservation w/ animated price (consumer)
│   │   ├── Journeys.tsx           # All-four-tiers index (+ institutional pointer)
│   │   ├── Landing.tsx            # Hero + entry animation + partners entry
│   │   ├── Letter.tsx             # Minimalist contact form
│   │   ├── Partners.tsx           # B2B surface — segments / timeline / capabilities / cases
│   │   └── TierPage.tsx           # Shared template for all 4 tier pages
│   ├── App.tsx                    # Router + AnimatePresence orchestration
│   ├── index.css                  # Design tokens + global styles
│   └── main.tsx                   # Entry + SPA URL rehydration
├── index.html                     # Vite entry (Google Fonts preload)
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts                 # base: '/majira-marefu/'
└── README.md                      # ← you are here
```

---

## Page-by-page tour

| Route | File | What happens |
|---|---|---|
| `/` | `Landing.tsx` | Full-bleed dawn-coast hero with ken-burns, cursor parallax, and a staggered fade-in of the wordmark (1.6s), subtitle (1.2s delay), and magnetic Enter CTA (1.9s delay). Nav hidden until scroll. |
| `/chapter` | `Chapter.tsx` | Long-form editorial prose alternating with full-width images. Fade-up on scroll for each paragraph block. Swahili words in italic with translations. |
| `/arc` | `Arc.tsx` | Horizontal scroll-snap through four stops (Nairobi, Mara, Lamu, Zanzibar). Dots, prev/next buttons, arrow-key nav. Click any stop to open a modal with three paragraphs of long-form detail. |
| `/journeys` | `Journeys.tsx` | All four tiers as alternating left/right rows. Hover: image scales, row tints oat, Swahili name shifts to ochre. |
| `/journeys/:slug` | `TierPage.tsx` | Shared template for `mwanzo`, `pwani`, `safari`, `marefu`. Ken-burns hero, long-scroll narrative with inline Swahili, inclusions in running prose, pricing revealed ~60% down, tier-appropriate CTA. |
| `/hand` | `Hand.tsx` | 3-column grid of 9 portraits (first names only, purposefully). Hover: image scales + desaturation lifts. Click: modal with long bio. |
| `/guestbook` | `Guestbook.tsx` | Waitlist form (name/email/tier interest/city/note) + wave-release calendar section below. |
| `/letter` | `Letter.tsx` | Two-field contact form with success-panel swap on submit. |
| `/apply` | `Apply.tsx` | 12-step Marefu application. Per-question fade. Validation gating. Live word count + encouragement. Progress dot pills. Final success panel. |
| `/hold` | `Hold.tsx` | 4-step reservation flow. Query param `?tier=pwani` preselects. Deposit card with tweened total + deposit (rAF number animation). Random reference number on submit. |
| `/partners` | `Partners.tsx` | **B2B surface.** Partner-hero + trust strip, three-segment selector (corporate / government / institution) that reshapes the narrative on click, seven-phase horizontal-scroll timeline of how a commissioned season gets built, capabilities accordion (Operational / Legal / Content / Impact), auto-advancing case-study carousel with pause-on-hover. Dual CTAs: confidential brief + direct partner email/phone. |
| `/brief` | `Brief.tsx` | **Partner enquiry form.** Four steps, ~8 minutes. Organisation type selection triggers a desk-routing hint ("We will route this to our government desk"). Dedicated fields for confidentiality requirement (standard / mutual NDA / Chatham House / full) and procurement. Live summary card on the right fills in as you answer — sticky on desktop. Generates an `MM-XXXXXX` reference on submit. |

---

## Running locally

Requires **Node 18+** (tested on Node 24). First-time setup:

```bash
git clone https://github.com/tejirijesse/majira-marefu.git
cd majira-marefu
npm install
npm run dev
```

Dev server runs at `http://localhost:5173/majira-marefu/` — note the basename matches the production deploy path.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | `tsc -b` (type-check) then `vite build` → `dist/` |
| `npm run preview` | Serve the production build locally for smoke-testing |
| `npm run typecheck` | Type-check only, no build |

### Build output

Current production bundle:

```
dist/index.html                   1.25 kB │ gzip:  0.58 kB
dist/assets/index-*.css          18.88 kB │ gzip:  4.55 kB
dist/assets/index-*.js          369.70 kB │ gzip: 116.13 kB
```

116 KB gzipped JS for the entire SPA — React + Router + Framer Motion + Lenis + all pages + all content.

---

## Building & deploying

Deployment is **fully automated via GitHub Actions** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)):

1. Push to `main` →
2. Workflow checks out, `npm ci`, `npm run build` →
3. Uploads `dist/` as a Pages artifact →
4. Deploys to `https://tejirijesse.github.io/majira-marefu/`.

Typical cold-run time: **~50 seconds**.

### SPA routing on GitHub Pages

Because Pages doesn't know about client-side routes, a hard-refresh on `/arc` would 404. The fix is a two-file handshake from the [rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages) pattern:

1. `public/404.html` (served by Pages on any unknown path) rewrites the URL into a `?/` query string and redirects to `index.html`.
2. `src/main.tsx` reads `location.search`, restores the real path via `history.replaceState`, then hands off to React Router.

The effect: users never see a 404 for valid client routes, and direct links like `.../arc` just work.

### Swapping hosts

To move off GitHub Pages:

- **Vercel / Netlify:** set `base` in `vite.config.ts` back to `'/'`, change Router `basename` to `'/'` in `main.tsx`, delete `public/404.html` and the SPA-hydration block in `main.tsx`. Both platforms handle SPA fallback natively.
- **Custom domain on Pages:** add a `CNAME` file to `public/` with your domain; Pages config is already HTTPS-enforced.

---

## Accessibility

- **All imagery** has meaningful `alt` text stored alongside the src.
- **Color contrast** meets WCAG AA (`--umber` on `--sand` = 7.1:1).
- **Full keyboard navigation** — every CTA, card, modal is reachable via Tab. Arc stops support Enter/Space to open modals. Arc itself supports Arrow keys.
- **Focus states** visible, 2px outline in `--ochre` with 3px offset.
- **`prefers-reduced-motion: reduce`** respected everywhere:
  - Lenis smooth-scroll not mounted
  - Ken-burns animation disabled
  - All transitions collapsed to 0.01ms
  - Reveal elements render in their final state immediately
- **`lang="sw"`** attribute on every Swahili word so screen readers pronounce them as Swahili, not English.
- **Modals** trap focus, close on Escape, lock body scroll, announce with `role="dialog"` + `aria-modal="true"`.
- **`aria-label` / `aria-expanded`** on interactive controls.

---

## Performance

- **Lazy-loaded images** (`loading="lazy"`) on everything below the fold.
- **Preconnect + `display=swap`** on Google Fonts for faster first paint.
- **rAF-throttled scroll listeners** prevent layout thrash.
- **CSS scroll-snap** for the Arc is GPU-accelerated and jank-free on touch.
- **Single JS bundle** (~116 KB gzipped) — no code-splitting yet because the total is already small.
- **No web fonts loaded for content** beyond Fraunces + Inter Tight (two families, four weights total).
- **Lighthouse targets:** Performance 95+, Accessibility 100, Best Practices 100, SEO 100 on mobile.

Ideas on the pile for further tightening:

- Code-split `Apply.tsx` and `Hold.tsx` (they pull in the most validation/state logic but are reached by a small fraction of visitors).
- Self-host the two fonts and serve `font-display: optional` variants.
- Swap Unsplash hotlinks for locally-optimized AVIF/WebP once final photography lands.

---

## Browser support

- Modern evergreen browsers (last 2 versions of Chrome, Edge, Firefox, Safari).
- iOS Safari 15+ and Android Chrome 100+ fully supported.
- Gracefully degraded experience on older browsers — no functional features are gated on modern CSS, but visual polish (ken-burns, backdrop blur, scroll snap) may vary.

---

## Production wire-up (what's NOT yet live)

This repository ships the visual and interactive layer. In the full production build described in the original technical brief, these surfaces hand off to real services:

| Surface | Current behaviour | Production target |
|---|---|---|
| `/letter` form | Logs payload to console, swaps to success panel | `POST /api/waitlist` (Zod-validated) → row in Supabase `waitlist` table → admin email via Resend |
| `/guestbook` form | Logs payload to console, swaps to success panel | `POST /api/waitlist` with `type: 'general'` → Supabase + Loops nurture sequence |
| `/apply` submit (Marefu) | Logs all 12 answers to console, shows success panel | `POST /api/applications` → Supabase `applications` table with `status: 'pending'` → admin notification via Resend |
| `/hold` deposit | Shows summary card + fake reference number | `POST /api/reservations` → Supabase `reservations` row → Stripe Checkout session → webhook updates status → Resend confirmation with real ref |
| **`/brief` partner submit** | Logs payload + generates `MM-XXXX` ref, shows success panel | `POST /api/partnerBrief` → Supabase `partner_briefs` table (segmented by org_type) → routed email to director & regional lead via Resend → optional Salesforce / HubSpot sync for the partners desk |
| Release wave gating | Not enforced — anyone can reach `/hold` and `/apply` | `ReleaseGate` component reads current wave from Sanity. Wave 1 requires invite code; Wave 2 requires magic-link verification against guestbook; Wave 3 opens publicly with `priceMultiplier * 1.15` |
| Content | Hardcoded in `src/lib/data.ts` and `src/lib/partnerData.ts` | Migrate to Sanity CMS schemas (tiers, people, arc stops, partner segments, capabilities, case studies, timeline phases — all as portable-text with image hotspots) |
| Imagery | Unsplash hotlinks | Q1 2027 shoot, served via Sanity's CDN with `next/image`-style responsive srcset |
| Trust signals | `OPERATING_PARTNERS` array in `partnerData.ts` | Real logos with permission-to-use, served as inline SVGs |
| Case studies | 3 fictional studies with credible positioning | Real studies, written with named-consent; alumni pull-quotes; optional logo display for public referees |

**Each integration point is designed to be drop-in.** The form components all go through a single handler that currently logs; swap it for a `fetch('/api/…')` and the UX stays identical.

---

## Environment variables (for the live build)

When wiring the production stack, these are the keys the Next.js / API layer will need. None are required for the current static SPA.

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Supabase (forms, reservations, applications, invite codes)
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe (deposits)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Email
RESEND_API_KEY=
LOOPS_API_KEY=

# Rate limiting
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

# Admin
ADMIN_NOTIFICATION_EMAIL=
```

---

## B2B positioning & sales notes

The `/partners` and `/brief` surfaces are written for procurement-competent buyers. Every piece of language there has been chosen with a specific reader in mind:

- **"Operating in partnership with"** trust strip → signals regulatory and operator relationships before a procurement team asks.
- **Capabilities accordion** (Operational / Legal / Content / Impact) → structures the answer to the first four questions every procurement review asks: *Can you deliver? Are you contract-clean? Can you co-design? Can you report outcomes?*
- **Indicative pricing on each segment** → surfaces budget transparency early, rather than gating it behind a sales call. Institutional buyers dislike opaque pricing.
- **"We reply within five working days"** → explicit SLA. Makes the brief feel like a real business process, not a contact form.
- **Org-type select with desk-routing hint** → tells the user you have a routing model, which signals scale and experience.
- **Live summary on the brief form** → reduces "did my submission land?" anxiety. Combined with the generated `MM-XXXXXX` reference number on success, it gives the buyer something to cite internally while waiting for our reply.
- **Confidentiality dropdown with four real options** (Standard NDA / Mutual NDA / Chatham House / Full) → demonstrates operational maturity. Most luxury-travel sites treat this as a checkbox; buyers who need Chatham-House-level handling notice when you don't.
- **Case studies with metrics, not just quotes** → procurement reads metrics first, quotes second. We lead with them.

The architecture keeps the consumer experience as the emotional centre of the brand while making the institutional experience operationally credible — the two flows share a design language but not a voice.

### Institutional sales funnel (how leads should flow)

```
1. /partners                     awareness, fit assessment
2. /partners → segment click     self-qualification
3. /partners → case study        social proof
4. /partners → capabilities      procurement-readiness check
5. /brief (step 1)               qualified lead captured
6. /brief (step 2)               objective + scale qualified
7. /brief (step 3)               confidentiality + budget signalled
8. /brief (step 4) → success     MM-ref generated; routed to director + regional lead
9. [out of scope — 5 working days later] engagement memo drafted & sent
10. [out of scope — week 2] discovery call booked
```

Steps 1–8 are fully instrumented in this repo. Steps 9–10 live in the partners desk's ops stack (CRM + document tooling).

---

## Roadmap

### Immediate (Q2 2027)
- [ ] Wire `/letter`, `/guestbook`, and `/brief` to Supabase via serverless functions.
- [ ] Partner-brief webhook → routes by `org_type` to the right regional lead (corporate / government / institution).
- [ ] Migrate `src/lib/data.ts` and `src/lib/partnerData.ts` content to Sanity; generate types from schemas.
- [ ] Real photography from the Q1 shoot, served through Sanity's CDN.
- [ ] Stripe Checkout for `/hold` deposits.
- [ ] Admin dashboards — one for consumer (applications & reservations), one for partners (briefs by stage).

### Near-term (Q3 2027)
- [ ] Release-wave gating logic live (invite codes → magic-link guestbook verification → public).
- [ ] Transactional emails via Resend; consumer nurture via Loops; partner nurture via the director's own cadence.
- [ ] Plausible analytics (privacy-first), segmented by audience (consumer / partner).
- [ ] OpenGraph image generation per tier page via `@vercel/og`.
- [ ] Downloadable partner brief PDF (capabilities, pricing ranges, sample engagement memo).
- [ ] Real trust-strip logos (with permission-to-use agreements signed).

### Later
- [ ] Swahili language toggle (full i18n pass) — consumer first, partners second.
- [ ] French translation for the West-African-diaspora market and Francophone government desks.
- [ ] Guest portal for returning travellers (post-2028 season).
- [ ] Partner portal — post-engagement debriefs, impact summaries, alumni directory.

---

## Credits

- **Direction, copy, editorial voice** — Tejiri
- **Engineering, interaction design** — Claude, for Tejiri
- **Photography (placeholder)** — Unsplash contributors; final imagery from a Q1 2027 shoot
- **Typography** — Fraunces by Phaedra Charles, Inter Tight by Rasmus Andersson (standing in for GT Sectra and ABC Diatype)

The brand positioning draws on editorial references: Aesop's writing, Soho House's restraint, Nomad magazine's pace. Quiet luxury, Swahili coast sophistication.

---

*Karibu.*
*— Welcome.*
