'use client'

import { useTranslations } from 'next-intl'
import { Globe, Cpu, Database, Smartphone, Cloud, Code, Atom, TabletSmartphone, Server } from 'lucide-react'
import { BentoCard } from '../bento-card'
import { CountUp } from '../count-up'

const TECH_STACK = [
  { icon: Code, label: 'TypeScript', color: 'oklch(0.48 0.12 250)' },
  { icon: Atom, label: 'React', color: 'oklch(0.55 0.16 220)' },
  { icon: Globe, label: 'Next.js', color: 'oklch(0.20 0.01 250)' },
  { icon: TabletSmartphone, label: 'React Native', color: 'oklch(0.55 0.16 220)' },
  { icon: Smartphone, label: 'Expo', color: 'oklch(0.35 0.02 250)' },
  { icon: Server, label: 'NestJS', color: 'oklch(0.50 0.18 15)' },
  { icon: Cpu, label: 'FastAPI', color: 'oklch(0.42 0.14 168)' },
  { icon: Database, label: 'Supabase', color: 'oklch(0.45 0.12 168)' },
  { icon: Cloud, label: 'Cloudflare', color: 'oklch(0.58 0.15 42)' },
] as const

interface StatsTechCardProps {
  index?: number
}

// Stat item with a subtle accent color underline
function StatItem({
  value,
  label,
  format,
  accent,
}: {
  value: number
  label: string
  format: 'number' | 'plain'
  accent: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="font-sans text-3xl sm:text-4xl font-bold tabular-nums leading-none"
        style={{ color: 'var(--foreground)' }}
      >
        <CountUp target={value} duration={1.5} format={format} />
      </span>
      {/* Accent underline */}
      <div
        className="h-0.5 w-8 rounded-full mb-0.5"
        style={{ background: accent }}
        aria-hidden="true"
      />
      <span className="font-sans text-xs text-muted-foreground leading-snug">
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
      value: 2026,
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
          <div className="grid grid-cols-3 gap-4">
            {STATS.map(({ value, label, format, accent }) => (
              <StatItem
                key={label}
                value={value}
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
