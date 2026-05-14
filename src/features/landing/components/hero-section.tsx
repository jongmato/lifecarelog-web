'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/shared/ui'

const EASING = [0.22, 1, 0.36, 1] as const

interface HeroSectionProps {
  onContact?: () => void
}

const HERO_FACTS = ['Plan-C 운영 중', 'Plan-L 운영 중', 'MVP 제작 문의 가능']

export function HeroSection({ onContact }: HeroSectionProps) {
  const t = useTranslations('hero')
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASING },
    },
  }

  return (
    <section
      className="relative min-h-[82svh] flex flex-col items-center justify-center overflow-hidden py-20 sm:py-24"
      aria-label="Hero"
      style={{ background: 'var(--background)' }}
    >
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8 max-w-2xl mx-auto w-full"
        variants={containerVariants}
        initial={false}
        animate="visible"
      >
        {/* Logo — symbol + text logo 수평 배치 */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-icon.png"
            alt="LifeCareLog"
            width={64}
            height={64}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl"
          />
          {/* Decorative text logo — brand name already conveyed by icon alt */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-text.svg"
            alt=""
            className="h-8 sm:h-10 w-auto dark:opacity-90"
            style={{ mixBlendMode: 'screen' }}
          />
        </motion.div>

        {/* Tagline + Brand pill */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <span
            className="font-display italic text-base sm:text-lg"
            style={{ color: 'var(--primary)' }}
          >
            {t('tagline')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.2] tracking-tight whitespace-pre-line mb-5"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          {t('headline')}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-base sm:text-lg whitespace-pre-line leading-[1.8] mb-7 max-w-lg text-muted-foreground"
        >
          {t('subheadline')}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mb-8 grid w-full max-w-xl grid-cols-1 gap-2 sm:grid-cols-3"
          aria-label="운영 현황"
        >
          {HERO_FACTS.map((fact) => (
            <span
              key={fact}
              className="rounded-xl border px-3 py-2 font-sans text-xs font-medium"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--surface-low)',
                color: 'var(--muted-foreground)',
              }}
            >
              {fact}
            </span>
          ))}
        </motion.div>

        {/* CTA — solid colors, no gradient */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <a
            href="#philosophy"
            className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-base px-8 min-h-[52px] rounded-xl cursor-pointer select-none transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-hover"
            style={{
              boxShadow: '0 2px 8px color-mix(in oklch, var(--primary) 25%, transparent)',
            }}
          >
            {t('ctaScroll')}
          </a>

          <Button
            variant="outline"
            size="md"
            className="w-full sm:w-auto font-semibold transition-all duration-200 hover:-translate-y-0.5"
            onClick={onContact}
          >
            {t('ctaContact')}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
