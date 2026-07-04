# DESIGN.md — LifeCareLog Web (허브·랜딩)

> LifeCareLog 제품군(plan-c/l/t/b …)을 소개하는 **허브/랜딩 웹**의 as-built 디자인 시스템. 신규 창작이 아니라 `src/app/globals.css`에 이미 구현된 토큰/유틸을 문서화한 것 (SSOT = globals.css). 충돌 시 globals.css 우선.
>
> 갱신: 2026-07-04 · 출처: `src/app/globals.css`(`@theme inline`, oklch 토큰), `src/app/[locale]/`(i18n)
> 로딩: UI 작업 전 이 문서 + globals.css **필독**. 자동주입(@import) 아님 — 필요 시 on-demand.

---

## 1. Overview (4차원)

- **Purpose**: 방문자가 LifeCareLog와 산하 제품(plan-c/l/t/b)을 한눈에 이해하고 각 제품 랜딩으로 이동. 신뢰·따뜻함으로 "1인 개발자가 정성껏 만든 도구 모음"을 전달.
- **Tone**: Artisan Journal — 따뜻한 아이보리 지면 위의 정갈한 편집물. 과장 마케팅 카피 아닌 "손으로 정리한 기록"의 결. 해요체.
- **Constraints**: Next.js 16(App Router·i18n `[locale]`) + Tailwind v4(CSS-first `@theme`) + Cloudflare(OpenNext) 배포. Pretendard 본문 + Georgia serif 디스플레이. `word-break: keep-all`(한글 줄바꿈).
- **Differentiation**: 보라 AI-slop 배제 — warm ivory + rose/mustard/green 계열. 제품별 시그니처 색(plan-c/l/t/b)으로 카드 구분. bento 그리드 spotlight·noise·dot-grid로 정적이지 않되 절제된 질감.

---

## 2. 색 토큰 (3층 · 시맨틱 이름 + 사용규칙 1줄)

`globals.css`가 SSOT(oklch). 원시값 직접 사용 금지 → 아래 시맨틱 이름으로만 참조. Light = warm ivory 기본, Dark = warm cocoa(순흑 아님, L 0.22+).

| 시맨틱 | Light(oklch) | 사용규칙 |
|---|---|---|
| `background` | `0.985 0.006 88` | 메인 지면(아이보리). 비면 장식 말고 여백·타이포로 밀도 |
| `surface-low` | `0.975 0.007 88` | 살짝 낮춘 섹션 배경. 큰 band에만 |
| `card` | `0.995 0.003 88` | 카드 표면. shadow는 `.shadow-card` 유틸로만 |
| `foreground` | `0.18 0.010 248` | 본문·제목. 순수 `#000` 금지 |
| `muted-foreground` | `0.52 0.010 248` | 보조·메타 텍스트 |
| `primary` | `0.76 0.09 15` (rose) | 핵심 CTA·브랜드 accent. 화면당 절제 |
| `primary-hover` | `0.70 0.11 15` | primary hover/pressed |
| `accent` | `0.72 0.10 55` (mustard) | 보조 강조·하이라이트. 큰 배경 덮기 금지 |
| `tertiary` | `0.52 0.10 158` (green) | 3차 accent·성공 근접 신호 |
| `border` | `0.905 0.006 88` | 1px 구분선(전역 `* { border-color }`) |
| `success`/`warning`/`error` | `150`/`60`/`25` hue | 상태 전용. 감정/품질 평가색으로 오용 금지 |

**제품 시그니처색** (카드/뱃지에서 제품 구분 전용, 본문 텍스트 금지):
`plan-c` 블루(215) · `plan-l` 인디고(255) · `plan-t` 틸(190) · `plan-b` 그린(145).

---

## 3. Radius · Typography

- **Radius 계층**(장식 아닌 위계): `sm .5rem` → `md .75` → `lg 1` → `xl 1.25` → `2xl 1.5` → `3xl 2rem`. 한 화면에서 동일 radius 반복 금지, 요소 크기별로.
- **Font**: 본문/헤딩 = `Pretendard Variable`(dynamic-subset CDN). 디스플레이 = `Georgia` serif(에디토리얼 히어로 강조에만, 남발 금지). 굵기 2종 이내.
- 본문 `line-height 1.75` · `word-break: keep-all` · antialiased.

---

## 4. Utilities (globals.css 정의 — 재구현 금지, className으로 사용)

- `.shadow-card` / `.shadow-card-hover` — 카드 그림자 시스템(1px 링 + soft shadow). 임의 box-shadow 금지.
- `.glow-success` — 성공 상태 glow(절제).
- `.dot-grid` — 20px radial dot 패턴 배경(subtle grid, blob/glow 아님).
- `.bento-row:has(.bento-card:hover)` — 카드 hover 시 형제 dim(spotlight). bento 그리드 상호작용.
- `.noise-overlay::after` — opacity 0.02 SVG noise(질감, AI-slop 그라디언트 대체).
- `.social-icon-link` — `--social-hover` 변수로 브랜드색 hover.
- 모션: `prefers-reduced-motion` 존중(전역 처리) · theme 전환 300ms ease-out.

---

## 5. Do / Don't (anti-slop)

**Do**
- 토큰만 사용(`bg-background`, `text-foreground`, `text-primary` …). oklch hex 하드코딩 금지.
- 제품 소개는 각 시그니처색 + `.shadow-card`로 카드화, bento 그리드로 배치.
- 히어로 강조는 Georgia serif 1곳, 나머지는 Pretendard 위계.
- 여백·keep-all·정갈한 편집 리듬으로 "따뜻한 기록물" 톤 유지.

**Don't**
- 보라/무지개 AI 그라디언트, conic-gradient 배경, glow radial blob.
- card-in-card, side-stripe border(border-left>1px), 전역 동일 radius/shadow.
- 8px 그리드 밖 임의 간격(13/19px), 내부>외부 간격 역전.
- Georgia serif를 본문 전체에 적용, 굵기 3종 이상, ALL CAPS 한글.
- 제품 시그니처색을 본문 텍스트/큰 배경으로 남용.

---

## 6. Agent Prompt Guide

1. `DESIGN.md` + `src/app/globals.css`를 먼저 읽는다.
2. 새 UI가 허브/랜딩/제품카드 중 무엇인지 밝힌다.
3. Tailwind v4 유틸 + 위 시맨틱 토큰만 사용. 신규 색은 먼저 이 문서에 후보로 적고 globals.css 추가는 별도 검증 후.
4. `.shadow-card`·`.dot-grid`·`.noise-overlay` 등 **기존 유틸 재사용**(CSS로 흉내내 재구현 금지).
5. i18n `[locale]` 라우트 구조 존중, 카피는 messages/ 사전 경유.
6. 데스크톱/모바일 반응형·`prefers-reduced-motion` 검증.
