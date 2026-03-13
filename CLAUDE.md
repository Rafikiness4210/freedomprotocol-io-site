# CLAUDE.md — FreedomProtocol.io

## Project Overview

FreedomProtocol.io is a security intelligence website covering crypto security, AI defense, and location-independent freedom. Built as a content + affiliate revenue business.

**Live site:** https://freedomprotocol.io
**Vercel project:** site (rafikiness4210s-projects)
**GitHub:** https://github.com/Rafikiness4210/freedomprotocol-io-site

## Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS with custom dark theme (sunset-gold/ocean-blue palette)
- **Animations:** Framer Motion (scroll, parallax, stagger)
- **Blog:** MDX files in `content/blog/` parsed with gray-matter
- **Email:** ConvertKit (API at `/api/subscribe`)
- **Hosting:** Vercel (auto-deploy from main branch)
- **Analytics:** Plausible (not yet configured)
- **Obsidian vault:** `c:\FreedomProtocol\vault\`

## Directory Structure

```
site/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage (animated, cinematic)
│   │   ├── about/              # About page
│   │   ├── blog/               # Blog listing + [slug] dynamic routes
│   │   ├── start-here/         # Onboarding paths
│   │   ├── resources/          # Tool recommendations + affiliate links
│   │   ├── newsletter/         # Newsletter signup
│   │   ├── legal/              # Privacy policy + terms
│   │   └── api/subscribe/      # ConvertKit newsletter endpoint
│   ├── components/
│   │   ├── layout/             # Header.tsx, Footer.tsx
│   │   └── ui/                 # Motion.tsx, NewsletterForm.tsx
│   └── lib/
│       └── blog.ts             # Blog post loading + parsing
├── content/
│   ├── blog/                   # 12 MDX blog posts (001-012)
│   ├── lead-magnets/           # Crypto security checklist source
│   └── social/                 # 45 social media post drafts
├── public/
│   └── crypto-security-checklist.pdf  # Lead magnet PDF
├── scripts/
│   └── generate-checklist-pdf.js      # PDF generator (no deps)
└── next.config.js              # Image optimization, Unsplash remote patterns
```

## Blog Post Schema

All posts live in `content/blog/` as `.mdx` files with this frontmatter:

```yaml
---
title: string
slug: string
date: YYYY-MM-DD
category: "crypto-security" | "ai-security" | "expat-freedom" | "tools-reviews"
description: string (< 160 chars for SEO)
keywords: string[]
readingTime: number
affiliate: string[]
---
```

Posts are numbered sequentially: `001-slug.mdx`, `002-slug.mdx`, etc.

## Content Pillars (4 categories)

| Pillar | Tag | Focus |
|--------|-----|-------|
| Crypto Security | `crypto-security` | Wallets, seed phrases, OpSec, DeFi safety |
| AI Defense | `ai-security` | Deepfakes, voice cloning, phishing, identity |
| Expat Freedom | `expat-freedom` | Tax, residency, banking, location independence |
| Tool Reviews | `tools-reviews` | VPNs, hardware wallets, security keys, privacy apps |

## Active Affiliate Links

| Partner | Link |
|---------|------|
| Ledger | `https://shop.ledger.com/?r=a3428da9c143` |
| Proton (VPN/Mail/SimpleLogin) | `https://go.getproton.me/aff_c?offer_id=26&aff_id=16789` |
| NordVPN | `https://go.nordvpn.net/aff_c?offer_id=15&aff_id=142972&url_id=902` |

When adding new blog posts or updating resources, use these exact affiliate URLs.

## Environment Variables

```
CONVERTKIT_API_KEY=         # From ConvertKit dashboard
CONVERTKIT_FORM_ID=         # From ConvertKit form URL
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=freedomprotocol.io
NEXT_PUBLIC_SITE_URL=https://freedomprotocol.io
```

Set in Vercel dashboard → Project Settings → Environment Variables.

## Design System

- **Background:** `#0B1121` | **Surface:** `#111B30`
- **Primary:** Sunset gold `#F5A623` + warm coral `#FB923C`
- **Secondary:** Ocean blue `#38BDF8` + lagoon teal `#2DD4BF`
- **Text:** Sand white `#F5F0E8` | Drift gray `#94A3B8`
- **Fonts:** Space Grotesk (headings), Inter (body), JetBrains Mono (code)
- **Dark mode only** — no light theme

## Conventions

- All images from Unsplash CDN (no local image assets)
- Blog posts end with "The protocol protects." brand sign-off
- Affiliate links disclosed on resources page and in blog footers
- Newsletter form appears on homepage, newsletter page, and mid-article CTAs
- On successful signup, user sees PDF download link for crypto security checklist
- All code is TypeScript with strict mode
- Path alias: `@/*` maps to `./src/*`

## Commands

```bash
npm run dev        # Dev server at localhost:3000
npm run build      # Production build
npm run lint       # ESLint
node scripts/generate-checklist-pdf.js  # Regenerate lead magnet PDF
```

## Git Workflow

- Single `main` branch, auto-deploys to Vercel on push
- Commit messages use conventional format
- Co-authored commits with Claude include the Co-Authored-By trailer

## Related Projects

- **Orion Bridge:** Dashboard at `c:\FreedomeProtocol\orion-bridge\` (localhost:3333)
- **Obsidian Vault:** `c:\FreedomProtocol\vault\` — content calendar, SEO, affiliates, operations
