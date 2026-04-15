'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const EASING = [0.22, 1, 0.36, 1] as const

export function PhilosophySection() {
  const t = useTranslations('philosophy')
  const shouldReduceMotion = useReducedMotion()

  const baseVariant = (delay = 0) => ({
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASING, delay },
    },
  })

  const viewportOptions = { once: true, amount: 0.15 }

  return (
    <section
      id="philosophy"
      className="w-full py-24 sm:py-32"
      style={{ background: 'var(--surface-low)' }}
      aria-labelledby="philosophy-headline"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Big headline */}
        <motion.h2
          id="philosophy-headline"
          className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.25] tracking-tight whitespace-pre-line mb-10 sm:mb-12"
          variants={baseVariant(0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {t('headline')}
        </motion.h2>

        {/* Essay text */}
        <motion.p
          className="font-sans text-base sm:text-lg leading-[1.9] whitespace-pre-line mb-10"
          style={{ color: 'var(--muted-foreground)' }}
          variants={baseVariant(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {t('description')}
        </motion.p>

        {/* Quote block */}
        <motion.blockquote
          className="relative rounded-2xl px-7 sm:px-8 py-6 overflow-hidden"
          style={{
            borderLeft: '2px solid var(--primary)',
            background: 'color-mix(in oklch, var(--primary) 12%, var(--surface-low))',
          }}
          variants={baseVariant(0.22)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          aria-label="핵심 인용구"
        >
          {/* Subtle orb inside quote card */}
          <div
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full pointer-events-none opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, var(--primary-light), transparent 70%)' }}
            aria-hidden="true"
          />

          <p
            className="font-display italic text-lg sm:text-xl leading-[1.75] whitespace-pre-line relative z-10"
            style={{ color: 'var(--foreground)' }}
          >
            &ldquo;{t('quote')}&rdquo;
          </p>
        </motion.blockquote>
      </div>
    </section>
  )
}
