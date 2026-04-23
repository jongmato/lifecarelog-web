'use client'

import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Clock, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'

const EASING = [0.22, 1, 0.36, 1] as const

interface TierData {
  key: 'starter' | 'standard' | 'premium'
  price: string
  duration: string
  highlighted?: boolean
}

const TIERS: TierData[] = [
  { key: 'starter', price: '300만원', duration: '약 2주' },
  { key: 'standard', price: '800만원', duration: '약 4주', highlighted: true },
  { key: 'premium', price: '1,500만원', duration: '약 8주' },
]

interface TierCardProps {
  tier: TierData
  index: number
  shouldReduceMotion: boolean | null
  onContact: () => void
}

function TierCard({ tier, index, shouldReduceMotion, onContact }: TierCardProps) {
  const t = useTranslations('devService')
  const delay = index * 0.1

  const variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay, ease: EASING },
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="relative flex flex-col rounded-2xl p-6 h-full shadow-card"
      style={{
        background: tier.highlighted ? 'var(--card)' : 'var(--background)',
        border: tier.highlighted
          ? '1.5px solid color-mix(in oklch, var(--primary) 30%, var(--border))'
          : '1px solid var(--border)',
      }}
    >
      {/* Highlighted label */}
      {tier.highlighted && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 font-sans text-[11px] font-semibold px-3 py-0.5 rounded-full"
          style={{
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          {t('popularLabel')}
        </span>
      )}

      <div className="flex flex-col gap-4 flex-1">
        {/* Tier name + description */}
        <div>
          <p
            className="font-sans text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {t(`tiers.${tier.key}.label`)}
          </p>
          <h3
            className="font-sans text-lg font-bold leading-snug"
            style={{ color: 'var(--foreground)' }}
          >
            {t(`tiers.${tier.key}.name`)}
          </h3>
          <p
            className="font-sans text-sm leading-relaxed mt-1"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {t(`tiers.${tier.key}.desc`)}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-sans text-2xl font-bold tracking-tight"
            style={{ color: 'var(--foreground)' }}
          >
            {tier.price}
          </span>
          <span
            className="font-sans text-xs"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {t('priceFrom')}
          </span>
        </div>

        {/* Duration */}
        <div
          className="flex items-center gap-1.5 font-sans text-xs"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <Clock size={12} strokeWidth={1.75} aria-hidden="true" />
          <span>{tier.duration}</span>
        </div>

        {/* Deliverables list */}
        <ul className="flex flex-col gap-2 flex-1" aria-label={t(`tiers.${tier.key}.name`)}>
          {(t.raw(`tiers.${tier.key}.items`) as string[]).map((item: string) => (
            <li key={item} className="flex items-start gap-2">
              <Check
                size={13}
                strokeWidth={2.5}
                className="mt-0.5 shrink-0"
                style={{ color: 'var(--primary)' }}
                aria-hidden="true"
              />
              <span
                className="font-sans text-sm leading-snug"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          type="button"
          onClick={onContact}
          className="mt-auto w-full font-sans text-sm font-semibold py-2.5 rounded-xl border transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          style={{
            color: 'var(--foreground)',
            borderColor: 'var(--border)',
          }}
        >
          {t('tierCta')}
        </button>
      </div>
    </motion.div>
  )
}

interface DevServiceSectionProps {
  onContact: () => void
}

export function DevServiceSection({ onContact }: DevServiceSectionProps) {
  const t = useTranslations('devService')
  const shouldReduceMotion = useReducedMotion()

  const headingVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: EASING },
    },
  }

  const fadeVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: EASING },
    },
  }

  return (
    <section
      aria-labelledby="dev-service-heading"
      className="w-full"
      style={{ background: 'var(--surface-low)' }}
    >
      {/* Top gradient divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--border) 15%, color-mix(in oklch, var(--primary) 15%, var(--border)) 50%, var(--border) 85%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Section header */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex items-center justify-between mb-4 gap-4"
        >
          <p
            className="font-sans text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--primary)' }}
          >
            {t('sectionLabel')}
          </p>

          <Link
            href="/pricing"
            className="hidden sm:inline-flex items-center gap-1.5 font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {t('viewPricing')}
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Transition copy */}
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-10 sm:mb-12"
        >
          <h2
            id="dev-service-heading"
            className="font-sans font-bold text-2xl sm:text-3xl leading-snug tracking-tight mb-3"
            style={{ color: 'var(--foreground)' }}
          >
            {t('headline')}
          </h2>
          <p
            className="font-sans text-sm sm:text-base leading-relaxed max-w-xl"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {t('subheadline')}
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {TIERS.map((tier, i) => (
            <TierCard
              key={tier.key}
              tier={tier}
              index={i}
              shouldReduceMotion={shouldReduceMotion}
              onContact={onContact}
            />
          ))}
        </div>

        {/* Maintenance subscription note */}
        <motion.p
          variants={fadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="font-sans text-xs text-center mb-10"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {t('maintenanceNote')}
        </motion.p>

        {/* Bottom CTAs */}
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-sm px-6 min-h-[44px] rounded-xl border border-border bg-background hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ color: 'var(--foreground)' }}
          >
            {t('ctaPricing')}
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>

          <Button
            variant="outline"
            size="md"
            className="w-full sm:w-auto font-semibold gap-2 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            onClick={onContact}
          >
            {t('ctaContact')}
          </Button>
        </motion.div>

        {/* Mobile "view pricing" */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="mt-6 flex justify-center sm:hidden"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {t('viewPricing')}
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
