# LifeCareLog 메인 페이지 전면 재설계 — 요구사항 (PRD)

> 작성일: 2026-04-14
> 최종 수정: 2026-04-14
> 상태: 확정 (비판적 검토 반영)

---

## 1. 프로젝트 개요

LifeCareLog 브랜딩 메인 페이지를 **완전 리디자인**한다.
기존 Bento Grid + 세이지 그린 디자인을 폐기하고, **Full-section scroll + 소프트 핑크/아이보리/오프화이트 따뜻한 톤**의 브랜드 철학 중심 페이지로 새로 만든다.

**이 문서가 유일한 소스 of truth**. 기존 `specs/design-spec-v2.md`, `specs/landing-page.md`는 참고 자료로만.

## 2. 브랜드 철학 (핵심 — 페이지 전체에 녹아야 함)

### 이름의 의미
- **Life**(삶) + **Care**(돌봄) + **Log**(기록) = 삶을 돌보는 기록
- 각 서비스는 **Plan**(계획)으로 이름 — 삶의 계획을 하나씩 실현

### 핵심 철학
- **"한 명이라도 필요로 하는 서비스를 만든다"**
- 소수의 사람이라도 원하는 기능이 있으면 만들어준다
- 내가 놓치는 나의 삶을 케어해주고 기록해주는 서비스
- 개발자가 된 이유: 한 명이라도 좋아하고 만족하는 서비스를 만들어서 삶의 질을 높이는 데 이바지

### 브랜드 스토리
- 여러 스타트업에서 프론트엔드 개발자로 5년간 근무
- 갑작스러운 권고사직(해고 통보) 경험
- AI 기능의 발전과 함께 1인 개발의 가능성 발견
- 혼자지만 정성스럽게, 작지만 의미 있는 서비스를 하나씩 쌓아가는 중

### 용도
- 브랜드 페이지가 메인 목적
- 이력서/포트폴리오로 개인적 활용 (포트폴리오 느낌은 배제)

## 3. 서비스 현황

| 서비스 | 설명 | 상태 | URL |
|--------|------|------|-----|
| Plan-C (플랜씨) | 계산기 모음 웹앱 | **LIVE (운영 중)** | plan-c.lifecarelog.co.kr |
| Plan-L (플랜엘) | AI 법률정보 검색 | **LIVE (운영 중)** | plan-l.lifecarelog.co.kr |
| Plan-T (플랜티) | AI 마음 건강 모바일 앱 | **개발 중** | - |

## 4. 디자인 결정사항 (확정)

### 4-1. 레이아웃: Full-Section Scroll (자연 스크롤)
- **scroll-snap 미사용** — 모바일 UX 문제 방지
- 자연 스크롤 + Framer Motion `whileInView` 등장 애니메이션
- 각 섹션이 자연스럽게 이어지며 스토리가 흘러가는 구조
- 참고: toss.im, saladlab.co

### 4-2. 색상 시스템: 소프트 핑크 + 아이보리 + 오프화이트

**Light Mode:**
| 토큰 | 역할 | OKLCH |
|------|------|-------|
| `--primary` | interactive (버튼/링크) | `oklch(0.50 0.12 0)` — 어두운 핑크, WCAG AA 충족 |
| `--primary-light` | 장식/배경 | `oklch(0.65 0.10 0)` — 밝은 핑크 |
| `--primary-hover` | 호버 상태 | `oklch(0.44 0.12 0)` |
| `--background` | 페이지 배경 | `oklch(0.985 0.006 88)` — warm ivory |
| `--surface-low` | 섹션 교번 | `oklch(0.975 0.007 88)` — off-white |
| `--card` | 카드 배경 | `oklch(1.0 0 0)` — 순백 |
| `--accent` | 보조 포인트 | `oklch(0.72 0.10 55)` — 머스타드 유지 |
| `--tertiary` | 세이지 그린 (보조) | `oklch(0.52 0.10 158)` |

**Dark Mode (hue 225 cool blue 유지):**
| 토큰 | OKLCH |
|------|-------|
| `--primary` | `oklch(0.75 0.10 0)` |
| `--background` | `oklch(0.14 0.008 225)` — 기존 유지 |
| `--card` | `oklch(0.19 0.008 225)` |

> ⚠️ warm brown (hue 30) 배경은 핑크와 색상 구분 어려움 → cool blue 유지

### 4-3. 브랜드 스토리: 내러티브 에세이 + 인터랙티브 스크롤
- 기본은 글로 읽히는 에세이 형식
- 스크롤하면서 텍스트와 요소가 자연스럽게 등장하는 `whileInView` 애니메이션
- 과하지 않게, 성능 친화적으로
- `useScroll`/`useTransform`은 핵심 인용구에만 선택적 적용

### 4-4. 서비스 표현
- 홈에서는 미니멀 미리보기 (아이콘 + 한줄 + 배지)
- 별도 `/services` 페이지 신설 (상세 서비스 소개)
- 기존 카드 컴포넌트 재활용

### 4-5. CTA 전략
- Primary: 브랜드 스토리 읽기 (스크롤 유도)
- Secondary: 커피챗/협업 문의/서비스 제작 의뢰
- 서비스 마케팅은 X/Threads에서 별도 진행

### 4-6. 타이포그래피
- **Pretendard**: 모든 한국어, UI 전체
- **DM Serif Display**: 영문/숫자 강조에만 (한국어 미지원, 전체 10% 이하)
- 한국어 강조: Pretendard Bold/ExtraBold weight 변화로

### 4-7. 접근성
- `useReducedMotion()` — 모든 애니메이션 컴포넌트에 적용 (기존 구현 유지)
- `@media (prefers-reduced-motion: reduce)` — globals.css에 이미 존재
- 44px 이상 touch target
- WCAG AA contrast ratio 준수

### 4-8. SEO/OG 메타
- `generateMetadata`에 OG image, description 추가
- 저작권 연도: `new Date().getFullYear()` 동적 렌더링

## 5. 페이지 구조

```
Section 1: Hero (min-h-screen)
├── 메인 로고 심볼 (리본) — public/icon.png
├── 텍스트 로고 ("lifecarelog") — public/logo-text.png
├── 태그라인: "편함을 설계, 작지만 큰 변화"
├── CTA: "이야기 읽기" (스크롤 유도) + "연락하기"
└── 스크롤 인디케이터

Section 2: Brand Philosophy
├── "한 명이라도 필요로 하는 서비스를 만들어요."
├── 왜 개발자가 되었는지 에세이
├── 인용문 강조 블록
└── surface-low 배경

Section 3: Brand Story
├── "스타트업에서 5년" → "갑작스러운 전환점" → "혼자, 하지만 진지하게" → "지금 만들고 있는 것들"
├── 각 챕터 whileInView 순차 등장
└── 미니멀 장식 (도트, 라인)

Section 4: Services Preview (미니멀)
├── Plan-C (아이콘 + 한줄 + LIVE 배지)
├── Plan-L (아이콘 + 한줄 + LIVE 배지)
├── Plan-T (아이콘 + 한줄 + 개발 중 배지)
└── "모든 서비스 보기 →" → /services

Section 5: Contact / Coffee Chat
├── 커피챗 예약 (Cal.com)
├── 협업/서비스 제작 의뢰
└── Contact Form (모달)

Section 6: Footer
├── 브랜드 로고 + "삶을 돌보는 서비스를 만들어요."
├── 소셜 링크 (GitHub, X, LinkedIn)
└── © {year} LifeCareLog.
```

## 6. 기술 스택 (변경 없음)

- Next.js 16.2 + TailwindCSS V4
- Framer Motion (`motion/react`)
- next-intl (ko/en)
- Pretendard + DM Serif Display
- OKLCH 색상 시스템

## 7. 브랜드 에셋

| 에셋 | 파일 | 설명 |
|------|------|------|
| 심볼 로고 | `public/icon.png`, `public/icon.svg` | 소프트 핑크 리본 |
| 텍스트 로고 | `public/logo-text.png` (671KB → next/image 최적화) | "lifecarelog" 스크립트체 |
| 파비콘 | `public/favicon.ico` | 심볼 아이콘 |
| 앱 아이콘 | `public/apple-icon.png` | Apple touch icon |
| Figma 배경색 | `#F5F5F5` | Hero 배경 레퍼런스 |

## 8. 톤앤매너

- 한국어 해요체 필수
- 진정성 있고 따뜻하되 프로페셔널
- 토스/배민 스타일의 쉬운 한국어
- 1인 개발자의 솔직한 목소리
- AI slop 카피 금지 ("혁신", "최고", "글로벌" 등 과장 금지)
- 겸손하지만 자신감 있는 톤

## 9. 레퍼런스

### 한국 기업 사이트 (17개)
saladlab.co, toss.im, tossinsight.im, tosspayments.com, bucketplace.com,
hwahaeglobal.com, oliveyoung.com, onepredict.ai, nota.ai, ground-one.co.kr,
sentbe.com, autostay.co.kr, ofsupplies.com, specter.co.kr, titanz.co.kr,
rapportlabs.kr, bagelcode.com, loanfra.com

### 디자인 플랫폼
Pinterest, Dribbble, Behance에서 "indie maker brand", "soft pink landing page", "full section scroll" 등 레퍼런스 탐색

## 10. 비목표 (Non-Goals)

- 포트폴리오 느낌의 기술 스택 나열 (제거)
- 서비스별 상세 설명 홈에서 (별도 /services 페이지로)
- 서비스 마케팅 CTA (X/Threads에서)
- scroll-snap (모바일 UX 문제)
- parallax, bounce easing, glassmorphism 등 AI slop 패턴
- Dark Mode warm brown 배경 (핑크와 구분 어려움)

## 11. 성공 기준

- [ ] 방문자가 LifeCareLog의 철학을 3스크롤 이내에 이해
- [ ] 브랜드 스토리가 자연스럽게 읽히는 내러티브
- [ ] 소프트 핑크 + 아이보리 + 오프화이트 색상 시스템 적용
- [ ] 로고(심볼 + 텍스트) Hero 섹션 배치
- [ ] 서비스 미니멀 미리보기 + /services 페이지
- [ ] 모바일 퍼스트 반응형 (375px → 768px → 1440px)
- [ ] 스크롤 whileInView 애니메이션 (성능 친화적)
- [ ] i18n (ko/en) 유지
- [ ] WCAG AA contrast ratio 준수
- [ ] SEO/OG 메타 포함
- [ ] 빌드 성공 + 타입 에러 0
