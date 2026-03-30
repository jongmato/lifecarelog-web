'use client'

import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { ContactForm } from './contact-form'

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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-foreground/40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={t('headline')}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-xl p-6 sm:p-8"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="닫기"
            >
              <X size={18} strokeWidth={1.75} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="font-sans text-xl font-semibold text-foreground pr-8">
                {t('headline')}
              </h2>
              <p className="font-sans text-sm text-muted-foreground mt-1">
                {t('subheadline')}
              </p>
            </div>

            {/* Email link */}
            <a
              href="mailto:support@lifecarelog.co.kr"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mb-6"
            >
              <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
              <span>support@lifecarelog.co.kr</span>
            </a>

            {/* Form */}
            <ContactForm />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
