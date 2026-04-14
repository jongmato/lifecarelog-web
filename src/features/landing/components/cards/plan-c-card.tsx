'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ExternalLink, Wifi } from 'lucide-react'
import { BentoCard } from '../bento-card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

interface PlanCCardProps {
  index?: number
}

export function PlanCCard({ index = 0 }: PlanCCardProps) {
  const t = useTranslations('services.planC')

  return (
    <BentoCard
      index={index}
      accentColor="var(--plan-c)"
      hoverAccent="var(--plan-c)"
      className="lg:col-span-4 col-span-1 sm:col-span-2"
    >
      {/* Sky-blue ambient glow in corner */}
      <div
        className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-[0.06] dark:opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, var(--plan-c), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4 flex-1">
        {/* Mini "screen preview" illustration — abstract UI chrome */}
        <div
          className="rounded-lg overflow-hidden mb-1 border"
          style={{
            borderColor: 'color-mix(in oklch, var(--plan-c) 20%, var(--border))',
            background:
              'color-mix(in oklch, var(--plan-c) 5%, var(--muted))',
          }}
          aria-hidden="true"
        >
          {/* Window chrome bar */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 border-b"
            style={{
              borderColor:
                'color-mix(in oklch, var(--plan-c) 15%, var(--border))',
              background: 'color-mix(in oklch, var(--plan-c) 8%, var(--card))',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-error/60" />
            <span className="w-2 h-2 rounded-full bg-warning/60" />
            <span className="w-2 h-2 rounded-full bg-success/60" />
            <span
              className="ml-auto text-[10px] font-medium"
              style={{ color: 'var(--plan-c)' }}
            >
              plan-c.lifecarelog.co.kr
            </span>
          </div>
          {/* App-like content preview */}
          <div className="px-3 py-2.5 flex flex-col gap-2">
            <div
              className="text-[9px] font-semibold uppercase tracking-widest"
              style={{ color: 'color-mix(in oklch, var(--plan-c) 60%, var(--muted-foreground))' }}
            >
              오늘의 기록
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--success)' }} />
              <div className="h-1.5 rounded-full w-24" style={{ background: 'color-mix(in oklch, var(--plan-c) 18%, var(--muted))' }} />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'color-mix(in oklch, var(--plan-c) 40%, var(--muted))' }} />
              <div className="h-1.5 rounded-full w-16" style={{ background: 'color-mix(in oklch, var(--plan-c) 12%, var(--muted))' }} />
            </div>
            <div
              className="mt-1 h-4 rounded-md w-20 flex items-center justify-center text-[7px] font-medium"
              style={{
                background: 'color-mix(in oklch, var(--plan-c) 12%, var(--muted))',
                border: '1px solid color-mix(in oklch, var(--plan-c) 20%, var(--border))',
                color: 'var(--plan-c)',
              }}
            >
              + 기록하기
            </div>
          </div>
        </div>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h2 className="font-sans text-lg font-semibold text-foreground">
              {t('title')}
            </h2>
            {/* QUIETER: pulse scale reduced to 1.25 (was 1.5), barely perceptible */}
            <Badge
              variant="live"
              className="flex items-center gap-1.5 glow-success"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-success"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                aria-hidden="true"
              />
              {t('badge')}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi
              size={12}
              strokeWidth={2}
              style={{ color: 'var(--plan-c)' }}
              aria-hidden="true"
            />
            <p
              className="font-sans text-sm font-medium"
              style={{ color: 'var(--plan-c)' }}
            >
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
          {t('description')}
        </p>

        {/* CTA — ADAPT: w-full ensures 44px+ touch target on mobile */}
        <a
          href="https://plan-c.lifecarelog.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto"
        >
          <Button
            variant="secondary"
            size="sm"
            className="w-full gap-2 group border-2 min-h-[44px] transition-all duration-200 hover:border-[var(--plan-c)]/40 hover:text-[var(--plan-c)]"
          >
            {t('cta')}
            <ExternalLink
              size={13}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Button>
        </a>
      </div>
    </BentoCard>
  )
}
