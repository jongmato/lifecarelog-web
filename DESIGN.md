---
version: 2.0
source: src/app/globals.css
colors:
  bg: "oklch(0.985 0.004 85)"
  surface: "oklch(0.955 0.012 82)"
  surface-2: "oklch(0.930 0.014 80)"
  fg: "oklch(0.20 0.006 80)"
  fg-muted: "oklch(0.45 0.008 80)"
  fg-subtle: "oklch(0.52 0.008 80)"
  fg-disabled: "oklch(0.70 0.006 80)"
  border: "oklch(0.900 0.008 82)"
  border-input: "oklch(0.620 0.008 80)"
  primary: "oklch(0.22 0.006 80)"
  primary-hover: "oklch(0.32 0.006 80)"
  on-primary: "oklch(0.985 0.004 85)"
  accent: "oklch(0.50 0.14 8)"
  accent-muted: "oklch(0.940 0.030 8)"
  accent-dot: "oklch(0.780 0.090 8)"
  error: "oklch(0.52 0.17 27)"
  success: "oklch(0.50 0.11 150)"
colors-dark:
  bg: "oklch(0.17 0.006 80)"
  surface: "oklch(0.21 0.008 80)"
  surface-2: "oklch(0.25 0.008 80)"
  fg: "oklch(0.93 0.005 85)"
  fg-muted: "oklch(0.70 0.006 80)"
  fg-subtle: "oklch(0.64 0.006 80)"
  border: "oklch(0.30 0.008 80)"
  primary: "oklch(0.93 0.005 85)"
  on-primary: "oklch(0.17 0.006 80)"
  accent: "oklch(0.78 0.10 8)"
  accent-muted: "oklch(0.28 0.03 8)"
typography:
  family-ko: "Pretendard Variable"
  family-en: "Geist"
  display: { size: "56px / 40px", line: 1.15, weight: 600, tracking: "-0.02em" }
  h2: { size: "32px / 24px", line: 1.25, weight: 600 }
  body: { size: 16px, line: 1.75, weight: 400 }
  caption: { size: 14px, line: 1.5, weight: 400 }
rounded: { control: 8px, card: 16px, pill: 999px }
spacing: { 1: 4px, 2: 8px, 3: 16px, 4: 24px, 5: 32px, 6: 48px, 7: 64px, 8: 96px }
components:
  button-high: { bg: "{colors.primary}", fg: "{colors.on-primary}", rounded: "{rounded.control}", height: 48px }
  button-medium: { bg: "{colors.surface}", fg: "{colors.fg}", rounded: "{rounded.control}", height: 48px }
  button-low: { bg: transparent, fg: "{colors.fg}", border: "{colors.border-input}", rounded: "{rounded.control}", height: 48px }
  link: { fg: "{colors.accent}", underline-offset: 4px }
  chip-selected: { bg: "{colors.accent-muted}", fg: "{colors.accent}" }
  chip: { bg: transparent, fg: "{colors.fg-muted}", border: "{colors.border}" }
  card: { bg: "{colors.surface}", rounded: "{rounded.card}", padding: "{spacing.4}" }
---

# LifeCareLog Web Design v2

## 방향

- Purpose: 방문자가 LifeCareLog와 제품군을 이해하고 필요한 제품 또는 상담으로 이동해요.
- Tone: 따뜻한 아이보리 지면 위의 절제된 편집물이에요. 카피는 해요체를 써요.
- Constraints: Next.js App Router, Tailwind CSS-first tokens, i18n, 반응형, 접근성을 유지해요.
- Differentiation: 여백·타이포·중립 표면을 우선하고 핑크는 작은 상호작용 신호로만 써요.

원시 색 값의 실행 SSOT는 `src/app/globals.css`예요. 이 문서의 컴포넌트 값은 위 시맨틱 토큰을 참조하며, 새 토큰은 문서 승인 후 CSS에 추가해요. Pretendard는 현재 CDN dynamic subset을 한국어 기본 글꼴로 유지하고 Geist는 `next/font`로 영문·숫자 디스플레이에만 사용해요.

## 사용 규칙

- 페이지 기본은 `bg`와 `fg`예요. 표면은 `bg` → `surface` → `surface-2` 세 단계까지만 써요.
- High 채움은 화면의 `main`에서 1개만 써요. 헤더 채움과 같은 CTA의 이중 채움은 금지해요.
- `accent`는 링크, 포커스 링, 선택 글자, 로고 점에만 써요. `accent-muted` 면은 화면당 최대 1블록이에요.
- 제품은 로고와 이름으로 구분해요. 제품별 시그니처 색 토큰을 새로 만들지 않아요.
- 글꼴 굵기는 400과 600만 쓰고 숫자열에는 `tabular-nums`를 적용해요. 한 화면 글자 크기는 4단계 이내예요.
- 모바일 우선으로 구성해요. `<640px`은 1열·좌우 16px·섹션 64px, `640–1024px`은 좌우 24px, `>1024px`은 최대 1120px·섹션 96px이에요.
- H1은 모바일 40px, 데스크톱 56px이며 본문 중심 폭은 680–720px이에요.
- 터치 영역은 최소 44px, 구조 구분선은 전체 둘레 또는 divider 1px로 만들어요.

## Do

- 흰 여백, 위치, 크기, 400/600 굵기, 텍스트 회색 단계로 위계를 먼저 만들어요.
- 카드에는 `surface`, 16px radius, 24px padding, 전체 둘레 1px border를 써요.
- 상태는 낮은 채도의 의미색과 점·아이콘·문구를 함께 사용해요.
- `word-break: keep-all`, keyboard focus, `prefers-reduced-motion`을 유지해요.

## Don't

- 한 방향의 두꺼운 accent bar, 보라색, gradient text, blob, glow, dot-grid, noise, glass blur를 쓰지 않아요.
- 순수 `#000`, `#FFF`, `#888`, card shadow, card-in-card, 균일 feature grid를 쓰지 않아요.
- 8px grid 밖의 임의 간격, 굵기 3종 이상, uppercase label, Georgia·Inter·Roboto·Arial·system-ui를 쓰지 않아요.
- 산발적인 hover translate, count-up, 카드 형제 dimming을 쓰지 않아요.
- Badge·Chip·Tag·제목에 `primary`나 `accent`를 장식으로 쓰지 않아요.

예외가 꼭 필요하면 해당 코드와 같은 줄에 `allow-tN: 이유`를 남기고 review에서 다시 확인해요.
