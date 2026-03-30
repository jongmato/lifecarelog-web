# Sprint Contract — lifecarelog.co.kr Landing Page

## Goal
LifeCareLog 브랜드 랜딩 페이지: Bento Grid 8카드, 한/영 i18n, 다크모드, 컨택폼, Cal.com 예약

## Done Definition

### Functional
- [ ] Bento Grid 8카드 레이아웃 정상 렌더링 (Desktop 12col, Tablet 4col, Mobile 1col)
- [ ] 한국어/영어 전환 동작 (/ko, /en URL prefix)
- [ ] 다크모드/라이트모드 토글 동작 (system preference 감지)
- [ ] 컨택 폼 제출 → Resend API → Gmail 수신 확인
- [ ] CF Turnstile 스팸 방지 동작
- [ ] Cal.com 예약 버튼 → 팝업 오픈
- [ ] 모든 카드 Framer Motion 애니메이션 (stagger reveal)
- [ ] prefers-reduced-motion 지원

### Quality
- [ ] typecheck 0 errors (`pnpm typecheck`)
- [ ] lint 0 errors (`pnpm lint`)
- [ ] Lighthouse Performance 90+
- [ ] Lighthouse Accessibility 95+
- [ ] 반응형 정상 (375px / 768px / 1440px)
- [ ] 다크모드 색상 대비 WCAG AA 충족

### UX Writing
- [ ] 전체 카피 해요체 (한국어)
- [ ] 에러 메시지 3단 구조 (상황/원인/해결)
- [ ] 버튼 텍스트 동사+하기 패턴
- [ ] SEO meta title/description (한/영)

### Code Quality
- [ ] 클린 아키텍처 (features/shared/app 분리)
- [ ] 컴포넌트 500줄 이하
- [ ] 함수 20줄 이하
- [ ] any 타입 0개
- [ ] Early Return 패턴

## Out of Scope
- Cal.com 계정 생성 (수동 작업)
- CF Turnstile key 발급 (수동 작업)
- GA4 연동 (Phase 4에서)
- CF Pages 배포 (Phase 4에서)
- NestJS/FastAPI 백엔드

## Max Iterations: 5

## Phases
1. Foundation: i18n + Theme + Shared UI
2. Core: Bento Grid + Hero/Footer + Contact Form
3. Integration: Cal.com embed + SEO
4. Polish: E2E Test + Lighthouse + Deploy
