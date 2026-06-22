'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { StatCard } from '../stat-card'

const EASING = [0.22, 1, 0.36, 1] as const

const SKILL_TAGS = ['Next.js', 'React', 'Expo', 'FastAPI', 'Supabase', 'AI']

export function AboutSection() {
  const t = useTranslations('about')
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  }

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASING } },
  }

  return (
    <section
      id="about"
      aria-labelledby="about-section-heading"
      className="w-full scroll-mt-16"
      style={{ background: 'var(--surface-low)' }}
    >
      {/* Top divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--border) 15%, color-mix(in oklch, var(--primary) 20%, var(--border)) 50%, var(--border) 85%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start"
        >
          {/* Left: text block */}
          <div className="flex flex-col gap-6">
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <p
                className="font-sans text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--primary)' }}
              >
                {t('sectionLabel')}
              </p>
              <h2
                id="about-section-heading"
                className="font-sans font-bold text-3xl sm:text-4xl leading-tight tracking-tight whitespace-pre-line"
                style={{ color: 'var(--foreground)' }}
              >
                {t('headline')}
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="font-sans text-base leading-relaxed max-w-prose"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {t('description')}
            </motion.p>

            {/* Skill tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2"
              aria-label="기술 스택"
            >
              {SKILL_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    background: 'color-mix(in oklch, var(--primary) 8%, var(--card))',
                    border: '1px solid color-mix(in oklch, var(--primary) 15%, var(--border))',
                    color: 'var(--foreground)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Stats row — mobile only (below text) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 md:hidden"
              aria-label="운영 현황"
            >
              <StatCard number={t('stat1Number')} label={t('stat1Label')} />
              <StatCard number={t('stat2Number')} label={t('stat2Label')} />
              <StatCard number={t('stat3Number')} label={t('stat3Label')} />
            </motion.div>
          </div>

          {/* Right: stat cards — md+ vertical stack */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex flex-col gap-3"
            aria-label="운영 현황"
          >
            <StatCard number={t('stat1Number')} label={t('stat1Label')} />
            <StatCard number={t('stat2Number')} label={t('stat2Label')} />
            <StatCard number={t('stat3Number')} label={t('stat3Label')} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
