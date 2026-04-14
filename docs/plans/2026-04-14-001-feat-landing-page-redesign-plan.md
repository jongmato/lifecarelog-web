---
title: "feat: LifeCareLog 메인 페이지 전면 재설계"
type: feat
status: active
date: 2026-04-14
origin: docs/brainstorms/landing-redesign-requirements.md
deepened: 2026-04-14
---

# feat: LifeCareLog 메인 페이지 전면 재설계

## Overview

LifeCareLog 메인 페이지를 Bento Grid에서 Full-section scroll 레이아웃으로 전면 전환한다. 브랜드 철학("한 명이라도 필요로 하는 서비스를 만든다")과 창업 스토리가 중심이 되는 내러티브 페이지로, 색상 시스템을 소프트 핑크 + 아이보리로 변경하고, 서비스는 미니멀 미리보기로 축소하며 별도 /services 페이지를 신설한다.

## Problem Frame

현재 페이지는 Bento Grid 카드 레이아웃에 세이지 그린 색상으로, 서비스 소개 중심 구조이다. 브랜드 철학과 스토리가 표면에 드러나지 않고, 로고의 소프트 핑크와 사이트 색상이 불일치한다. 방문자가 "왜 이 브랜드가 존재하는지"를 알기 어려운 구조를 개선한다. (see origin: docs/brainstorms/landing-redesign-requirements.md)

## Requirements Trace

- R1. 방문자가 3스크롤 이내에 LifeCareLog 철학을 이해
- R2. 브랜드 스토리가 자연스럽게 읽히는 내러티브 에세이
- R3. 소프트 핑크 primary + 아이보리 배경 색상 시스템
- R4. Hero에 로고 심볼 + 텍스트 로고 배치
- R5. 서비스 미니멀 미리보기 + /services 페이지 신설
- R6. 모바일 퍼스트 반응형 (375/768/1440px)
- R7. 스크롤 애니메이션 부드럽고 성능 친화적
- R8. i18n (ko/en) 유지
- R9. Full-section scroll 레이아웃
- R10. UX 라이팅 전면 재작성 (해요체, 진정성, AI slop 금지)
- R11. 빌드 성공 + 타입 에러 0

## Scope Boundaries

- 포트폴리오 느낌 배제 — 기술 스택 나열 섹션 제거
- 서비스 상세 설명은 /services 페이지에서만
- parallax, bounce easing, glassmorphism 등 AI slop 패턴 금지
- 서비스 마케팅 CTA 불필요 (X/Threads에서 별도)
- 기존 contact API route, Turnstile, Resend 로직은 변경 없이 유지

## Context & Research

### Relevant Code and Patterns

- **색상 토큰**: `src/app/globals.css` — OKLCH 기반 CSS custom properties, Light/Dark 모드
- **레이아웃**: `src/features/landing/components/landing-page.tsx` — 현재 Bento Grid 진입점
- **Hero**: `src/features/landing/components/hero-section.tsx` — Framer Motion 애니메이션 패턴
- **카드**: `src/features/landing/components/bento-card.tsx` — whileInView, useReducedMotion 패턴
- **i18n**: `messages/ko.json`, `messages/en.json` — next-intl 메시지 구조
- **라우팅**: `src/app/[locale]/page.tsx` — locale 기반 라우팅
- **UI 컴포넌트**: `src/shared/ui/` — Button(CVA), Badge(CVA), Input, Textarea
- **Contact**: `src/features/landing/components/contact-dialog.tsx` + `contact-form.tsx`
- **Font**: Pretendard (한국어 UI) + DM Serif Display (숫자/영문 강조)

### Key Patterns to Preserve

- `useReducedMotion()` — 모든 애니메이션 컴포넌트에서 접근성 대응
- `color-mix(in oklch, ...)` — CSS 색상 혼합 패턴
- CVA (class-variance-authority) — Button, Badge variant 시스템
- next-intl `useTranslations()` — 모든 텍스트에 i18n 적용
- `proxy.ts` — Next.js 16 미들웨어 대체

## Key Technical Decisions

- **자연 스크롤 + whileInView**: scroll-snap 미사용 (모바일 UX 문제 방지). Framer Motion `whileInView`로 각 섹션 등장 애니메이션. scroll hijacking 없이 자연스러운 스크롤 유지.
- **색상 전환**: globals.css의 CSS custom properties만 변경. 컴포넌트 코드에서 var() 참조는 그대로 동작.
- **핑크 primary 접근성**: interactive 요소(버튼, 링크)에는 어두운 핑크 `oklch(0.50 0.12 0)` 사용하여 WCAG AA 4.5:1 충족. 밝은 핑크는 장식/배경 전용.
- **Dark Mode**: 기존 cool blue hue 225 유지 (warm brown hue 30 변경 시 핑크와 색상 구분 어려움).
- **서비스 페이지**: `src/app/[locale]/services/page.tsx` 신설. 기존 카드 컴포넌트 재활용.
- **브랜드 스토리 애니메이션**: Framer Motion의 `whileInView` + stagger로 스크롤 시 등장 연출. `useScroll`/`useTransform`은 Philosophy 섹션 핵심 인용구에만 선택적 적용 (성능 고려).
- **로고 텍스트**: 671KB PNG → `next/image`로 자동 최적화 + width/quality 제한. 향후 SVG 변환 검토.
- **DM Serif Display**: 영문/숫자에만 사용 (한국어 미지원). 한국어 강조는 Pretendard Bold/ExtraBold 활용.
- **SEO/OG 메타**: [locale]/layout.tsx의 generateMetadata에 OG image, description 추가.
- **저작권 연도**: 하드코딩 아닌 `new Date().getFullYear()` 동적 렌더링.
- **public 정리**: Next.js 기본 파일(next.svg, vercel.svg 등) 삭제.

## Open Questions

### Resolved During Planning

- **Bento Grid 코드 삭제 vs 유지?**: /services 페이지에서 카드 레이아웃으로 재활용하므로 bento-grid.tsx, bento-card.tsx는 유지.
- **contact-dialog 변경?**: Contact Form 로직은 그대로 유지. 디자인만 핑크 테마 반영.

### Deferred to Implementation

- 정확한 스크롤 애니메이션 타이밍/이징 — 브라우저에서 실제 테스트 후 튜닝
- 다크 모드 핑크 톤 정확한 OKLCH 값 — 라이트 모드 완성 후 균형 맞춤

## Implementation Units

### Phase 1: 기반 (색상 + i18n + 에셋)

- [ ] **Unit 1: 색상 시스템 전환**

**Goal:** OKLCH 토큰을 소프트 핑크 primary + 아이보리 배경으로 교체

**Requirements:** R3

**Dependencies:** None

**Files:**
- Modify: `src/app/globals.css`

**Approach:**
- `:root` Light 모드: primary를 소프트 핑크 계열로, background를 warm ivory로
- `.dark` Dark 모드: 핑크 톤 유지하되 어두운 배경에 맞게 조정
- plan-c/l/t 서비스별 accent 색상은 유지 (독립적 브랜딩)
- gradient-text, glow-primary 등 유틸리티도 핑크 기반으로 조정

**Patterns to follow:**
- 기존 OKLCH custom property 구조 유지
- `color-mix(in oklch, ...)` 패턴 유지

**Test expectation:** none — 순수 CSS 토큰 변경, 빌드 확인으로 검증

**Verification:**
- `pnpm build` 성공
- 브라우저에서 Light/Dark 모드 모두 핑크 톤 확인

---

- [ ] **Unit 2: UX 라이팅 전면 재작성**

**Goal:** ko.json, en.json 메시지를 브랜드 철학 중심으로 전면 재작성

**Requirements:** R10, R1, R8

**Dependencies:** None

**Files:**
- Modify: `messages/ko.json`
- Modify: `messages/en.json`

**Approach:**
- Hero: 철학 중심 헤드라인 ("한 명이라도 필요로 하는 서비스")
- Brand Story / Philosophy 섹션 메시지 신규 추가
- 서비스 설명 간소화 (미니멀 미리보기용)
- Contact, Footer 등 기존 섹션 톤 통일
- 404 페이지 메시지 유지
- 해요체, 진정성, AI slop 금지 원칙 적용
- services 페이지용 메시지 추가

**Patterns to follow:**
- 기존 messages JSON 구조 (namespace 기반)

**Test expectation:** none — JSON 메시지 파일, 빌드로 누락 키 검증

**Verification:**
- `pnpm build` 성공 (누락된 번역 키가 있으면 빌드 경고)

---

### Phase 2: 홈 페이지 재설계

- [ ] **Unit 3: Hero 섹션 재설계**

**Goal:** 로고 심볼 + 텍스트 로고 + 태그라인 + 스크롤 유도 CTA 구성

**Requirements:** R4, R9, R6, R7

**Dependencies:** Unit 1, Unit 2

**Files:**
- Modify: `src/features/landing/components/hero-section.tsx`

**Approach:**
- 로고 심볼 이미지 (`public/icon.png`) — `next/image`로 중앙 배치
- 텍스트 로고 이미지 (`public/logo-text.png`) — 심볼 아래 배치
- 태그라인: "편함을 설계, 작지만 큰 변화"
- CTA: 스크롤 유도 (아래 화살표 + 텍스트) + 연락하기 버튼
- 스크롤 인디케이터 애니메이션 (bounce-free, 부드러운 opacity 변화)
- Full viewport height (min-h-screen)
- FloatingOrbs 유지하되 핑크 톤으로 변경
- Pretendard 본문, DM Serif Display 영문 accent

**Patterns to follow:**
- 기존 hero-section.tsx의 Framer Motion containerVariants/itemVariants 패턴
- `useReducedMotion()` 접근성 대응

**Test expectation:** none — UI 컴포넌트, 브라우저 시각 확인

**Verification:**
- 375/768/1440px에서 로고+태그라인 정상 렌더링
- 스크롤 인디케이터 애니메이션 동작

---

- [ ] **Unit 4: Brand Philosophy 섹션**

**Goal:** "한 명이라도 필요로 하는 서비스를 만든다" 핵심 철학을 전달하는 내러티브 섹션

**Requirements:** R1, R2, R7

**Dependencies:** Unit 1, Unit 2

**Files:**
- Create: `src/features/landing/components/sections/philosophy-section.tsx`

**Approach:**
- Full-width 섹션, 큰 타이포그래피 (text-3xl ~ text-5xl)
- 핵심 철학 문장을 DM Serif Display로 강조
- 왜 개발자가 되었는지 에세이 텍스트
- `useScroll` + `useTransform`으로 스크롤 시 opacity/y 등장
- 인용문 스타일 요소 (borderLeft + 핑크 accent)
- 배경색 교번 (surface-low ↔ background)

**Patterns to follow:**
- hero-section.tsx의 motion.div + variants 패턴

**Test expectation:** none — 비주얼 섹션, 브라우저 검증

**Verification:**
- 스크롤 시 텍스트가 자연스럽게 등장
- 모바일에서 가독성 확인

---

- [ ] **Unit 5: Brand Story 섹션**

**Goal:** 스타트업 5년 → 해고 → AI → 1인 개발 여정을 내러티브로 풀어내는 인터랙티브 섹션

**Requirements:** R2, R7

**Dependencies:** Unit 1, Unit 2

**Files:**
- Create: `src/features/landing/components/sections/story-section.tsx`

**Approach:**
- 시간순/감정선 흐름 — 각 단락이 스크롤하면서 순차 등장
- 3-4개 스토리 블록: (1) 스타트업 시절, (2) 갑작스러운 해고, (3) AI와 새로운 가능성, (4) 지금 만들고 있는 것들
- 각 블록에 미니멀 장식 요소 (도트, 얇은 라인)
- `useScroll` + `useTransform`으로 스크롤 연동 등장
- surface-low 배경색

**Patterns to follow:**
- hero-section.tsx의 stagger 애니메이션
- bento-card.tsx의 whileInView viewport 감지

**Test expectation:** none — 내러티브 비주얼 섹션

**Verification:**
- 스크롤 시 각 스토리 블록이 순차적으로 등장
- reduced motion 모드에서 즉시 표시

---

- [ ] **Unit 6: Services Preview 섹션 (미니멀)**

**Goal:** Plan-C/L/T를 아이콘 + 한줄 + 배지로 간결하게 미리보기

**Requirements:** R5, R6

**Dependencies:** Unit 1, Unit 2

**Files:**
- Create: `src/features/landing/components/sections/services-preview-section.tsx`

**Approach:**
- 3개 서비스를 수평 나열 (모바일: 세로 스택)
- 각 서비스: 아이콘/심볼 + 이름 + 한줄 설명 + 상태 배지 (LIVE/개발중)
- 클릭 시 해당 서비스 URL 또는 /services 페이지로 이동
- 하단에 "모든 서비스 보기 →" 링크
- whileInView stagger 등장

**Patterns to follow:**
- Badge 컴포넌트 (live, coming-soon, in-development variants)

**Test expectation:** none — 미니멀 프리뷰 섹션

**Verification:**
- 3개 서비스 카드 정상 렌더링
- 링크 정상 동작

---

- [ ] **Unit 7: Contact 섹션 재설계**

**Goal:** 커피챗 + 협업 문의 + 서비스 제작 의뢰를 하나의 섹션으로 통합

**Requirements:** R6

**Dependencies:** Unit 1, Unit 2

**Files:**
- Create: `src/features/landing/components/sections/contact-section-v2.tsx`
- Modify: `src/features/landing/components/contact-dialog.tsx` (핑크 테마 반영)

**Approach:**
- 커피챗 예약 (Cal.com 링크) — primary CTA
- "이런 서비스 만들어주세요" / "협업 문의" — secondary CTA (contact dialog 트리거)
- 이메일 직접 링크
- surface-low 배경

**Patterns to follow:**
- 기존 social-coffee-card.tsx의 Cal.com 링크 패턴
- contact-dialog.tsx의 모달 패턴

**Test expectation:** none — CTA 링크 및 모달 동작 확인

**Verification:**
- Cal.com 링크 정상
- Contact 모달 열기/닫기 정상

---

- [ ] **Unit 8: Landing Page 통합 + Footer 업데이트**

**Goal:** 새로운 섹션들을 landing-page.tsx에 통합하고 Footer를 핑크 테마로 업데이트

**Requirements:** R9, R6

**Dependencies:** Unit 3, 4, 5, 6, 7

**Files:**
- Modify: `src/features/landing/components/landing-page.tsx`
- Modify: `src/features/landing/components/footer.tsx`
- Modify: `src/widgets/navigation-header.tsx`
- Modify: `src/features/landing/index.ts`

**Approach:**
- landing-page.tsx: Bento Grid 구조를 Full-section scroll 구조로 교체
  - Hero → Philosophy → Story → Services Preview → Contact → Footer
- Footer: surface-low 배경, 핑크 테마, 소셜 링크 유지
- NavigationHeader: 로고 pill을 핑크 톤으로, "서비스" 링크 → /services 페이지로
- 기존 Bento Grid 관련 import 정리

**Patterns to follow:**
- 기존 landing-page.tsx의 ContactDialog 상태 관리 패턴

**Test expectation:** none — 통합 테스트는 빌드 + 브라우저

**Verification:**
- `pnpm build` 성공
- 전체 페이지 스크롤 플로우 정상

---

### Phase 3: Services 페이지 신설

- [ ] **Unit 9: /services 페이지**

**Goal:** 서비스 상세 소개를 위한 별도 페이지 신설

**Requirements:** R5, R8

**Dependencies:** Unit 1, Unit 2, Unit 8

**Files:**
- Create: `src/app/[locale]/services/page.tsx`
- Create: `src/features/services/components/services-page.tsx`
- Create: `src/features/services/index.ts`

**Approach:**
- 기존 plan-c-card, plan-l-card, plan-t-card 컴포넌트 재활용 (또는 리팩터)
- 각 서비스별 상세 설명 + CTA
- Bento Grid 또는 카드 리스트 레이아웃
- NavigationHeader에서 "서비스" 링크 연결
- i18n 메시지 services 네임스페이스 활용

**Patterns to follow:**
- `src/app/[locale]/page.tsx`의 locale 페이지 패턴
- 기존 카드 컴포넌트 구조

**Test expectation:** none — 페이지 생성, 빌드 확인

**Verification:**
- `/services` 경로 접근 시 정상 렌더링
- `pnpm build` 성공

---

### Phase 4: 검증

- [ ] **Unit 10: 빌드 검증 + 정리**

**Goal:** 전체 빌드 성공 확인, 미사용 코드 정리

**Requirements:** R11

**Dependencies:** All previous units

**Files:**
- Modify: `src/features/landing/index.ts` (export 정리)
- Potentially remove: 미사용 컴포넌트 (stats-tech-card, tech-stack-data 등)

**Approach:**
- `pnpm build` 실행하여 TypeScript/빌드 에러 0 확인
- 미사용 import/export 정리
- 홈 페이지에서 제거된 컴포넌트가 /services에서 사용 중인지 확인 후 정리 판단

**Test expectation:** none — 빌드 검증

**Verification:**
- `pnpm build` 성공
- TypeScript 에러 0
- 전체 페이지 정상 렌더링

## System-Wide Impact

- **i18n 메시지 키**: 새 섹션 추가로 ko.json/en.json에 신규 네임스페이스 추가. 기존 키 중 사용하지 않는 키 정리 필요.
- **라우팅**: /services 페이지 추가. proxy.ts matcher는 API 외 전체를 잡으므로 변경 불필요.
- **공유 컴포넌트**: Badge, Button은 색상이 CSS variable 참조이므로 핑크 전환 시 자동 반영.
- **Contact API**: `src/app/api/contact/route.ts` 변경 없음.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| 핑크 primary 텍스트 contrast 부족 | interactive 요소에 oklch(0.50 0.12 0) 어두운 핑크, 밝은 핑크는 장식 전용 |
| Dark Mode 핑크 visibility | cool blue hue 225 배경 유지 (보색 대비). warm brown 변경 기각 |
| 텍스트 로고 PNG 671KB → LCP 저하 | next/image 자동 최적화 + width 제한. SVG 변환은 후속 작업 |
| 스크롤 애니메이션 모바일 jank | whileInView만 사용 (useScroll은 최소화). GPU 가속 transform만 |
| DM Serif Display 한국어 fallback | 영문/숫자 전용. 한국어는 Pretendard weight 변화로 강조 |
| v1/v2 스펙 충돌 | 이 계획이 최종 소스. 기존 specs/는 참고 자료로만 |

## Sources & References

- **Origin document:** [docs/brainstorms/landing-redesign-requirements.md](docs/brainstorms/landing-redesign-requirements.md)
- Related code: `src/features/landing/`, `src/app/globals.css`
- Design spec: `specs/design-spec-v2.md` (이전 디자인 스펙 참고)
- Brand assets: `public/icon.png`, `public/logo-text.png`, `public/favicon.ico`
