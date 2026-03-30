'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v3'
import Turnstile from 'react-turnstile'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
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

export function ContactForm() {
  const t = useTranslations('contact')
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  })

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

      // Reset form after 3 seconds
      setTimeout(() => {
        reset()
        setStatus('idle')
        setTurnstileToken(null)
      }, 3000)
    } catch {
      setErrorMessage(t('errorNetwork'))
      setStatus('error')
    }
  }

  const isSubmitting = status === 'submitting'

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: [1, 1.05, 1] }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: [-4, 4, -4, 4, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      role="alert"
      aria-live="assertive"
      className="flex items-center gap-3 rounded-xl bg-error/10 border border-error/20 px-4 py-3 text-error"
    >
      <AlertCircle size={18} aria-hidden="true" className="shrink-0" />
      <p className="font-sans text-sm font-medium">{message}</p>
    </motion.div>
  )
}
