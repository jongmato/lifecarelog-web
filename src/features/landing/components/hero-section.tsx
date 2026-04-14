'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/shared/ui'

const EASING = [0.22, 1, 0.36, 1] as const

interface HeroSectionProps {
  onContact?: () => void
}

// P1-01: Pure CSS keyframe animation — compositor thread, zero JS overhead
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.10] dark:opacity-[0.06] orb-float-1"
        style={{
          background: 'radial-gradient(circle at 40% 40%, var(--primary-light), transparent 65%)',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full opacity-[0.08] dark:opacity-[0.05] orb-float-2"
        style={{
          background: 'radial-gradient(circle at 60% 60%, var(--primary), transparent 65%)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
      style={{ background: 'var(--background)' }}
    >
      <FloatingOrbs />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8 max-w-2xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo — symbol + text logo 수평 배치 */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
          <Image
            src="/logo-icon.png"
            alt="LifeCareLog"
            width={64}
            height={64}
            priority
            sizes="(max-width: 640px) 56px, 64px"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl"
          />
          {/* Decorative text logo — brand name already conveyed by icon alt */}
          <Image
            src="/logo-text.png"
            alt=""
            width={360}
            height={85}
            priority
            sizes="(max-width: 640px) 200px, 280px"
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
          className="font-sans text-base sm:text-lg whitespace-pre-line leading-[1.8] mb-8 max-w-lg text-muted-foreground"
        >
          {t('subheadline')}
        </motion.p>

        {/* CTA — solid colors, no gradient */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-12"
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

        {/* Scroll indicator removed — user preference */}
      </motion.div>
    </section>
  )
}
