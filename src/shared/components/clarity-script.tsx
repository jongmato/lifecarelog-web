'use client'

import Script from 'next/script'

interface ClarityScriptProps {
  projectId: string
}

/**
 * Microsoft Clarity 로더 — 정성 행동 분석(세션 리플레이·히트맵·Rage/Dead Click).
 * PIPA: 분석 동의(accepted) 시에만 렌더되도록 AnalyticsConsent에서 조건부 마운트.
 * 입력값 등 민감 콘텐츠는 Clarity 기본 마스킹 + 대시보드 마스킹 설정으로 보호.
 */
export function ClarityScript({ projectId }: ClarityScriptProps) {
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${projectId}");`}
    </Script>
  )
}
