# LifeCareLog

**삶을 돌보는 기록** — 한 명이라도 필요로 하는 서비스를 만들어요.

[lifecarelog.co.kr](https://lifecarelog.co.kr)

## About

LifeCareLog는 1인 개발자 브랜드입니다. Life(삶) + Care(돌봄) + Log(기록), 삶에 필요한 서비스를 하나씩 만들어가고 있어요.

### Services

| Service | Description | Status |
|---------|-------------|--------|
| [Plan-C](https://plan-c.lifecarelog.co.kr) | Financial calculators & planner | Live |
| [Plan-L](https://plan-l.lifecarelog.co.kr) | AI-powered legal information search | Live |
| Plan-T | AI mental health companion (iOS/Android) | In Development |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS V4 + OKLCH color system
- **Animation**: Framer Motion (`motion/react`)
- **i18n**: next-intl (ko/en)
- **Deployment**: Cloudflare Workers via OpenNext
- **CI/CD**: GitHub Actions (typecheck → lint → build → deploy)
- **Analytics**: GA4
- **Error Tracking**: Sentry
- **Email**: Resend
- **Spam Protection**: Cloudflare Turnstile

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Commands

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm typecheck    # TypeScript check
pnpm lint         # ESLint
pnpm cf:build     # Cloudflare Workers build
pnpm cf:preview   # Local Workers preview
pnpm cf:deploy    # Deploy to Cloudflare Workers
```

## Deployment

Pushes to `main` trigger automatic deployment via GitHub Actions:

1. TypeScript type check
2. ESLint
3. OpenNext Cloudflare build
4. Wrangler deploy to Cloudflare Workers

### Environment Variables

**GitHub Secrets** (build-time):

| Variable | Description |
|----------|-------------|
| `CLOUDFLARE_API_TOKEN` | CF Workers deploy token |
| `CLOUDFLARE_ACCOUNT_ID` | CF account ID |
| `NEXT_PUBLIC_SITE_URL` | Production URL |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry client DSN |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID |
| `SENTRY_DSN` | Sentry server DSN |
| `SENTRY_AUTH_TOKEN` | Sentry source map upload |

**Cloudflare Workers Secrets** (runtime, set via `wrangler secret put`):

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Email sending |
| `TURNSTILE_SECRET_KEY` | Spam protection |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile widget |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # i18n routes (ko, en)
│   │   ├── page.tsx        # Landing page
│   │   └── services/       # Services page
│   └── api/contact/        # Contact form API
├── features/
│   ├── landing/            # Landing page components
│   │   └── components/
│   │       ├── hero-section.tsx
│   │       ├── sections/   # Philosophy, Story, Services, Contact
│   │       └── footer.tsx
│   └── services/           # Services page components
├── shared/
│   ├── ui/                 # Button, Badge, Input, Textarea
│   └── lib/                # Resend, Turnstile
├── widgets/                # NavigationHeader
└── i18n/                   # Routing, request config
messages/
├── ko.json                 # Korean translations
└── en.json                 # English translations
```

## License

All rights reserved.
