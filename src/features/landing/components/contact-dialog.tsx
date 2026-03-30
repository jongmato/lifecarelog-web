'use client'

import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Sparkles } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { ContactForm } from './contact-form'

const DIALOG_EASING = [0.22, 1, 0.36, 1] as const

interface ContactDialogProps {
  open: boolean
  onClose: () => void
}

export function ContactDialog({ open, onClose }: ContactDialogProps) {
  const t = useTranslations('contact')

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop — frosted glass */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 backdrop-blur-sm"
            style={{
              background:
                'color-mix(in oklch, var(--foreground) 30%, transparent)',
            }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: DIALOG_EASING }}
            role="dialog"
            aria-modal="true"
            aria-label={t('headline')}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{
              background: 'var(--card)',
              boxShadow:
                '0 8px 40px color-mix(in oklch, var(--foreground) 18%, transparent), 0 0 0 1px var(--border)',
            }}
          >
            {/* Gradient header band */}
            <div
              className="relative px-6 pt-6 pb-5 sm:px-8 sm:pt-7 sm:pb-5"
              style={{
                background:
                  'linear-gradient(135deg, color-mix(in oklch, var(--primary) 6%, var(--card)) 0%, color-mix(in oklch, var(--accent) 4%, var(--card)) 100%)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2.5px] rounded-t-2xl"
                style={{
                  background:
                    'linear-gradient(90deg, var(--primary) 0%, oklch(0.68 0.13 163) 50%, var(--accent) 100%)',
                }}
                aria-hidden="true"
              />

              {/* Close button */}
              <button
                onClick={onClose}
                type="button"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{
                  background:
                    'color-mix(in oklch, var(--muted) 80%, transparent)',
                }}
                aria-label="닫기"
              >
                <X size={16} strokeWidth={2} />
              </button>

              {/* Icon + headline */}
              <div className="flex items-start gap-3 pr-8">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background:
                      'color-mix(in oklch, var(--primary) 12%, var(--muted))',
                    border:
                      '1px solid color-mix(in oklch, var(--primary) 25%, var(--border))',
                    color: 'var(--primary)',
                  }}
                >
                  <Sparkles size={18} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-sans text-xl font-semibold text-foreground leading-snug">
                    {t('headline')}
                  </h2>
                  <p className="font-sans text-sm text-muted-foreground mt-0.5">
                    {t('subheadline')}
                  </p>
                </div>
              </div>

              {/* Email link */}
              <a
                href="mailto:support@lifecarelog.co.kr"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mt-4 pl-0.5"
              >
                <Mail size={14} strokeWidth={1.75} aria-hidden="true" />
                <span className="underline underline-offset-4 decoration-primary/30">
                  support@lifecarelog.co.kr
                </span>
              </a>
            </div>

            {/* Form body */}
            <div className="px-6 py-6 sm:px-8 sm:py-7">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
