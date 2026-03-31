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
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large warm orb — top right */}
      <motion.div
        className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-[0.07] dark:opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, var(--accent), transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], x: [0, 8, 0], y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Medium sage orb — bottom left */}
      <motion.div
        className="absolute -bottom-8 left-8 w-48 h-48 rounded-full opacity-[0.06] dark:opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, var(--primary), transparent 70%)',
        }}
        animate={{ scale: [1, 1.12, 1], x: [0, -6, 0], y: [0, 6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      {/* Small accent dot cluster */}
      <div className="absolute right-8 top-8 opacity-20 dark:opacity-10">
        <div className="dot-grid w-24 h-24" />
      </div>
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
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
        background:
          'linear-gradient(135deg, var(--card) 0%, color-mix(in oklch, var(--primary) 3%, var(--card)) 100%)',
        boxShadow:
          '0 1px 2px color-mix(in oklch, var(--foreground) 4%, transparent), 0 4px 12px color-mix(in oklch, var(--foreground) 6%, transparent), 0 0 0 1px var(--border)',
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

          {/* Headline — gradient on key words */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-[3.25rem] text-foreground leading-[1.2] tracking-tight whitespace-pre-line mb-4 font-sans font-bold lg:font-display lg:font-normal lg:italic"
          >
            {t('headline')}
          </motion.h1>

          {/* Accent underline decoration */}
          <motion.div
            variants={itemVariants}
            className="h-1 w-16 rounded-full mb-6"
            style={{
              background:
                'linear-gradient(90deg, var(--primary), var(--accent))',
            }}
            aria-hidden="true"
          />

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground whitespace-pre-line leading-relaxed mb-10 max-w-xl"
          >
            {t('subheadline')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            {/* Primary CTA — Cal.com coffee chat */}
            <a
              href="https://cal.com/lifecarelog/coffee-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 font-sans font-semibold text-base px-7 min-h-[52px] rounded-xl cursor-pointer select-none transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 w-full sm:w-auto"
              style={{
                background:
                  'linear-gradient(135deg, var(--primary) 0%, oklch(0.65 0.13 163) 100%)',
                color: 'var(--primary-foreground)',
                boxShadow:
                  '0 4px 14px color-mix(in oklch, var(--primary) 35%, transparent)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.boxShadow =
                  '0 6px 20px color-mix(in oklch, var(--primary) 45%, transparent)'
                el.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.boxShadow =
                  '0 4px 14px color-mix(in oklch, var(--primary) 35%, transparent)'
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
