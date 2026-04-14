'use client'

import { useTranslations } from 'next-intl'
import { BentoCard } from '../bento-card'
import { CountUp } from '../count-up'
import { TECH_STACK } from '../tech-stack-data'

interface StatsTechCardProps {
  index?: number
}

// Stat item with a subtle accent color underline
function StatItem({
  value,
  label,
  format,
  accent,
  startValue,
}: {
  value: number
  label: string
  format: 'number' | 'plain'
  accent: string
  startValue?: number
}) {
  // BOLDER: larger stat numbers with stronger foreground color
  return (
    <div className="flex flex-col gap-1.5 first:pl-0 pl-4">
      <span
        className="font-display text-[2.25rem] sm:text-[2.75rem] font-bold tabular-nums leading-none"
        style={{ color: 'var(--foreground)' }}
      >
        <CountUp target={value} duration={1.5} format={format} startValue={startValue} />
      </span>
      {/* Accent underline — BOLDER: slightly wider */}
      <div
        className="h-[3px] w-10 rounded-full mb-0.5"
        style={{ background: accent }}
        aria-hidden="true"
      />
      <span className="font-sans text-xs font-medium text-muted-foreground leading-snug">
        {label}
      </span>
    </div>
  )
}

export function StatsTechCard({ index = 0 }: StatsTechCardProps) {
  const t = useTranslations('stats')

  const STATS = [
    {
      value: 3,
      label: t('services'),
      format: 'number' as const,
      accent: 'var(--primary)',
    },
    {
      value: 1,
      label: t('live'),
      format: 'number' as const,
      accent: 'var(--success)',
    },
    {
      // Year should count up from 2024 to feel more meaningful, not from 0
      value: 2026,
      startValue: 2024,
      label: t('year'),
      format: 'plain' as const,
      accent: 'var(--accent)',
    },
  ]

  return (
    <BentoCard
      index={index}
      className="lg:col-span-6 col-span-1 sm:col-span-4"
      hoverAccent="var(--primary)"
    >
      <div className="flex flex-col gap-6 flex-1">
        {/* Stats section */}
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
            {t('label')}
          </p>
          <div className="grid grid-cols-3 gap-4 divide-x divide-border/50">
            {STATS.map(({ value, startValue, label, format, accent }) => (
              <StatItem
                key={label}
                value={value}
                startValue={startValue}
                label={label}
                format={format}
                accent={accent}
              />
            ))}
          </div>
        </div>

        {/* Gradient divider */}
        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)',
          }}
          aria-hidden="true"
        />

        {/* Tech stack section */}
        <div className="flex-1">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map(({ icon: Icon, label, color }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all duration-200 hover:scale-[1.04]"
                style={{
                  color,
                  background: `color-mix(in oklch, ${color} 8%, transparent)`,
                  borderColor: `color-mix(in oklch, ${color} 20%, var(--border))`,
                }}
              >
                <Icon size={12} strokeWidth={2} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
