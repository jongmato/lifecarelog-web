'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/shared/ui'

const EASING = [0.22, 1, 0.36, 1] as const

export function HeroSection() {
  const t = useTranslations('hero')
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASING },
    },
  }

  return (
    <div
      className="col-span-1 sm:col-span-4 lg:col-span-12 bg-card border border-border rounded-xl shadow-sm p-8 sm:p-10 lg:p-12 relative overflow-hidden"
      style={{ borderTop: '3px solid var(--primary)' }}
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 15% 50%, color-mix(in oklch, var(--primary) 6%, transparent), transparent)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Brand statement */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-xs font-semibold text-primary uppercase tracking-widest mb-5"
        >
          {t('brandStatement')}
        </motion.p>

        {/* Headline — DM Serif Display on desktop, Pretendard on mobile */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight whitespace-pre-line mb-3 font-sans font-bold lg:font-display lg:font-normal lg:italic"
        >
          {t('headline')}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-base sm:text-lg text-muted-foreground whitespace-pre-line leading-relaxed mb-8 max-w-xl"
        >
          {t('subheadline')}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link href="#contact">
            <Button variant="primary" size="md" className="w-full sm:w-auto">
              {t('ctaCoffeeChat')}
            </Button>
          </Link>
          <Link href="#contact">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              {t('ctaContact')}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
