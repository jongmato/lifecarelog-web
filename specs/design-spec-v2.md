# LifeCareLog Landing Page Design Spec v2

> 기준일: 2026-03-31
> 소스: 첨부 스크린샷 + Stitch "Artisan Journal" + SaaS 14개 사이트 분석 + Bento Grid 리서치

---

## 1. 디자인 컨셉

### Creative Direction: "따뜻한 기록의 집"

일기장처럼 친근하고, 영수증처럼 정직한 개발자의 작업실.

**키워드**: Warm Editorial / Honest Craft / Quiet Confidence / Legible Warmth / Indie Maker

**차별점**:
| 흔한 패턴 (AI Slop) | LifeCareLog |
|---------------------|-------------|
| 다크 배경 + 보라 gradient | 따뜻한 아이보리 + 세이지 그린 |
| Inter + 보라색 조합 | Pretendard + DM Serif Display |
| generic stock illust | 실제 서비스 mock UI |
| bounce easing | spring physics (300/30) |
| card-in-card, glassmorphism | 배경색 전환 + ambient shadow |

---

## 2. 색상 시스템 (OKLCH)

### Light Mode (기본)

```css
:root {
  /* 배경 계층 — Artisan Journal surface hierarchy */
  --background:       oklch(0.985 0.006 88);  /* warm ivory #FAF9F7 */
  --surface-low:      oklch(0.975 0.007 88);  /* 섹션 교번 배경 #F5F3EE */
  --surface-high:     oklch(0.960 0.007 88);  /* nav/modal 배경 #EAE8E3 */
  --card:             oklch(1.0 0 0);          /* 순백 카드 */

  /* 텍스트 */
  --foreground:       oklch(0.18 0.010 248);  /* warm dark #1B1C19 */
  --muted-foreground: oklch(0.52 0.010 248);  /* #6B6B6B */

  /* Primary — Sage Green (차분하게 조정) */
  --primary:          oklch(0.52 0.10 158);   /* 진한 세이지 #4E635A */
  --primary-light:    oklch(0.62 0.10 158);   /* 밝은 세이지 #8DA399 */
  --primary-hover:    oklch(0.46 0.10 158);

  /* Accent — Warm Amber */
  --accent:           oklch(0.72 0.10 55);    /* 머스타드 #E5A947 */

  /* Tertiary — Soft Pink (참고 이미지 영감) */
  --tertiary:         oklch(0.70 0.08 15);    /* #B99693 */

  /* Border — No-Line 철학: 거의 안 보이게 */
  --border:           oklch(0.905 0.006 88);  /* #E5E3DF */

  /* 서비스 accent */
  --plan-c:           oklch(0.55 0.10 215);   /* sky-teal */
  --plan-l:           oklch(0.50 0.09 255);   /* indigo */
  --plan-t:           oklch(0.53 0.10 190);   /* teal-green */
}
```

### Dark Mode (Warm Dark)

```css
.dark {
  --background:       oklch(0.14 0.008 225);
  --surface-low:      oklch(0.17 0.008 225);
  --card:             oklch(0.19 0.008 225);
  --border:           oklch(0.27 0.008 225);
}
```

### Artisan Journal "No-Line" 원칙 적용

- 섹션 구분: `border-top` 대신 `--surface-low` ↔ `--background` 배경색 교번
- 카드 외곽: `border 1px` 유지 (제거하면 배경과 구분 불가)
- 카드 내부 divider: gradient `h-px` line만 사용

---

## 3. 타이포그래피

### Font Pairing

| 역할 | 폰트 | 사용처 |
|------|------|--------|
| Primary | Pretendard Variable | 모든 한국어, UI 전체 |
| Display | DM Serif Display | 숫자 강조, 영문 accent 단어 |
| Mono | JetBrains Mono (선택) | 기술 스택 태그 |

> DM Serif Display 이미 설치됨 — 현재 미사용 → 적극 활용

### Type Scale

```
Hero headline:   clamp(2rem, 7vw, 3.5rem), font-bold, tracking-tight, leading-[1.15]
Section title:   text-xl, font-semibold, leading-snug
Card title:      text-base, font-semibold
Body:            text-sm, font-normal, leading-[1.8]
Caption/Eyebrow: text-xs, font-semibold, uppercase, tracking-widest
Stat number:     clamp(2.25rem, 5vw, 2.75rem), font-display, font-bold, tabular-nums
```

### Editorial Contrast (Stitch 영감)
- 헤드라인 ↔ 본문 사이즈 비율 3:1 이상
- 한국어 해요체, `word-break: keep-all`

---

## 4. 페이지 구조

### Layout: Full-Section Scroll + Card Grid Hybrid

```
NavigationHeader    ← [신규] sticky glass
─────────────────────────────────────
Hero Section        ← 풀폭, 대형 타이포, CTA 2개
─────────────────────────────────────
About + Plan-C      ← 카드 그리드 (8+4 col)
─────────────────────────────────────
Plan-L + Plan-T     ← 카드 그리드 (4+8 col)
─────────────────────────────────────
  · · · Section Break · · ·
─────────────────────────────────────
Stats + Social      ← 카드 그리드 (6+6 col), surface-low 배경
─────────────────────────────────────
Footer              ← surface-low 배경
─────────────────────────────────────
ContactDialog       ← 모달 (mobile: bottom sheet)
```

### 참고 이미지에서 차용하는 패턴
- **컬러 섹션 라벨** (Overview, Background 등) → 각 카드의 eyebrow label에 적용
- **3열 이미지 카드 + 카테고리 배지** → Plan-C/L/T 카드에 배지 + mock UI로 유사 구현
- **대형 통계 숫자 강조** → Stats 카드에 DM Serif + accent color
- **섹션 간 장식 요소** (점선 등) → SectionBreak gradient line 유지

---

## 5. 섹션별 상세

### 5-0. Navigation Header [신규]

```
구현: widgets/navigation-header.tsx
배경: color-mix(var(--background) 85%, transparent) + backdrop-blur(12px)
높이: h-14 (56px)
Mobile:  [LifeCareLog]              [ThemeToggle] [Locale]
Desktop: [LifeCareLog]  [서비스] [연락하기]  [ThemeToggle] [Locale]
```

- sticky top-0, z-50
- 스크롤 시 border-bottom 나타남 (scroll > 10px)
- "연락하기" → openContact() 모달 트리거

### 5-1. Hero Section [개선]

현재 코드 완성도 높음. 개선 포인트:

1. **DM Serif Display 활용**: 헤드라인 핵심 단어에 `font-display` 적용
   ```tsx
   <h1>삶의 기록을,{'\n'}
     <span className="font-display">서비스로.</span>
   </h1>
   ```

2. **Floating Orbs opacity**: light 0.09 → 0.12 (더 따뜻한 분위기)

3. **CTA 유지**: "커피챗 예약하기" (primary) + "문의하기" (outline)

### 5-2. About Card [개선]

col: lg:col-span-8

1. **경력 미니 타임라인** 우상단 장식 (dot + line, opacity 15%)
   ```
   2019 ──●──────●──◆ 2026
   ```

2. **available 배지**: 우상단 → h2 옆 inline으로 이동

3. Tech stack pills, CTA "프로젝트 의뢰하기" → Cal.com 유지

### 5-3. Plan-C Card [개선]

col: lg:col-span-4

- Mock UI 구체화: placeholder lines → 실제 앱 느낌 content
  - 날짜 헤더 "오늘의 기록"
  - 기록 아이템 (dot + bar)
  - 미니 CTA 버튼 흔적

### 5-4. Plan-L Card [유지]

col: lg:col-span-4 — dashed border coming-soon 처리 잘 되어 있음

- AI 검색 preview: 검색창 + 결과 아이템 흔적으로 개선

### 5-5. Plan-T Card [미세 조정]

col: lg:col-span-8

- PhoneMockup opacity: 0.07 → 0.12 (더 visible)

### 5-6. Stats + Tech Card [개선]

col: lg:col-span-6

1. **DM Serif Display 숫자**: `font-display` 적용
2. **세로 divider**: `divide-x divide-border/50`
3. Tech stack pills에 `font-mono` 검토

### 5-7. Social + Coffee Chat Card [개선]

col: lg:col-span-6

1. **Meta pills 추가**: [30분] [무료] [Zoom] — accent/10 배경
2. **"프로젝트 의뢰하기"**: underline → ghost button

### 5-8. Footer [개선]

- 배경: gradient → `var(--surface-low)` 단색
- 서브텍스트 "lifecarelog.co.kr" 추가

### 5-9. Contact Dialog [개선]

- Mobile (< 640px): bottom sheet (y: 100% → 0, spring 300/30)
- Desktop: center dialog 유지
- safe-area-inset-bottom 적용

---

## 6. 모션 & 인터랙션

### Animation Tokens

```typescript
const EASING = [0.22, 1, 0.36, 1] as const
const SPRING = { type: 'spring', stiffness: 300, damping: 30 }
```

### 페이지 로드 시퀀스

```
0ms   — background render
50ms  — Hero AccentLine scaleX 0→1
100ms — brand pill fade+slideUp
200ms — headline fade+slideUp
300ms — subheadline
400ms — CTA buttons
600ms — scroll시 카드 stagger (index * 80ms)
```

### Active Grid Spotlight [신규]

카드 hover 시 나머지 카드 dim:
```css
.bento-row:has(.bento-card:hover) .bento-card:not(:hover) {
  opacity: 0.72;
  transition: opacity 250ms ease;
}
```

### Hover 효과

| 요소 | 동작 | Duration |
|------|------|---------|
| BentoCard | y: -3px + shadow 강화 | spring 300/30 |
| Primary Button | translateY(-2px) + shadow 강화 | 200ms |
| Tech pill | scale(1.03) | 200ms |
| Nav link | underline fade-in | 200ms |

### 금지 목록
- bounce easing
- scale > 1.05
- auto-play video
- parallax (성능 이슈)

---

## 7. 컴포넌트 스타일

### Button Variants

| Variant | Style |
|---------|-------|
| primary | bg-primary, text-white, shadow, pill 또는 rounded-xl |
| outline | border-border, transparent bg, hover:bg-muted |
| ghost | transparent, hover:bg-muted |
| amber | gradient(accent → 밝은 amber), 커피챗 전용 |

Sizes: sm(h-9), md(h-11), lg(h-13) — 모두 min-h-[44px]

### Badge Variants

| Status | Colors |
|--------|--------|
| live (운영중) | success/10 bg, success/25 border + pulse |
| coming-soon | warning/10 bg, warning/25 border |
| in-dev (개발중) | plan-t/10 bg |

### Card

- bg: var(--card), border: 1px solid var(--border), rounded-2xl
- top accent line: 2.5px solid {serviceColor}
- hover: shadow 강화 + border accent + translateY(-3px)
- **No card-in-card** (anti-pattern)

### Section Decorator

- AccentLine: 3px, gradient(primary → accent)
- SectionBreak: 1px gradient divider
- Card internal divider: gradient h-px (border 사용 X)

---

## 8. 반응형

| | 375px | 768px | 1440px |
|--|-------|-------|--------|
| Grid | 1col | 4col | 12col |
| Hero h1 | 32px | 44px | 56px |
| CTA | 세로 w-full | 가로 w-auto | 가로 w-auto |
| About+PlanC | 스택 | 2+2 | 8+4 |
| PlanL+PlanT | 스택 | 2+2 | 4+8 |
| Stats+Coffee | 스택 | 4col full | 6+6 |
| Contact | bottom sheet | center dialog | center dialog |
| Nav links | hidden | visible | visible |

Touch target: 모든 interactive 44px 이상

---

## 9. Premium CSS 테크닉 (SaaS 리서치 기반)

### 1px Gradient Border (premium 카드 → 선택 적용)
```css
background: linear-gradient(var(--card), var(--card)) padding-box,
            linear-gradient(135deg, var(--primary), var(--accent)) border-box;
border: 1px solid transparent;
```

### Noise Texture Overlay (flat 탈출)
```css
.section::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/noise.svg');
  opacity: 0.04;
  pointer-events: none;
}
```

### Radial Glow (light mode hero)
```css
background: radial-gradient(ellipse, oklch(0.62 0.12 158 / 0.12) 0%, transparent 70%);
```

---

## 10. 구현 우선순위

### Phase 1: High Impact (빠르게)
1. globals.css 색상 토큰 업데이트 (surface-low, primary 조정)
2. Hero — DM Serif Display 강조 단어
3. Stats — DM Serif 숫자 + 세로 divider
4. NavigationHeader 신규 작성

### Phase 2: UX 개선
5. Contact Dialog → Mobile bottom sheet
6. Plan-C mock UI 구체화
7. Active Grid Spotlight (hover dim)
8. Coffee Chat meta pills

### Phase 3: 완성도
9. Plan-T PhoneMockup opacity 조정
10. About card 경력 타임라인
11. Footer surface-low 배경
12. Noise texture overlay (선택)

---

## Sources

- Stitch "Artisan Journal" design system (projectId: 12855355818828871013)
- 사용자 첨부 스크린샷 (Korean portfolio presentation)
- cal.com, linear.app, vercel.com, stripe.com, notion.so hero 분석
- supabase.com, resend.com, clerk.com, raycast.com 분석
- 토스, 채널톡 한국 SaaS 랜딩 분석
- bentogrids.com, Aceternity UI, BentoTailwind 컴포넌트 참고
- SaaSFrame, Figma, 925Studios 2026 트렌드 보고서
