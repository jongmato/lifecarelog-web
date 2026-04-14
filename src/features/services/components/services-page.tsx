'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { NavigationHeader } from '@/widgets/navigation-header'
import { ContactDialog } from '@/features/landing/components/contact-dialog'

const EASING = [0.22, 1, 0.36, 1] as const

interface ServiceDetailProps {
  title: string
  subtitle: string
  description: string
  badge: string
  badgeVariant: 'live' | 'in-development'
  cta?: string
  href?: string
  color: string
  teaser?: string
  platforms?: string
  features?: string
  iconSrc: string
  index: number
}

function ServiceDetailCard({
  title,
  subtitle,
  description,
  badge,
  badgeVariant,
  cta,
  href,
  color,
  teaser,
  platforms,
  features,
  iconSrc,
  index,
}: ServiceDetailProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: EASING }}
      className="relative flex flex-col overflow-hidden rounded-2xl p-8 transition-shadow duration-300"
      style={{
        background: 'var(--card)',
        boxShadow: '0 1px 3px color-mix(in oklch, var(--foreground) 5%, transparent), 0 4px 16px color-mix(in oklch, var(--foreground) 4%, transparent)',
      }}
    >
      <div className="relative z-10 flex flex-col gap-5 flex-1">
        {/* Icon + Header */}
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc}
            alt=""
            width={48}
            height={48}
            className="w-12 h-12 rounded-xl shrink-0"
            aria-hidden="true"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="font-sans text-xl font-bold text-foreground">
                {title}
              </h2>
              <Badge variant={badgeVariant}>{badge}</Badge>
            </div>
            <p className="font-sans text-sm font-medium" style={{ color }}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed whitespace-pre-line flex-1">
          {description}
        </p>

        {/* Features */}
        {features && (
          <div className="flex flex-wrap gap-2">
            {features.split(' · ').map((feature) => (
              <span
                key={feature}
                className="text-xs font-medium px-2.5 py-1 rounded-lg"
                style={{
                  color,
                  background: `color-mix(in oklch, ${color} 8%, transparent)`,
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Teaser */}
        {teaser && (
          <p
            className="font-sans text-sm leading-relaxed italic px-4 py-3 rounded-lg"
            style={{
              color: `color-mix(in oklch, ${color} 70%, var(--muted-foreground))`,
              background: `color-mix(in oklch, ${color} 5%, transparent)`,
            }}
          >
            {teaser}
          </p>
        )}

        {platforms && (
          <p className="font-sans text-xs text-muted-foreground/60">
            {platforms}
          </p>
        )}

        {/* CTA */}
        {cta && href && (
          <a href={href} target="_blank" rel="noopener noreferrer" className="mt-auto pt-2">
            <Button variant="primary" size="sm" className="gap-2">
              {cta}
              <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
            </Button>
          </a>
        )}
      </div>
    </motion.div>
  )
}

export function ServicesPage() {
  const t = useTranslations('services')
  const shouldReduceMotion = useReducedMotion()
  const [contactOpen, setContactOpen] = useState(false)

  const services: ServiceDetailProps[] = [
    {
      title: t('planC.title'),
      subtitle: t('planC.subtitle'),
      description: t('planC.description'),
      badge: t('planC.badge'),
      badgeVariant: 'live',
      cta: t('planC.cta'),
      href: 'https://plan-c.lifecarelog.co.kr',
      color: 'var(--tertiary)',
      features: t('planC.features'),
      iconSrc: '/plan-c-logo.png',
      index: 0,
    },
    {
      title: t('planL.title'),
      subtitle: t('planL.subtitle'),
      description: t('planL.description'),
      badge: t('planL.badge'),
      badgeVariant: 'live',
      cta: t('planL.cta'),
      href: 'https://plan-l.lifecarelog.co.kr',
      color: 'var(--plan-l)',
      teaser: t('planL.teaser'),
      features: t('planL.features'),
      iconSrc: '/plan-l-logo.png',
      index: 1,
    },
    {
      title: t('planT.title'),
      subtitle: t('planT.subtitle'),
      description: t('planT.description'),
      badge: t('planT.badge'),
      badgeVariant: 'in-development',
      platforms: t('planT.platforms'),
      color: 'var(--primary)',
      features: t('planT.features'),
      iconSrc: '/logo-icon.png',
      index: 2,
    },
  ]

  return (
    <>
      <NavigationHeader onContact={() => setContactOpen(true)} />

      <main className="flex flex-1 flex-col px-4 sm:px-6 py-12 sm:py-16">
        <div className="w-full max-w-[1200px] mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            홈으로
          </Link>

          {/* Header */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASING }}
            className="mb-12"
          >
            <h1 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {t('headline')}
            </h1>
            <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-xl whitespace-pre-line">
              {t('subheadline')}
            </p>
          </motion.div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceDetailCard key={service.title} {...service} />
            ))}
          </div>

          {/* Vision note */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: EASING }}
            className="mt-16 text-center"
          >
            <p className="font-sans text-sm text-muted-foreground/70 italic max-w-md mx-auto">
              {t('vision')}
            </p>
          </motion.div>
        </div>
      </main>

      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
