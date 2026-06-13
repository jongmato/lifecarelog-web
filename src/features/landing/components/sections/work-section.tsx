'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'

const EASING = [0.22, 1, 0.36, 1] as const

interface ServiceData {
  key: 'planC' | 'planL' | 'planB'
  href: string
  logoSrc: string
  accentVar: string
}

// 동일 비중 카드. 서비스가 늘어나면 배열에 추가만 하면 캐러셀이 자동 확장된다.
const SERVICES: ServiceData[] = [
  { key: 'planC', href: 'https://plan-c.lifecarelog.co.kr', logoSrc: '/plan-c-logo.svg', accentVar: 'var(--plan-c)' },
  { key: 'planL', href: 'https://plan-l.lifecarelog.co.kr', logoSrc: '/plan-l-logo.svg', accentVar: 'var(--plan-l)' },
  { key: 'planB', href: 'https://plan-b.lifecarelog.co.kr', logoSrc: '/plan-b-logo.svg', accentVar: 'var(--plan-b)' },
]

function ServiceCard({ data, index }: { data: ServiceData; index: number }) {
  const t = useTranslations('work')
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay: index * 0.08, ease: EASING },
    },
  }

  return (
    <motion.a
      href={data.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t(`${data.key}.name`)} — ${t(`${data.key}.tagline`)} (새 탭 열림)`}
      variants={variants}
      initial={false}
      whileInView="visible"
      whileHover={!shouldReduceMotion ? { y: -4, transition: { duration: 0.25, ease: 'easeOut' } } : {}}
      viewport={{ once: true, amount: 0.1 }}
      className="flex flex-col h-full min-h-[220px] rounded-xl p-6 transition-shadow duration-300 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
    >
      {/* Header: logo chip + name + badge */}
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className="inline-flex w-10 h-10 items-center justify-center rounded-lg"
          style={{ background: `color-mix(in oklch, ${data.accentVar} 12%, var(--surface-low, transparent))` }}
        >
          <Image src={data.logoSrc} alt="" width={36} height={36} className="w-7 h-7" aria-hidden="true" />
        </span>
        <h3 className="font-sans font-semibold text-base flex-1" style={{ color: 'var(--foreground)' }}>
          {t(`${data.key}.name`)}
        </h3>
        <Badge variant="live">{t(`${data.key}.badge`)}</Badge>
      </div>

      {/* Tagline */}
      <p className="font-sans text-sm leading-relaxed mt-4 flex-1" style={{ color: 'var(--muted-foreground)' }}>
        {t(`${data.key}.tagline`)}
      </p>

      {/* Footer link */}
      <div
        className="mt-5 pt-3 flex items-center gap-1.5 text-xs font-medium"
        style={{
          color: data.accentVar,
          borderTop: '1px solid color-mix(in oklch, var(--border) 60%, transparent)',
        }}
      >
        <ExternalLink size={11} strokeWidth={2} aria-hidden="true" />
        <span>{t('goToService')}</span>
      </div>
    </motion.a>
  )
}

export function WorkSection() {
  const t = useTranslations('work')
  const shouldReduceMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    updateArrows()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows])

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('[data-card]') as HTMLElement | null
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }

  const headingVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASING } },
  }

  const arrowBtn =
    'hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-0 disabled:pointer-events-none'
  const arrowStyle = { background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' } as const

  return (
    <section
      aria-labelledby="work-section-heading"
      className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28"
    >
      {/* Section header + carousel controls */}
      <motion.div
        variants={headingVariants}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex items-end justify-between mb-8 sm:mb-10 gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
            {t('sectionLabel')}
          </p>
          <h2
            id="work-section-heading"
            className="font-sans font-bold text-3xl sm:text-4xl leading-tight tracking-tight"
            style={{ color: 'var(--foreground)' }}
          >
            {t('headline')}
          </h2>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" aria-label="이전 서비스" onClick={() => scrollByCard(-1)} disabled={!canLeft} className={arrowBtn} style={arrowStyle}>
            <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" aria-label="다음 서비스" onClick={() => scrollByCard(1)} disabled={!canRight} className={arrowBtn} style={arrowStyle}>
            <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <Link
            href="/services"
            className="hidden sm:inline-flex items-center gap-1.5 font-sans text-sm font-medium transition-colors duration-200 ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {t('viewAll')}
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </motion.div>

      {/* Carousel — scroll-snap. 터치 스와이프(모바일) + 화살표(데스크톱). 서비스 추가 시 자동 확장. */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory py-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="운영 중인 서비스 — 좌우로 넘겨 보세요"
      >
        {SERVICES.map((s, i) => (
          <div
            key={s.key}
            data-card
            className="snap-start shrink-0 basis-[82%] sm:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-14px)]"
          >
            <ServiceCard data={s} index={i} />
          </div>
        ))}
      </div>

      {/* Mobile "view all" */}
      <div className="mt-6 flex justify-center sm:hidden">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 font-sans text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {t('viewAll')}
          <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
