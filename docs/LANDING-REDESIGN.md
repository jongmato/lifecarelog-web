# LifeCareLog 랜딩페이지 전면 재설계 스펙

> 작성일: 2026-06-09  
> 대상: frontend-dev 에이전트 (바로 구현 가능한 수준)  
> 현재 랜딩 기반 파일: `src/features/landing/`  
> 디자인 토큰 SSOT: `src/app/globals.css`

---

## 0. 코드베이스 현황 요약 (리서치 결과)

### 현재 구조
```
LandingPage
├── HeroSection          — 중앙 정렬, logo + tagline + h1 + subheadline + 3 facts chip + 2 CTA
├── PhilosophySection    — surface-low 배경, 대형 h2 + essay + blockquote (side-stripe border-left)
├── StorySection         — 4챕터 타임라인 (번호 + 세로선 + 내용)
├── ServicesPreviewSection — 4열 그리드 서비스 카드 (plan-c/l/b/t)
├── DevServiceSection    — 3열 가격 티어 카드 (스타터/스탠다드/프리미엄)
└── ContactSectionV2     — 중앙정렬 CTA (Coffee chat + 프로젝트 의뢰)
```

### 기존 디자인 토큰 (유지)
- **배경**: `oklch(0.985 0.006 88)` — 따뜻한 아이보리
- **Primary**: `oklch(0.76 0.09 15)` — 웜 로즈/살몬 계열
- **폰트**: Pretendard Variable (CDN dynamic subset, 이미 로드됨)
- **카드 shadow 시스템**: `.shadow-card`, `.shadow-card-hover` 유틸리티
- **노이즈 텍스처**: `.noise-overlay::after` (opacity 0.02)
- **Dot grid**: `.dot-grid` (20px, foreground 12%)

### 기존 브랜드 에셋 (public/)
- `logo-icon.png` — 정사각형 앱 아이콘
- `logo-text.svg` — 워드마크
- `logo.svg` — 전체 로고
- `plan-c-logo.svg/.png` — Plan-C 블루
- `plan-l-logo.svg/.png` — Plan-L 인디고
- `plan-b-logo.svg` — Plan-B 그린
- `og-image.png` — OG 이미지

### 확인된 문제점 (현재 랜딩)

1. **Hero center-align 과잉** — 모든 텍스트 중앙 정렬. 소개/외주 목적에 맞지 않음. 방문자가 "이게 누구 사이트인가"를 빠르게 판단하기 어려움.
2. **PhilosophySection의 blockquote `border-left`** — side-stripe border 안티패턴 위반. 제거 필요.
3. **StorySection 과도한 수직 공간** — 4챕터가 너무 길어 스크롤 피로도 높음. 1인 브랜드 랜딩에서 자전적 스토리 4장은 과함.
4. **서비스 카드 균일 4열** — 4개가 동일 크기 격자. 비대칭 배치 기회 미활용. Plan-T(준비중)가 Live 서비스와 동일 무게를 차지.
5. **DevService 가격 노출** — 1인 외주 브랜드 랜딩에서 가격표가 너무 이른 위치. About → Work → Services → Contact 흐름이 더 자연스러움.
6. **CTA 2개 중복** — HeroSection에 이미 "문의하기" CTA가 있는데 ContactSectionV2에도 두 개. 페이지당 1 primary CTA 원칙 위반.
7. **시각적 깊이 부재** — 배경이 평면적. 실제 제품 스크린샷이나 mockup이 없음.
8. **모바일 타입스케일** — Hero h1이 `text-3xl`(30px)로 작음. 1인 브랜드 소개에서 더 자신감 있는 크기 필요.

---

## 1. 4차원 선결 (Pre-flight)

### Purpose (목적 · 타겟)
- **누가 보나**: (1) MVP 아이디어가 있는 한국 창업자/사이드프로젝터, (2) 기술 블로그·X/Threads로 유입된 개발자 동료, (3) Plan-C·L·B 사용자가 "만든 사람" 궁금해서 클릭
- **언제 보나**: 모바일 세로 스크롤이 70%+. 데스크탑은 LinkedIn·X 링크 타고 오는 경우.
- **핵심 질문**: "이 사람이 뭘 만드는 사람인가? 믿을 수 있나? 연락해도 되나?"
- **원하는 행동**: Coffee chat 예약(cal.com) 또는 프로젝트 문의. 페이지당 **단 1개** primary CTA.

### Tone (톤)
- **따뜻하고 솔직한 전문가** — "저는 이런 사람이에요"를 겸손하지 않게 말하는 1인 스튜디오
- AI/테크 느낌보다 **장인(craftsman) 감각** — Notion Dark, Cal.com stone과 유사한 절제
- 화려함 아닌 **밀도 있는 여백** — 문장 하나, 숫자 하나가 묵직하게 읽혀야 함
- **해요체 카피** — "만들어요", "도와드려요", "이야기 나눠요"

### Constraints (제약)
- **프레임워크**: Next.js 16 App Router, TailwindCSS V4, Framer Motion (이미 설치됨)
- **폰트**: Pretendard Variable (이미 CDN 로드됨) — 추가 폰트 설치 불필요
- **컴포넌트**: 기존 `src/shared/ui/button.tsx`, `badge.tsx` 재사용
- **i18n**: `next-intl` 유지 — 번역 키는 기존 네임스페이스에 추가
- **성능**: LCP < 2.5s. Hero 이미지 없으면 폰트+CSS만 크리티컬 패스.
- **접근성**: WCAG 2.1 AA. 모든 interactive 요소 44px 터치 타깃.
- **다크모드**: 기존 `.dark` CSS 변수 그대로 사용.

### Differentiation (차별점)
- **경쟁 1인 브랜드**: 대부분 "Made this · Made that" 포트폴리오 나열 → 나는 **실제 운영 중인 제품 3개**라는 사실로 신뢰성 증명
- **실제 사용자가 있음** — "운영 중" 배지가 아닌 **실제 서비스 URL** + 작동하는 스크린샷
- **외주 스튜디오가 아닌 프로덕트 빌더** — "클라이언트 작업물"이 아닌 "내가 직접 만든 제품이 살아있음"이 포인트
- **가격보다 철학 먼저** — 왜 만드는가 → 무엇을 만들었나 → 어떻게 도울 수 있나

---

## 2. 레퍼런스 분석

### 공통 시각 언어 추출 (SEED 당근, 토스 증권, 카카오페이, 컬리, 오늘의집, 크래프톤 기반)

레퍼런스 URL(oh-my-design.kr)은 WebFetch 권한 제한으로 직접 확인 불가. 대신 공개된 SEED Design System(seed-design.io), Toss Design Blog, 한국 top-tier 프로덕트의 공통 패턴을 분석함.

#### 당근마켓 SEED (karrot)
| 요소 | 특징 | 차용 포인트 |
|------|------|-------------|
| 색상 | Carrot Orange `#FF7E36`, 배경은 pure white (#FFFFFF) | 우리는 warm ivory 유지, primary는 rose 계열 유지 |
| 타이포 | Pretendard, Bold 700/600, 본문 16px/1.6 | 동일 폰트 이미 적용됨 |
| 반경 | Card 12px, Button 8px, Tag 100px(pill) | 기존 radius scale과 유사 |
| 여백 | 섹션 간 80-120px, 카드 내부 패딩 20-24px | py-20~32 유지 |
| 특징 | 배경 장식 거의 없음. 콘텐츠로만 계층 구분. | → 실제 서비스 UI screenshot이 핵심 |

#### 토스 증권 (toss-securities)
| 요소 | 특징 | 차용 포인트 |
|------|------|-------------|
| 색상 | 거의 흑백에 가까운 절제. Primary blue 미니멀 사용. | → 우리 warm ivory + rose primary의 절제된 사용 |
| 섹션 흐름 | 큰 숫자 + 짧은 카피로 임팩트. 빽빽한 데이터 × | → 숫자로 신뢰를 주는 "운영 중 3개 서비스" 카운터 |
| 레이아웃 | 비대칭. 좌 텍스트 + 우 이미지 (7:5, 2:1 비율) | → Hero 비대칭 2단 레이아웃 도입 |
| CTA | 1개. 컨텍스트 명확. | → 페이지 전체 1 primary CTA |

#### 오늘의집 (ohouse)
| 요소 | 특징 | 차용 포인트 |
|------|------|-------------|
| 시각 깊이 | 실제 서비스/제품 사진이 배경 장식을 대체 | → Plan-C/L/B 실제 서비스 화면 캡처를 카드에 |
| 색상 | 배경 tinted neutral, 강조색 절약 | → 동일 전략 유지 |
| 카드 | 이미지 + 짧은 텍스트. shadow 아닌 border | → border/background-tint 카드 유지 |

#### 크래프톤 (krafton)
| 요소 | 특징 | 차용 포인트 |
|------|------|-------------|
| 타이포 | Display font 크게. 여백 넉넉하게. | → Hero h1 더 크게 (text-4xl~6xl) |
| 여백 | 공기가 느껴지는 넉넉한 섹션 간격 | → py-24~32 유지 |
| 밀도 | 핵심 정보만. 장식 0 | → 불필요 섹션 제거 |

#### Apple Design.md (getdesign.md/apple)
- 여백 = 메시지. 1줄 카피가 단락보다 강함.
- 제품 화면이 가장 강력한 설득 도구.
- 색 사용 절제 → 주목시키고 싶은 곳에만 primary color.

---

## 3. 섹션 구조 (재설계)

### 전체 페이지 흐름

```
[HEADER — sticky, minimal]
[01. HERO — 비대칭 2단 + 단 1개 primary CTA]
[02. WORK — 실제 운영 서비스 쇼케이스 (plan-c·l·b)]
[03. ABOUT — 1인 개발자 소개 (숫자 + 짧은 에세이)]
[04. HOW — 작업 방식/철학 (3줄 원칙)]
[05. CONTACT — 단일 CTA 풀 섹션]
[FOOTER — 미니멀]
```

> **제거**: StorySection(4챕터 → About로 통합), DevServiceSection(가격표 → 별도 /pricing 페이지로 이동)  
> **신설**: Work Section(기존 ServicesPreview 전면 재설계), About Section(기존 Story 축약)

---

### 섹션 01: Hero

**목적**: "이게 누구고 뭘 하는 사람인가"를 3초 안에 전달

#### 레이아웃

```
모바일 (< 640px):
┌──────────────────────────┐
│  [logo-icon 48px]        │
│  LifeCareLog             │
│  ─────────────────────── │
│  (h1) 삶에 필요한         │
│  서비스를 직접 만들어요.  │
│                          │
│  1인 개발자·AI 프로덕트   │
│  빌더. Plan-C·L·B를      │
│  운영 중이에요.           │
│                          │
│  [커피 한 잔 이야기해요 →]│
│  (primary CTA, full-width│
└──────────────────────────┘

태블릿·데스크탑 (≥ 768px):
┌─────────────────────────────────────────────┐
│  ┌─────────────────────┐  ┌───────────────┐ │
│  │ (h1 large)          │  │ 서비스 미리보기│ │
│  │ 삶에 필요한         │  │ plan-c UI     │ │
│  │ 서비스를            │  │ screenshot    │ │
│  │ 직접 만들어요.      │  │ (16:10 frame) │ │
│  │                     │  │               │ │
│  │ (p) 1인 개발자·     │  │               │ │
│  │ AI 프로덕트 빌더.   │  │               │ │
│  │                     │  └───────────────┘ │
│  │ [커피 한 잔 →]      │                     │
│  └─────────────────────┘                     │
└─────────────────────────────────────────────┘
```

#### 컴포넌트 스펙

```tsx
// HeroSection 재설계

// 레이아웃: 모바일 flex-col, md: grid grid-cols-[1fr_420px] lg:grid-cols-[1fr_520px]
// 비율: 텍스트 좌 / 제품 이미지 우. gap-12 lg:gap-16
// 배경: var(--background) + .dot-grid (기존 유틸리티 재사용)
// 섹션 패딩: py-20 sm:py-28 lg:py-32

// 좌측 텍스트 블록 (left-align, NOT center)
<div className="flex flex-col gap-6 lg:gap-8 items-start">
  // 브랜드 마크 (작게 — Hero는 텍스트가 주인공)
  <img src="/logo-icon.png" width={40} height={40} className="rounded-xl" />

  // h1 — 메인 가치 제안
  // 모바일: text-4xl (36px), 태블릿: text-5xl (48px), 데스크탑: text-6xl (60px)
  // font-bold, tracking-tight, leading-[1.15]
  // 색: var(--foreground) — primary color NO
  <h1>삶에 필요한 서비스를{"\n"}직접 만들어요.</h1>

  // 서브텍스트 — 2줄 이내
  // text-base sm:text-lg, muted-foreground, leading-relaxed
  <p>1인 개발자·AI 프로덕트 빌더.<br/>
  금융 계산기, 생활 법률, 농구 커뮤니티를 운영 중이에요.</p>

  // 운영 현황 pill (기존 fact chip 개선)
  // 3개 → 1줄 flex wrap, border 카드 아닌 badge 스타일
  <div className="flex flex-wrap gap-2">
    <span className="badge live">Plan-C 운영 중</span>
    <span className="badge live">Plan-L 운영 중</span>
    <span className="badge live">Plan-B 운영 중</span>
  </div>

  // CTA — 단 1개 primary (페이지 전체에서 이것만 primary)
  // 기존 두 CTA 중 하나 제거 — "더 알아보기" 제거
  <a href="https://cal.com/lifecarelog/coffee-chat" target="_blank">
    커피 한 잔 이야기해요 →   // min-h-[52px], rounded-xl, primary bg
  </a>
</div>

// 우측 제품 미리보기 (md+에서만 표시)
// 실제 서비스 스크린샷 없으면: plan-c-logo.svg를 크게 표시 + 배경 card
// 있으면: 16:10 비율 rounded-2xl border overflow-hidden
// 부드러운 회전 없음. 단순 정적 이미지로 충분.
<div className="hidden md:block relative">
  <div className="rounded-2xl border border-border overflow-hidden shadow-card">
    <img src="/og-image.png" ... />  // 일단 og-image 활용
  </div>
</div>
```

**카피 (해요체)**

| 요소 | 카피 | 번역 키 |
|------|------|---------|
| h1 | 삶에 필요한 서비스를 직접 만들어요. | `hero.headline` (수정) |
| subheadline | 1인 개발자·AI 프로덕트 빌더. 금융 계산기, 생활 법률, 농구 커뮤니티를 운영 중이에요. | `hero.subheadline` (수정) |
| CTA | 커피 한 잔 이야기해요 | `hero.ctaCoffee` (신규) |

**모션**: 기존 staggerChildren 유지. 우측 이미지는 초기 `opacity: 0, x: 24` → `opacity: 1, x: 0`, delay 0.2s.

---

### 섹션 02: Work (서비스 쇼케이스)

**목적**: "이 사람이 실제로 만든 것이 있구나" 즉각적 설득

#### 레이아웃

비대칭 Bento Grid. 기존 균일 4열 그리드 → Feature + 2 Small 구조.

```
모바일:
┌──────────────────────┐
│ Plan-C               │
│ [큰 카드, 2/3 높이]  │
│ 재무 설계 계산기      │
│ lifecarelog → 바로가기│
├──────────────────────┤
│ Plan-L     │ Plan-B  │
│ [작은카드] │ [작은카드│
└────────────┴─────────┘

태블릿+:
┌────────────────────────────────────────────┐
│ ┌──────────────────┐  ┌─────────┐ ┌───────┐│
│ │ Plan-C           │  │ Plan-L  │ │Plan-B ││
│ │ [Feature 2/3 W]  │  │[1/3 W]  │ │[1/3 W]││
│ │ 재무 설계 계산기 │  │생활 법률│ │농구   ││
│ │ 스크린샷/큰 로고 │  │         │ │커뮤니티│
│ │                  │  │         │ │       ││
│ └──────────────────┘  └─────────┘ └───────┘│
└────────────────────────────────────────────┘
```

#### 컴포넌트 스펙

```tsx
// WorkSection — 기존 ServicesPreviewSection 전면 재설계

// 섹션 헤더 (좌측 정렬)
// "만든 것들" overline + h2 "운영 중인 서비스"
// 오른쪽: "서비스 목록 →" 링크 (기존 유지)

// Feature Card (Plan-C — 첫 번째, 큰 카드)
// col-span: 모바일 full / md: col-span-2 (3열 중)
// row-span: 모바일 auto / md: row-span-2
// 내부: 로고(32px) + 이름 + badge(live) + tagline + 실제 URL + 큰 로고 or accent-bg
// border: 1px solid var(--border)
// background: var(--card)
// hover: shadow-card-hover (기존 유틸리티)
// Plan-C accent: --plan-c `oklch(0.55 0.10 215)` 을 background-tint으로 미세하게

// Small Card (Plan-L, Plan-B)
// 각각 1열. 동일 구조이지만 더 컴팩트
// Plan-T(준비중)는 이 섹션에서 제거 → Footer badge로만 언급

// 링크: 각 카드는 href=서비스 URL, target=_blank
// 카드에 shadow 아닌 border 사용 (기존 shadow-card는 hover 시에만)
```

**카피**

| 요소 | 카피 |
|------|------|
| Section overline | 만든 것들 |
| h2 | 실제로 운영 중인 서비스예요. |
| Plan-C tagline | 대출, 저축, 투자를 한 곳에서 계산해요. |
| Plan-L tagline | 일상 속 법률 정보를 쉽게 찾아요. |
| Plan-B tagline | 농구 동호회를 위한 팀 운영 도구예요. |
| 바로가기 | 서비스 보기 |

---

### 섹션 03: About (1인 개발자 소개)

**목적**: "이 사람이 누구인가" — 짧고 진실하게

**기존**: StorySection (4챕터 타임라인, 너무 길고 산문적)  
**재설계**: 숫자 3개 + 짧은 에세이 1단락 + 핵심 역량 tags

#### 레이아웃

```
모바일:
┌──────────────────────┐
│ About                │  ← overline
│ 삶을 돌보는 기록을   │
│ 만들어요.            │  ← h2
│                      │
│  3개    3개    2024  │  ← stat row (숫자 3개)
│ 서비스  제품  시작년도│
│                      │
│ (본문 2-3문장)       │
│                      │
│ [React][Next.js]     │  ← skill tags
│ [Supabase][AI]       │
└──────────────────────┘

데스크탑:
┌──────────────────────────────────────────┐
│ ┌─────────────────────────┐ ┌───────────┐│
│ │ About                   │ │  숫자 3개 ││
│ │ 삶을 돌보는 기록을       │ │  스탯 블록││
│ │ 만들어요.                │ │           ││
│ │                         │ │  3        ││
│ │ (본문)                  │ │  운영 서비│ │
│ │                         │ │  스        ││
│ │ [스킬 tags]             │ │           ││
│ └─────────────────────────┘ └───────────┘│
└──────────────────────────────────────────┘
```

#### 컴포넌트 스펙

```tsx
// AboutSection (신규 컴포넌트)
// 배경: var(--surface-low)
// 레이아웃: 모바일 single col / md: grid grid-cols-[1fr_280px] gap-12

// 좌측: 텍스트 블록
//   overline: "About" — text-xs uppercase tracking-widest primary color
//   h2: "삶을 돌보는 기록을 만들어요." — text-3xl sm:text-4xl font-bold
//   p: 2-3문장 에세이 (아래 카피 참조)
//   스킬 badges: flex flex-wrap gap-2 mt-6

// 우측: 숫자 카드 (모바일에서는 h2 아래 수평 배열)
//   3개 숫자: 세로 스택 (md+) / 수평 3열 (모바일)
//   각 숫자: 큰 숫자(text-4xl font-bold) + 라벨(text-sm muted-foreground)
//   배경: var(--card), border, rounded-xl, p-5

// 애니메이션: CountUp (기존 count-up.tsx 재사용) — 숫자가 뷰포트 진입 시 카운팅
```

**카피**

| 요소 | 카피 |
|------|------|
| overline | About |
| h2 | 삶을 돌보는 기록을 만들어요. |
| p | AI와 함께 혼자 만들고, 직접 운영해요. 불편한 것을 발견하면 직접 해결하는 도구를 만들어요. 복잡한 금융 계산, 어려운 법률 용어, 팀 운영의 번거로움 — 하나씩 해결하고 있어요. |
| Stat 1 | 3 / 운영 중인 서비스 |
| Stat 2 | 2024 / 시작한 해 |
| Stat 3 | 100% / AI 보조 개발 |
| 스킬 tags | Next.js · React · Expo · FastAPI · Supabase · AI |

---

### 섹션 04: How (작업 철학)

**목적**: 외주 문의를 고려하는 방문자에게 "어떻게 일하는가" 전달

**기존**: DevServiceSection (가격표 3티어) → 가격 정보는 `/pricing`으로 이동
**재설계**: 3가지 작업 원칙 카드 + "가격 확인하기" 텍스트 링크

#### 레이아웃

```
모바일:
┌──────────────────────┐
│ How                  │  ← overline
│ 이렇게 만들어요.     │  ← h2
│ ─────────────────── │
│ 01 — 빠르게 만들고  │
│ 빠르게 검증해요.     │
│ ─────────────────── │
│ 02 — AI를 적극      │
│ 활용해 빠르고 꼼꼼   │
│ 하게 만들어요.       │
│ ─────────────────── │
│ 03 — 운영까지       │
│ 책임져요. 출시 후도   │
│ 함께해요.            │
│                      │
│ 가격 확인하기 →      │  ← text link (NOT button)
└──────────────────────┘

데스크탑:
┌─────────────────────────────────────────┐
│ How  이렇게 만들어요.                    │
│                                         │
│ ┌──────────┐  ┌──────────┐  ┌─────────┐│
│ │ 01       │  │ 02       │  │ 03      ││
│ │ 빠르게   │  │ AI로     │  │ 운영까지││
│ │ 검증     │  │ 꼼꼼히   │  │ 책임    ││
│ └──────────┘  └──────────┘  └─────────┘│
│                          가격 확인하기 →│
└─────────────────────────────────────────┘
```

#### 컴포넌트 스펙

```tsx
// HowSection (신규 — 기존 DevServiceSection 대체)
// 배경: var(--background)
// 레이아웃: max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28

// 헤더: overline + h2 (좌측 정렬)

// 원칙 카드 3개: grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10
// 각 카드:
//   배경: var(--card)
//   border: 1px solid var(--border)
//   rounded-xl p-6
//   NO shadow (default 상태), shadow-card는 hover 시에만
//   번호: text-xs font-semibold primary color (01, 02, 03)
//   제목: text-base font-semibold mt-2
//   본문: text-sm muted-foreground leading-relaxed mt-1.5

// 하단 링크 (button 아님, plain text link)
// "가격 및 상세 서비스 확인하기 →" — text-sm, Link href="/pricing"
// 우측 정렬 또는 좌측 + mt-8
```

**카피**

| 요소 | 카피 |
|------|------|
| overline | How |
| h2 | 이렇게 만들어요. |
| 원칙 01 | **빠르게 만들고 검증해요.** MVP를 빠르게 출시하고 사용자 반응을 보며 개선해요. |
| 원칙 02 | **AI를 적극 활용해요.** 개발·디자인·기획 전 과정에 AI를 써서 더 빠르고 꼼꼼하게 만들어요. |
| 원칙 03 | **운영까지 함께해요.** 출시가 끝이 아니에요. 안정적으로 운영될 때까지 책임져요. |
| 텍스트 링크 | 가격 및 상세 서비스 확인하기 → |

---

### 섹션 05: Contact (단일 CTA)

**목적**: 하나의 명확한 행동 유도 — Cal.com coffee chat

**기존**: ContactSectionV2 (거의 그대로 유지, CTA 1개로 정리)

**변경 사항**:
- Primary CTA: "커피 한 잔 이야기해요" (cal.com) — 1개만
- Secondary: 이메일 텍스트 링크 제거 (mailto 링크만 아주 작게 유지)
- "프로젝트 문의" 버튼 → Contact Dialog 열기 (outline button 1개)
- center-align 유지 (CTA 섹션은 center OK)

---

### Header (Sticky)

**기존**: 파악 안 됨 (별도 레이아웃에 있을 것). 스펙 추가 필요 없음.

---

### Footer

**기존 유지**. 변경 사항:
- Plan-T 배지 제거 (아직 미출시 서비스를 footer badge에 두는 것 부적절)
- Plan-B 배지 추가 (`plan-b`, `plan-c`, `plan-l` 3개로 정리)

---

## 4. 디자인 토큰

기존 `globals.css` 토큰을 **그대로 유지**. 추가/수정만 명시.

### 색상 (기존 유지, 수정 없음)

```css
/* globals.css — 기존 그대로 유지 */
:root {
  --background:     oklch(0.985 0.006 88);  /* 아이보리 warm white */
  --surface-low:    oklch(0.975 0.007 88);  /* 약간 더 어두운 섹션 배경 */
  --foreground:     oklch(0.18 0.010 248);  /* 웜 다크 네이비 */
  --primary:        oklch(0.76 0.09 15);   /* 웜 로즈/살몬 */
  --card:           oklch(0.995 0.003 88);  /* 거의 흰색 카드 */
  --border:         oklch(0.905 0.006 88);  /* 연한 아이보리 보더 */
  --muted-foreground: oklch(0.52 0.010 248);

  /* Plan 색상 — 서비스 카드 accent tint에 사용 */
  --plan-c: oklch(0.55 0.10 215);  /* 블루 */
  --plan-l: oklch(0.50 0.09 255);  /* 인디고 */
  --plan-b: oklch(0.55 0.13 145);  /* 그린 */
}
```

### 새로운 토큰 추가 (globals.css @theme inline 섹션에 추가)

```css
@theme inline {
  /* 기존 토큰 유지 + 아래 추가 */
  --radius-3xl: 2rem;   /* Hero 이미지 프레임 등 대형 컨테이너 */
}
```

### 타이포그래피 스케일

Pretendard Variable 이미 로드됨. Tailwind 클래스 기준:

| 용도 | 클래스 | 값 |
|------|--------|-----|
| Hero h1 (모바일) | `text-4xl` | 36px |
| Hero h1 (태블릿) | `sm:text-5xl` | 48px |
| Hero h1 (데스크탑) | `lg:text-6xl` | 60px |
| Section h2 | `text-3xl sm:text-4xl` | 30-36px |
| Card 제목 | `text-lg font-semibold` | 18px |
| 본문 | `text-base` | 16px |
| 보조 텍스트 | `text-sm` | 14px |
| Overline | `text-xs uppercase tracking-widest font-semibold` | 12px |
| Footer tiny | `text-[10px]` | 10px |
| Line height | 제목 `leading-[1.15]~[1.25]`, 본문 `leading-relaxed (1.625)` | - |

### Spacing 시스템

8px 베이스. 섹션 간격:

| 용도 | 클래스 |
|------|--------|
| 섹션 내부 수직 패딩 | `py-20 sm:py-28 lg:py-32` |
| 카드 내부 패딩 | `p-5 sm:p-6` |
| 섹션 최대 너비 | `max-w-[1200px] mx-auto px-4 sm:px-6` |
| 카드 그리드 간격 | `gap-4 sm:gap-5` |
| 인라인 요소 간격 | `gap-2 sm:gap-3` |

### Radius 계층

```
섹션/큰 컨테이너  → rounded-2xl  (24px)  -- Hero 이미지 프레임
일반 카드         → rounded-xl   (20px, 기존 사용)
버튼 / 소형 카드  → rounded-xl   (기존)
뱃지 / 태그       → rounded-full (pill)
인풋              → rounded-lg   (기존)
```

### Shadow 시스템 (기존 유지)

```css
/* 기존 globals.css 유지 */
.shadow-card       /* 기본 상태 카드 — 미세한 border+shadow */
.shadow-card-hover /* hover 상태 — 더 깊은 shadow */
/* 카드 default 상태: border only (shadow 없이) 도 허용 */
```

---

## 5. 컴포넌트 목록

### 재사용 (기존 유지)

| 컴포넌트 | 위치 | 용도 |
|---------|------|------|
| `Button` | `src/shared/ui/button.tsx` | CTA 버튼 |
| `Badge` | `src/shared/ui/badge.tsx` | "운영 중" / "준비 중" 뱃지 |
| `CountUp` | `src/features/landing/components/count-up.tsx` | About 섹션 숫자 애니메이션 |
| `Footer` | `src/features/landing/components/footer.tsx` | 미니멀 푸터 (소폭 수정) |
| `ContactDialog` | `src/features/landing/components/contact-dialog.tsx` | 문의 다이얼로그 |
| `ThemeToggle` | `src/features/landing/components/theme-toggle.tsx` | 헤더 다크모드 토글 |

### 수정 (기존 컴포넌트 수정)

| 컴포넌트 | 수정 내용 |
|---------|-----------|
| `HeroSection` | 비대칭 2단 레이아웃으로 전면 재설계. CTA 1개로 축소. left-align. |
| `ServicesPreviewSection` | `WorkSection`으로 이름 변경. 비대칭 Bento 그리드 적용. Plan-T 제거. |
| `ContactSectionV2` | Primary CTA 1개만 유지. "프로젝트 의뢰" outline 버튼 유지. |
| `Footer` | Plan-T 배지 제거, Plan-B 추가. |

### 신규 (새로 만들 컴포넌트)

| 컴포넌트 | 위치 | 스펙 |
|---------|------|------|
| `AboutSection` | `src/features/landing/components/sections/about-section.tsx` | 숫자 3개 + 에세이 + 스킬 tags. 기존 StorySection 대체. |
| `HowSection` | `src/features/landing/components/sections/how-section.tsx` | 3원칙 카드. 기존 DevServiceSection 대체. |
| `StatCard` | `src/features/landing/components/stat-card.tsx` | CountUp + 라벨. AboutSection 내부 사용. |
| `PrincipleCard` | `src/features/landing/components/principle-card.tsx` | 번호 + 제목 + 본문. HowSection 내부 사용. |

### 삭제 (기존 불필요 컴포넌트)

| 컴포넌트 | 이유 |
|---------|------|
| `PhilosophySection` | About에 통합. blockquote side-stripe 안티패턴 포함. |
| `StorySection` | 너무 길고 자전적. About으로 축약. |
| `DevServiceSection` | 가격표는 /pricing으로 이동. HowSection으로 대체. |

---

## 6. 수정된 LandingPage 구조

```tsx
// src/features/landing/components/landing-page.tsx

export function LandingPage() {
  const onContact = useContact()

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <HeroSection onContact={onContact} />      {/* 재설계 */}
      <WorkSection />                             {/* 신규 (기존 ServicesPreview 대체) */}
      <AboutSection />                            {/* 신규 (기존 Story+Philosophy 대체) */}
      <HowSection onContact={onContact} />        {/* 신규 (기존 DevService 대체) */}
      <ContactSectionV2 onContact={onContact} />  {/* 소폭 수정 */}
    </main>
  )
}
```

---

## 7. i18n 번역 키 변경

### 신규 네임스페이스: `work`
```json
{
  "sectionLabel": "만든 것들",
  "headline": "실제로 운영 중인 서비스예요.",
  "viewAll": "서비스 전체 보기",
  "goToService": "서비스 보기",
  "planC": {
    "name": "Plan-C",
    "tagline": "대출, 저축, 투자를 한 곳에서 계산해요.",
    "badge": "운영 중"
  },
  "planL": {
    "name": "Plan-L",
    "tagline": "일상 속 법률 정보를 쉽게 찾아요.",
    "badge": "운영 중"
  },
  "planB": {
    "name": "Plan-B",
    "tagline": "농구 동호회를 위한 팀 운영 도구예요.",
    "badge": "운영 중"
  }
}
```

### 신규 네임스페이스: `about`
```json
{
  "sectionLabel": "About",
  "headline": "삶을 돌보는 기록을 만들어요.",
  "description": "AI와 함께 혼자 만들고, 직접 운영해요. 불편한 것을 발견하면 직접 해결하는 도구를 만들어요. 복잡한 금융 계산, 어려운 법률 용어, 팀 운영의 번거로움 — 하나씩 해결하고 있어요.",
  "stat1Number": "3",
  "stat1Label": "운영 중인 서비스",
  "stat2Number": "2024",
  "stat2Label": "시작한 해",
  "stat3Number": "100%",
  "stat3Label": "AI 보조 개발"
}
```

### 신규 네임스페이스: `how`
```json
{
  "sectionLabel": "How",
  "headline": "이렇게 만들어요.",
  "principle1Title": "빠르게 만들고 검증해요.",
  "principle1Body": "MVP를 빠르게 출시하고 사용자 반응을 보며 개선해요.",
  "principle2Title": "AI를 적극 활용해요.",
  "principle2Body": "개발·디자인·기획 전 과정에 AI를 써서 더 빠르고 꼼꼼하게 만들어요.",
  "principle3Title": "운영까지 함께해요.",
  "principle3Body": "출시가 끝이 아니에요. 안정적으로 운영될 때까지 책임져요.",
  "pricingLink": "가격 및 상세 서비스 확인하기"
}
```

### 수정: `hero` 네임스페이스
```json
{
  "headline": "삶에 필요한 서비스를\n직접 만들어요.",
  "subheadline": "1인 개발자·AI 프로덕트 빌더.\n금융 계산기, 생활 법률, 농구 커뮤니티를 운영 중이에요.",
  "ctaCoffee": "커피 한 잔 이야기해요",
  "tagline": "삶을 돌보는 기록 — (기존 유지)",
  "fact1": "Plan-C 운영 중",
  "fact2": "Plan-L 운영 중",
  "fact3": "Plan-B 운영 중"
}
```

---

## 8. 반응형 브레이크포인트

| 브레이크포인트 | 너비 | 변화 |
|-------------|------|------|
| Mobile | < 640px (`sm`) | 단일 열, CTA full-width, Hero 단일 열 |
| Tablet | 640-1024px (`sm`~`lg`) | Hero 2열 시작(`md:grid`), Work 2열 |
| Desktop | > 1024px (`lg`) | Hero 2열 확장, Work Bento 비대칭, About 2열 |

**터치 타깃**: 모든 interactive 요소 `min-h-[44px] min-w-[44px]` 유지.

---

## 9. 애니메이션 스펙

**원칙**: 페이지 로드 Hero staggered reveal 1회. 이후 섹션은 `whileInView` `once: true`.  
산발적 마이크로인터랙션 금지. hover는 `y: -4` 또는 `shadow-card-hover` 전환으로 충분.

| 트리거 | 애니메이션 | 지속시간 | 이징 |
|--------|-----------|---------|------|
| Hero 최초 로드 | stagger fade+slide up (y: 28→0) | 0.6s | [0.22, 1, 0.36, 1] (ease-out-expo) |
| Hero 우측 이미지 | fade+slide right (x: 24→0) | 0.7s delay 0.2s | 동일 |
| 섹션 진입 | fade+slide up (y: 20→0) | 0.45s | 동일 |
| 카드 hover | y: -4 + shadow-card-hover | 250ms | ease |
| CountUp | 0→숫자 | 1.2s | ease-out |

**Framer Motion 코드 패턴** (기존 코드베이스와 통일):
```tsx
const EASING = [0.22, 1, 0.36, 1] as const
// whileInView / viewport={{ once: true, amount: 0.15 }} 패턴 유지
// shouldReduceMotion 체크 유지
```

---

## 10. 접근성 (WCAG 2.1 AA)

| 요소 | 요구사항 |
|------|---------|
| 색 대비 | 본문(var(--foreground) on var(--background)): 7:1+ 확보됨. Muted: 4.5:1+ 확인 필요 |
| 터치 타깃 | 모든 버튼·링크 44×44px 이상 |
| aria-label | 외부 링크에 `aria-label="Plan-C — 서비스 보기 (새 탭 열림)"` 추가 |
| alt text | 로고 이미지: alt="LifeCareLog 로고". 장식 이미지: alt="" |
| heading 구조 | h1(1개) → h2(섹션) → h3(카드 내 제목) 순서 준수 |
| focus visible | 기존 `focus-visible:ring-2 focus-visible:ring-ring` 유지 |
| 키보드 | Tab 순서: hero CTA → work cards → about → how → contact |

---

## 11. 다크모드 동작

기존 `.dark` CSS 변수 그대로 사용. 추가 처리 없음.

- **배경**: `oklch(0.22 0.015 50)` — 따뜻한 코코아 다크 (순수 검정 아님)
- **카드**: `oklch(0.28 0.015 50)` — 배경보다 약간 밝음
- **border**: `oklch(0.35 0.015 50)` — 카드 구분 가능
- **primary**: `oklch(0.74 0.08 15)` — 다크에서 더 밝게 조정됨

---

## 12. 성능 고려사항

| 항목 | 처리 방법 |
|------|-----------|
| 폰트 | Pretendard CDN dynamic subset (이미 적용) |
| 이미지 | Next.js `<Image>` 컴포넌트 사용. plan-*-logo.png는 width/height 명시. |
| og-image.png | Hero 우측 이미지로 재활용 시 `priority` prop 추가 (LCP 이미지) |
| 서비스 스크린샷 | 없으면 og-image.png 임시 사용 → 실제 캡처본으로 교체 예정 |
| JS | framer-motion은 이미 설치됨. 추가 라이브러리 불필요. |

---

## 13. DO / DON'T 체크리스트

### ✅ DO (반드시 지킬 것)

- [ ] 폰트는 Pretendard만 사용 (이미 로드됨, 추가 import 불필요)
- [ ] Hero h1은 `text-align: left` (center 금지)
- [ ] CTA는 페이지 전체에서 **1개만 primary** (cal.com coffee chat)
- [ ] 카드는 `border + var(--card) 배경`으로 구분. default 상태에서 shadow 최소화.
- [ ] hover 시에만 `shadow-card-hover` 적용
- [ ] 계층별 radius 차등: 큰 컨테이너 `rounded-2xl`, 일반 카드 `rounded-xl`, 버튼 `rounded-xl`
- [ ] 색상은 oklch CSS 변수만 사용 (하드코딩 hex 금지)
- [ ] 배경에 원형/blob/glow 장식 절대 금지
- [ ] 노이즈 텍스처(`.noise-overlay`)와 dot grid(`.dot-grid`) 재활용
- [ ] 모든 텍스트 카피 **해요체**
- [ ] 운영 중 서비스: Plan-C, Plan-L, Plan-B (3개). Plan-T는 랜딩에서 제거
- [ ] `whileInView viewport={{ once: true }}` — 반복 애니메이션 금지
- [ ] shouldReduceMotion 체크 유지
- [ ] 터치 타깃 min 44×44px

### ❌ DON'T (절대 하지 말 것)

- [ ] Inter, Roboto, system-ui 폰트 사용
- [ ] `border-left` 또는 `border-right` > 1px side-stripe
- [ ] 보라색/파란색 그라디언트 배경
- [ ] `background: radial-gradient(circle, ...)` 배경 blob
- [ ] `absolute rounded-full` 장식 원형 요소
- [ ] card-in-card (카드 안에 또 카드)
- [ ] 전체 영역 center-align (hero 제외한 본문)
- [ ] `text-transform: uppercase` 긴 제목 (overline 제외)
- [ ] 산발적 hover 마이크로인터랙션 (5개 이상 개별 요소)
- [ ] 미출시 서비스(Plan-T)를 live 서비스와 동일 강조도로 노출
- [ ] 가격 정보를 랜딩 메인 플로우에 포함 (별도 /pricing 페이지 유지)
- [ ] `box-shadow: 0 ... #6366F1` 등 하드코딩 색상
- [ ] `class="shadow-lg"` 기본 Tailwind shadow 직접 사용 (`.shadow-card` 유틸리티 사용)

---

## 14. 파일 변경 요약

### 생성할 파일
```
src/features/landing/components/sections/about-section.tsx   (신규)
src/features/landing/components/sections/how-section.tsx     (신규)
src/features/landing/components/sections/work-section.tsx    (신규 — ServicesPreviewSection 대체)
src/features/landing/components/stat-card.tsx                (신규)
src/features/landing/components/principle-card.tsx           (신규)
```

### 수정할 파일
```
src/features/landing/components/landing-page.tsx             (섹션 조합 변경)
src/features/landing/components/hero-section.tsx             (비대칭 레이아웃 재설계)
src/features/landing/components/sections/contact-section-v2.tsx (CTA 1개로 축소)
src/features/landing/components/footer.tsx                   (Plan-T→Plan-B 뱃지 교체)
messages/ko.json 및 messages/en.json                         (work·about·how 네임스페이스 추가)
```

### 삭제할 파일 (또는 사용 중단)
```
src/features/landing/components/sections/philosophy-section.tsx  (About에 통합)
src/features/landing/components/sections/story-section.tsx       (About으로 대체)
src/features/landing/components/sections/dev-service-section.tsx (HowSection으로 대체)
```

---

## 15. 구현 순서 권장

1. **globals.css**: `--radius-3xl` 토큰 1줄 추가
2. **번역 파일**: `work`, `about`, `how` 네임스페이스 추가. `hero` 수정.
3. **HeroSection**: 비대칭 레이아웃 재설계 (핵심 변경)
4. **WorkSection**: 비대칭 Bento 그리드 (ServicesPreviewSection 리팩토링)
5. **AboutSection**: StatCard + 에세이 + 스킬 tags
6. **HowSection**: PrincipleCard 3개
7. **LandingPage**: 섹션 조합 교체
8. **ContactSectionV2**: CTA 1개 정리
9. **Footer**: 배지 교체
10. **삭제**: 미사용 컴포넌트 제거

---

## 부록: 현재 랜딩 문제와 재설계 대응 매핑

| 문제 | 재설계 해결책 |
|------|------------|
| Hero center-align | 비대칭 2단, 좌측 정렬 |
| blockquote side-stripe | Philosophy 섹션 전체 제거 |
| 4챕터 스토리 너무 길다 | About 섹션으로 축약 (에세이 3문장) |
| 서비스 카드 균일 4열 | 비대칭 Bento 그리드 |
| Plan-T 미출시인데 동일 노출 | WorkSection에서 제거, Footer에만 작게 |
| 가격표 너무 이른 위치 | HowSection으로 대체, 가격은 link만 |
| CTA 2개+ 중복 | 전체 1 primary (cal.com coffee chat) |
| 시각적 깊이 없음 | og-image.png / plan-c 로고 Hero 우측 배치 |
| Hero h1 너무 작다 | text-4xl → lg:text-6xl |

---

> **성과 질문 (성과 중심 사고)**: 이 재설계로 변화를 기대하는 지표는 **cal.com coffee chat 예약 전환율**과 **Contact Dialog 오픈율**이에요. Hero에서 바로 커피 챗 링크를 primary CTA로 올리고, 가격 선탐색 대신 관계 형성을 먼저 하는 구조로 변경했어요. 외주 문의 품질(아이디어 단계 문의 증가)도 함께 관찰할 지표예요.

---

Sources:
- [SEED Design System (당근마켓)](https://seed-design.io/)
- [GitHub daangn/seed-design](https://github.com/daangn/seed-design)
- [한국 디자인 시스템 모아보기](https://brunch.co.kr/@onbeak/7)
- [Design Tokens in 2026](https://www.designsystemscollective.com/design-tokens-in-2026-beyond-colors-and-spacing-d2fd632029e1)
