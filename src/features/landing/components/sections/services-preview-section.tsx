'use client'

import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/shared/ui/badge'

const EASING = [0.22, 1, 0.36, 1] as const

interface ServiceCardData {
  key: 'planC' | 'planL' | 'planT'
  accentColor: string
  href: string | null
  badgeVariant: 'live' | 'in-development'
  iconSrc: string
}

const SERVICES: ServiceCardData[] = [
  {
    key: 'planC',
    accentColor: 'var(--plan-c)',
    href: 'https://plan-c.lifecarelog.co.kr',
    badgeVariant: 'live',
    iconSrc: '/plan-c-logo.png',
  },
  {
    key: 'planL',
    accentColor: 'var(--plan-l)',
    href: 'https://plan-l.lifecarelog.co.kr',
    badgeVariant: 'live',
    iconSrc: '/plan-l-logo.png',
  },
  {
    key: 'planT',
    accentColor: 'var(--primary)',
    href: null,
    badgeVariant: 'in-development',
    iconSrc: '/logo-icon.png',
  },
]

interface ServiceCardProps {
  data: ServiceCardData
  index: number
}

function ServiceCard({ data, index }: ServiceCardProps) {
  const t = useTranslations('servicesPreview')
  const shouldReduceMotion = useReducedMotion()

  const isLive = data.href !== null
  const staggerDelay = index * 0.1

  const variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay: staggerDelay, ease: EASING },
    },
  }

  const cardContent = (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      whileHover={isLive && !shouldReduceMotion ? { y: -4, transition: { type: 'spring', stiffness: 300, damping: 30 } } : {}}
      viewport={{ once: true, amount: 0.1 }}
      // P1-02: boxShadow hover는 CSS로 처리 — shadow-card / shadow-card-hover 유틸리티 사용
      className="relative flex flex-col rounded-2xl p-6 h-full shadow-card transition-shadow duration-300 data-[live=true]:hover:shadow-card-hover"
      style={{
        background: 'var(--card)',
        opacity: isLive ? 1 : 0.75,
        cursor: isLive ? 'pointer' : 'default',
      }}
      data-live={isLive}
    >
      {/* No top accent line — clean shadow-only design */}

      <div className="relative z-10 flex flex-col gap-3 flex-1">
        {/* Header: logo + name + badge */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.iconSrc}
            alt=""
            width={36}
            height={36}
            className="w-9 h-9 rounded-lg shrink-0"
            aria-hidden="true"
          />
          <h3 className="font-sans text-base font-semibold text-foreground flex-1">
            {t(`${data.key}.name`)}
          </h3>
          <Badge variant={data.badgeVariant}>
            {t(`${data.key}.badge`)}
          </Badge>
        </div>

        {/* Tagline */}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
          {t(`${data.key}.tagline`)}
        </p>

        {/* Footer link — live only */}
        {isLive && (
          <div
            className="mt-auto pt-2 flex items-center gap-1 text-xs font-medium"
            style={{ color: data.accentColor }}
          >
            <ExternalLink size={11} strokeWidth={2} aria-hidden="true" />
            <span>바로 가기</span>
          </div>
        )}
      </div>
    </motion.div>
  )

  if (isLive) {
    return (
      <a
        href={data.href!}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t(`${data.key}.name`)} — ${t(`${data.key}.tagline`)}`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
      >
        {cardContent}
      </a>
    )
  }

  return (
    <div aria-label={`${t(`${data.key}.name`)} — ${t(`${data.key}.tagline`)}`} className="h-full">
      {cardContent}
    </div>
  )
}

export function ServicesPreviewSection() {
  const t = useTranslations('servicesPreview')
  const shouldReduceMotion = useReducedMotion()

  const headingVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: EASING },
    },
  }

  return (
    <section
      aria-label={t('sectionLabel')}
      className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20"
    >
      {/* Section header */}
      <motion.div
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex items-center justify-between mb-8 sm:mb-10 gap-4"
      >
        <p
          className="font-sans text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--primary)' }}
        >
          {t('sectionLabel')}
        </p>

        <Link
          href="/services"
          className="hidden sm:inline-flex items-center gap-1.5 font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          {t('viewAll')}
          <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
      </motion.div>

      {/* Service cards — equal height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.key} data={service} index={i} />
        ))}
      </div>

      {/* Mobile "view all" */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="mt-6 flex justify-center sm:hidden"
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          {t('viewAll')}
          <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  )
}
