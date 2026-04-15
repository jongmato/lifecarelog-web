'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v3'
import Turnstile from 'react-turnstile'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'

// ─── Schema ────────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(2, '이름을 2자 이상 입력해 주세요.'),
  email: z.string().email('이메일 형식이 올바르지 않아요.'),
  message: z.string().min(10, '메시지를 10자 이상 입력해 주세요.'),
  token: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactSchema>

// ─── Inline zod/v3 resolver (no @hookform/resolvers dependency) ─────────────

type ResolverResult =
  | { values: ContactFormValues; errors: Record<string, never> }
  | { values: Record<string, never>; errors: Record<string, { message: string; type: string }> }

function zodResolver(schema: typeof contactSchema) {
  // Matches the react-hook-form Resolver<TFieldValues> signature
  return async (values: ContactFormValues): Promise<ResolverResult> => {
    const result = schema.safeParse(values)
    if (result.success) {
      return { values: result.data, errors: {} }
    }
    const errors: Record<string, { message: string; type: string }> = {}
    for (const issue of result.error.errors) {
      const key = issue.path[0] as string
      if (key && !errors[key]) {
        errors[key] = { message: issue.message, type: issue.code }
      }
    }
    return { values: {}, errors }
  }
}

// ─── Form state ─────────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

// ─── Component ──────────────────────────────────────────────────────────────

interface ContactFormProps {
  onSuccess?: () => void
}

export function ContactForm({ onSuccess }: ContactFormProps = {}) {
  const t = useTranslations('contact')
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  // P2-01: clearTimeout ref to prevent memory leak on unmount
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  })

  // P2-01: cleanup setTimeout on unmount to prevent state updates on dead component
  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  async function onSubmit(data: ContactFormValues) {
    setStatus('submitting')
    setErrorMessage('')

    try {
      const payload: ContactFormValues = {
        ...data,
        token: turnstileToken ?? undefined,
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = (await res.json()) as { success: boolean; error?: string }

      if (!res.ok || !json.success) {
        setErrorMessage(json.error ?? t('errorNetwork'))
        setStatus('error')
        return
      }

      setStatus('success')

      // P2-01: store timer ref for cleanup
      resetTimerRef.current = setTimeout(() => {
        reset()
        setStatus('idle')
        setTurnstileToken(null)
        onSuccess?.()
      }, 2000)
    } catch {
      setErrorMessage(t('errorNetwork'))
      setStatus('error')
    }
  }

  const isSubmitting = status === 'submitting'

  return (
    <form
      onSubmit={(e) => handleSubmit(onSubmit)(e)}
      noValidate
      aria-label={t('headline')}
      className="flex flex-col gap-5"
    >
      <Input
        label={t('name')}
        placeholder={t('namePlaceholder')}
        error={errors.name?.message}
        autoComplete="name"
        disabled={isSubmitting}
        {...register('name')}
      />

      <Input
        label={t('email')}
        type="email"
        placeholder={t('emailPlaceholder')}
        error={errors.email?.message}
        autoComplete="email"
        disabled={isSubmitting}
        {...register('email')}
      />

      <Textarea
        label={t('message')}
        placeholder={t('messagePlaceholder')}
        error={errors.message?.message}
        rows={5}
        disabled={isSubmitting}
        {...register('message')}
      />

      {/* CF Turnstile — only rendered when site key is configured */}
      {siteKey && (
        <div className="flex justify-start">
          <Turnstile
            sitekey={siteKey}
            onVerify={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken(null)}
            theme="auto"
          />
        </div>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={isSubmitting || status === 'success'}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? t('sending') : t('submit')}
      </Button>

      {/* Feedback animations */}
      <AnimatePresence mode="wait">
        {status === 'success' && (
          <SuccessBanner key="success" message={t('success')} />
        )}
        {status === 'error' && (
          <ErrorBanner key="error" message={errorMessage} />
        )}
      </AnimatePresence>

      {/* Privacy note */}
      <p className="font-sans text-xs text-muted-foreground leading-relaxed">
        {t('privacy')}
      </p>
    </form>
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SuccessBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 rounded-xl bg-success/10 border border-success/20 px-4 py-3 text-success"
    >
      <CheckCircle size={18} aria-hidden="true" className="shrink-0" />
      <p className="font-sans text-sm font-medium">{message}</p>
    </motion.div>
  )
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      role="alert"
      aria-live="assertive"
      className="flex items-center gap-3 rounded-xl bg-error/10 border border-error/20 px-4 py-3 text-error"
    >
      <AlertCircle size={18} aria-hidden="true" className="shrink-0" />
      <p className="font-sans text-sm font-medium">{message}</p>
    </motion.div>
  )
}
