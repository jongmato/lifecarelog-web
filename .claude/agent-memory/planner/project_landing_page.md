---
name: Landing Page PRD
description: lifecarelog.co.kr landing page implementation plan - Bento Grid, i18n, dark mode, Cal.com, Resend, CF Turnstile
type: project
---

## Landing Page PRD Summary (2026-03-30)

Full spec: `/Users/jonghyun/Desktop/lifecarelog-web/specs/landing-page.md`

### Key Technical Decisions
- Cal.com: JS embed snippet (NOT @calcom/embed-react) due to React 19 peer dep issue
- next-intl: proxy.ts (NOT middleware.ts) for Next.js 16 compatibility
- zod: v3 compat layer for react-hook-form integration
- Deploy: Cloudflare Pages (SSG)
- No backend needed: API Routes sufficient for contact form + Turnstile verify

### Dependencies (already installed)
framer-motion, lucide-react, next-intl, next-themes, react-hook-form, react-turnstile, resend, zod

### 4 Phases, 10 Tasks
1. Foundation: next-intl routing, theme/layout, shared UI
2. Core: Bento Grid, Hero/Footer, Contact Form
3. Integration: Cal.com embed, SEO/GA4
4. Polish: E2E tests, deploy

### Open Questions (user needs to answer)
- Cal.com event link, Resend domain, CF Turnstile keys, 8 card contents, logo SVG, GA4 ID, CF Pages project

**Why:** First project using this repo (greenfield), sets patterns for all future work.
**How to apply:** Use this spec as the implementation contract. Each phase should produce atomic commits with tests.
