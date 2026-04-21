# Majira Marefu

> The long African summer. An invitation. August 2027.

Marketing and reservation website for **Majira Marefu**, a premium East African summer experience brand launching August 2027. Four tiered journeys ($4,500–$25,000) travelling slowly between Nairobi, the Maasai Mara, the Lamu archipelago, and Zanzibar.

## What's here

This repo contains the **visual site** — all eleven pages from the technical brief rendered as a static, accessible, responsive HTML/CSS/JS build. It is designed to be the front-end of the future Next.js + Sanity + Supabase + Stripe production site, but stands on its own as a complete visual prototype.

Deployed live via GitHub Pages.

## Pages

| Route | Purpose |
|---|---|
| `index.html` | Landing — full-bleed hero, entry animation |
| `chapter.html` | The Chapter — long-form editorial introduction |
| `arc.html` | The Arc — four stops (Nairobi → Mara → Lamu → Zanzibar), horizontal scroll |
| `journeys.html` | Journeys index — all four tiers |
| `mwanzo.html` | Mwanzo — seven nights — from $4,500 |
| `pwani.html` | Pwani — twelve nights — from $9,800 |
| `safari.html` | Safari — eighteen nights — from $16,500 |
| `marefu.html` | Marefu — thirty nights — by application |
| `hand.html` | The Hand — portraits of the people carrying the season |
| `guestbook.html` | Guestbook — waitlist for Wave II access |
| `letter.html` | Letter — contact form, replies in three days |
| `apply.html` | Apply — multi-step, twelve-question application for Marefu |
| `hold.html` | Hold — four-step reservation flow with deposit summary |

## Design system

All tokens live in `assets/styles.css`:

- **Palette:** sand-family backgrounds (`#D9C9B0` primary), umber text (`#6B4A2B`), ochre accent (`#B8935A`). No pure white, no pure black.
- **Type:** Fraunces (serif, used for headlines and Swahili words), Inter Tight (sans, used for body and UI) — both free Google Fonts, chosen as feel-close stand-ins for the target GT Sectra + ABC Diatype pairing.
- **Motion:** ease-out curves, 800–1200ms. Ken-burns on heroes, fade-up on scroll reveal. Everything respects `prefers-reduced-motion`.
- **Bilingual handling:** Swahili words set in italic serif with `lang="sw"` attribute; English translation sits below in small caps sans.

## Accessibility

- All imagery carries meaningful `alt` text.
- Contrast ratios exceed WCAG AA (umber on sand passes comfortably).
- Full keyboard navigation; focus rings use the ochre accent.
- `prefers-reduced-motion` respected — ken-burns disabled, reveals become instant.
- Language attribute set per-element for Swahili.

## What's NOT yet wired

This is the visual layer. In the production Next.js build, these surfaces hand off to real services:

| Surface | Current | Production |
|---|---|---|
| `letter.html` form | Logs to console, shows success panel | `POST /api/waitlist` → Supabase + Resend notification |
| `guestbook.html` form | Logs to console, shows success panel | `POST /api/waitlist` with tier + city → Supabase + Loops nurture sequence |
| `apply.html` submit | Logs to console, shows success panel | `POST /api/applications` → Supabase + admin email via Resend |
| `hold.html` deposit | Summary panel only | Stripe Checkout session → webhook updates reservation status → Resend confirmation |
| Release wave gating | Not enforced | `ReleaseGate` component reads current wave from Sanity, enforces invite codes / guestbook membership / magic-link verification |
| Content | Hardcoded in HTML | Sanity CMS — tiers, people, portable text narrative, hero images |

## Environment variables (for production wire-up)

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_TOKEN

NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY

STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

RESEND_API_KEY
LOOPS_API_KEY

UPSTASH_REDIS_URL
UPSTASH_REDIS_TOKEN

ADMIN_NOTIFICATION_EMAIL
```

## Running locally

```bash
# anywhere a static server will do
npx serve .
# or
python3 -m http.server 8080
```

## Imagery

All photography in this build is stock from Unsplash, tagged with `data-placeholder` on every `<Image>` element so final Q1 2027 shoot imagery can be swapped in via a single grep.

## Credits

Built by Claude for Tejiri Agent as the first visual layer of Majira Marefu. Quiet luxury, Swahili coast sophistication. The brand positioning is editorial — Aesop, Soho House, Nomad magazine — not conversion-optimized SaaS.

---

*Karibu.*
