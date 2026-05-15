/**
 * Plan-T 약관/정책 metadata (page-level)
 *
 * @description
 * - 시행일/버전은 단일 정보 출처(SSoT). 본문 변경 시 여기도 함께 업데이트.
 * - canonical URL을 page metadata에서 명시하여 root canonical 상속 차단
 */

export const PLAN_T_LEGAL_META = {
  version: '1.0',
  effectiveDate: '2026년 5월 14일',
  effectiveDateIso: '2026-05-14',
  privacy: {
    path: '/plan-t/privacy',
    title: '플랜티 개인정보처리방침',
    description:
      '플랜티(Plan-T) AI 정신건강 케어 서비스의 개인정보 수집·이용·보관·제3자 위탁·이용자 권리 안내. 개인정보보호법 2026.9.11 개정안 반영.',
  },
  terms: {
    path: '/plan-t/terms',
    title: '플랜티 이용약관',
    description:
      '플랜티(Plan-T) AI 정신건강 케어 서비스 이용 조건, 회원 권리·의무, 유료 구독, 환불 정책 안내.',
  },
} as const

export type PlanTLegalDoc = 'privacy' | 'terms'

export function getCanonicalUrl(doc: PlanTLegalDoc): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://lifecarelog.co.kr'
  return `${base}${PLAN_T_LEGAL_META[doc].path}`
}
