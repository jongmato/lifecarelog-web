'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/shared/ui'

const EASING = [0.22, 1, 0.36, 1] as const

interface HeroSectionProps {
  onContact?: () => void
}

// Floating decorative orbs — pure CSS, no images needed
// QUIETER: reduced orb opacity, removed noisy dot-grid
// OVERDRIVE: added richer dual-orb composition for visual warmth
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large warm orb — top right, breath-like motion */}
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.09] dark:opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle at 40% 40%, var(--accent), transparent 65%)',
        }}
        animate={{ scale: [1, 1.06, 1], x: [0, 6, 0], y: [0, -6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Medium sage orb — bottom left, slower drift */}
      <motion.div
        className="absolute -bottom-12 -left-8 w-56 h-56 rounded-full opacity-[0.07] dark:opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle at 60% 60%, var(--primary), transparent 65%)',
        }}
        animate={{ scale: [1, 1.08, 1], x: [0, -4, 0], y: [0, 5, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  )
}

// Animated decorative line accent
function AccentLine() {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full"
        style={{
          background:
            'linear-gradient(90deg, var(--primary) 0%, oklch(0.68 0.14 168) 40%, var(--accent) 100%)',
        }}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: EASING, delay: 0.2 }}
      />
    </motion.div>
  )
}

export function HeroSection({ onContact }: HeroSectionProps) {
  const t = useTranslations('hero')
  const shouldReduceMotion = useReducedMotion()

  // ANIMATE: looser stagger feels more natural, less mechanical
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: EASING },
    },
  }

  return (
    <div
      className="col-span-1 sm:col-span-4 lg:col-span-12 relative overflow-hidden rounded-2xl"
      style={{
        // COLORIZE: warmer gradient, OVERDRIVE: richer visual presence
        background:
          'linear-gradient(135deg, var(--card) 0%, color-mix(in oklch, var(--primary) 5%, var(--card)) 50%, color-mix(in oklch, var(--accent) 4%, var(--card)) 100%)',
        boxShadow:
          '0 1px 2px color-mix(in oklch, var(--foreground) 4%, transparent), 0 4px 16px color-mix(in oklch, var(--primary) 8%, transparent), 0 0 0 1px var(--border)',
      }}
    >
      <AccentLine />
      <FloatingOrbs />

      {/* Inner padding */}
      <div className="relative z-10 px-8 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Brand pill */}
          <motion.div variants={itemVariants} className="mb-6 inline-flex">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full border"
              style={{
                color: 'var(--primary)',
                borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)',
                background: 'color-mix(in oklch, var(--primary) 8%, transparent)',
              }}
            >
              <Sparkles size={11} strokeWidth={2} aria-hidden="true" />
              {t('brandStatement')}
            </span>
          </motion.div>

          {/* Headline — OVERDRIVE: gradient text on key phrase, BOLDER: larger weight */}
          <motion.h1
            variants={itemVariants}
            className="text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] leading-[1.15] tracking-tight whitespace-pre-line mb-5 font-sans font-bold"
          >
            {t('headline')}
          </motion.h1>

          {/* Accent underline decoration — BOLDER: slightly wider */}
          <motion.div
            variants={itemVariants}
            className="h-[3px] w-20 rounded-full mb-7"
            style={{
              background:
                'linear-gradient(90deg, var(--primary), oklch(0.68 0.14 168), var(--accent))',
            }}
            aria-hidden="true"
          />

          {/* Subheadline — ONBOARD: slightly larger for faster scanning */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-[1.0625rem] text-muted-foreground whitespace-pre-line leading-[1.8] mb-10 max-w-xl"
          >
            {t('subheadline')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            {/* Primary CTA — BOLDER: stronger shadow, confident presence */}
            <a
              href="https://cal.com/lifecarelog/coffee-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 font-sans font-semibold text-base px-8 min-h-[52px] rounded-xl cursor-pointer select-none transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 w-full sm:w-auto"
              style={{
                background:
                  'linear-gradient(135deg, var(--primary) 0%, oklch(0.60 0.14 160) 100%)',
                color: 'var(--primary-foreground)',
                boxShadow:
                  '0 4px 16px color-mix(in oklch, var(--primary) 40%, transparent), 0 1px 0 color-mix(in oklch, var(--primary-foreground) 10%, transparent) inset',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.boxShadow =
                  '0 8px 24px color-mix(in oklch, var(--primary) 50%, transparent), 0 1px 0 color-mix(in oklch, var(--primary-foreground) 10%, transparent) inset'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.boxShadow =
                  '0 4px 16px color-mix(in oklch, var(--primary) 40%, transparent), 0 1px 0 color-mix(in oklch, var(--primary-foreground) 10%, transparent) inset'
                el.style.transform = 'translateY(0)'
              }}
            >
              {t('ctaCoffeeChat')}
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>

            {/* Secondary CTA */}
            <Button
              variant="outline"
              size="md"
              className="w-full sm:w-auto font-semibold hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              onClick={onContact}
            >
              {t('ctaContact')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
