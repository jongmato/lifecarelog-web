'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PrincipleCard } from '../principle-card'

const EASING = [0.22, 1, 0.36, 1] as const

export function HowSection() {
  const t = useTranslations('how')
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  }

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASING } },
  }

  const principles = [
    { number: '01', title: t('principle1Title'), body: t('principle1Body') },
    { number: '02', title: t('principle2Title'), body: t('principle2Body') },
    { number: '03', title: t('principle3Title'), body: t('principle3Body') },
  ]

  return (
    <section
      aria-labelledby="how-section-heading"
      className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28"
    >
      <motion.div
        variants={containerVariants}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="flex flex-col gap-10"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
          <p
            className="font-sans text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--primary)' }}
          >
            {t('sectionLabel')}
          </p>
          <h2
            id="how-section-heading"
            className="font-sans font-bold text-3xl sm:text-4xl leading-tight tracking-tight"
            style={{ color: 'var(--foreground)' }}
          >
            {t('headline')}
          </h2>
        </motion.div>

        {/* Principle cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {principles.map((p) => (
            <PrincipleCard
              key={p.number}
              number={p.number}
              title={p.title}
              body={p.body}
            />
          ))}
        </motion.div>

        {/* Pricing text link — NOT a button */}
        <motion.div variants={itemVariants} className="flex justify-start">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {t('pricingLink')}
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
