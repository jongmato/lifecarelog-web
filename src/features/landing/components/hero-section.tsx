'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'

const EASING = [0.22, 1, 0.36, 1] as const

export function HeroSection() {
  const t = useTranslations('hero')
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
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

  const HERO_FACTS = [
    { label: t('fact1'), key: 'planC' },
    { label: t('fact2'), key: 'planL' },
    { label: t('fact3'), key: 'planB' },
  ]

  return (
    <section
      className="relative w-full dot-grid overflow-hidden py-20 sm:py-28 lg:py-32"
      aria-label="Hero"
      style={{ background: 'var(--background)' }}
    >
      <div className="max-w-[760px] mx-auto px-4 sm:px-6">
        {/* Centered single-column hero */}
        <motion.div
          className="flex flex-col gap-6 lg:gap-8 items-center text-center"
          variants={containerVariants}
          initial={false}
          animate="visible"
        >
          {/* Brand mark */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt="LifeCareLog 로고"
              width={40}
              height={40}
              className="rounded-xl"
              priority
            />
            <Image
              src="/logo-text.svg"
              alt=""
              width={120}
              height={28}
              className="h-7 w-auto dark:opacity-90"
              style={{ mixBlendMode: 'multiply' } as React.CSSProperties}
              aria-hidden="true"
            />
          </motion.div>

          {/* h1 — main value proposition */}
          <motion.h1
            variants={itemVariants}
            className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight whitespace-pre-line"
            style={{ color: 'var(--foreground)' }}
          >
            {t('headline')}
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg leading-relaxed whitespace-pre-line max-w-xl mx-auto"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {t('subheadline')}
          </motion.p>

          {/* Live service badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 justify-center"
            aria-label="운영 현황"
          >
            {HERO_FACTS.map(({ label, key }) => (
              <Badge key={key} variant="live">
                {label}
              </Badge>
            ))}
          </motion.div>

          {/* Single primary CTA */}
          <motion.div variants={itemVariants} className="mt-2">
            <a
              href="https://cal.com/lifecarelog/coffee-chat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="커피 한 잔 이야기해요 (Cal.com으로 연결돼요, 새 탭 열림)"
              className="inline-flex items-center justify-center gap-2.5 font-sans font-semibold text-base px-8 min-h-[52px] min-w-[44px] rounded-xl cursor-pointer select-none transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
                boxShadow: '0 2px 8px color-mix(in oklch, var(--primary) 25%, transparent)',
              }}
            >
              {t('ctaCoffee')}
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
