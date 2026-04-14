---
title: "feat: LifeCareLog 프로덕션 배포 + SEO/Analytics/Monitoring 통합"
type: feat
status: active
date: 2026-04-14
origin: Plan-L 배포 패턴 검증 후 적용
---

# LifeCareLog 프로덕션 배포 + SEO/Analytics/Monitoring 통합

## Overview

lifecarelog.co.kr을 Cloudflare Workers에 배포하고, CI/CD, GA4, Sentry, SEO/KEO/AEO를 구축한다.
Plan-L(plan-l-web)에서 검증된 패턴을 그대로 적용.

## Fact-Check Notes

- wrangler.jsonc 사용 (wrangler.toml 아님) — Plan-L 확인
- Sentry는 instrumentation.ts 패턴 필요 (공식 문서 확인)
- compatibility_date: "2025-08-16" 이상 필수 (Sentry CF Workers 요구)
- Naver title 40자 제한 — 공식 미확인, 제거
- FAQPage 41% 통계 — 출처 불명, 제거
- @opennextjs/cloudflare v1.19.0+ 사용 (Plan-L 검증)

## Implementation Units

### Unit 1: GitHub 저장소 + CI workflow

- GitHub MCP로 repo 생성
- package.json에 typecheck 스크립트 추가
- .github/workflows/ci.yml (PR → typecheck + lint + build)

### Unit 2: @opennextjs/cloudflare 설정

- `pnpm add -D @opennextjs/cloudflare wrangler`
- wrangler.jsonc (Plan-L 패턴, account_id, WORKER_SELF_REFERENCE)
- open-next.config.ts (`defineCloudflareConfig()`)
- package.json: cf:build, cf:preview, cf:deploy 스크립트

### Unit 3: GitHub Actions 자동 배포

- .github/workflows/deploy.yml (Plan-L 패턴 그대로)
- main push → typecheck + lint → cf:build → wrangler deploy
- secrets: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, SENTRY_*, GA4

### Unit 4: 보안 헤더

- next.config.ts headers(): X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- withSentryConfig 래핑 (Unit 5와 함께)

### Unit 5: Sentry 에러 트래킹

- `pnpm add @sentry/nextjs`
- Sentry MCP로 프로젝트 생성 + DSN 발급
- sentry.client.config.ts (tracesSampleRate: 0.1, sendDefaultPii: false)
- sentry.server.config.ts
- sentry.edge.config.ts
- instrumentation.ts (register() + onRequestError)
- next.config.ts: withSentryConfig 래핑
- wrangler.jsonc: compatibility_date "2025-08-16"+

### Unit 6: GA4

- `pnpm add @next/third-parties`
- layout.tsx: GoogleAnalytics 컴포넌트 (조건부)
- NEXT_PUBLIC_GA_ID env
- GA4 MCP로 속성 확인

### Unit 7: SEO 기본 — sitemap + robots + metadata

- src/app/sitemap.ts: /, /ko, /en, /ko/services, /en/services
- src/app/robots.ts: AI search bots 허용, AI training bots 차단
- layout.tsx metadata 강화: metadataBase, OG, Twitter Card, keywords

### Unit 8: JSON-LD + OG Image

- JSON-LD: Person + WebSite schema (dangerouslySetInnerHTML)
- OG Image: 정적 1200x630 PNG (public/og-image.png)

### Unit 9: KEO — Naver

- Naver SearchAdvisor 사이트 등록 (수동)
- naver-site-verification meta tag
- sitemap.xml 제출

### Unit 10: AEO — AI 검색

- public/llms.txt
- robots.ts에 AI 크롤러 명시 허용

### Unit 11: Lighthouse 검증

- Playwright MCP로 성능 측정
- 4개 카테고리 90+ 목표

### Unit 12: 환경변수 정리 + 커스텀 도메인 + 최종 배포

- .env.example 완전 정리
- CF Dashboard에서 lifecarelog.co.kr 커스텀 도메인 연결
- 최종 프로덕션 배포

## Execution Order

```
Unit 1 (GitHub) → Unit 2 (CF 설정) → Unit 3 (CI/CD)
→ Unit 4+5 (보안+Sentry) → Unit 6 (GA4)
→ Unit 7+8 (SEO) → Unit 9+10 (KEO+AEO)
→ Unit 11 (Lighthouse) → Unit 12 (최종)
```
