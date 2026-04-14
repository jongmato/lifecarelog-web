'use client'

import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail } from 'lucide-react'
import { useCallback, useEffect, useId, useRef } from 'react'
import Image from 'next/image'
import { ContactForm } from './contact-form'

const DIALOG_EASING = [0.22, 1, 0.36, 1] as const

// Selectors for all focusable elements within the dialog
const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface ContactDialogProps {
  open: boolean
  onClose: () => void
}

export function ContactDialog({ open, onClose }: ContactDialogProps) {
  const t = useTranslations('contact')
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      // Focus trap: cycle Tab/Shift+Tab within dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
        ).filter((el) => el.offsetParent !== null) // exclude hidden elements

        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!open) return

    // Save the element that triggered the dialog
    previousFocusRef.current = document.activeElement as HTMLElement

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    // Move focus to the first focusable element in the dialog
    const frame = requestAnimationFrame(() => {
      if (!dialogRef.current) return
      const focusable = dialogRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTORS)
      focusable?.focus()
    })

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      // Restore focus to the trigger element when dialog closes
      previousFocusRef.current?.focus()
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
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: DIALOG_EASING }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl"
            style={{
              background: 'var(--card)',
              boxShadow:
                '0 8px 40px color-mix(in oklch, var(--foreground) 18%, transparent), 0 0 0 1px var(--border)',
            }}
          >
            {/* Header band */}
            <div
              className="relative px-6 pt-6 pb-5 sm:px-8 sm:pt-7 sm:pb-5"
              style={{
                background: 'var(--surface-low)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {/* Close button — i18n label */}
              <button
                onClick={onClose}
                type="button"
                className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{
                  background:
                    'color-mix(in oklch, var(--muted) 80%, transparent)',
                }}
                aria-label={t('close')}
              >
                <X size={16} strokeWidth={2} />
              </button>

              {/* Icon + headline — id links to aria-labelledby */}
              <div className="flex items-start gap-3 pr-8">
                <Image
                  src="/logo-icon.png"
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-xl shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h2
                    id={titleId}
                    className="font-sans text-xl font-semibold text-foreground leading-snug"
                  >
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
