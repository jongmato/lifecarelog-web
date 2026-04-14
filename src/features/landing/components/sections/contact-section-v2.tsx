'use client'

import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail, Briefcase } from 'lucide-react'
import { Button } from '@/shared/ui/button'

// Animation tokens — consistent with brand easing
const EASING = [0.22, 1, 0.36, 1] as const

// Coffee cup SVG — inline, no library dependency
function CoffeeCupIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  )
}

interface ContactSectionV2Props {
  onContact: () => void
}

export function ContactSectionV2({ onContact }: ContactSectionV2Props) {
  const t = useTranslations('contact')
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: EASING },
    },
  }

  return (
    <section
      aria-labelledby="contact-section-heading"
      className="w-full"
      style={{ background: 'var(--surface-low)' }}
    >
      {/* Gradient top divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--border) 15%, color-mix(in oklch, var(--primary) 20%, var(--border)) 50%, var(--border) 85%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col items-center text-center gap-8"
        >
          {/* Section label */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {t('sectionLabel')}
          </motion.p>

          {/* Headline */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <h2
              id="contact-section-heading"
              className="font-sans text-3xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight"
            >
              {t('headline')}
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-md whitespace-pre-line">
              {t('subheadline')}
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            {/* Primary: Coffee chat — external Cal.com link */}
            <a
              href="https://cal.com/lifecarelog/coffee-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 font-sans font-semibold text-base px-8 min-h-[52px] rounded-xl cursor-pointer select-none transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-hover"
              style={{
                boxShadow: '0 2px 8px color-mix(in oklch, var(--primary) 25%, transparent)',
              }}
            >
              <CoffeeCupIcon size={18} />
              {t('ctaCoffee')}
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>

            {/* Secondary: Project request — opens contact dialog */}
            <Button
              variant="outline"
              size="md"
              className="w-full sm:w-auto font-semibold gap-2 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              onClick={onContact}
            >
              <Briefcase size={16} strokeWidth={1.75} aria-hidden="true" />
              {t('ctaProject')}
            </Button>
          </motion.div>

          {/* Cal.com note */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-xs text-muted-foreground/60"
          >
            {t('coffeeNote')}
          </motion.p>

          {/* Divider + text link */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-3"
          >
            <div
              className="h-px w-16"
              style={{
                background:
                  'color-mix(in oklch, var(--border) 80%, transparent)',
              }}
              aria-hidden="true"
            />

            {/* "Send a message" text link — opens contact dialog */}
            <button
              type="button"
              onClick={onContact}
              className="inline-flex items-center gap-1.5 font-sans text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <Mail size={14} strokeWidth={1.75} aria-hidden="true" />
              {t('ctaMessage')}
            </button>

            {/* Direct email fallback */}
            <a
              href="mailto:support@lifecarelog.co.kr"
              className="font-sans text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              support@lifecarelog.co.kr
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
