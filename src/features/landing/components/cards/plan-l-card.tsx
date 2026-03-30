import { useTranslations } from 'next-intl'
import { Scale, BookOpen } from 'lucide-react'
import { BentoCard } from '../bento-card'
import { Badge } from '@/shared/ui/badge'

interface PlanLCardProps {
  index?: number
}

export function PlanLCard({ index = 0 }: PlanLCardProps) {
  const t = useTranslations('services.planL')

  return (
    <BentoCard
      index={index}
      accentColor="var(--plan-l)"
      hoverAccent="var(--plan-l)"
      className="lg:col-span-4 col-span-1 sm:col-span-2"
    >
      {/* Indigo ambient — muted since Coming Soon */}
      <div
        className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, var(--plan-l), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4 flex-1">
        {/* "Sneak peek" visual — abstract legal document icon arrangement */}
        <div
          className="rounded-lg p-4 flex items-center justify-center mb-1"
          style={{
            background: 'color-mix(in oklch, var(--plan-l) 5%, var(--muted))',
            border: '1px dashed color-mix(in oklch, var(--plan-l) 25%, var(--border))',
          }}
          aria-hidden="true"
        >
          <div className="flex items-end gap-2 opacity-50">
            {/* Stacked document shapes */}
            <div
              className="w-7 h-9 rounded-sm border-2 flex items-center justify-center"
              style={{
                borderColor:
                  'color-mix(in oklch, var(--plan-l) 40%, var(--border))',
                background:
                  'color-mix(in oklch, var(--plan-l) 10%, var(--card))',
              }}
            >
              <BookOpen size={12} strokeWidth={1.5} style={{ color: 'var(--plan-l)' }} />
            </div>
            <div
              className="w-7 h-10 rounded-sm border-2 flex items-center justify-center"
              style={{
                borderColor:
                  'color-mix(in oklch, var(--plan-l) 50%, var(--border))',
                background:
                  'color-mix(in oklch, var(--plan-l) 15%, var(--card))',
              }}
            >
              <Scale size={12} strokeWidth={1.5} style={{ color: 'var(--plan-l)' }} />
            </div>
            <div
              className="w-7 h-8 rounded-sm border-2 flex items-center justify-center"
              style={{
                borderColor:
                  'color-mix(in oklch, var(--plan-l) 35%, var(--border))',
                background:
                  'color-mix(in oklch, var(--plan-l) 8%, var(--card))',
              }}
            >
              <BookOpen size={10} strokeWidth={1.5} style={{ color: 'var(--plan-l)' }} />
            </div>
          </div>
        </div>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h2 className="font-sans text-lg font-semibold text-foreground">
              {t('title')}
            </h2>
            <Badge variant="coming-soon">{t('badge')}</Badge>
          </div>
          <p
            className="font-sans text-sm font-medium"
            style={{ color: 'var(--plan-l)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Description */}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          {t('description')}
        </p>

        {/* Teaser — italicized hint */}
        <p
          className="font-sans text-xs leading-relaxed flex-1 italic px-3 py-2.5 rounded-lg border-l-2"
          style={{
            color: 'color-mix(in oklch, var(--plan-l) 70%, var(--muted-foreground))',
            borderLeftColor: 'color-mix(in oklch, var(--plan-l) 40%, transparent)',
            background: 'color-mix(in oklch, var(--plan-l) 4%, transparent)',
          }}
        >
          {t('teaser')}
        </p>
      </div>
    </BentoCard>
  )
}
