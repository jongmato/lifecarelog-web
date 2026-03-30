# PRD: lifecarelog.co.kr Landing Page

## Overview

- **Goal**: LifeCareLog 브랜드의 첫인상 역할을 하는 랜딩 페이지 구축. 서브 프로젝트(Plan-A~Z) 소개, 컨설팅 예약(Cal.com), 문의 폼(Resend) 제공
- **Target Users**: 잠재 고객, 투자자, 파트너, 채용 관심자
- **Success Metrics**:
  - Lighthouse Performance 90+, Accessibility 100
  - 컨택 폼 전환율 측정 (GA4 이벤트)
  - Cal.com 예약 전환율 측정
  - 다크모드/라이트모드 전환 정상 동작
  - 한/영 i18n 전환 정상 동작

## User Stories

- As a **잠재 고객**, I want to 서비스 포트폴리오를 한눈에 파악하고 싶다 so that 적합한 서비스를 빠르게 찾을 수 있다
- As a **해외 사용자**, I want to 영어로 사이트를 볼 수 있다 so that 언어 장벽 없이 정보를 얻을 수 있다
- As a **컨설팅 희망자**, I want to 캘린더에서 직접 예약할 수 있다 so that 이메일 왕복 없이 미팅을 잡을 수 있다
- As a **문의자**, I want to 간단한 폼으로 문의를 보낼 수 있다 so that 빠르게 연락할 수 있다
- As a **봇/스패머가 아닌 사용자**, I want to 눈에 보이지 않는 보안 검증이 있다 so that 스팸 없이 서비스를 이용할 수 있다

## Functional Requirements

### Must Have (P0)

- [ ] **Bento Grid 레이아웃**: 8개 카드로 서비스/프로젝트 소개
- [ ] **한/영 i18n**: next-intl 기반, URL prefix 라우팅 (`/ko`, `/en`), 기본 한국어
- [ ] **다크모드**: next-themes 기반, system preference 감지, 토글 버튼
- [ ] **컨택 폼**: react-hook-form + zod/v3 검증, Resend 이메일 전송, CF Turnstile 스팸 방지
- [ ] **반응형 디자인**: Mobile-first (375px -> 768px -> 1440px)
- [ ] **Framer Motion 애니메이션**: 카드 진입 애니메이션, 스크롤 기반 reveal
- [ ] **SEO**: Open Graph, meta tags, sitemap, robots.txt
- [ ] **Cal.com 예약**: 인라인 임베드 또는 팝업 버튼

### Should Have (P1)

- [ ] **Hero 섹션**: 브랜드 소개 + CTA 버튼
- [ ] **Footer**: 소셜 링크, 저작권, 네비게이션
- [ ] **스크롤 기반 내비게이션**: 부드러운 섹션 스크롤
- [ ] **접근성**: ARIA labels, keyboard navigation, focus management
- [ ] **GA4 이벤트 트래킹**: 컨택 폼 제출, Cal.com 예약 클릭

### Nice to Have (P2)

- [ ] **로고 애니메이션**: SVG 로고 진입 애니메이션
- [ ] **Parallax 효과**: 스크롤 시 배경 레이어 이동
- [ ] **Easter egg**: 특정 상호작용 시 숨겨진 애니메이션

## Technical Architecture

### System Diagram

```
                    ┌──────────────────────────────┐
                    │     Cloudflare DNS/CDN        │
                    │   lifecarelog.co.kr            │
                    └──────────┬───────────────────┘
                               │
                    ┌──────────▼───────────────────┐
                    │   Cloudflare Pages             │
                    │   Next.js 16 (SSG/SSR)         │
                    │                                │
                    │  ┌───────────────────────┐     │
                    │  │ proxy.ts (next-intl)   │     │
                    │  │ locale routing ko/en   │     │
                    │  └───────────────────────┘     │
                    │                                │
                    │  ┌───────────────────────┐     │
                    │  │ src/app/[locale]/       │     │
                    │  │  ├── page.tsx (Landing) │     │
                    │  │  └── layout.tsx          │     │
                    │  └───────────────────────┘     │
                    │                                │
                    │  ┌───────────────────────┐     │
                    │  │ API Routes              │     │
                    │  │  ├── /api/contact        │ ──── Resend API
                    │  │  └── /api/verify         │ ──── CF Turnstile Verify
                    │  └───────────────────────┘     │
                    └────────────────────────────────┘
                               │
                    ┌──────────▼───────────────────┐
                    │     External Services          │
                    │  ├── Cal.com (Embed JS)        │
                    │  ├── Resend (Email API)        │
                    │  ├── CF Turnstile (Bot check)  │
                    │  └── GA4 (Analytics)           │
                    └────────────────────────────────┘
```

### Tech Stack Decisions

| Component | Choice | Reason |
|-----------|--------|--------|
| Framework | Next.js 16.2 (App Router) | SSG 가능, i18n 라우팅, API routes |
| Styling | TailwindCSS V4 (CSS-first) | 이미 설치됨, mobile-first |
| Animation | Framer Motion 12 | 이미 설치됨, 선언적 API |
| i18n | next-intl 4.8 | App Router 네이티브, 타입 안전 |
| Theme | next-themes 0.4 | system/light/dark 지원 |
| Form | react-hook-form 7 + zod/v3 | 이미 설치됨, 검증 일체화 |
| Bot Protection | react-turnstile 1.1 + CF API | CAPTCHA 없는 bot 방지 |
| Email | Resend 6.9 | 이미 설치됨, 100/day 무료 |
| Calendar | Cal.com Embed (JS snippet) | React 19 호환 이슈로 JS embed 사용 |
| Icons | Lucide React 1.7 | 이미 설치됨 |
| Deploy | Cloudflare Pages | $0, 무제한 bandwidth |
| Backend | **불필요** (API Routes 충분) | 이메일 전송 + Turnstile 검증만 |

### Cal.com 연동 결정: JS Embed vs React Package

`@calcom/embed-react`는 React 19 peer dependency 미지원 이슈가 있음 (Issue #20814). 따라서:
- **권장**: Cal.com JS embed snippet (iframe/popup) 사용
- **대안**: `--legacy-peer-deps` 또는 `overrides`로 강제 설치 (비권장)
- Cal.com embed snippet은 `<script>` 태그로 로드하므로 React 버전 무관

### Directory Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # NextIntlClientProvider + ThemeProvider
│   │   └── page.tsx            # Landing page (Server Component)
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts        # Resend email + Turnstile verify
│   │   └── verify/
│   │       └── route.ts        # Turnstile standalone verify (optional)
│   ├── layout.tsx              # Root layout (html lang, fonts)
│   └── robots.ts               # robots.txt generation
├── features/
│   ├── landing/
│   │   ├── components/
│   │   │   ├── hero-section.tsx
│   │   │   ├── bento-grid.tsx
│   │   │   ├── bento-card.tsx
│   │   │   ├── contact-form.tsx
│   │   │   ├── cal-booking.tsx
│   │   │   ├── footer.tsx
│   │   │   └── theme-toggle.tsx
│   │   ├── types.ts
│   │   └── constants.ts
│   └── i18n/
│       ├── routing.ts          # defineRouting config
│       ├── request.ts          # getRequestConfig
│       └── navigation.ts       # createNavigation exports
├── shared/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   └── locale-switcher.tsx
│   └── lib/
│       ├── resend.ts           # Resend client singleton
│       └── turnstile.ts        # Turnstile verify helper
├── proxy.ts                    # next-intl locale routing (NOT middleware.ts!)
messages/
├── ko.json                     # Korean translations
└── en.json                     # English translations
```

### API Endpoints

| Method | Path | Purpose | Auth | Backend |
|--------|------|---------|------|---------|
| POST | `/api/contact` | 컨택 폼 이메일 전송 | CF Turnstile token | Next.js API Route (Resend) |

**Request Body** (`/api/contact`):
```json
{
  "name": "string",
  "email": "string (email)",
  "company": "string (optional)",
  "message": "string (min 10)",
  "token": "string (CF Turnstile token)"
}
```

**Response** (200):
```json
{
  "success": true,
  "messageId": "string"
}
```

**Response** (400/500):
```json
{
  "success": false,
  "error": "string"
}
```

### Environment Variables

```bash
# .env.local
RESEND_API_KEY=re_xxxx                          # Resend API key (server only)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4xxxx          # CF Turnstile site key (client)
TURNSTILE_SECRET_KEY=0x4xxxx                    # CF Turnstile secret (server only)
NEXT_PUBLIC_CAL_LINK=lifecarelog/consultation    # Cal.com event link
CONTACT_EMAIL=hello@lifecarelog.co.kr           # 문의 수신 이메일
NEXT_PUBLIC_GA_ID=G-XXXXXXX                     # GA4 Measurement ID (optional)
```

### Bento Grid 8-Card Layout Design

```
Desktop (1440px):
┌──────────┬──────────┬──────────┐
│  Card 1  │  Card 2  │  Card 3  │
│  (2x1)   │  (1x1)   │  (1x1)   │
│  Hero/   │  Plan-L  │  Plan-T  │
│  Brand   │          │          │
├──────────┼──────────┼──────────┤
│  Card 4  │  Card 5  │  Card 6  │
│  (1x1)   │  (1x1)   │  (2x1)   │
│  AI/ML   │  Auto-   │  Contact │
│          │  mation  │  / CTA   │
├──────────┴──────────┼──────────┤
│     Card 7          │  Card 8  │
│     (2x1)           │  (1x1)   │
│     Tech Stack      │  Cal.com │
│                     │  Book    │
└─────────────────────┴──────────┘

Mobile (375px): Single column stack
Tablet (768px): 2-column grid
```

## Implementation Plan

### Phase 1: Foundation (Tasks 1-3)

- [ ] **Task 1**: 프로젝트 기본 설정 → assigned to: `frontend-dev`
  - next-intl plugin 설정 (next.config.ts)
  - proxy.ts 생성 (locale routing: ko, en, 기본 ko)
  - i18n routing.ts, request.ts, navigation.ts 설정
  - messages/ko.json, messages/en.json 초기 구조
  - `[locale]` 디렉토리 구조 생성
  - .env.example 생성
  - **Test**: next-intl 라우팅 동작 검증 (/, /ko, /en 리다이렉트)

- [ ] **Task 2**: 테마/레이아웃 기반 → assigned to: `frontend-dev`
  - TailwindCSS V4 @theme 토큰 정의 (oklch colors, spacing, breakpoints)
  - next-themes ThemeProvider + 다크모드 CSS 변수
  - Root layout (폰트: Pretendard KR + Inter EN)
  - `[locale]/layout.tsx` (NextIntlClientProvider + ThemeProvider)
  - ThemeToggle 컴포넌트
  - LocaleSwitcher 컴포넌트
  - **Test**: 다크/라이트 전환, locale 전환 검증

- [ ] **Task 3**: 공유 UI 컴포넌트 → assigned to: `frontend-dev`
  - Button, Input, Textarea 컴포넌트 (CVA variants)
  - 접근성(ARIA) 기본 적용
  - **Test**: 컴포넌트 단위 테스트 (Vitest + Testing Library)

### Phase 2: Core Features (Tasks 4-6)

- [ ] **Task 4**: Bento Grid + 카드 시스템 → assigned to: `frontend-dev`
  - BentoGrid 컴포넌트 (CSS Grid, 반응형)
  - BentoCard 컴포넌트 (Framer Motion 진입 애니메이션)
  - 8개 카드 콘텐츠 구성 (i18n 적용)
  - 스크롤 기반 stagger reveal 애니메이션
  - **Test**: 반응형 레이아웃 검증 (375/768/1440px), 애니메이션 렌더링

- [ ] **Task 5**: Hero 섹션 + Footer → assigned to: `frontend-dev`
  - Hero 섹션 (브랜드 소개, CTA 버튼, 배경 그라디언트)
  - Footer (링크, 저작권, SNS)
  - 스크롤 내비게이션
  - **Test**: Hero CTA 클릭, Footer 링크 검증

- [ ] **Task 6**: 컨택 폼 + 이메일 전송 → assigned to: `frontend-dev`
  - ContactForm 컴포넌트 (react-hook-form + zod/v3 validation)
  - CF Turnstile 위젯 통합
  - `/api/contact` Route Handler (Turnstile 서버 검증 -> Resend 전송)
  - 에러/성공 상태 UX (해요체 메시지)
  - **Test**: 폼 검증 (빈값, 잘못된 이메일), API 라우트 단위 테스트, Turnstile mock

### Phase 3: Integrations (Tasks 7-8)

- [ ] **Task 7**: Cal.com 예약 통합 → assigned to: `frontend-dev`
  - Cal.com JS embed snippet 로드 (Script 컴포넌트)
  - CalBooking 컴포넌트 (팝업 트리거 버튼)
  - i18n 연동 (locale에 따른 Cal.com 언어 설정)
  - **Test**: 예약 버튼 클릭 시 팝업 오픈 검증

- [ ] **Task 8**: SEO + Analytics → assigned to: `frontend-dev`
  - Open Graph metadata (generateMetadata, locale별)
  - robots.ts, sitemap.ts
  - GA4 script 통합 (GTM or @next/third-parties)
  - 이벤트 트래킹 (컨택 폼 제출, Cal.com 클릭)
  - **Test**: meta 태그 렌더링 검증, sitemap 형식 검증

### Phase 4: Polish & Testing (Tasks 9-10)

- [ ] **Task 9**: E2E 테스트 + 접근성 → assigned to: `tester`
  - Playwright E2E: 전체 사용자 플로우 (3 breakpoints)
  - axe-core 접근성 자동 테스트
  - Lighthouse CI (Performance 90+, Accessibility 100)
  - **Test**: E2E 시나리오 5개 이상

- [ ] **Task 10**: 배포 + DNS → assigned to: `devops-engineer`
  - Cloudflare Pages 연결 (GitHub repo)
  - lifecarelog.co.kr DNS CNAME 설정
  - 환경변수 설정 (CF Pages Dashboard)
  - SSL/HTTPS 확인
  - **Test**: 프로덕션 배포 후 전체 기능 스모크 테스트

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Cal.com embed-react React 19 미지원 | Medium | High | JS embed snippet 사용 (React 버전 무관) |
| next-intl + Next.js 16 proxy.ts 호환 | High | Low | next-intl 4.8+ 공식 지원 확인됨, proxy.ts로 rename만 필요 |
| CF Turnstile Free 제한 | Low | Low | 무료 무제한 사용, 월 100만 검증까지 |
| Resend Free 100/day 제한 | Medium | Medium | Rate limit UI 표시, 초과 시 큐잉 또는 Upstash PAYG 전환 |
| Framer Motion SSR hydration mismatch | Medium | Medium | `LazyMotion` + `domAnimation` 사용, `suppressHydrationWarning` |
| zod v4 + react-hook-form 호환 | Medium | Low | `zod/v3` 호환 레이어 사용 (이미 의존성에 포함) |
| @calcom/embed-react peer dep 경고 | Low | High | JS embed 방식으로 우회, pnpm --shamefully-hoist 불필요 |
| Cloudflare Pages 빌드 실패 | Medium | Low | Node.js 22 호환 확인, next.config.ts output 설정 |

## Test Strategy

| Phase | Test Type | Tool | Target |
|-------|-----------|------|--------|
| Phase 1 | Unit | Vitest | i18n routing, locale detection |
| Phase 2 | Unit | Vitest | UI components, form validation |
| Phase 2 | Integration | Vitest | API route (contact form) |
| Phase 3 | Unit | Vitest | Cal.com embed render, SEO metadata |
| Phase 4 | E2E | Playwright | Full user flows (3 viewports) |
| Phase 4 | Accessibility | axe-core | WCAG 2.1 AA compliance |
| Phase 4 | Performance | Lighthouse CI | Score 90+ |

## Open Questions

- [ ] Cal.com 계정/이벤트 링크가 이미 생성되어 있는가? (NEXT_PUBLIC_CAL_LINK 값)
- [ ] Resend에서 사용할 발신 도메인이 설정되어 있는가? (예: noreply@lifecarelog.co.kr)
- [ ] CF Turnstile site key/secret key가 이미 발급되어 있는가?
- [ ] Bento Grid 8개 카드의 구체적 콘텐츠/프로젝트 목록이 확정되었는가?
- [ ] 브랜드 로고 SVG 파일이 준비되어 있는가?
- [ ] GA4 Measurement ID가 발급되어 있는가?
- [ ] Cloudflare Pages 프로젝트가 이미 생성되어 있는가?

## Completion Criteria

- [ ] 유닛 테스트 모두 통과 (`pnpm test`)
- [ ] TypeScript 타입 에러 0개 (`pnpm typecheck`)
- [ ] ESLint 에러 0개 (`pnpm lint`)
- [ ] E2E 테스트 통과 (`pnpm test:e2e`)
- [ ] Lighthouse Performance 90+, Accessibility 100
- [ ] 한/영 전환 정상 동작
- [ ] 다크/라이트 모드 전환 정상 동작
- [ ] 컨택 폼 전송 성공 (Resend)
- [ ] Cal.com 예약 팝업 동작
- [ ] 3 breakpoints (375/768/1440px) 반응형 정상
- [ ] Cloudflare Pages 배포 완료

## References

- [Next.js 16 proxy.ts (middleware rename)](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)
- [next-intl proxy/middleware setup](https://next-intl.dev/docs/routing/middleware)
- [next-intl + Next.js 16 fix guide](https://www.buildwithmatija.com/blog/next-intl-nextjs-16-proxy-fix)
- [Cal.com Embed docs](https://cal.com/help/embedding/adding-embed)
- [Cal.com React 19 Issue #20814](https://github.com/calcom/cal.com/issues/20814)
- [react-turnstile docs](https://github.com/marsidev/react-turnstile)
- [Resend Next.js integration](https://resend.com/docs/send-with-nextjs)
- [TailwindCSS V4 CSS-first config](https://tailwindcss.com/docs/v4)
