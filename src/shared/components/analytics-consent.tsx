'use client'

import { useEffect, useState } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

const CONSENT_KEY = 'lifecarelog-analytics-consent'

type ConsentState = 'accepted' | 'rejected' | null

interface AnalyticsConsentProps {
  gaId?: string
  locale: string
}

export function AnalyticsConsent({ gaId, locale }: AnalyticsConsentProps) {
  const [consent, setConsent] = useState<ConsentState>(null)
  const [isReady, setIsReady] = useState(false)
  const isKorean = locale === 'ko'

  useEffect(() => {
    queueMicrotask(() => {
      const saved = window.localStorage.getItem(CONSENT_KEY)
      setConsent(saved === 'accepted' || saved === 'rejected' ? saved : null)
      setIsReady(true)
    })
  }, [])

  if (!gaId || !isReady) return null

  if (consent === 'accepted') {
    return <GoogleAnalytics gaId={gaId} />
  }

  if (consent === 'rejected') return null

  const saveConsent = (nextConsent: Exclude<ConsentState, null>) => {
    window.localStorage.setItem(CONSENT_KEY, nextConsent)
    setConsent(nextConsent)
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-lg border border-border bg-background/95 p-4 shadow-lg backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-muted-foreground">
          {isKorean
            ? '필수 쿠키는 서비스 제공에 사용하고, 이용 통계 분석은 동의한 경우에만 사용합니다.'
            : 'Essential cookies support the service. Analytics runs only after you allow it.'}
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            onClick={() => saveConsent('rejected')}
          >
            {isKorean ? '필수만' : 'Essential only'}
          </button>
          <button
            type="button"
            className="rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            onClick={() => saveConsent('accepted')}
          >
            {isKorean ? '분석 허용' : 'Allow analytics'}
          </button>
        </div>
      </div>
    </div>
  )
}
