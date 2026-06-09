/**
 * PostHog 클라이언트 초기화 (Next.js instrumentation-client)
 * - 토큰 미주입 시 no-op (ID 없으면 자동 비활성화)
 * - PIPA: opt_out_capturing_by_default=true 로 시작 → AnalyticsConsent에서 동의 시에만
 *   posthog.opt_in_capturing() 호출. 동의 배너의 "동의한 경우에만 분석" 약속을 코드로 보장.
 * - lifecarelog-web: OpenNext(CF Workers) → 기본 직접연결(us.i.posthog.com).
 *   /rly 리버스프록시는 외부 rewrites 런타임 미보장이라 dormant 옵트인.
 */
import posthog from 'posthog-js'

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN

if (token) {
  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-01-30',
    person_profiles: 'identified_only',
    // 동의 전까지 수집 안 함 (consent gating). 동의 시 opt_in_capturing()으로 활성화.
    opt_out_capturing_by_default: true,
    session_recording: {
      maskAllInputs: true,
    },
  })
  posthog.register({ product: 'lifecarelog' })
}
