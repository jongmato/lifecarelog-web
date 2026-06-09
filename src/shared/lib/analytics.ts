/**
 * PostHog 분석 래퍼 — 안전한 이벤트 발화 헬퍼
 * - PostHog는 src/instrumentation-client.ts에서 opt-out 기본으로 init. AnalyticsConsent가
 *   동의 시 opt_in_capturing() 호출. 토큰 미주입/SSR/미동의 시 모두 no-op.
 * - "최초 발생"(활성화)은 PostHog 서버측 First-time 인사이트로 계산(클라이언트 once-guard X).
 */
import posthog from 'posthog-js'

// 빌드타임 인라인: 토큰 없으면 init 안 됨 → capture 호출 안 함(경고 회피).
const ENABLED = Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN)

/** 이벤트 발화 (best-effort). 미동의 시 posthog가 자체적으로 드롭, 동의 후에만 전송. */
export function track(event: string, props?: Record<string, unknown>): void {
  if (!ENABLED || typeof window === 'undefined') return
  try {
    posthog.capture(event, props)
  } catch {
    /* 분석 실패는 제품 동작에 영향 주지 않음 */
  }
}

/** 동의 수락 시 호출 — PostHog 수집 활성화 */
export function enableAnalytics(): void {
  if (!ENABLED || typeof window === 'undefined') return
  try {
    posthog.opt_in_capturing()
  } catch {
    /* no-op */
  }
}

/** 동의 거부/철회 시 호출 — PostHog 수집 중단 */
export function disableAnalytics(): void {
  if (!ENABLED || typeof window === 'undefined') return
  try {
    posthog.opt_out_capturing()
  } catch {
    /* no-op */
  }
}
