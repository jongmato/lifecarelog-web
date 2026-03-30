'use client'

import { useTranslations } from 'next-intl'
import { Globe, Cpu, Database, Smartphone, Cloud } from 'lucide-react'
import { BentoCard } from '../bento-card'
import { CountUp } from '../count-up'

const TECH_STACK = [
  { icon: Globe, label: 'Next.js' },
  { icon: Cpu, label: 'FastAPI' },
  { icon: Database, label: 'Supabase' },
  { icon: Smartphone, label: 'Expo' },
  { icon: Cloud, label: 'Cloudflare' },
] as const

interface StatsTechCardProps {
  index?: number
}

export function StatsTechCard({ index = 0 }: StatsTechCardProps) {
  const t = useTranslations('stats')

  const STATS = [
    { value: 3, label: t('services'), format: 'number' as const },
    { value: 1, label: t('live'), format: 'number' as const },
    { value: 2026, label: t('year'), format: 'plain' as const },
  ]

  return (
    <BentoCard index={index} className="lg:col-span-6 col-span-1 sm:col-span-4">
      <div className="flex flex-col gap-6 flex-1">
        {/* Stats section */}
        <div>
          <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            {t('label')}
          </p>
          <div className="grid grid-cols-3 gap-4">
            {STATS.map(({ value, label, format }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-sans text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
                  <CountUp target={value} duration={1.5} format={format} />
                </span>
                <span className="font-sans text-xs text-muted-foreground leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Tech stack section */}
        <div className="flex-1">
          <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1.5 rounded-lg"
              >
                <Icon size={13} strokeWidth={1.75} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
