'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

const SUBSCRIBE_WEBHOOK_URL = 'https://n8n.lifecarelog.co.kr/webhook/library-subscribe'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface SubscribeFormProps {
  /** 자료 식별자 — n8n webhook payload의 source 필드로 전달 */
  source: string
}

export function SubscribeForm({ source }: SubscribeFormProps) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const isSubmitting = status === 'submitting'
  const canSubmit = consent && email.trim().length > 0 && !isSubmitting

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!canSubmit) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch(SUBSCRIBE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, consent: true, website }),
      })

      if (!res.ok) {
        throw new Error(`webhook responded ${res.status}`)
      }

      setStatus('success')
    } catch {
      setErrorMessage('등록에 실패했어요. 네트워크 상태를 확인하고 잠시 후 다시 시도해 주세요.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-3 rounded-xl bg-success/10 border border-success/20 px-4 py-4"
      >
        <CheckCircle size={20} aria-hidden="true" className="shrink-0 text-success" />
        <p className="font-sans text-sm font-medium text-success">
          등록됐어요. 다음 자료가 나오면 가장 먼저 알려드릴게요.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="이메일"
        id="library-subscribe-email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isSubmitting}
        autoComplete="email"
      />

      {/* Honeypot — 화면·스크린리더 모두에서 숨김. 값이 있으면 봇으로 간주(서버/워크플로 측 필터링용) */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="library-website">웹사이트</label>
        <input
          id="library-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-muted-foreground cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={isSubmitting}
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border"
          style={{ accentColor: 'var(--primary)' }}
        />
        <span>
          자료 업데이트와 새 리드마그넷 소식을 이메일로 받는 것에 동의해요.{' '}
          <Link href="/privacy" className="text-primary underline underline-offset-2">
            개인정보처리방침
          </Link>
        </span>
      </label>

      {status === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-center gap-3 rounded-xl px-4 py-3 bg-error/10 border border-error/20"
        >
          <AlertCircle size={18} aria-hidden="true" className="shrink-0 text-error" />
          <p className="font-sans text-sm text-error">{errorMessage}</p>
        </div>
      )}

      <Button type="submit" variant="primary" size="md" disabled={!canSubmit} className="w-full sm:w-auto">
        {isSubmitting ? '등록 중...' : '구독하기'}
      </Button>
    </form>
  )
}
